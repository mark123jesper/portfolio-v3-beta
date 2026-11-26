'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader, type SVGResult } from 'three/examples/jsm/loaders/SVGLoader.js'
import { useViewportActive } from '@/lib/useViewport'

/** The traced brand mark in its own units; everything below scales it into the scene. */
const LOGO_SRC = '/logo-mark.svg'
const LOGO_UNITS = 1100
const LOGO_WIDTH = 2.5

const PALETTE = {
  light: { accent: '#a36e2a', ink: '#181512' },
  dark: { accent: '#d6a05c', ink: '#f4e9dc' },
}

/** Evenly spaced points on a sphere — a quiet dust shell around the knot. */
function shell(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    const jitter = 0.94 + Math.random() * 0.12

    positions[i * 3] = Math.cos(theta) * ring * radius * jitter
    positions[i * 3 + 1] = y * radius * jitter
    positions[i * 3 + 2] = Math.sin(theta) * ring * radius * jitter
  }

  return positions
}

/**
 * The cat mark traced from /logo-mark.svg and extruded, so it reads as a solid
 * bronze plate rather than a decal: the strokes become thin walls with a beveled
 * edge, and the whole thing turns with the scene like the shape it replaced.
 */
function LogoMark({ accent }: { accent: string }) {
  const { paths } = useLoader(SVGLoader, LOGO_SRC) as SVGResult
  const shapes = useMemo(() => paths.flatMap((path) => SVGLoader.createShapes(path)), [paths])

  const geometries = useMemo(() => {
    const scale = LOGO_WIDTH / LOGO_UNITS
    return shapes.map((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 26,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 1.6,
        bevelSegments: 2,
        curveSegments: 6,
      })
      geometry.scale(scale, scale, scale)
      // The traced path is y-down; rotating is a rigid move, so winding stays intact.
      geometry.rotateX(Math.PI)
      return geometry
    })
  }, [shapes])

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        roughness: 0.3,
        metalness: 0.5,
        emissive: accent,
        emissiveIntensity: 0.08,
      }),
    [accent],
  )

  const centre = useMemo(() => {
    const box = new THREE.Box3()
    geometries.forEach((geometry) => {
      geometry.computeBoundingBox()
      if (geometry.boundingBox) box.union(geometry.boundingBox)
    })
    return box.getCenter(new THREE.Vector3())
  }, [geometries])

  useEffect(
    () => () => {
      geometries.forEach((geometry) => geometry.dispose())
      material.dispose()
    },
    [geometries, material],
  )

  return (
    <group position={[-centre.x, -centre.y, -centre.z]}>
      {geometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry} material={material} />
      ))}
    </group>
  )
}

function Sculpture({ accent, ink, reduce }: { accent: string; ink: string; reduce: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const points = useMemo(() => shell(900, 1.55), [])

  useEffect(() => {
    if (reduce) return

    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientY / window.innerHeight - 0.5
      pointer.current.y = event.clientX / window.innerWidth - 0.5
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce])

  useFrame((state, delta) => {
    const group3d = group.current
    if (!group3d) return

    const step = Math.min(delta, 0.05)
    // A full turn takes a flat mark edge-on twice a cycle, so it sweeps through
    // the same slow arc at roughly the turn rate the knot used instead.
    const turn = reduce ? 0 : Math.sin(state.clock.elapsedTime * 0.35) * 0.5

    const targetX = reduce ? 0 : pointer.current.x * 0.55
    const targetY = turn + (reduce ? 0 : pointer.current.y * 0.9)
    const ease = Math.min(1, step * 2.4)

    group3d.rotation.x += (targetX - group3d.rotation.x) * ease
    group3d.rotation.y += (targetY - group3d.rotation.y) * ease
  })

  return (
    <group ref={group} scale={0.88}>
      <group rotation={[0.42, 0.26, 0]}>
        <Suspense fallback={null}>
          <LogoMark accent={accent} />
        </Suspense>
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={accent}
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>

      <mesh rotation={[Math.PI / 2.1, 0, 0.3]}>
        <torusGeometry args={[1.78, 0.0045, 6, 120]} />
        <meshBasicMaterial color={ink} transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.9, 0]}>
        <torusGeometry args={[1.95, 0.0035, 6, 120]} />
        <meshBasicMaterial color={ink} transparent opacity={0.12} />
      </mesh>

      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} color="#fff2df" />
      <pointLight position={[-3, -2, 2]} intensity={1.4} color={accent} />
    </group>
  )
}

export default function ProfileScene() {
  const { resolvedTheme } = useTheme()
  const reduceMotion = useReducedMotion()
  const palette = resolvedTheme === 'dark' ? PALETTE.dark : PALETTE.light
  const { ref: wrapper, active } = useViewportActive<HTMLDivElement>()
  // This scene is fill-rate bound, not geometry bound: MSAA plus a 1.75x backing
  // store cost about half the frame rate in a throttled phone-viewport test, and
  // a dense display hides the difference. Touch devices get the cheaper buffer;
  // desktop, where the loop has headroom anyway, keeps antialiasing.
  const [coarsePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )

  return (
    <div ref={wrapper} aria-hidden className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        dpr={[1, coarsePointer ? 1.25 : 1.75]}
        gl={{ alpha: true, antialias: !coarsePointer, powerPreference: 'high-performance' }}
        // Idle the GPU when scrolled past or the tab is hidden; a still scene only needs one frame.
        frameloop={active ? (reduceMotion ? 'demand' : 'always') : 'never'}
        style={{ position: 'absolute', inset: 0 }}
        fallback={
          <div className="grid h-full place-items-center">
            <img src="/logo-mark-light.png" alt="" className="w-1/2 opacity-70 dark:hidden" />
            <img src="/logo-mark-dark.png" alt="" className="hidden w-1/2 opacity-70 dark:block" />
          </div>
        }
      >
        <Sculpture accent={palette.accent} ink={palette.ink} reduce={Boolean(reduceMotion)} />
      </Canvas>
    </div>
  )
}
