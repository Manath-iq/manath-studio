import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { Asterisk } from './Asterisk';

interface SceneProps {
  scrollRef: React.MutableRefObject<number>;
}

export const Scene: React.FC<SceneProps> = ({ scrollRef }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: false, alpha: false, stencil: false, depth: true }} // optimizations for postprocessing
      >
        <color attach="background" args={['#000000']} />

        {/* High intensity lights for white appearance */}
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -10, 10]} intensity={2} color="#ffffff" />

        <Asterisk scroll={scrollRef} />

        {/* Studio lighting environment for reflections */}
        <Environment preset="studio" />

        {/* Post Processing */}
        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.6} />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};