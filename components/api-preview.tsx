"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type Api } from "@/types/api"

interface ApiPreviewProps {
  api: Api
  params: string
  response: string
}

export function ApiPreview({ api, params, response }: ApiPreviewProps) {
  const [formattedParams, setFormattedParams] = useState("")
  const [formattedResponse, setFormattedResponse] = useState("")

  useEffect(() => {
    try {
      setFormattedParams(JSON.stringify(JSON.parse(params), null, 2))
    } catch {
      setFormattedParams(params)
    }

    try {
      setFormattedResponse(JSON.stringify(JSON.parse(response), null, 2))
    } catch {
      setFormattedResponse(response)
    }
  }, [params, response])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>API预览</span>
          <Badge>{api.method}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="params">
          <TabsList>
            <TabsTrigger value="params">请求参数</TabsTrigger>
            <TabsTrigger value="response">响应示例</TabsTrigger>
          </TabsList>
          <TabsContent value="params">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <pre className="text-sm">
                <code>{formattedParams}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="response">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <pre className="text-sm">
                <code>{formattedResponse}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 