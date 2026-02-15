import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

type ShapeType = 'cube' | 'box' | 'cylinder' | 'sphere' | 'cone' | 'pyramid';

interface Shape3DViewerProps {
  shape: ShapeType;
}

function ShapeMesh({ shape }: { shape: ShapeType }) {
  return (
    <mesh rotation={[0.4, 0.5, 0]}>
      {shape === 'cube' && <boxGeometry args={[1, 1, 1]} />}
      {shape === 'box' && <boxGeometry args={[1.2, 0.8, 1]} />}
      {shape === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
      {shape === 'sphere' && <sphereGeometry args={[0.6, 32, 32]} />}
      {shape === 'cone' && <coneGeometry args={[0.5, 1, 32]} />}
      {shape === 'pyramid' && <coneGeometry args={[0.6, 1, 4]} />}
      <meshStandardMaterial color="#7c3aed" metalness={0.2} roughness={0.6} />
    </mesh>
  );
}

function Scene({ shape }: { shape: ShapeType }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -3, 2]} intensity={0.4} />
      <ShapeMesh shape={shape} />
      <OrbitControls enableZoom={false} />
    </>
  );
}

export function Shape3DViewer({ shape }: Shape3DViewerProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
      style={{ aspectRatio: '1' }}
      role="img"
      aria-label={`3D ${shape} shape`}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [2, 2, 2], fov: 50 }}
          frameloop="always"
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene shape={shape} />
          </Suspense>
        </Canvas>
      </div>
      <p className="absolute bottom-1 left-0 right-0 text-xs text-gray-500 text-center pointer-events-none">Drag to rotate</p>
    </div>
  );
}
