"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Download, FileText, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import 3D components with no SSR
const ResumeTitleComponent = dynamic(() => import("./resume-title"), {
  ssr: false,
  loading: () => (
    <div className="h-24 flex items-center justify-center">
      <div className="text-center text-muted-foreground">Loading...</div>
    </div>
  ),
})

export default function Resume() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [scrollProps, setScrollProps] = useState({ opacity: 1, y: 0 })

  // First, just set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Then, in a separate effect, add event listeners only after mounting
  useEffect(() => {
    if (!mounted) return
    if (typeof window === "undefined") return

    const handleScroll = () => {
      try {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const offsetTop = rect.top
        const elementHeight = rect.height

        // Calculate scroll progress
        const scrollProgress = 1 - offsetTop / (windowHeight + elementHeight)
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

        // Transform values based on scroll progress
        let opacity = 1
        let y = 0

        if (clampedProgress < 0.2) {
          opacity = clampedProgress / 0.2
          y = 100 - (clampedProgress / 0.2) * 100
        } else if (clampedProgress > 0.8) {
          opacity = (1 - clampedProgress) / 0.2
          y = ((clampedProgress - 0.8) / 0.2) * -100
        }

        setScrollProps({ opacity, y })
      } catch (error) {
        console.error("Error in scroll handler:", error)
      }
    }

    try {
      window.addEventListener("scroll", handleScroll)
      handleScroll() // Initial check
    } catch (error) {
      console.error("Error setting up scroll listener:", error)
    }

    return () => {
      try {
        window.removeEventListener("scroll", handleScroll)
      } catch (error) {
        console.error("Error removing scroll listener:", error)
      }
    }
  }, [mounted])

  const workExperience = [
    {
      title: "Jan 2025-Apr 2025",
      company: "Full Stack Developer",
      period: "Care Connect(Al-Based Healthcare Platform)",
      description:
        "Developed a telemedicine platform with doctor and patient dashboards, video consultation, Al bot for diagnosis, and appointment booking using React, Node.js, MongoDB, and Firebase.",
    },
    {
      title: "Sept 2024-Oct 2024",
      company: "Web Developer",
      period: "Career Counseling Platform",
      description:
        "Built a web platform to guide students after 10th/12th, including registration/login, career suggestions, and Al chatbot for queries using HTML, CSS, JavaScript, and Firebase.",
    },
    // {
    //   title: "Junior Web Developer",
    //   company: "Creative Agency",
    //   period: "2016 - 2018",
    //   description:
    //     "Built responsive websites for clients across various industries. Worked with HTML, CSS, JavaScript, and WordPress.",
    // },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
      period: "2022 - 2026",
      description:
        "Focused on Software Engineering and Database Systems. Participated in multiple hackathons and coding competitions.",
    },
    {
      degree: "Higher Secondary School",
      institution: "Sadar Patel School",
      period: "2022",
      description: "The Higher Secondary School under MPBSE offers Class 12 education focused on academic excellence and skill development. It prepares students for higher studies and future careers.",
    },
    {
      degree: "Secondary School",
      institution: "Sadar Patel School",
      period: "2020",
      description: "The Secondary School under MPBSE offers Class 10 education focused on academic excellence and skill development. It prepares students for higher studies and future careers.",
    },
  ]

  if (!mounted) {
    return (
      <div className="container mx-auto">
        <div className="h-24 mb-6 flex items-center justify-center">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-muted rounded-md"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded-md w-1/3"></div>
              <div className="space-y-4">
                <div className="h-40 bg-muted rounded-md"></div>
                <div className="h-40 bg-muted rounded-md"></div>
                <div className="h-40 bg-muted rounded-md"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded-md w-1/3"></div>
              <div className="space-y-4">
                <div className="h-40 bg-muted rounded-md"></div>
                <div className="h-40 bg-muted rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto" ref={containerRef}>
      <div className="h-24 mb-6">
        <ResumeTitleComponent />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center mb-10"
      >
        <Card className="border border-purple-500/20 bg-background/50 backdrop-blur-sm max-w-md w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-500/10 mr-3">
                  <FileText className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">Download Resume</h3>
                  <p className="text-sm text-muted-foreground">Get a copy of my full resume</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30"
                asChild
              >
             <a
  href="https://drive.google.com/uc?export=download&id=1Qik9FuyeUQAzU8XaZHE-tyiduWFzM-dH"
  target="_blank"
  rel="noopener noreferrer"
>

              <Download className="h-4 w-4 mr-2" />
              PDF
              </a>



              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-purple-500/10 mr-3">
              <Briefcase className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold">Work Experience</h3>
          </div>

          <div className="relative border-l-2 border-border pl-6 ml-3 space-y-6">
            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                style={{
                  opacity: scrollProps.opacity,
                  y: scrollProps.y,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -left-[31px] h-6 w-6 rounded-full bg-background border-2 border-purple-500" />
                <Card className="border border-purple-500/20 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="text-sm text-muted-foreground">{job.period}</div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <div className="text-purple-500 font-medium">{job.company}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-pink-500/10 mr-3">
              <GraduationCap className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
          </div>

          <div className="relative border-l-2 border-border pl-6 ml-3 space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                style={{
                  opacity: scrollProps.opacity,
                  y: scrollProps.y,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -left-[31px] h-6 w-6 rounded-full bg-background border-2 border-pink-500" />
                <Card className="border border-pink-500/20 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="text-sm text-muted-foreground">{edu.period}</div>
                    <CardTitle className="text-xl">{edu.degree}</CardTitle>
                    <div className="text-pink-500 font-medium">{edu.institution}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
