"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { type Api } from "@/types/api"

interface ApiDocsEditorProps {
  api: Api
  onChange: (content: string) => void
}

export function ApiDocsEditor({ api, onChange }: ApiDocsEditorProps) {
  const [activeTab, setActiveTab] = useState("edit")
  const [content, setContent] = useState(`# ${api.name}

## 接口说明
${api.description}

## 请求方法
${api.method}

## 请求参数
\`\`\`json
${api.params}
\`\`\`

## 响应示例
\`\`\`json
${api.response}
\`\`\`
`)

  const handleChange = (value: string) => {
    setContent(value)
    onChange(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API 文档编辑器</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="edit">编辑</TabsTrigger>
            <TabsTrigger value="preview">预览</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="border rounded-md">
            <Textarea
              className="min-h-[600px] font-mono"
              value={content}
              onChange={(e) => handleChange(e.target.value)}
            />
          </TabsContent>
          <TabsContent value="preview" className="border rounded-md p-4">
            <div className="prose max-w-none">
              {content}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 