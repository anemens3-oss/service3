import * as THREE from 'three';

/**
 * Procedural Modular 3D Vehicle for APEX MOTORWORKS
 * 
 * Constructed from 10 distinct mechanical sub-assemblies across 3 silhouette scales,
 * with individual explosion vectors for scroll-driven mechanical disassembly.
 */

export interface ExplodedPart {
  mesh: THREE.Object3D;
  initialPos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  initialRot: THREE.Euler;
  explodedRot: THREE.Euler;
  initialScale: THREE.Vector3;
  explodedScale: THREE.Vector3;
  label?: string;
  category?: 'body' | 'engine' | 'wheels' | 'chassis' | 'brakes' | 'exhaust';
}

export interface CarModelInstance {
  rootGroup: THREE.Group;
  parts: ExplodedPart[];
  engineGroup: THREE.Group;
  bodyGroup: THREE.Group;
  hoodGroup: THREE.Group;
  wheels: THREE.Group[];
  updateDisassembly: (progress: number) => void;
  dispose: () => void;
}

// Materials library with high PBR fidelity
export function createCarMaterials() {
  // Body: Obsidian Metallic with Clearcoat
  const bodyPaint = new THREE.MeshPhysicalMaterial({
    color: 0x16181e,
    metalness: 0.92,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  // Hood: Satin Carbon Finish
  const hoodPaint = new THREE.MeshPhysicalMaterial({
    color: 0x1e2129,
    metalness: 0.88,
    roughness: 0.24,
    clearcoat: 0.8,
  });

  // Engine: Machined Billet Alloy & Cast Titanium
  const engineMetal = new THREE.MeshStandardMaterial({
    color: 0x9ca3af,
    metalness: 0.95,
    roughness: 0.22,
  });

  // Engine Accent: APEX Signature Amber/Orange Intake & Valve Covers
  const engineAccent = new THREE.MeshStandardMaterial({
    color: 0xff6b2c,
    metalness: 0.75,
    roughness: 0.3,
  });

  // Dark Steel for Chassis and Subframe
  const chassisMetal = new THREE.MeshStandardMaterial({
    color: 0x22252c,
    metalness: 0.85,
    roughness: 0.45,
  });

  // Wheel Rims: Forged Dark Graphite
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2d36,
    metalness: 0.92,
    roughness: 0.2,
  });

  // Brake Calipers: Signature Orange Gloss
  const caliperMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b2c,
    metalness: 0.8,
    roughness: 0.25,
  });

  // Brake Rotors: Slotted Brushed Stainless Steel
  const rotorMaterial = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    metalness: 0.94,
    roughness: 0.28,
  });

  // Tires: Matte Performance Vulcanized Rubber
  const tireRubber = new THREE.MeshStandardMaterial({
    color: 0x141517,
    roughness: 0.88,
    metalness: 0.05,
  });

  // Glass Canopy: Aerodynamic Tinted
  const glassCanopy = new THREE.MeshPhysicalMaterial({
    color: 0x08090c,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.65,
    clearcoat: 1.0,
  });

  // Headlights: Matrix LED Emissive
  const lightFront = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xdbeafe,
    emissiveIntensity: 2.5,
    roughness: 0.1,
  });

  // Taillights: Razor LED Amber/Red Emissive
  const lightRear = new THREE.MeshStandardMaterial({
    color: 0xff3b30,
    emissive: 0xff453a,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  // Exhaust: Blued Heat-treated Titanium
  const exhaustMetal = new THREE.MeshStandardMaterial({
    color: 0x3b4252,
    metalness: 0.95,
    roughness: 0.18,
  });

  return {
    bodyPaint,
    hoodPaint,
    engineMetal,
    engineAccent,
    chassisMetal,
    rimMaterial,
    caliperMaterial,
    rotorMaterial,
    tireRubber,
    glassCanopy,
    lightFront,
    lightRear,
    exhaustMetal,
  };
}

export function createProceduralCar(): CarModelInstance {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'ApexSupercar';

  const mats = createCarMaterials();
  const parts: ExplodedPart[] = [];
  const wheels: THREE.Group[] = [];

  // ==========================================
  // 1. CHASSIS / CRADLE & FLOOR PAN (Base)
  // ==========================================
  const chassisGroup = new THREE.Group();
  chassisGroup.name = 'Chassis';

  // Flat aerodynamic underbody pan
  const floorGeo = new THREE.BoxGeometry(1.68, 0.08, 3.8);
  const floorMesh = new THREE.Mesh(floorGeo, mats.chassisMetal);
  floorMesh.position.set(0, 0.14, 0);
  floorMesh.castShadow = true;
  chassisGroup.add(floorMesh);

  // Structural side sills / chassis rails
  const sillGeo = new THREE.BoxGeometry(0.12, 0.14, 3.6);
  const leftSill = new THREE.Mesh(sillGeo, mats.chassisMetal);
  leftSill.position.set(-0.84, 0.22, 0);
  const rightSill = new THREE.Mesh(sillGeo, mats.chassisMetal);
  rightSill.position.set(0.84, 0.22, 0);
  chassisGroup.add(leftSill, rightSill);

  // Rear aerodynamic diffuser strakes
  for (let i = -2; i <= 2; i++) {
    const strakeGeo = new THREE.BoxGeometry(0.02, 0.14, 0.5);
    const strake = new THREE.Mesh(strakeGeo, mats.chassisMetal);
    strake.position.set(i * 0.28, 0.15, -1.8);
    chassisGroup.add(strake);
  }

  rootGroup.add(chassisGroup);
  parts.push({
    mesh: chassisGroup,
    initialPos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, -0.45, 0),
    initialRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0),
    initialScale: new THREE.Vector3(1, 1, 1),
    explodedScale: new THREE.Vector3(1, 1, 1),
    label: 'ШАССИ И ПОДРАМНИК',
    category: 'chassis',
  });

  // ==========================================
  // 2. MAIN BODY SHELL / CABIN MONOCOQUE
  // ==========================================
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'BodyShell';

  // Lower sculpted monocoque section
  const lowerBodyShape = new THREE.Shape();
  lowerBodyShape.moveTo(-0.86, -1.85);
  lowerBodyShape.lineTo(-0.9, -0.9);
  lowerBodyShape.lineTo(-0.86, 1.2);
  lowerBodyShape.lineTo(-0.75, 1.85);
  lowerBodyShape.lineTo(0.75, 1.85);
  lowerBodyShape.lineTo(0.86, 1.2);
  lowerBodyShape.lineTo(0.9, -0.9);
  lowerBodyShape.lineTo(0.86, -1.85);
  lowerBodyShape.closePath();

  const extrudeSettings = {
    steps: 1,
    depth: 0.38,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 4,
  };

  const lowerBodyGeo = new THREE.ExtrudeGeometry(lowerBodyShape, extrudeSettings);
  lowerBodyGeo.rotateX(Math.PI / 2);
  const lowerBodyMesh = new THREE.Mesh(lowerBodyGeo, mats.bodyPaint);
  lowerBodyMesh.position.set(0, 0.5, 0);
  lowerBodyMesh.castShadow = true;
  bodyGroup.add(lowerBodyMesh);

  // Roof & Greenhouse Cabin
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-0.64, -0.9);
  roofShape.lineTo(-0.68, 0.35);
  roofShape.lineTo(-0.58, 0.95);
  roofShape.lineTo(0.58, 0.95);
  roofShape.lineTo(0.68, 0.35);
  roofShape.lineTo(0.64, -0.9);
  roofShape.closePath();

  const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
    steps: 1,
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 3,
  });
  roofGeo.rotateX(Math.PI / 2);
  const roofMesh = new THREE.Mesh(roofGeo, mats.glassCanopy);
  roofMesh.position.set(0, 0.92, -0.15);
  roofMesh.castShadow = true;
  bodyGroup.add(roofMesh);

  // Front Matrix LED Light Strips
  const lightGeo = new THREE.BoxGeometry(0.42, 0.04, 0.08);
  const leftLight = new THREE.Mesh(lightGeo, mats.lightFront);
  leftLight.position.set(-0.55, 0.45, 1.86);
  leftLight.rotation.y = -0.12;

  const rightLight = new THREE.Mesh(lightGeo, mats.lightFront);
  rightLight.position.set(0.55, 0.45, 1.86);
  rightLight.rotation.y = 0.12;
  bodyGroup.add(leftLight, rightLight);

  // Rear Continuous LED Razor Lightbar
  const rearLightGeo = new THREE.BoxGeometry(1.48, 0.03, 0.06);
  const rearLight = new THREE.Mesh(rearLightGeo, mats.lightRear);
  rearLight.position.set(0, 0.58, -1.88);
  bodyGroup.add(rearLight);

  // Rear Aerodynamic Active Wing
  const wingGeo = new THREE.BoxGeometry(1.52, 0.03, 0.28);
  const wingMesh = new THREE.Mesh(wingGeo, mats.hoodPaint);
  wingMesh.position.set(0, 0.78, -1.72);
  
  // Wing pylons
  const pylonGeo = new THREE.BoxGeometry(0.04, 0.18, 0.14);
  const leftPylon = new THREE.Mesh(pylonGeo, mats.engineMetal);
  leftPylon.position.set(-0.45, 0.68, -1.72);
  const rightPylon = new THREE.Mesh(pylonGeo, mats.engineMetal);
  rightPylon.position.set(0.45, 0.68, -1.72);
  bodyGroup.add(wingMesh, leftPylon, rightPylon);

  rootGroup.add(bodyGroup);
  parts.push({
    mesh: bodyGroup,
    initialPos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 1.65, 0),
    initialRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0),
    initialScale: new THREE.Vector3(1, 1, 1),
    explodedScale: new THREE.Vector3(1, 1, 1),
    label: 'КУЗОВ И МОНОКОК',
    category: 'body',
  });

  // ==========================================
  // 3. FRONT HOOD / ENGINE BONNET (Lifts & tilts)
  // ==========================================
  const hoodGroup = new THREE.Group();
  hoodGroup.name = 'FrontHood';

  const hoodShape = new THREE.Shape();
  hoodShape.moveTo(-0.68, 0.5);
  hoodShape.lineTo(-0.72, 1.1);
  hoodShape.lineTo(-0.62, 1.82);
  hoodShape.lineTo(0.62, 1.82);
  hoodShape.lineTo(0.72, 1.1);
  hoodShape.lineTo(0.68, 0.5);
  hoodShape.closePath();

  const hoodGeo = new THREE.ExtrudeGeometry(hoodShape, {
    steps: 1,
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
  });
  hoodGeo.rotateX(Math.PI / 2);
  const hoodMesh = new THREE.Mesh(hoodGeo, mats.hoodPaint);
  hoodMesh.position.set(0, 0.54, 0);
  hoodMesh.castShadow = true;
  hoodGroup.add(hoodMesh);

  // Dual Hood Cooling Vents
  const ventGeo = new THREE.BoxGeometry(0.18, 0.02, 0.35);
  const leftVent = new THREE.Mesh(ventGeo, mats.chassisMetal);
  leftVent.position.set(-0.32, 0.55, 1.1);
  const rightVent = new THREE.Mesh(ventGeo, mats.chassisMetal);
  rightVent.position.set(0.32, 0.55, 1.1);
  hoodGroup.add(leftVent, rightVent);

  rootGroup.add(hoodGroup);
  parts.push({
    mesh: hoodGroup,
    initialPos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 1.95, 0.45),
    initialRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0.35, 0, 0),
    initialScale: new THREE.Vector3(1, 1, 1),
    explodedScale: new THREE.Vector3(1, 1, 1),
    label: 'КАПОТ И ВОЗДУХОВОДЫ',
    category: 'body',
  });

  // ==========================================
  // 4. TWIN-TURBO V8 POWERTRAIN & ENGINE BAY
  // ==========================================
  const engineGroup = new THREE.Group();
  engineGroup.name = 'EngineAssembly';

  // Engine Crankcase Block
  const blockGeo = new THREE.BoxGeometry(0.58, 0.42, 0.72);
  const blockMesh = new THREE.Mesh(blockGeo, mats.engineMetal);
  blockMesh.position.set(0, 0.42, 0.75);
  blockMesh.castShadow = true;
  engineGroup.add(blockMesh);

  // V-Bank Angled Cylinder Heads (Left & Right)
  const headGeo = new THREE.BoxGeometry(0.24, 0.16, 0.68);
  const leftHead = new THREE.Mesh(headGeo, mats.engineMetal);
  leftHead.position.set(-0.24, 0.6, 0.75);
  leftHead.rotation.z = 0.38;

  const rightHead = new THREE.Mesh(headGeo, mats.engineMetal);
  rightHead.position.set(0.24, 0.6, 0.75);
  rightHead.rotation.z = -0.38;
  engineGroup.add(leftHead, rightHead);

  // APEX Signature Amber/Orange Valve Covers
  const coverGeo = new THREE.BoxGeometry(0.18, 0.08, 0.65);
  const leftCover = new THREE.Mesh(coverGeo, mats.engineAccent);
  leftCover.position.set(-0.28, 0.7, 0.75);
  leftCover.rotation.z = 0.38;

  const rightCover = new THREE.Mesh(coverGeo, mats.engineAccent);
  rightCover.position.set(0.28, 0.7, 0.75);
  rightCover.rotation.z = -0.38;
  engineGroup.add(leftCover, rightCover);

  // Intake Plenum Manifold with Ribbed Runners
  const plenumGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.64, 16);
  plenumGeo.rotateX(Math.PI / 2);
  const plenumMesh = new THREE.Mesh(plenumGeo, mats.chassisMetal);
  plenumMesh.position.set(0, 0.74, 0.75);
  engineGroup.add(plenumMesh);

  // Dual Twin-Scroll Turbochargers (Left & Right)
  const turboGeo = new THREE.TorusGeometry(0.09, 0.045, 12, 24);
  const leftTurbo = new THREE.Mesh(turboGeo, mats.engineMetal);
  leftTurbo.position.set(-0.42, 0.38, 0.6);
  leftTurbo.rotation.y = Math.PI / 2;

  const rightTurbo = new THREE.Mesh(turboGeo, mats.engineMetal);
  rightTurbo.position.set(0.42, 0.38, 0.6);
  rightTurbo.rotation.y = -Math.PI / 2;
  engineGroup.add(leftTurbo, rightTurbo);

  // Front Accessory Serpentine Belt & Pulleys
  for (let i = 0; i < 4; i++) {
    const pulleyGeo = new THREE.CylinderGeometry(0.06 - (i * 0.01), 0.06 - (i * 0.01), 0.04, 16);
    pulleyGeo.rotateX(Math.PI / 2);
    const pulley = new THREE.Mesh(pulleyGeo, mats.engineMetal);
    const px = (i % 2 === 0 ? -1 : 1) * 0.15;
    const py = 0.35 + (i > 1 ? 0.2 : 0);
    pulley.position.set(px, py, 1.14);
    engineGroup.add(pulley);
  }

  // Dual Dual-Clutch Transmission Casing
  const transGeo = new THREE.BoxGeometry(0.44, 0.36, 0.62);
  const transMesh = new THREE.Mesh(transGeo, mats.engineMetal);
  transMesh.position.set(0, 0.38, 0.08);
  engineGroup.add(transMesh);

  // Carbon Driveshaft to Rear Axle
  const shaftGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.35, 12);
  shaftGeo.rotateX(Math.PI / 2);
  const shaftMesh = new THREE.Mesh(shaftGeo, mats.chassisMetal);
  shaftMesh.position.set(0, 0.28, -0.9);
  engineGroup.add(shaftMesh);

  rootGroup.add(engineGroup);
  // Engine stays in center position, but lifts subtly and scales slightly for maximum focus in stage 3
  parts.push({
    mesh: engineGroup,
    initialPos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 0.18, 0.1),
    initialRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(0, 0, 0),
    initialScale: new THREE.Vector3(1, 1, 1),
    explodedScale: new THREE.Vector3(1.15, 1.15, 1.15),
    label: 'ДВИГАТЕЛЬ V8 TWIN-TURBO',
    category: 'engine',
  });

  // ==========================================
  // 5. EXHAUST SYSTEM (Tubes + Quad Tailpipes)
  // ==========================================
  const exhaustGroup = new THREE.Group();
  exhaustGroup.name = 'ExhaustSystem';

  // Dual Exhaust pipes from transmission to rear
  const leftExhaustCurve = new THREE.LineCurve3(
    new THREE.Vector3(-0.25, 0.22, 0.2),
    new THREE.Vector3(-0.35, 0.22, -1.95)
  );
  const rightExhaustCurve = new THREE.LineCurve3(
    new THREE.Vector3(0.25, 0.22, 0.2),
    new THREE.Vector3(0.35, 0.22, -1.95)
  );

  const exhaustGeoL = new THREE.TubeGeometry(leftExhaustCurve, 16, 0.045, 10, false);
  const exhaustGeoR = new THREE.TubeGeometry(rightExhaustCurve, 16, 0.045, 10, false);
  const exhaustL = new THREE.Mesh(exhaustGeoL, mats.exhaustMetal);
  const exhaustR = new THREE.Mesh(exhaustGeoR, mats.exhaustMetal);
  exhaustGroup.add(exhaustL, exhaustR);

  // Quad Titanium Exhaust Tips
  const tipGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.18, 16);
  tipGeo.rotateX(Math.PI / 2);
  const tip1 = new THREE.Mesh(tipGeo, mats.exhaustMetal);
  tip1.position.set(-0.42, 0.22, -1.98);
  const tip2 = new THREE.Mesh(tipGeo, mats.exhaustMetal);
  tip2.position.set(-0.3, 0.22, -1.98);
  const tip3 = new THREE.Mesh(tipGeo, mats.exhaustMetal);
  tip3.position.set(0.3, 0.22, -1.98);
  const tip4 = new THREE.Mesh(tipGeo, mats.exhaustMetal);
  tip4.position.set(0.42, 0.22, -1.98);
  exhaustGroup.add(tip1, tip2, tip3, tip4);

  rootGroup.add(exhaustGroup);
  parts.push({
    mesh: exhaustGroup,
    initialPos: new THREE.Vector3(0, 0, 0),
    explodedPos: new THREE.Vector3(0, -0.32, -0.85),
    initialRot: new THREE.Euler(0, 0, 0),
    explodedRot: new THREE.Euler(-0.08, 0, 0),
    initialScale: new THREE.Vector3(1, 1, 1),
    explodedScale: new THREE.Vector3(1, 1, 1),
    label: 'ВЫХЛОПНАЯ СИСТЕМА',
    category: 'exhaust',
  });

  // ==========================================
  // 6. WHEELS & BRAKE ASSEMBLIES (x4)
  // ==========================================
  // Positions: Front Z = 1.25, Rear Z = -1.25, Left X = -0.88, Right X = 0.88
  const wheelConfigs = [
    { name: 'WheelFrontLeft', x: -0.92, z: 1.25, isLeft: true, expX: -1.65, expZ: 0.35, isFront: true },
    { name: 'WheelFrontRight', x: 0.92, z: 1.25, isLeft: false, expX: 1.65, expZ: 0.35, isFront: true },
    { name: 'WheelRearLeft', x: -0.92, z: -1.25, isLeft: true, expX: -1.65, expZ: -0.35, isFront: false },
    { name: 'WheelRearRight', x: 0.92, z: -1.25, isLeft: false, expX: 1.65, expZ: -0.35, isFront: false },
  ];

  wheelConfigs.forEach(cfg => {
    const wGroup = new THREE.Group();
    wGroup.name = cfg.name;
    wGroup.position.set(cfg.x, 0.34, cfg.z);

    // 1. Tire Rubber
    const tireGeo = new THREE.TorusGeometry(0.32, 0.12, 16, 32);
    tireGeo.rotateY(Math.PI / 2);
    const tireMesh = new THREE.Mesh(tireGeo, mats.tireRubber);
    tireMesh.castShadow = true;
    wGroup.add(tireMesh);

    // 2. Forged Alloy Rim
    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.22, 24);
    rimGeo.rotateZ(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, mats.rimMaterial);
    wGroup.add(rimMesh);

    // 3. Multi-spoke Rim Face (5 twin spokes)
    for (let s = 0; s < 5; s++) {
      const spokeGeo = new THREE.BoxGeometry(0.03, 0.22, 0.04);
      const spoke = new THREE.Mesh(spokeGeo, mats.rimMaterial);
      const angle = (s * Math.PI * 2) / 5;
      spoke.position.set(cfg.isLeft ? -0.1 : 0.1, 0, 0);
      spoke.rotation.x = angle;
      wGroup.add(spoke);
    }

    // 4. Perforated Carbon-Ceramic Brake Disc Rotor
    const rotorGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.035, 32);
    rotorGeo.rotateZ(Math.PI / 2);
    const rotorMesh = new THREE.Mesh(rotorGeo, mats.rotorMaterial);
    rotorMesh.position.set(cfg.isLeft ? 0.02 : -0.02, 0, 0);
    wGroup.add(rotorMesh);

    // 5. APEX Orange 6-Piston Caliper
    const caliperGeo = new THREE.BoxGeometry(0.06, 0.12, 0.15);
    const caliperMesh = new THREE.Mesh(caliperGeo, mats.caliperMaterial);
    caliperMesh.position.set(cfg.isLeft ? 0.02 : -0.02, 0.12, 0.05);
    wGroup.add(caliperMesh);

    // 6. Coilover Spring & Suspension Wishbone (attaches inside)
    const springCurve = new THREE.LineCurve3(
      new THREE.Vector3(cfg.isLeft ? 0.15 : -0.15, 0, 0),
      new THREE.Vector3(cfg.isLeft ? 0.45 : -0.45, 0.28, 0)
    );
    const springGeo = new THREE.TubeGeometry(springCurve, 12, 0.025, 8, false);
    const springMesh = new THREE.Mesh(springGeo, mats.engineAccent);
    wGroup.add(springMesh);

    rootGroup.add(wGroup);
    wheels.push(wGroup);

    parts.push({
      mesh: wGroup,
      initialPos: new THREE.Vector3(cfg.x, 0.34, cfg.z),
      explodedPos: new THREE.Vector3(cfg.expX, 0.34, cfg.z + cfg.expZ),
      initialRot: new THREE.Euler(0, 0, 0),
      explodedRot: new THREE.Euler(0, cfg.isLeft ? -0.2 : 0.2, 0),
      initialScale: new THREE.Vector3(1, 1, 1),
      explodedScale: new THREE.Vector3(1, 1, 1),
      label: cfg.isFront ? 'ПЕРЕДНЕЕ КОЛЕСО И ТОРМОЗНОЙ СУППОРТ' : 'ЗАДНЕЕ КОЛЕСО И СТУПИЦА',
      category: 'wheels',
    });
  });

  // ==========================================
  // DISASSEMBLY PROGRESS INTERPOLATOR (0 to 1)
  // ==========================================
  const updateDisassembly = (progress: number) => {
    // Clamp progress between 0 and 1
    const p = Math.max(0, Math.min(1, progress));
    
    // Smooth cubic easing for mechanical inertia
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    parts.forEach(part => {
      // Position lerp
      part.mesh.position.lerpVectors(part.initialPos, part.explodedPos, ease);
      
      // Rotation lerp
      part.mesh.rotation.x = THREE.MathUtils.lerp(part.initialRot.x, part.explodedRot.x, ease);
      part.mesh.rotation.y = THREE.MathUtils.lerp(part.initialRot.y, part.explodedRot.y, ease);
      part.mesh.rotation.z = THREE.MathUtils.lerp(part.initialRot.z, part.explodedRot.z, ease);

      // Scale lerp
      part.mesh.scale.lerpVectors(part.initialScale, part.explodedScale, ease);
    });
  };

  const dispose = () => {
    // Dispose all geometries & materials
    rootGroup.traverse(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();
      }
    });
    Object.values(mats).forEach(mat => mat.dispose());
  };

  return {
    rootGroup,
    parts,
    engineGroup,
    bodyGroup,
    hoodGroup,
    wheels,
    updateDisassembly,
    dispose,
  };
}
