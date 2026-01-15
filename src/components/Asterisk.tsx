import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import type { AsteriskProps } from '../types';

const Bar = ({ rotation }: { rotation: [number, number, number] }) => (
  <mesh rotation={rotation}>
    {/* Thicker bars for better overlap visibility, slightly reduced thickness */}
    <boxGeometry args={[1.1, 5, 1.1]} />
    <meshStandardMaterial
      color="#ffffff"
      roughness={0.2}
      metalness={0.1}
      emissive="#ffffff" // Max emissive for Bloom
      emissiveIntensity={1.0}
    />
  </mesh>
);

export const Asterisk: React.FC<AsteriskProps> = ({ scroll }) => {
  const groupRef = useRef<Group>(null);
  const { viewport, mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    const scrollProgress = scroll.current; // 0 (top) to 1 (bottom)
    const time = state.clock.getElapsedTime();

    // 1. Rotation Animation - smooth continuous rotation
    groupRef.current.rotation.x = time * 0.3 + scrollProgress * Math.PI * 2;
    groupRef.current.rotation.y = time * 0.4 + scrollProgress * Math.PI * 2;
    // Add a bit of wobble
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.2;

    // 2. Position Animation (Trajectory path)

    // Start position (Hero): Center-Right, behind "Creativity Studio"
    // The text is on the left/center, so we put the object slightly to the right so it can move Left.
    const startX = viewport.width * 0.15;
    const startY = 0;
    const startZ = 0;

    // Middle position (The Joke): Dead Center to hit the text
    const midX = 0;
    const midY = -viewport.height * 0.1;
    const midZ = 3; // Closer to camera for impact

    // End position (Footer): Behind @manath
    const endX = 0;
    const endY = 0;
    const endZ = 1;

    // Interpolate positions smoothly
    if (scrollProgress < 0.5) {
      // First half: Hero -> Joke
      const t = scrollProgress * 2; // 0 to 1
      // Use smoothstep for nicer easing
      const easeT = t * t * (3 - 2 * t);

      groupRef.current.position.x = MathUtils.lerp(startX, midX, easeT);
      groupRef.current.position.y = MathUtils.lerp(startY, midY, easeT);
      groupRef.current.position.z = MathUtils.lerp(startZ, midZ, easeT);
    } else {
      // Second half: Joke -> Footer
      const t = (scrollProgress - 0.5) * 2; // 0 to 1
      const easeT = t * t * (3 - 2 * t);

      groupRef.current.position.x = MathUtils.lerp(midX, endX, easeT);
      groupRef.current.position.y = MathUtils.lerp(midY, endY, easeT);
      groupRef.current.position.z = MathUtils.lerp(midZ, endZ, easeT);
    }

    // 3. Floating effect (sine wave)
    groupRef.current.position.y += Math.sin(time * 1.2) * 0.2;
    // Add some horizontal drift
    groupRef.current.position.x += Math.cos(time * 0.8) * 0.1;

    // 4. Mouse Follow (Parallax) - Subtle
    // We use MathUtils.lerp to smooth out the mouse movement
    // mouse.x/y are normalized coordinates (-1 to 1)
    const mouseX = mouse.x * viewport.width * 0.05;
    const mouseY = mouse.y * viewport.height * 0.05;

    groupRef.current.position.x += mouseX;
    groupRef.current.position.y += mouseY;

    // 5. Breathing scale
    const breathingScale = 0.9 + Math.sin(time * 2) * 0.03;
    groupRef.current.scale.set(breathingScale, breathingScale, breathingScale);

  });

  return (
    // Initial scale handled in useFrame
    <group ref={groupRef}>
      <Bar rotation={[0, 0, 0]} />
      <Bar rotation={[0, 0, Math.PI / 3]} />
      <Bar rotation={[0, 0, -Math.PI / 3]} />
    </group>
  );
};