"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  coreFragment,
  coreVertex,
} from "@/components/three/shaders/signalCore";

/* -------------------------------------------------------------------------- */
/*  Shared pointer state (normalised -1 → 1)                                   */
/* -------------------------------------------------------------------------- */

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}

/* -------------------------------------------------------------------------- */
/*  Core: custom-shader icosahedron + wireframe shell                           */
/* -------------------------------------------------------------------------- */

function SignalCore({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const shell = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 1 },
      uPulse: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#d9ff3f") },
      uColorB: { value: new THREE.Color("#7b4dff") },
      uColorC: { value: new THREE.Color("#5ee7ff") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);

    if (material.current) {
      material.current.uniforms.uTime.value = t;
      material.current.uniforms.uMouse.value.set(
        pointer.current?.x ?? 0,
        pointer.current?.y ?? 0,
      );
      // Ease the "hover" pulse toward the pointer's distance from centre.
      const target = 0.35 + Math.hypot(pointer.current?.x ?? 0, pointer.current?.y ?? 0) * 0.6;
      material.current.uniforms.uHover.value +=
        (target - material.current.uniforms.uHover.value) * d * 2.5;
      material.current.uniforms.uPulse.value =
        material.current.uniforms.uHover.value;
    }

    if (group.current) {
      const scroll =
        window.scrollY / Math.max(1, window.innerHeight);
      const clamped = Math.min(1.6, scroll);

      group.current.rotation.y += d * 0.11;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.15 + (pointer.current?.y ?? 0) * 0.22 + clamped * 0.35,
        d * 1.6,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        (pointer.current?.x ?? 0) * 0.12,
        d * 1.2,
      );
      const s = THREE.MathUtils.lerp(group.current.scale.x, 1 - clamped * 0.12, d * 2);
      group.current.scale.setScalar(s);
    }

    if (shell.current) {
      shell.current.rotation.y -= d * 0.18;
      shell.current.rotation.z += d * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.38, 28]} />
        <shaderMaterial
          ref={material}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={uniforms}
          transparent
          toneMapped={false}
        />
      </mesh>

      {/* Outer wireframe cage */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.02, 2]} />
        <meshBasicMaterial
          color="#d9ff3f"
          wireframe
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>

      {/* Orbital rings */}
      {[
        { rotation: [Math.PI / 2.4, 0.2, 0], radius: 2.5 },
        { rotation: [0.4, 1.1, 0.6], radius: 2.9 },
        { rotation: [1.2, 0.3, 1.4], radius: 3.3 },
      ].map((ring, index) => (
        <mesh key={index} rotation={ring.rotation as [number, number, number]}>
          <torusGeometry args={[ring.radius, 0.004, 6, 180]} />
          <meshBasicMaterial
            color={index === 1 ? "#8b6cff" : "#d9ff3f"}
            transparent
            opacity={0.28 - index * 0.06}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Particle field                                                             */
/* -------------------------------------------------------------------------- */

function ParticleField({ count = 1400 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Shell distribution: keeps particles off the centre of the stage.
      const radius = 2.4 + Math.random() * 5.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.65;
      array[i * 3 + 2] = radius * Math.cos(phi) * 0.7;
    }
    return array;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += Math.min(delta, 0.05) * 0.03;
    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#ffffff"
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera rig — pointer parallax + scroll push-back                           */
/* -------------------------------------------------------------------------- */

function CameraRig({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const scroll = Math.min(1.5, window.scrollY / Math.max(1, window.innerHeight));

    camera.position.x += ((pointer.current?.x ?? 0) * 0.42 - camera.position.x) * d * 2;
    camera.position.y += ((-(pointer.current?.y ?? 0) * 0.3) - camera.position.y) * d * 2;
    camera.position.z += (5.4 + scroll * 1.3 - camera.position.z) * d * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */

function Scene({ particles }: { particles: number }) {
  const pointer = usePointer();
  const { size } = useThree();
  const isDesktop = size.width >= 1024;

  return (
    <>
      <CameraRig pointer={pointer} />
      <group position={[isDesktop ? 1.55 : 0, isDesktop ? 0.1 : 0.35, 0]}>
        <SignalCore pointer={pointer} />
        <ParticleField count={particles} />
      </group>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 5.4], fov: 42, near: 0.1, far: 40 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Scene particles={1300} />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.7}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0007, 0.0011)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise opacity={0.045} blendFunction={BlendFunction.OVERLAY} />
        <Vignette offset={0.28} darkness={0.62} eskil={false} />
      </EffectComposer>
    </Canvas>
  );
}
