import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createProceduralCar, CarModelInstance } from './carModel';

export interface HotspotScreenPos {
  id: string;
  title: string;
  desc: string;
  x: number;
  y: number;
  visible: boolean;
}

export interface CarSceneController {
  mount: (container: HTMLElement) => void;
  unmount: () => void;
  setProgress: (progress: number) => void; // 0 to 1
  setCameraPreset: (preset: 'hero' | 'exploded' | 'engine' | 'wheels') => void;
  onHotspotsUpdate?: (cb: (hotspots: HotspotScreenPos[]) => void) => void;
  resize: () => void;
  enableManualOrbit: (enable: boolean) => void;
}

export function createCarScene(): CarSceneController {
  let containerEl: HTMLElement | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let carInstance: CarModelInstance | null = null;
  let animFrameId = 0;
  let isUnmounted = false;

  // Camera targets for smooth lerping
  const currentCamPos = new THREE.Vector3(3.4, 1.4, 4.4);
  const targetCamPos = new THREE.Vector3(3.4, 1.4, 4.4);
  const currentLookAt = new THREE.Vector3(0, 0.45, 0);
  const targetLookAt = new THREE.Vector3(0, 0.45, 0);

  // Manual rotation offsets (when user drags/orbits)
  let isManualOrbit = false;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let manualRotY = 0;
  let manualRotX = 0;

  // Current progress
  let scrollProgress = 0;

  // 3D coordinates of key components for HUD projection
  const mechanicalHotspots = [
    { id: 'engine', title: 'ДВИГАТЕЛЬ V8', desc: 'Кованый коленвал, фазовращатели и турбокомпрессоры', worldPos: new THREE.Vector3(0, 0.65, 0.75) },
    { id: 'diagnostics', title: 'ДИАГНОСТИКА', desc: 'ЭБУ двигателя, опрос шин данных CAN/LIN', worldPos: new THREE.Vector3(0.42, 0.72, 0.25) },
    { id: 'brakes', title: 'ТОРМОЗНАЯ СИСТЕМА', desc: 'Карбон-керамические роторы и 6-поршневые суппорты', worldPos: new THREE.Vector3(-1.1, 0.38, 1.25) },
    { id: 'chassis', title: 'ПОДВЕСКА', desc: 'Адаптивные амортизаторы и сдвоенные А-образные рычаги', worldPos: new THREE.Vector3(1.1, 0.42, -1.25) },
    { id: 'electronics', title: 'ЭЛЕКТРОНИКА', desc: 'Высоковольтная сеть, датчики детонации и реле', worldPos: new THREE.Vector3(-0.45, 0.55, 0.3) },
  ];

  let onHotspotsCallback: ((hotspots: HotspotScreenPos[]) => void) | undefined;

  // Software WebGL detection guard
  const isSoftwareGl = (() => {
    try {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      return false;
    }
  })();

  const initScene = () => {
    if (!containerEl) return;

    const width = containerEl.clientWidth || window.innerWidth;
    const height = containerEl.clientHeight || window.innerHeight;

    // 1. Scene
    scene = new THREE.Scene();
    scene.background = null; // transparent so dark gradient shows through

    // 2. Camera
    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.copy(currentCamPos);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerEl.appendChild(renderer.domElement);

    // 4. Procedural Studio Reflection (RoomEnvironment)
    const pmremGen = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGen.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGen.dispose();

    // 5. Studio Lighting Rig
    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.4);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
      keyLight.shadow.camera.left = -3;
      keyLight.shadow.camera.right = 3;
      keyLight.shadow.camera.top = 3;
      keyLight.shadow.camera.bottom = -3;
    }
    scene.add(keyLight);

    // Cool Sky/Fill Light
    const hemiLight = new THREE.HemisphereLight(0x2a3648, 0x090a0d, 1.3);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Amber Rim Backlight (Accentuates car body contours & engine metal)
    const rimLight = new THREE.DirectionalLight(0xff6b2c, 3.2);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Front Sweep Spotlight (simulates studio light traversing car)
    const sweepLight = new THREE.SpotLight(0xdbeafe, 2.0, 12, Math.PI / 4, 0.4);
    sweepLight.position.set(0, 3.5, 3.5);
    scene.add(sweepLight);

    // 6. Ground Shadow Disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 5.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, 0.02, 0);
    scene.add(shadowPlane);

    // 7. Add Procedural Car
    carInstance = createProceduralCar();
    scene.add(carInstance.rootGroup);

    // Event listeners for interactive drag/orbit
    setupInteractionListeners();

    // Start Render Loop
    startLoop();
  };

  const setupInteractionListeners = () => {
    if (!containerEl) return;

    const onMouseDown = (e: MouseEvent) => {
      // Allow manual orbit when user holds mouse button
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      manualRotY += deltaX * 0.006;
      manualRotX = Math.max(-0.4, Math.min(0.6, manualRotX + deltaY * 0.004));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      manualRotY += deltaX * 0.008;
      manualRotX = Math.max(-0.4, Math.min(0.6, manualRotX + deltaY * 0.005));
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    containerEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    containerEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  };

  const calculateCameraChoreography = (p: number) => {
    // Stage 1 (0.0 to 0.2): Whole car, cinematic low three-quarter hero angle
    // Stage 2 (0.2 to 0.55): Explosion, camera raises and pans outward to see all parts
    // Stage 3 (0.55 to 0.85): Tight focus on Engine Block & Diagnostics
    // Stage 4 (0.85 to 1.0): Architectural view connecting components with typography

    if (p < 0.25) {
      // Normalizing p from 0 to 0.25
      const t = p / 0.25;
      targetCamPos.set(
        3.5 - t * 0.6,
        1.35 + t * 0.4,
        4.2 - t * 0.4
      );
      targetLookAt.set(0, 0.45, 0.2 * t);
    } else if (p < 0.6) {
      // Disassembly exploded view
      const t = (p - 0.25) / 0.35;
      targetCamPos.set(
        2.9 + t * 0.4,
        1.75 + t * 0.75,
        3.8 - t * 0.8
      );
      targetLookAt.set(0, 0.6 + t * 0.2, 0.1);
    } else if (p < 0.88) {
      // Engine close-up inspection
      const t = (p - 0.6) / 0.28;
      targetCamPos.set(
        1.6 + (1 - t) * 0.6,
        1.35 + t * 0.15,
        2.1 + (1 - t) * 0.4
      );
      targetLookAt.set(0, 0.65, 0.75); // Target Engine position
    } else {
      // Stage 4: High cinematic overview with balanced typography spacing
      const t = (p - 0.88) / 0.12;
      targetCamPos.set(
        3.2 + t * 0.3,
        1.9 + t * 0.2,
        3.4 - t * 0.2
      );
      targetLookAt.set(0, 0.5, 0.2);
    }
  };

  const updateHotspotProjections = () => {
    if (!camera || !containerEl || !onHotspotsCallback) return;

    const width = containerEl.clientWidth;
    const height = containerEl.clientHeight;
    const results: HotspotScreenPos[] = [];

    // Show hotspots primarily during exploded stages (progress > 0.4)
    const isVisibleStage = scrollProgress > 0.35 && scrollProgress < 0.95;

    mechanicalHotspots.forEach(hp => {
      const v = hp.worldPos.clone();
      
      // If car is rotated, rotate the hotspot position
      if (carInstance) {
        v.applyEuler(carInstance.rootGroup.rotation);
      }

      v.project(camera!);

      // Check if in front of camera
      const inFront = v.z < 1;
      const screenX = (v.x * 0.5 + 0.5) * width;
      const screenY = (-(v.y * 0.5) + 0.5) * height;

      results.push({
        id: hp.id,
        title: hp.title,
        desc: hp.desc,
        x: screenX,
        y: screenY,
        visible: isVisibleStage && inFront && screenX > 50 && screenX < width - 50 && screenY > 50 && screenY < height - 50,
      });
    });

    onHotspotsCallback(results);
  };

  const startLoop = () => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (isUnmounted) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (renderer && scene && camera && carInstance) {
        // 1. Calculate camera target based on scroll progress
        calculateCameraChoreography(scrollProgress);

        // 2. Exponential damping for smooth camera position & lookAt
        currentCamPos.lerp(targetCamPos, delta * 3.5);
        currentLookAt.lerp(targetLookAt, delta * 3.5);

        // Apply manual rotation damping when user interacts
        if (!isDragging) {
          manualRotY *= 0.94;
          manualRotX *= 0.94;
        }

        // Apply manual offset to camera or car
        carInstance.rootGroup.rotation.y = manualRotY + (scrollProgress * 0.45);
        carInstance.rootGroup.rotation.x = manualRotX;

        camera.position.copy(currentCamPos);
        camera.lookAt(currentLookAt);

        // 3. Update car mechanical disassembly
        carInstance.updateDisassembly(scrollProgress);

        // 4. Update HUD screen coordinate markers
        updateHotspotProjections();

        // 5. Render
        renderer.render(scene, camera);
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
  };

  return {
    mount: (container: HTMLElement) => {
      containerEl = container;
      try {
        initScene();
      } catch (err) {
        console.warn('WebGL initialization failed, falling back gracefully:', err);
      }
    },
    unmount: () => {
      isUnmounted = true;
      cancelAnimationFrame(animFrameId);
      if (carInstance) carInstance.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentElement) {
          renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
      }
    },
    setProgress: (progress: number) => {
      scrollProgress = Math.max(0, Math.min(1, progress));
    },
    setCameraPreset: (preset: 'hero' | 'exploded' | 'engine' | 'wheels') => {
      manualRotY = 0;
      manualRotX = 0;
      if (preset === 'hero') {
        scrollProgress = 0.0;
      } else if (preset === 'exploded') {
        scrollProgress = 0.45;
      } else if (preset === 'engine') {
        scrollProgress = 0.75;
      } else if (preset === 'wheels') {
        scrollProgress = 0.5;
        manualRotY = Math.PI / 3;
      }
    },
    onHotspotsUpdate: (cb) => {
      onHotspotsCallback = cb;
    },
    resize: () => {
      if (!containerEl || !renderer || !camera) return;
      const width = containerEl.clientWidth;
      const height = containerEl.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    },
    enableManualOrbit: (enable: boolean) => {
      isManualOrbit = enable;
    },
  };
}
