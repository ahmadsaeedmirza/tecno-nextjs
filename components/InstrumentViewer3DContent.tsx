"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Helper for metallic materials
const createMat = (color: string, metalness = 0.9, roughness = 0.1, emissive?: string, emissiveIntensity = 0.6) => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness,
    roughness,
    emissive: emissive ? new THREE.Color(emissive) : new THREE.Color(0x000000),
    emissiveIntensity: emissive ? emissiveIntensity : 0,
  });
};

function buildScissors() {
  const group = new THREE.Group();
  
  const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.015, 1.8, 0.04), createMat("#d0d0d0", 0.95, 0.05));
  b1.position.set(0.05, 0.9, 0); b1.rotation.set(0, 0, 0.08); group.add(b1);
  
  const be1 = new THREE.Mesh(new THREE.BoxGeometry(0.005, 1.6, 0.035), createMat("#e8e8e8", 1, 0.02));
  be1.position.set(0.065, 0.9, 0); be1.rotation.set(0, 0, 0.08); group.add(be1);
  
  const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.015, 1.8, 0.04), createMat("#d0d0d0", 0.95, 0.05));
  b2.position.set(-0.05, 0.9, 0); b2.rotation.set(0, 0, -0.08); group.add(b2);
  
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 32), createMat("#999", 0.9, 0.15));
  p.position.set(0, 0.05, 0); group.add(p);
  
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.025, 16, 32), createMat("#b0b0b0", 0.9, 0.1));
  r1.position.set(0.15, -0.8, 0); r1.rotation.set(Math.PI / 2, 0, 0); group.add(r1);
  
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.025, 16, 32), createMat("#b0b0b0", 0.9, 0.1));
  r2.position.set(-0.15, -0.8, 0); r2.rotation.set(Math.PI / 2, 0, 0); group.add(r2);
  
  const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.9, 16), createMat("#c0c0c0", 0.9, 0.1));
  s1.position.set(0.08, -0.35, 0); s1.rotation.set(0, 0, -0.12); group.add(s1);
  
  const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.9, 16), createMat("#c0c0c0", 0.9, 0.1));
  s2.position.set(-0.08, -0.35, 0); s2.rotation.set(0, 0, 0.12); group.add(s2);
  
  const g = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.008, 16, 64), createMat("#e87c20", 0.5, 0.3, "#e87c20", 0.6));
  g.position.set(0, 0.05, 0); g.rotation.set(Math.PI / 2, 0, 0); group.add(g);
  
  return { group, update: (t: number) => { group.rotation.y = Math.sin(t * 0.3) * 0.2; } };
}

function buildForceps() {
  const group = new THREE.Group();
  
  const j1 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.8, 0.03), createMat("#d4d4d4", 0.95, 0.04));
  j1.position.set(0.015, 1.2, 0); j1.rotation.set(0, 0, 0.03); group.add(j1);
  
  const j2 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.8, 0.03), createMat("#d4d4d4", 0.95, 0.04));
  j2.position.set(-0.015, 1.2, 0); j2.rotation.set(0, 0, -0.03); group.add(j2);
  
  for (let i = 0; i < 8; i++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.003, 0.002), createMat("#aaa", 0.8, 0.2));
    s.position.set(0, 0.85 + i * 0.08, 0.018); group.add(s);
  }
  
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 16), createMat("#c0c0c0", 0.9, 0.1));
  sh.position.set(0, 0.1, 0); group.add(sh);
  
  const rg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.8, 16), createMat("#b0b0b0", 0.85, 0.15));
  rg.position.set(0, -0.9, 0); group.add(rg);
  
  for (let i = 0; i < 10; i++) {
    const g = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.004, 8, 32), createMat("#999", 0.8, 0.2));
    g.position.set(0, -0.6 + i * 0.06, 0); group.add(g);
  }
  
  return { group, update: (t: number) => { group.rotation.y = Math.sin(t * 0.25) * 0.25; } };
}

function buildNeedleHolder() {
  const group = new THREE.Group();
  
  const j1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, 0.06), createMat("#ccc", 0.95, 0.05));
  j1.position.set(0.02, 0.6, 0); j1.rotation.set(0, 0, 0.06); group.add(j1);
  const j2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, 0.06), createMat("#ccc", 0.95, 0.05));
  j2.position.set(-0.02, 0.6, 0); j2.rotation.set(0, 0, -0.06); group.add(j2);
  
  const tc = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.15, 0.055), createMat("#c8a84e", 0.8, 0.2));
  tc.position.set(0, 0.75, 0); group.add(tc);
  
  const pv = new THREE.Mesh(new THREE.SphereGeometry(0.06, 32, 32), createMat("#b0b0b0", 0.9, 0.1));
  pv.position.set(0, 0.3, 0); group.add(pv);
  
  const sh1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 1.2, 16), createMat("#c0c0c0", 0.9, 0.1));
  sh1.position.set(0.04, -0.3, 0); sh1.rotation.set(0, 0, -0.05); group.add(sh1);
  
  const sh2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 1.2, 16), createMat("#c0c0c0", 0.9, 0.1));
  sh2.position.set(-0.04, -0.3, 0); sh2.rotation.set(0, 0, 0.05); group.add(sh2);
  
  const rh1 = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 16, 32), createMat("#b0b0b0", 0.9, 0.1));
  rh1.position.set(0.12, -0.9, 0); rh1.rotation.set(Math.PI / 2, 0, 0); group.add(rh1);
  
  const rh2 = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 16, 32), createMat("#b0b0b0", 0.9, 0.1));
  rh2.position.set(-0.12, -0.9, 0); rh2.rotation.set(Math.PI / 2, 0, 0); group.add(rh2);
  
  for (let i = 0; i < 4; i++) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.015, 0.01), createMat("#999", 0.9, 0.15));
    t.position.set(0.03, -0.75 + i * 0.04, 0); group.add(t);
  }
  
  return { group, update: (t: number) => { group.rotation.y = Math.sin(t * 0.3) * 0.3; } };
}

const instruments = [
  { name: "Surgical Scissors", build: buildScissors },
  { name: "Tissue Forceps", build: buildForceps },
  { name: "Needle Holder", build: buildNeedleHolder },
];

const InstrumentViewer3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minPolarAngle = Math.PI / 3;
    controls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe87c20, 0.8);
    dirLight2.position.set(-3, 3, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xe87c20, 1.2);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // Active Model Wrapper for "Float" effect emulation
    const floatGroup = new THREE.Group();
    scene.add(floatGroup);

    // Load active instrument
    const currentInstrument = instruments[activeIdx].build();
    floatGroup.add(currentInstrument.group);

    // Animation Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      controls.update();

      // Emulate Float component (math.sin floating)
      floatGroup.position.y = Math.sin(t * 1.5) * 0.1;
      floatGroup.rotation.x = Math.sin(t * 1.5) * 0.1;
      floatGroup.rotation.z = Math.cos(t * 1.5) * 0.1;

      // Update inner model animation
      currentInstrument.update(t);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeIdx]); // Re-initialize when instrument changes for simplicity

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />
      
      {/* Three.js Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 bg-transparent" />

      {/* Instrument selector */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-3 w-full max-w-full overflow-x-auto px-4">
        {instruments.map((inst, i) => (
          <button
            key={inst.name}
            onClick={() => setActiveIdx(i)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex-shrink-0 ${
              i === activeIdx
                ? "bg-primary text-primary-foreground"
                : "bg-foreground/5 text-muted-foreground hover:text-foreground border border-border/20"
            }`}
          >
            {inst.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function InstrumentViewer3DWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-muted/20 rounded-lg animate-pulse" />
    );
  }

  return <InstrumentViewer3D />;
}
