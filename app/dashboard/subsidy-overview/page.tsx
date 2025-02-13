"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Gift, Users, Wallet, TrendingUp } from "lucide-react"

const monthlyData = [
  { name: "1月", 申请数量: 400, 发放金额: 240000 },
  { name: "2月", 申请数量: 300, 申请金额: 180000 },
  { name: "3月", 申请数量: 200, 申请金额: 120000 },
  { name: "4月", 申请数量: 278, 申请金额: 167000 },
  { name: "5月", 申请数量: 189, 申请金额: 113000 },
  { name: "6月", 申请数量: 239, 申请金额: 143000 },
]

const subsidyTypeData = [
  { name: "教育补贴", value: 400, color: "#0088FE" },
  { name: "医疗补贴", value: 300, color: "#00C49F" },
  { name: "住房补贴", value: 300, color: "#FFBB28" },
  { name: "其他补贴", value: 200, color: "#FF8042" },
]

const subsidyStatusData = [
  { name: "已发放", value: 600, color: "#4CAF50" },
  { name: "审核中", value: 300, color: "#2196F3" },
  { name: "待审核", value: 200, color: "#FFC107" },
  { name: "已拒绝", value: 100, color: "#F44336" },
]

export default function SubsidyOverviewPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">补贴总览</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            导出报表
          </Button>
          <Button size="sm">新建补贴</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总补贴数量</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">较上月 +2.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">申请人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">较上月 +12%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">发放总金额</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥963,000</div>
            <p className="text-xs text-muted-foreground">较上月 +8.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均发放金额</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥3,240</div>
            <p className="text-xs text-muted-foreground">较上月 +5.4%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">趋势分析</TabsTrigger>
          <TabsTrigger value="distribution">补贴分布</TabsTrigger>
          <TabsTrigger value="status">处理状态</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>申请数量趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="申请数量" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>发放金额趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="发放金额" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>补贴类型分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subsidyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {subsidyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {subsidyTypeData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex-1 text-sm">
                      {item.name}
                      <span className="ml-2 text-muted-foreground">{item.value}件</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>补贴处理状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subsidyStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {subsidyStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {subsidyStatusData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex-1 text-sm">
                      {item.name}
                      <span className="ml-2 text-muted-foreground">{item.value}件</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>最新补贴动态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "10分钟前", event: "张三的教育补贴申请已通过审核", type: "success" },
              { time: "30分钟前", event: "新增医疗补贴政策已发布", type: "info" },
              { time: "1小时前", event: "李四的住房补贴申请待审核", type: "warning" },
              { time: "2小时前", event: "王五的补贴申请未通过审核", type: "error" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Badge
                  variant={
                    item.type === "success"
                      ? "default"
                      : item.type === "info"
                        ? "secondary"
                        : item.type === "warning"
                          ? "warning"
                          : "destructive"
                  }
                >
                  {item.type === "success"
                    ? "通过"
                    : item.type === "info"
                      ? "信息"
                      : item.type === "warning"
                        ? "待审"
                        : "拒绝"}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

