import { Float, useGLTF } from '@react-three/drei';
import { useRef, memo } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { ThreeObjectProps } from '../types/shared';

// TODO: make all floating components reusable through target
const Target: React.FC<ThreeObjectProps> = ({...props}) => {
  const groupRef = useRef<Mesh>(null!);
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf',
  );

  useFrame((state) => {
    if (groupRef.current) {
      const elapsedTime = state.clock.getElapsedTime();
      const amplitude = 0.01; 
      
      groupRef.current.position.y += amplitude * Math.sin(elapsedTime);
    }
  });

  return (
    <Float>
    <mesh {...props} ref={groupRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
    </Float>
  );
};

export default memo(Target);