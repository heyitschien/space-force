import { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useCursor, Html } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { CelestialId } from '../../data/planetFacts';

interface SolarSystem3DProps {
  onPlanetSelect: (id: CelestialId) => void;
  selectedId: CelestialId | null;
  fullScreen?: boolean;
  showLabels?: boolean;
}

const ORBIT_RADII: Record<string, number> = {
  mercury: 2.5,
  venus: 3.5,
  earth: 4.5,
  mars: 5.5,
  'asteroid-belt': 7,
  jupiter: 9,
  saturn: 11.5,
  uranus: 14,
  neptune: 16,
};

const PLANET_COLORS: Record<string, string> = {
  sun: '#fbbf24',
  mercury: '#9ca3af',
  venus: '#fcd34d',
  earth: '#3b82f6',
  mars: '#ef4444',
  jupiter: '#f59e0b',
  saturn: '#eab308',
  uranus: '#22d3ee',
  neptune: '#6366f1',
};

function Sun({ showLabel }: { showLabel?: boolean }) {
  return (
    <group>
      {showLabel && (
        <Html
          center
          distanceFactor={6}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            fontWeight: 700,
            color: '#fef3c7',
            textShadow: '0 0 6px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1)',
          }}
        >
          <span>Sun</span>
        </Html>
      )}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

function PlanetOrbit({ radius, color = '#334155' }: { radius: number; color?: string }) {
  const line = useMemo(() => {
    const points = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    const geometry = new THREE.BufferGeometry().setFromPoints(points.getPoints(64));
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
    return new THREE.Line(geometry, material);
  }, [radius, color]);
  return <primitive object={line} />;
}

function Planet({
  name,
  radius,
  size,
  color,
  hasRings,
  onSelect,
  isSelected,
  showLabel,
}: {
  name: string;
  radius: number;
  size: number;
  color: string;
  hasRings?: boolean;
  onSelect: () => void;
  isSelected: boolean;
  showLabel?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer');

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * 0.15 + radius * 0.5;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <>
      <PlanetOrbit radius={radius} />
      <group ref={groupRef}>
        {showLabel && (
          <Html
            center
            distanceFactor={8}
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              fontSize: '12px',
              fontWeight: 600,
              color: 'white',
              textShadow: '0 0 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)',
            }}
          >
            <span>{name}</span>
          </Html>
        )}
        <mesh
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={isSelected ? 1.3 : hovered ? 1.15 : 1}
        >
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={isSelected ? color : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : 0}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        {hasRings && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2, 32]} />
            <meshBasicMaterial color="#d4d4d8" side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    </>
  );
}

function AsteroidBelt({ onSelect, showLabel }: { onSelect: () => void; showLabel?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = ORBIT_RADII['asteroid-belt'];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  const asteroids = Array.from({ length: 80 }, (_, i) => {
    const u0 = ((i * 7919) % 1000) / 1000;
    const u1 = ((i * 4243) % 1000) / 1000;
    return {
      angle: (i / 80) * Math.PI * 2 + i * 0.3,
      dist: radius + (u0 - 0.5) * 1.5,
      size: 0.03 + u1 * 0.04,
    };
  });

  return (
    <>
      {showLabel && (
        <group position={[radius, 0.3, 0]}>
          <Html
            center
            distanceFactor={6}
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              fontSize: '11px',
              fontWeight: 600,
              color: '#c4b5fd',
              textShadow: '0 0 4px rgba(0,0,0,0.8)',
            }}
          >
            <span>Asteroid Belt</span>
          </Html>
        </group>
      )}
    <group ref={groupRef}>
      <PlanetOrbit radius={radius} color="#7c3aed" />
      {asteroids.map((a, i) => (
        <mesh
          key={i}
          position={[Math.cos(a.angle) * a.dist, 0, Math.sin(a.angle) * a.dist]}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[a.size, 8, 8]} />
          <meshStandardMaterial color="#a78bfa" />
        </mesh>
      ))}
    </group>
    </>
  );
}

const PLANET_NAMES: Record<string, string> = {
  mercury: 'Mercury',
  venus: 'Venus',
  earth: 'Earth',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturn',
  uranus: 'Uranus',
  neptune: 'Neptune',
};

function Scene({ onPlanetSelect, selectedId, showLabels = false }: SolarSystem3DProps) {
  const planets = [
    { id: 'mercury', radius: ORBIT_RADII.mercury, size: 0.12, hasRings: false },
    { id: 'venus', radius: ORBIT_RADII.venus, size: 0.18, hasRings: false },
    { id: 'earth', radius: ORBIT_RADII.earth, size: 0.2, hasRings: false },
    { id: 'mars', radius: ORBIT_RADII.mars, size: 0.15, hasRings: false },
    { id: 'jupiter', radius: ORBIT_RADII.jupiter, size: 0.45, hasRings: true },
    { id: 'saturn', radius: ORBIT_RADII.saturn, size: 0.38, hasRings: true },
    { id: 'uranus', radius: ORBIT_RADII.uranus, size: 0.25, hasRings: true },
    { id: 'neptune', radius: ORBIT_RADII.neptune, size: 0.24, hasRings: true },
  ];

  return (
    <>
      <color attach="background" args={['#0a0a12']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fef3c7" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Sun showLabel={showLabels} />
      {planets.map((p) => (
        <Planet
          key={p.id}
          name={PLANET_NAMES[p.id] ?? p.id}
          radius={p.radius}
          size={p.size}
          color={PLANET_COLORS[p.id] ?? '#94a3b8'}
          hasRings={p.hasRings}
          onSelect={() => onPlanetSelect(p.id as CelestialId)}
          isSelected={selectedId === p.id}
          showLabel={showLabels}
        />
      ))}
      <AsteroidBelt onSelect={() => onPlanetSelect('asteroid-belt')} showLabel={showLabels} />
      <OrbitControls
        enableZoom
        enablePan
        minDistance={5}
        maxDistance={35}
        maxPolarAngle={Math.PI / 2 + 0.2}
      />
    </>
  );
}

export function SolarSystem3D({
  onPlanetSelect,
  selectedId,
  fullScreen = false,
  showLabels = false,
}: SolarSystem3DProps) {
  return (
    <div
      className={`relative min-h-0 max-w-full touch-pan-y overflow-hidden bg-slate-950 ${fullScreen ? 'h-full w-full' : 'max-h-[min(70vh,520px)] w-full rounded-xl border border-slate-700 sm:max-h-none'}`}
      style={
        fullScreen
          ? undefined
          : {
              aspectRatio: '16/9',
              minHeight: 280,
            }
      }
      role="img"
      aria-label="Interactive 3D solar system"
    >
      <div className="absolute inset-0 min-h-0 min-w-0 max-w-full">
        <Canvas
          className="!h-full !w-full max-w-full touch-none"
          camera={{ position: [0, 12, 18], fov: 50 }}
          frameloop="always"
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene
              onPlanetSelect={onPlanetSelect}
              selectedId={selectedId}
              showLabels={showLabels}
            />
          </Suspense>
        </Canvas>
      </div>
      {!fullScreen && (
        <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-slate-400 pointer-events-none">
          Drag to rotate · Scroll to zoom · Click a planet for ASVAB facts
        </p>
      )}
    </div>
  );
}
