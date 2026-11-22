import { Suspense, useEffect, useMemo, useRef, type ElementRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, useProgress } from '@react-three/drei';
import { PMREMGenerator, Vector3 } from 'three';
import type { Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { HOTSPOTS, HOME_VIEW, type Hotspot } from '../data/hotspots';

const MODEL_URL = '/models/fleetgo-truck.glb';

/** Soft studio reflections generated on the GPU, so no HDR file has to be downloaded. */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Truck() {
  const gltf = useLoader(GLTFLoader, MODEL_URL, (loader) => {
    (loader as GLTFLoader).setMeshoptDecoder(MeshoptDecoder);
  });
  return <primitive object={gltf.scene as Object3D} />;
}

function Markers({ activeId, onSelect }: { activeId: string; onSelect: (h: Hotspot) => void }) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const facing = useMemo(
    () =>
      Object.fromEntries(
        HOTSPOTS.map((h) => [
          h.id,
          { at: new Vector3(...h.position), dir: new Vector3(...h.camera).sub(new Vector3(...h.position)).normalize() },
        ])
      ),
    []
  );
  const toCam = useMemo(() => new Vector3(), []);

  // Fade out markers on the far side of the truck instead of raycasting the whole model.
  useFrame(({ camera }) => {
    for (const h of HOTSPOTS) {
      const el = refs.current[h.id];
      if (!el) continue;
      const f = facing[h.id];
      const visible = toCam.copy(camera.position).sub(f.at).normalize().dot(f.dir) > 0.05;
      el.style.opacity = visible ? '1' : '0';
      el.style.pointerEvents = visible ? 'auto' : 'none';
    }
  });

  return (
    <>
      {HOTSPOTS.map((h) => {
        const isActive = h.id === activeId;
        return (
          <Html key={h.id} position={h.position} center zIndexRange={[20, 0]}>
            <div ref={(el) => (refs.current[h.id] = el)} className="transition-opacity duration-300">
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
                {isActive && <span className="absolute inset-0 rounded-full bg-[#c8970d] animate-ping opacity-40" />}
                <span className={`relative block w-2 h-2 rounded-full ${isActive ? 'bg-[#0b1829]' : 'bg-[#c8970d]'}`} />
              </button>
            </div>
          </Html>
        );
      })}
    </>
  );
}

/** Flies the camera to a hotspot (or the opening shot) and idles with a slow turntable. */
function CameraRig({ focusId, flight }: { focusId: string; flight: number }) {
  const controls = useRef<ElementRef<typeof OrbitControls>>(null);
  const goal = useRef<{ pos: Vector3; target: Vector3 } | null>(null);
  const touched = useRef(false);
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const { camera, size } = useThree();
  // Narrow (phone) viewports pull the camera back so the whole tractor stays in frame.
  const fit = Math.max(1, 1.3 / (size.width / size.height));
  const framed = (pos: [number, number, number], target: [number, number, number]) => {
    const t = new Vector3(...target);
    return { pos: new Vector3(...pos).sub(t).multiplyScalar(fit).add(t), target: t };
  };

  useEffect(() => {
    camera.position.copy(framed(HOME_VIEW.camera, HOME_VIEW.target).pos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fit]);

  useEffect(() => {
    if (flight === 0) return; // keep the opening shot until the visitor asks for something
    touched.current = true;
    const h = HOTSPOTS.find((x) => x.id === focusId);
    const next = h ? framed(h.camera, h.position) : framed(HOME_VIEW.camera, HOME_VIEW.target);
    if (reduceMotion && controls.current) {
      camera.position.copy(next.pos);
      controls.current.target.copy(next.target);
      controls.current.update();
    } else {
      goal.current = next;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flight, focusId, camera, reduceMotion]);

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c) return;
    c.autoRotate = !touched.current && !reduceMotion;
    const g = goal.current;
    if (!g) return;
    const k = 1 - Math.exp(-delta * 3.2);
    camera.position.lerp(g.pos, k);
    c.target.lerp(g.target, k);
    c.update();
    if (camera.position.distanceTo(g.pos) < 0.02 && c.target.distanceTo(g.target) < 0.02) goal.current = null;
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={HOME_VIEW.target}
      enablePan={false}
      enableDamping
      autoRotateSpeed={0.55}
      minDistance={4}
      maxDistance={22}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2.05}
      onStart={() => {
        // The visitor took the wheel: stop any flight and the idle turntable.
        goal.current = null;
        touched.current = true;
      }}
    />
  );
}

function LoadingOverlay() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none">
      <div className="text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600 mb-3">
          Loading 3D truck · {Math.round(progress)}%
        </div>
        <div className="w-40 h-0.5 bg-slate-300 mx-auto">
          <div className="h-full bg-[#c8970d] transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function TruckScene({
  activeId,
  focusId,
  flight,
  running,
  onSelect,
}: {
  activeId: string;
  focusId: string;
  flight: number;
  running: boolean;
  onSelect: (h: Hotspot) => void;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop={running ? 'always' : 'never'}
        camera={{ position: HOME_VIEW.camera, fov: 34, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <StudioEnvironment />
        <hemisphereLight args={['#ffffff', '#3b4a5e', 0.35]} />
        <directionalLight position={[6, 10, -5]} intensity={1.4} />

        <group>
          <Suspense fallback={null}>
            <Truck />
            <ContactShadows position={[0, 0.005, 0]} opacity={0.55} scale={15} blur={2.4} far={3.5} frames={1} resolution={512} />
            <Markers activeId={activeId} onSelect={onSelect} />
          </Suspense>
        </group>

        <CameraRig focusId={focusId} flight={flight} />
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}
