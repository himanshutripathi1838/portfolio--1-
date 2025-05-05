"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the 3D skills component with no SSR
const SkillsVisualization = dynamic(() => import("./3d-skills"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
      <div className="text-center text-muted-foreground">Loading 3D Skills...</div>
    </div>
  ),
})

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skills = [
    "C",
    "C++",
    "DSA",
    "Bootstrap",
    "Tailwind",
    "MongoDB",
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
  ]

  if (!mounted) {
    return (
      <div className="container mx-auto animate-pulse">
        <div className="h-10 bg-muted rounded-md w-1/4 mx-auto mb-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-80 bg-muted rounded-md"></div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-md w-1/3"></div>
            <div className="h-20 bg-muted rounded-md"></div>
            <div className="h-20 bg-muted rounded-md"></div>
            <div className="h-40 bg-muted rounded-md"></div>
          </div>
        </div>
        <div className="h-8 bg-muted rounded-md w-1/3 mx-auto mt-16 mb-6"></div>
        <div className="h-[500px] bg-muted rounded-md"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-center">About Me</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-10 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-square max-w-md mx-auto"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-border">
                          <Image
                            src="https://i.ibb.co/9k5nVzbB/1711783991558.jpg"
                            width={180}
                            height={180}
                            alt="Profile"
                            className="rounded-full border-2 border-background shadow-xl"
                          />

          </div>
        </motion.div>

        <motion.div             
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Who am I?</h3>
          <p className="text-muted-foreground mb-6">
          I specialize in web development, helping businesses and individuals build dynamic, responsive, and scalable websites. Along with development, I also assist students with academic projects and career guidance in the tech field. Below are the key services I offer!.
          </p>
          <p className="text-muted-foreground mb-6">
            My journey in tech started when I was in college.
          </p>

          <Card className="border border-purple-500/20 bg-background/50 backdrop-blur-sm mb-6">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">My Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-muted hover:bg-purple-500/10 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">My Skills in 3D</h3>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl" />
          <div className="relative">
            <Suspense
              fallback={
                <div className="w-full h-[500px] rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">Loading 3D Skills...</div>
                </div>
              }
            >
              <SkillsVisualization />
            </Suspense>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
