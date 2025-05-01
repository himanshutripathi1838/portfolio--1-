"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"

// Import static components normally
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Simple loading component
const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse text-center">
      <div className="text-2xl font-bold">Loading...</div>
    </div>
  </div>
)

// Dynamically import components that use client-side features with explicit loading states
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: false,
  loading: () => <LoadingFallback />,
})

const About = dynamic(() => import("@/components/about"), {
  ssr: false,
  loading: () => (
    <div className="py-20 md:py-28">
      <LoadingFallback />
    </div>
  ),
})

const Resume = dynamic(() => import("@/components/resume"), {
  ssr: false,
  loading: () => (
    <div className="py-20 md:py-28">
      <LoadingFallback />
    </div>
  ),
})

const Projects = dynamic(() => import("@/components/projects"), {
  ssr: false,
  loading: () => (
    <div className="py-20 md:py-28">
      <LoadingFallback />
    </div>
  ),
})

const Certifications = dynamic(() => import("@/components/certifications"), {
  ssr: false,
  loading: () => (
    <div className="py-20 md:py-28">
      <LoadingFallback />
    </div>
  ),
})

const Contact = dynamic(() => import("@/components/contact"), {
  ssr: false,
  loading: () => (
    <div className="py-20 md:py-28">
      <LoadingFallback />
    </div>
  ),
})

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingFallback />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/90">
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <section id="home" className="relative">
            <Hero />
          </section>

          <section id="about" className="py-20 md:py-28">
            <About />
          </section>

          <section id="resume" className="py-20 md:py-28">
            <Resume />
          </section>

          <section id="projects" className="py-20 md:py-28">
            <Projects />
          </section>

          <section id="certifications" className="py-20 md:py-28">
            <Certifications />
          </section>

          <section id="contact" className="py-20 md:py-28">
            <Contact />
          </section>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
