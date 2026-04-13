"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Cloud() {
  const ref = useRef<any>();
  const points = useMemo(() => {
    const p = new Float32Array(1500);
    for (let i = 0; i < 1500; i++) {
      p[i] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a5f3fc"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function InteractiveSystem({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const lightRef = useRef<any>();
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (!mousePosition || !lightRef.current || !groupRef.current) return;
    
    const nx = (mousePosition.x / window.innerWidth) * 2 - 1;
    const ny = -(mousePosition.y / window.innerHeight) * 2 + 1;

    const x = (nx * state.viewport.width) / 2;
    const y = (ny * state.viewport.height) / 2;
    
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.3);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.3);
      lightRef.current.position.z = 2;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (nx * Math.PI) / 6, 0.25);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-ny * Math.PI) / 6, 0.25);
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} intensity={15} color="#2dd4bf" distance={20} />
      <Cloud />
    </group>
  );
}

export default function HeroScene({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (hasWebGL === false) {
    return (
      <div className="w-full h-full relative overflow-hidden pointer-events-none opacity-90 bg-[#02040a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/40 to-[#02040a]" />
      </div>
    );
  }

  // Still checking or has WebGL
  return (
    <div className="w-full h-full relative overflow-hidden pointer-events-none opacity-90">
      {hasWebGL && (
        <Canvas camera={{ position: [0, 0, 3], fov: 75 }} onCreated={({ gl }) => {
          if (!gl) setHasWebGL(false);
        }} onError={() => setHasWebGL(false)}>
          <ambientLight intensity={2.5} />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#38bdf8" />
          <InteractiveSystem mousePosition={mousePosition} />
        </Canvas>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/40 to-[#02040a]" />
    </div>
  );
}
