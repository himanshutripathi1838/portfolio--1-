"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import 3D components with no SSR
const CertificationsTitleComponent = dynamic(() => import("./certifications-title"), {
  ssr: false,
  loading: () => (
    <div className="h-24 flex items-center justify-center">
      <div className="text-center text-muted-foreground">Loading...</div>
    </div>
  ),
})

export default function Certifications() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const certifications = [
    {
      title: "Certified in web development course from MANIT, Bhopal (M.P.)",
      issuer: "MANIT, Bhopal (M.P.)",
      date: "May 2024",
      image: "https://i.ibb.co/KpwS38N7/1726323496849.jpg",
      url: "#",
    },
    // {
    //   title: "Professional Frontend Developer",
    //   issuer: "Meta",
    //   date: "January 2024",
    //   image: "/placeholder.svg?height=150&width=150",
    //   url: "#",
    // },
    {
      title: "Full Stack Web Development",
      issuer: "Jagran Lakecity University",
      date: "August 2025",
      image: "https://i.ibb.co/gLWgq70M/Whats-App-Image-2025-05-01-at-19-56-22-6934b523.jpg",
      url: "#",
    },
    // {
    //   title: "UI/UX Design Professional",
    //   issuer: "Google",
    //   date: "March 2022",
    //   image: "/placeholder.svg?height=150&width=150",
    //   url: "#",
    // },
  ]

  if (!mounted) return null

  return (
    <div className="container mx-auto">
      <div className="h-24 mb-6">{mounted && <CertificationsTitleComponent />}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              z: 10,
            }}
            className="perspective-1000"
          >
            <Card className="border border-purple-500/20 bg-background/50 backdrop-blur-sm h-full flex flex-col transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <CardContent className="p-6 text-center flex-grow">
                <div className="mb-4 flex justify-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/20 p-1 transform-gpu transition-all duration-300 hover:border-purple-500/50">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{cert.issuer}</p>
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {cert.date}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-center">
                <Badge variant="outline" className="hover:bg-purple-500/10 cursor-pointer transition-colors" asChild>
                  <Link href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    View Certificate
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Badge>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
