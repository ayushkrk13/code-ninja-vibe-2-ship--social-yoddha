import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Ring } from '@react-three/drei';
import * as THREE from 'three';

function HeroCharacter() {
  const meshRef = useRef();
  // Using a placeholder image so you can see the animation. 
  // Replace with '/hero.png' when you have the local file.
  const [texture] = useTexture(['https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=400&q=80']);
  const [pulseScale, setPulseScale] = useState(0);

  // Entrance animation logic
  const [xPos, setXPos] = useState(-15);
  const targetX = 0;

  useFrame((state, delta) => {
    // Spring animation for entrance
    if (xPos < targetX) {
      setXPos((prev) => THREE.MathUtils.lerp(prev, targetX, delta * 2));
    }
    
    if (meshRef.current) {
      meshRef.current.position.x = xPos;
      // Slight floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    // Pulse ring animation
    if (xPos >= targetX - 0.5) {
      setPulseScale((prev) => (prev > 3 ? 0 : prev + delta * 3));
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[xPos, 0, 0]}>
        <planeGeometry args={[4, 8]} />
        <meshStandardMaterial map={texture} transparent alphaTest={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Energy Pulse Ring */}
      <Ring args={[1, 1.2, 32]} position={[xPos, -3.8, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[pulseScale, pulseScale, pulseScale]}>
        <meshBasicMaterial color="#1D9E75" transparent opacity={Math.max(0, 1 - pulseScale/3)} />
      </Ring>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-screen absolute inset-0 z-0 bg-background overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#E85D04" />
        <pointLight position={[-10, 5, 5]} intensity={0.8} color="#1D9E75" />
        
        <React.Suspense fallback={null}>
          <HeroCharacter />
          <Environment preset="city" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
