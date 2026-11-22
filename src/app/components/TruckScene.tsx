import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, RoundedBox } from '@react-three/drei';
import type { Group } from 'three';
import { HOTSPOTS, type Hotspot } from '../data/hotspots';

const GOLD = '#c8970d';
const NAVY = '#0b1829';
const WHITE = '#eef2f6';
const TIRE = '#111418';
const CHROME = '#d4dce4';
const GLASS = '#3d6489';

const paint = { color: WHITE, metalness: 0.35, roughness: 0.28 };
const chrome = { color: CHROME, metalness: 1, roughness: 0.18 };

function Wheel({ position, mirror = false }: { position: [number, number, number]; mirror?: boolean }) {
  const face = mirror ? -0.17 : 0.17;
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.47, 0.47, 0.32, 36]} />
        <meshStandardMaterial color={TIRE} roughness={0.95} />
      </mesh>
      {/* Polished rim */}
      <mesh position={[0, 0, face]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      {/* Hub */}
      <mesh position={[0, 0, face * 1.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.08, 16]} />
        <meshStandardMaterial color="#8a96a3" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Truck({
  hoodOpen,
  activeId,
  onSelect,
}: {
  hoodOpen: boolean;
  activeId: string | null;
  onSelect: (h: Hotspot) => void;
}) {
  const root = useRef<Group>(null);
  const hood = useRef<Group>(null);

  useFrame((_, delta) => {
    // Idle turntable; holds still while the hood is up so the engine stays in view.
    if (root.current && !hoodOpen) root.current.rotation.y += delta * 0.12;
    if (hood.current) {
      const target = hoodOpen ? -1.15 : 0;
      hood.current.rotation.z += (target - hood.current.rotation.z) * Math.min(1, delta * 4);
    }
  });

  return (
    <group ref={root} position={[0, -0.75, 0]}>
      {/* Frame rails */}
      {[-0.55, 0.55].map((z) => (
        <mesh key={z} position={[-0.2, 0.68, z]} castShadow>
          <boxGeometry args={[7.2, 0.24, 0.16]} />
          <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.5} />
        </mesh>
      ))}

      {/* Day cab */}
      <RoundedBox args={[1.75, 2.0, 2.3]} radius={0.16} smoothness={4} position={[0.62, 2.0, 0]} castShadow>
        <meshStandardMaterial {...paint} />
      </RoundedBox>
      {/* Raised sleeper */}
      <RoundedBox args={[1.55, 2.6, 2.3]} radius={0.16} smoothness={4} position={[-0.95, 2.3, 0]} castShadow>
        <meshStandardMaterial {...paint} />
      </RoundedBox>
      {/* Roof fairing, sweeping from cab roof up to the sleeper */}
      <RoundedBox
        args={[1.7, 0.36, 2.26]}
        radius={0.14}
        smoothness={4}
        position={[0.62, 3.18, 0]}
        rotation={[0, 0, 0.17]}
        castShadow
      >
        <meshStandardMaterial {...paint} />
      </RoundedBox>

      {/* Raked windshield */}
      <mesh position={[1.5, 2.45, 0]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[0.06, 0.95, 2.08]} />
        <meshStandardMaterial color={GLASS} metalness={0.25} roughness={0.08} emissive="#16304d" emissiveIntensity={0.35} />
      </mesh>
      {/* Door windows */}
      {[-1.16, 1.16].map((z) => (
        <mesh key={z} position={[0.75, 2.42, z]}>
          <boxGeometry args={[1.0, 0.7, 0.02]} />
          <meshStandardMaterial color={GLASS} metalness={0.25} roughness={0.08} emissive="#16304d" emissiveIntensity={0.35} />
        </mesh>
      ))}
      {/* Sleeper bunk windows */}
      {[-1.16, 1.16].map((z) => (
        <mesh key={z} position={[-1.15, 2.9, z]}>
          <boxGeometry args={[0.6, 0.32, 0.02]} />
          <meshStandardMaterial color={GLASS} metalness={0.25} roughness={0.08} emissive="#16304d" emissiveIntensity={0.35} />
        </mesh>
      ))}

      {/* Brand stripes — navy band with a gold pinstripe */}
      {[-1.161, 1.161].map((z) => (
        <group key={z}>
          <mesh position={[-0.2, 1.55, z]}>
            <boxGeometry args={[3.3, 0.34, 0.01]} />
            <meshStandardMaterial color={NAVY} metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh position={[-0.2, 1.78, z]}>
            <boxGeometry args={[3.3, 0.06, 0.01]} />
            <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Mirrors */}
      {[-1.42, 1.42].map((z) => (
        <group key={z} position={[1.55, 2.35, z]}>
          <mesh position={[0, 0, z > 0 ? -0.12 : 0.12]}>
            <boxGeometry args={[0.04, 0.04, 0.24]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.1, 0.5, 0.16]} />
            <meshStandardMaterial color={NAVY} metalness={0.4} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Engine, revealed when the hood tilts forward */}
      <group position={[2.4, 1.18, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.45, 0.72, 1.3]} />
          <meshStandardMaterial color="#2b323d" metalness={0.8} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.44, 0]}>
          <boxGeometry args={[1.25, 0.16, 0.75]} />
          <meshStandardMaterial color={GOLD} metalness={0.75} roughness={0.3} />
        </mesh>
        {[-0.45, -0.15, 0.15, 0.45].map((x) => (
          <mesh key={x} position={[x, 0.56, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.1, 12]} />
            <meshStandardMaterial color="#9aa6b2" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
        {/* Turbo */}
        <mesh position={[-0.45, 0.12, 0.72]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.24, 20]} />
          <meshStandardMaterial color="#5b6672" metalness={0.9} roughness={0.35} />
        </mesh>
      </group>

      {/* Forward-tilting hood, hinged at the bumper like a real conventional */}
      <group ref={hood} position={[3.45, 0.98, 0]}>
        <RoundedBox args={[2.0, 1.0, 2.2]} radius={0.22} smoothness={4} position={[-1.0, 0.5, 0]} castShadow>
          <meshStandardMaterial {...paint} />
        </RoundedBox>
        {/* Chrome grille */}
        <RoundedBox args={[0.12, 0.85, 1.25]} radius={0.04} smoothness={3} position={[0.02, 0.48, 0]}>
          <meshStandardMaterial {...chrome} />
        </RoundedBox>
        {[-0.22, 0, 0.22].map((y) => (
          <mesh key={y} position={[0.09, 0.48 + y, 0]}>
            <boxGeometry args={[0.02, 0.05, 1.15]} />
            <meshStandardMaterial color={NAVY} />
          </mesh>
        ))}
        {/* Swept headlamps */}
        {[-0.82, 0.82].map((z) => (
          <mesh key={z} position={[-0.05, 0.22, z]} rotation={[0, z > 0 ? -0.35 : 0.35, 0]}>
            <boxGeometry args={[0.12, 0.2, 0.46]} />
            <meshStandardMaterial color="#fff4d6" emissive="#ffd98a" emissiveIntensity={1.1} />
          </mesh>
        ))}
      </group>

      {/* Bumper */}
      <RoundedBox args={[0.26, 0.4, 2.35]} radius={0.08} smoothness={3} position={[3.55, 0.72, 0]}>
        <meshStandardMaterial {...chrome} />
      </RoundedBox>

      {/* Exhaust stacks behind the cab */}
      {[-1.02, 1.02].map((z) => (
        <mesh key={z} position={[-1.85, 2.4, z]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 3.0, 18]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
      ))}

      {/* Fuel tanks with straps */}
      {[-1.22, 1.22].map((z) => (
        <group key={z} position={[-0.15, 0.9, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 1.55, 28]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
          {[-0.45, 0.45].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.395, 0.395, 0.05, 28]} />
              <meshStandardMaterial color={NAVY} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Fifth wheel */}
      <mesh position={[-2.45, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.62, 0.12, 28]} />
        <meshStandardMaterial color="#3a4452" metalness={0.75} roughness={0.45} />
      </mesh>

      {/* Mud flaps */}
      {[-1.15, 1.15].map((z) => (
        <mesh key={z} position={[-3.55, 0.55, z]}>
          <boxGeometry args={[0.04, 0.7, 0.5]} />
          <meshStandardMaterial color={NAVY} roughness={0.9} />
        </mesh>
      ))}

      {/* Steer axle + tandem drive axles */}
      <Wheel position={[2.6, 0.47, 1.18]} />
      <Wheel position={[2.6, 0.47, -1.18]} mirror />
      <Wheel position={[-2.0, 0.47, 1.2]} />
      <Wheel position={[-2.0, 0.47, -1.2]} mirror />
      <Wheel position={[-2.95, 0.47, 1.2]} />
      <Wheel position={[-2.95, 0.47, -1.2]} mirror />

      {/* Inspection hotspots */}
      {HOTSPOTS.map((h) => {
        const isActive = h.id === activeId;
        return (
          <Html key={h.id} position={h.position} center distanceFactor={9} zIndexRange={[20, 0]}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(h);
              }}
              aria-label={h.label}
              className={`relative flex items-center justify-center rounded-full border-2 transition-all ${
                isActive
                  ? 'w-7 h-7 bg-[#c8970d] border-white shadow-[0_0_18px_rgba(200,151,13,0.8)]'
                  : 'w-6 h-6 bg-[#0b1829] border-[#c8970d] hover:scale-110'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-[#c8970d] animate-ping opacity-40" />
              )}
              <span className={`relative block w-2 h-2 rounded-full ${isActive ? 'bg-[#0b1829]' : 'bg-[#c8970d]'}`} />
            </button>
          </Html>
        );
      })}
    </group>
  );
}

export default function TruckScene({
  hoodOpen,
  activeId,
  onSelect,
}: {
  hoodOpen: boolean;
  activeId: string | null;
  onSelect: (h: Hotspot) => void;
}) {
  return (
    <Canvas shadows camera={{ position: [8.2, 4.2, 8.6], fov: 36 }} dpr={[1, 1.8]}>
      <color attach="background" args={['#060e1a']} />
      <fog attach="fog" args={['#060e1a', 16, 30]} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={['#dce8f5', '#0b1829', 0.85]} />
      <directionalLight position={[7, 10, 6]} intensity={2.1} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-7, 5, -6]} intensity={0.9} color={GOLD} />
      <pointLight position={[4, 2, 0]} intensity={6} distance={6} color="#ffd98a" />

      <Truck hoodOpen={hoodOpen} activeId={activeId} onSelect={onSelect} />

      {/* Stage */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.76, 0]} receiveShadow>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#0d1a2b" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.755, 0]}>
        <ringGeometry args={[6.9, 7, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.45} />
      </mesh>
      <ContactShadows position={[0, -0.74, 0]} opacity={0.65} scale={16} blur={2.2} far={4} />

      <OrbitControls
        enablePan={false}
        minDistance={7}
        maxDistance={16}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
