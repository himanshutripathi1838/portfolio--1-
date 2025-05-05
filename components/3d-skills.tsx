"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Environment, OrbitControls } from "@react-three/drei"
import type { Mesh } from "three"
import { motion } from "framer-motion"
import type * as THREE from "three"

const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "C", color: "#000000" },
  { name: "C++", color: "#3178C6" },
  { name: "DSA", color: "#F7DF1E" },
  { name: "Bootstrap", color: "#339933" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "MongoDB", color: "#47A248" },
  { name: "HTML", color: "#4169E1" },
  { name: "CSS", color: "#F24E1E" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Git", color: "#F05032" },
  // { name: "UI/UX", color: "#FF61F6" },
  // { name: "Express", color: "#000000" },
]

function SkillSphere({
  name,
  color,
  position,
  speed = 1,
}: {
  name: string
  color: string
  position: [number, number, number]
  speed?: number
}) {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * speed * 0.2) * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
      <Text position={[0, 0, 0.6]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </mesh>
  )
}

function SkillsCloud() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => {
        // Calculate position on a sphere
        const phi = Math.acos(-1 + (2 * i) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        const radius = 3.5

        return (
          <SkillSphere
            key={skill.name}
            name={skill.name}
            color={skill.color}
            position={[
              radius * Math.cos(theta) * Math.sin(phi),
              radius * Math.sin(theta) * Math.sin(phi),
              radius * Math.cos(phi),
            ]}
            speed={(i % 3) + 1}
          />
        )
      })}
    </group>
  )
}

export default function SkillsVisualization() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof window === "undefined") {
    return (
      <div className="w-full h-[500px] rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
        <div className="text-center text-muted-foreground">Loading 3D Skills...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full h-[500px] rounded-xl overflow-hidden"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <SkillsCloud />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
