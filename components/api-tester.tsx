"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type Api } from "@/types/api"

interface ApiTesterProps {
  api: Api
}

export function ApiTester({ api }: ApiTesterProps) {
  const [url, setUrl] = useState("")
  const [headers, setHeaders] = useState("{}")
  const [body, setBody] = useState("{}")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    try {
      setLoading(true)
      
      const res = await fetch(url, {
        method: api.method,
        headers: JSON.parse(headers),
        body: api.method !== "GET" ? body : undefined
      })

      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API测试</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>请求地址</Label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="请输入完整的API地址"
          />
        </div>
        <div className="space-y-2">
          <Label>请求头</Label>
          <Textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder="请输入JSON格式的请求头"
            rows={4}
          />
        </div>
        {api.method !== "GET" && (
          <div className="space-y-2">
            <Label>请求体</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="请输入JSON格式的请求体"
              rows={4}
            />
          </div>
        )}
        <Button 
          onClick={handleTest}
          disabled={loading}
          className="w-full"
        >
          {loading ? "测试中..." : "发送请求"}
        </Button>
        {response && (
          <div className="space-y-2">
            <Label>响应结果</Label>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <pre className="text-sm">
                <code>{response}</code>
              </pre>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 