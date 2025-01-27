"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

export function KeywordResearchTool() {
  const [keyword, setKeyword] = useState("")
  const [results, setResults] = useState(null)

  const handleKeywordResearch = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to your backend
    const mockResults = {
      keyword,
      searchVolume: Math.floor(Math.random() * 10000),
      difficulty: Math.floor(Math.random() * 100),
      relatedKeywords: ["related1", "related2", "related3"].map((k) => `${k} ${keyword}`),
    }
    setResults(mockResults)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Research</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleKeywordResearch} className="space-y-4">
          <Input placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} required />
          <Button type="submit">Research</Button>
        </form>
        {results && (
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Search Volume</h3>
              <p>{results.searchVolume} searches per month</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Keyword Difficulty</h3>
              <Slider value={[results.difficulty]} max={100} step={1} className="w-full" />
              <p>{results.difficulty}/100</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Related Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {results.relatedKeywords.map((kw, index) => (
                  <Badge key={index} variant="secondary">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

