import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  return (
    <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        map={new THREE.TextureLoader().load(
          "https://threejsfundamentals.org/threejs/resources/images/earth.jpg"
        )}
        bumpMap={new THREE.TextureLoader().load(
          "https://threejsfundamentals.org/threejs/resources/images/earthbump1k.jpg"
        )}
        bumpScale={0.05}
      />
    </Sphere>
  );
}

export default function EarthBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Earth />
      </Canvas>
    </div>
  );
}
