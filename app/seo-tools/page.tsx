"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { KeywordResearchTool } from "@/components/KeywordResearchTool"
import { SiteAuditTool } from "@/components/SiteAuditTool"
import { BacklinkAnalysisTool } from "@/components/BacklinkAnalysisTool"

export default function SEOTools() {
  const [activeTab, setActiveTab] = useState("keyword")

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:via-purple-900 dark:to-green-900 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">SEO Tools</h1>
      <Tabs defaultValue="keyword" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="keyword">Keyword Research</TabsTrigger>
          <TabsTrigger value="audit">Site Audit</TabsTrigger>
          <TabsTrigger value="backlinks">Backlink Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="keyword">
          <KeywordResearchTool />
        </TabsContent>
        <TabsContent value="audit">
          <SiteAuditTool />
        </TabsContent>
        <TabsContent value="backlinks">
          <BacklinkAnalysisTool />
        </TabsContent>
      </Tabs>
    </div>
  )
}

