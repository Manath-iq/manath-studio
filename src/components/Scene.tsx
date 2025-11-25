import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
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
        gl={{ antialias: true, alpha: false }} // alpha false for pure black background optimization
      >
        <color attach="background" args={['#000000']} />
        
        {/* High intensity lights for white appearance */}
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -10, 10]} intensity={2} color="#ffffff" />
        
        <Asterisk scroll={scrollRef} />
        
        {/* Studio lighting environment for reflections */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};