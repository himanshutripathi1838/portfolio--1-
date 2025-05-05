"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import 3D components with no SSR
const ProjectsTitleComponent = dynamic(() => import("./projects-title"), {
  ssr: false,
  loading: () => (
    <div className="h-24 flex items-center justify-center">
      <div className="text-center text-muted-foreground">Loading...</div>
    </div>
  ),
})

export default function Projects() {
  const [mounted, setMounted] = useState(false)

  // First, just set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // No scroll effect needed

  const projects = [
    {
      title: "Career Counselling System",
      description:
        "A platform that provides career-related guidance, future scope insights, and stream-wise counselling for students.",
      image: "https://i.ibb.co/KxSNKf2H/Screenshot-2025-05-01-202553.png",
      tags: [" HTML", " CSS", "JavaScript", " Bootstrap", "PHP", "MySQL", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Online Food Delivery System",
      description:
        "It is web-based platform for browsing restaurants, ordering food and make online payments.",
      image: "https://i.ibb.co/93TDjcBR/Screenshot-2025-03-10-231344.png",
      tags: [" HTML", " CSS", "JavaScript", " Bootstrap", "PHP", "MySQL", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/himanshutripathi1838/Online_food.github.io",
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills with a modern design.",
      image: "https://i.ibb.co/MDfMN0WR/Screenshot-2025-05-02-214511.png",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
      image: "https://i.ibb.co/Z1TW9rSz/Screenshot-2025-05-01-202127.png",
      tags: ["JavaScript", "OpenWeather API", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  if (!mounted) {
    return (
      <div className="container mx-auto">
        <div className="h-24 mb-6 flex items-center justify-center">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-muted rounded-md"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="h-24 mb-6">
        <ProjectsTitleComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transform-gpu"
          >
            <Card className="overflow-hidden border border-purple-500/20 bg-background/50 backdrop-blur-sm h-full flex flex-col transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted hover:bg-purple-500/10 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                <Button variant="ghost" size="sm" className="hover:bg-purple-500/10" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-purple-500/10" asChild>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
