
import * as THREE from 'three'
import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useTexture, Environment, Lightformer } from '@react-three/drei'
import { Physics, useRopeJoint, useSphericalJoint, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier'

export default function Badge({ avatarUrl }) {
    return (
        <div className="w-full h-full min-h-[500px]">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 13], fov: 25 }}>
                <ambientLight intensity={Math.PI} />
                <Suspense fallback={null}>
                    <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                        <Band avatarUrl={avatarUrl} />
                    </Physics>
                </Suspense>
                <Environment blur={0.75}>
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
                </Environment>
            </Canvas>
        </div>
    )
}

function Band({ avatarUrl }) {
    const band = useRef()
    const fixed = useRef()
    const j1 = useRef()
    const j2 = useRef()
    const j3 = useRef()
    const card = useRef()
    const vec = new THREE.Vector3()
    const ang = new THREE.Vector3()
    const rot = new THREE.Vector3()
    const dir = new THREE.Vector3()

    const { width, height } = useThree((state) => state.size)
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
    const [dragged, drag] = useState(false)
    const [hovered, hover] = useState(false)

    // Texture loading
    const texture = useTexture(avatarUrl)

    // Joints
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab'
            return () => void (document.body.style.cursor = 'auto')
        }
    }, [hovered, dragged])

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()))
                ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
        }

        if (fixed.current && j1.current && j2.current && j3.current && band.current) {
            curve.points[0].copy(j3.current.translation())
            curve.points[1].copy(j2.current.translation())
            curve.points[2].copy(j1.current.translation())
            curve.points[3].copy(fixed.current.translation())
            band.current.geometry.setFromPoints(curve.getPoints(32))
        }

        if (card.current) {
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
        }
    })

    return (
        <>
            <RigidBody ref={fixed} type="fixed" position={[0, 4, 0]} />
            <RigidBody position={[0.5, 4, 0]} ref={j1} linearDamping={2} angularDamping={2}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[1, 4, 0]} ref={j2} linearDamping={2} angularDamping={2}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[1.5, 4, 0]} ref={j3} linearDamping={2} angularDamping={2}>
                <BallCollider args={[0.1]} />
            </RigidBody>

            <RigidBody ref={card} type={dragged ? 'kinematicPosition' : 'dynamic'} linearDamping={2} angularDamping={2}>
                <CuboidCollider args={[0.8, 1.125, 0.01]} />
                <mesh
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
                    onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                    onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
                    <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
                    <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
                </mesh>
            </RigidBody>

            <line ref={band}>
                <bufferGeometry />
                <lineBasicMaterial color="white" linewidth={1} />
            </line>
        </>
    )
}
