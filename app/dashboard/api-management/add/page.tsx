"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AddApiPage() {
  const router = useRouter()
  const [apiData, setApiData] = useState({
    name: "",
    category: "",
    version: "",
    description: "",
    endpoint: "",
    method: "GET",
    parameters: "",
    responses: "",
    status: "活跃",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApiData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setApiData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该有保存API的逻辑
    console.log("API数据:", apiData)
    router.push("/dashboard/api-management")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">添加新API</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="params">参数和响应</TabsTrigger>
            <TabsTrigger value="docs">文档</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">API名称</Label>
                    <Input id="name" name="name" value={apiData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">分类</Label>
                    <Select
                      name="category"
                      value={apiData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="核心功能">核心功能</SelectItem>
                        <SelectItem value="业务功能">业务功能</SelectItem>
                        <SelectItem value="分析功能">分析功能</SelectItem>
                        <SelectItem value="工具功能">工具功能</SelectItem>
                        <SelectItem value="通知功能">通知功能</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="version">版本</Label>
                    <Input id="version" name="version" value={apiData.version} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="method">请求方法</Label>
                    <Select
                      name="method"
                      value={apiData.method}
                      onValueChange={(value) => handleSelectChange("method", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择请求方法" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">描述</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={apiData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">接口地址</Label>
                  <Input id="endpoint" name="endpoint" value={apiData.endpoint} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">状态</Label>
                  <Select
                    name="status"
                    value={apiData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="活跃">
                        <Badge variant="default">活跃</Badge>
                      </SelectItem>
                      <SelectItem value="测试中">
                        <Badge variant="secondary">测试中</Badge>
                      </SelectItem>
                      <SelectItem value="废弃">
                        <Badge variant="destructive">废弃</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="params">
            <Card>
              <CardHeader>
                <CardTitle>参数和响应</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parameters">请求参数 (JSON格式)</Label>
                  <Textarea
                    id="parameters"
                    name="parameters"
                    value={apiData.parameters}
                    onChange={handleInputChange}
                    className="font-mono"
                    rows={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responses">响应示例 (JSON格式)</Label>
                  <Textarea
                    id="responses"
                    name="responses"
                    value={apiData.responses}
                    onChange={handleInputChange}
                    className="font-mono"
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>API文档</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="docs">API文档 (Markdown格式)</Label>
                  <Textarea
                    id="docs"
                    name="docs"
                    className="font-mono"
                    rows={20}
                    placeholder="# API文档

## 接口描述

## 请求参数

## 响应参数

## 示例

### 请求示例

### 响应示例

## 错误码

## 注意事项"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            取消
          </Button>
          <Button type="submit">保存API</Button>
        </div>
      </form>
    </div>
  )
}

