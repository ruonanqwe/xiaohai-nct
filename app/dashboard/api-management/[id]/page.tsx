"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ApiDetails {
  id: string
  name: string
  category: string
  version: string
  description: string
  endpoint: string
  method: string
  parameters: string
  responses: string
  status: string
  calls: number
  avgResponseTime: number
}

const mockChartData = [
  { name: "1月", calls: 4000, responseTime: 240 },
  { name: "2月", calls: 3000, responseTime: 230 },
  { name: "3月", calls: 2000, responseTime: 220 },
  { name: "4月", calls: 2780, responseTime: 210 },
  { name: "5月", calls: 1890, responseTime: 200 },
  { name: "6月", calls: 2390, responseTime: 190 },
  { name: "7月", calls: 3490, responseTime: 180 },
]

export default function ApiDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [api, setApi] = useState<ApiDetails | null>(null)

  useEffect(() => {
    // 模拟API调用
    const fetchApiDetails = async () => {
      // 这里应该是一个实际的API调用
      const apiData: ApiDetails = {
        id: params.id as string,
        name: "用户管理API",
        category: "核心功能",
        version: "v1",
        description: "提供用户管理相关的功能，包括创建、查询、更新和删除用户。",
        endpoint: "/api/v1/users",
        method: "GET",
        parameters: JSON.stringify({ page: "页码", limit: "每页数量" }, null, 2),
        responses: JSON.stringify(
          {
            users: [{ id: 1, name: "张三", email: "zhangsan@example.com" }],
            total: 100,
            page: 1,
            limit: 10,
          },
          null,
          2,
        ),
        status: "活跃",
        calls: 15000,
        avgResponseTime: 120,
      }
      setApi(apiData)
    }

    fetchApiDetails()
  }, [params.id])

  if (!api) {
    return <div>加载中...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">API详情: {api.name}</h2>
        <Badge variant={api.status === "活跃" ? "default" : api.status === "测试中" ? "secondary" : "destructive"}>
          {api.status}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总调用次数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{api.calls.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{api.avgResponseTime}ms</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">版本</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{api.version}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分类</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{api.category}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">基本信息</TabsTrigger>
          <TabsTrigger value="docs">接口文档</TabsTrigger>
          <TabsTrigger value="stats">使用统计</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>描述:</strong> {api.description}
              </p>
              <p>
                <strong>接口地址:</strong> {api.endpoint}
              </p>
              <p>
                <strong>请求方法:</strong> {api.method}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="docs">
          <Card>
            <CardHeader>
              <CardTitle>请求参数</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">{api.parameters}</pre>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>响应示例</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">{api.responses}</pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>使用统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="calls" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push(`/dashboard/api-management/${api.id}/edit`)}>
          编辑
        </Button>
        <Button variant="destructive">删除</Button>
      </div>
    </div>
  )
}

