"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  { title: "SEO Optimization", description: "Boost your search engine rankings" },
  { title: "E-commerce Integration", description: "Seamlessly manage your online store" },
  { title: "Analytics Dashboard", description: "Track your performance in real-time" },
  { title: "Custom Website Builder", description: "Create stunning websites with ease" },
]

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-purple-500/50 text-gray-900 dark:text-white mb-16">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Discover Our Features</h2>
            <ul>
              {features.map((feature, index) => (
                <li
                  key={index}
                  className={`mb-4 cursor-pointer ${
                    index === activeFeature ? "text-purple-500 dark:text-purple-300" : ""
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 h-64 relative">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: index === activeFeature ? 1 : 0,
                  scale: index === activeFeature ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

