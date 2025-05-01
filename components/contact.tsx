"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import 3D components with no SSR
const ContactTitleComponent = dynamic(() => import("./contact-title"), {
  ssr: false,
  loading: () => (
    <div className="h-24 flex items-center justify-center">
      <div className="text-center text-muted-foreground">Loading...</div>
    </div>
  ),
})

export default function Contact() {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    // Show success message
    alert("Message sent successfully!")
  }

  if (!mounted) return null

  return (
    <div className="container mx-auto" ref={containerRef}>
      <div className="h-24 mb-6">{mounted && <ContactTitleComponent />}</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div
          style={{
            opacity: scrollProps.opacity,
            y: scrollProps.y,
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border border-purple-500/20 bg-background/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out to me for any questions or opportunities. I'll get back to you as soon as
                possible.
              </p>

              <div className="space-y-4">
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 rounded-full bg-purple-500/10 mr-3">
                    <Mail className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">himanshutripathi1838@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 rounded-full bg-purple-500/10 mr-3">
                    <Phone className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-sm text-muted-foreground">+91 9876543210</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 rounded-full bg-purple-500/10 mr-3">
                    <MapPin className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">Bhopal, MP</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          style={{
            opacity: scrollProps.opacity,
            y: scrollProps.y,
          }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
          whileHover={{ scale: 1.01 }}
        >
          <Card className="border border-purple-500/20 bg-background/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="border-purple-500/20 focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="border-purple-500/20 focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    required
                    className="border-purple-500/20 focus:border-purple-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="border-purple-500/20 focus:border-purple-500/50 transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
