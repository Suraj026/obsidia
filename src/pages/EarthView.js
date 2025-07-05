// src/pages/EarthView.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function EarthView() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas>
        {/* Environment */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Stars in background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        {/* Earth Sphere */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial color="blue" wireframe={false} />
        </mesh>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
