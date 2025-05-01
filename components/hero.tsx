"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Simplified animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] bg-pink-500/20 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
    </div>
  )
}

// Simplified text typing effect
const TypedText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!text || currentIndex >= text.length) return

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex])
      setCurrentIndex((prev) => prev + 1)
    }, 100)

    return () => clearTimeout(timeout)
  }, [currentIndex, text])

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Simplified floating badge
const SimpleBadge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`hidden md:flex items-center justify-center px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-purple-500/20 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll separately
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  // Calculate scroll-based styles
  const opacity = Math.max(0, 1 - scrollY / 500)
  const y = scrollY * 0.2
  const scale = Math.max(0.8, 1 - scrollY / 2000)

  if (!mounted) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[100vh] py-20">
        <div className="animate-pulse text-center">
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative flex flex-col items-center justify-center min-h-[100vh] py-20 overflow-hidden"
    >
      <AnimatedBackground />

      {/* Simplified badges with fixed positioning */}
      {/* { <SimpleBadge className="absolute top-[20%] right-[25%]">
        <Star className="h-4 w-4 text-yellow-500 mr-2" />
        <span className="text-sm font-medium">React Expert</span>
      </SimpleBadge> } */}

      <SimpleBadge className="absolute top-[60%] left-[15%]">
        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
        <span className="text-sm font-medium">Available for hire</span>
      </SimpleBadge>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-2xl" />
            <div className="relative rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="rounded-full p-1 bg-background">
                <Image
                  src="https://i.ibb.co/9k5nVzbB/1711783991558.jpg"
                  width={180}
                  height={180}
                  alt="Profile"
                  className="rounded-full border-2 border-background shadow-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4"
        >
          <div className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-background/80 backdrop-blur-sm border border-purple-500/20 mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Full Stack Developer
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          Hi, I&apos;m{" "}
          <span className="relative">
            <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-lg" />
            <span className="relative bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Himanshu Tripathi
            </span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-8 text-xl text-muted-foreground leading-relaxed"
        >
          I create <span className="text-purple-400 font-medium">exceptional digital experiences</span> that are{" "}
          <TypedText text="fast, accessible, and visually stunning." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 group relative overflow-hidden"
            asChild
          >
            <Link href="#projects">
              <span className="relative z-10 flex items-center">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500/20 hover:bg-purple-500/10 backdrop-blur-sm group"
            asChild
          >
            <Link href="#contact">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:text-foreground transition-colors">
                Contact Me
              </span>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex space-x-4 justify-center mb-16"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30"
            asChild
          >
            <Link href=" https://github.com/himanshutripathi1838" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30"
            asChild
          >
            <Link href=" https://www.linkedin.com/in/himanshu-tripathi-454343259/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30"
            asChild
          >
            <Link href="https://x.com/HimanshuTr13153" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Link
            href="#about"
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs mb-1">Scroll Down</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
