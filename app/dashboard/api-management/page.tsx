"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Users, Code, ArrowUpRight } from "lucide-react"

const initialApis = [
  { id: 1, name: "用户管理", category: "核心功能", version: "v1", status: "活跃", calls: 15000, avgResponseTime: 120 },
  { id: 2, name: "补贴申请", category: "业务功能", version: "v2", status: "测试中", calls: 5000, avgResponseTime: 200 },
  { id: 3, name: "数据统计", category: "分析功能", version: "v1", status: "废弃", calls: 100, avgResponseTime: 500 },
  { id: 4, name: "文件上传", category: "工具功能", version: "v1", status: "活跃", calls: 8000, avgResponseTime: 300 },
  { id: 5, name: "消息推送", category: "通知功能", version: "v2", status: "活跃", calls: 20000, avgResponseTime: 80 },
]

export default function ApiManagementPage() {
  const [apis, setApis] = useState(initialApis)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value)
  }

  const filteredApis = apis.filter(
    (api) =>
      (api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || api.category === categoryFilter),
  )

  const totalCalls = apis.reduce((sum, api) => sum + api.calls, 0)
  const avgResponseTime = apis.reduce((sum, api) => sum + api.avgResponseTime, 0) / apis.length

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">API接口管理</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总API数量</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apis.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总调用次数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime.toFixed(2)}ms</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃API比例</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((apis.filter((api) => api.status === "活跃").length / apis.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Input placeholder="搜索API..." value={searchTerm} onChange={handleSearch} className="max-w-sm" />
          <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有分类</SelectItem>
              <SelectItem value="核心功能">核心功能</SelectItem>
              <SelectItem value="业务功能">业务功能</SelectItem>
              <SelectItem value="分析功能">分析功能</SelectItem>
              <SelectItem value="工具功能">工具功能</SelectItem>
              <SelectItem value="通知功能">通知功能</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/dashboard/api-management/add">添加新API</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>API名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>版本</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>调用次数</TableHead>
            <TableHead>平均响应时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApis.map((api) => (
            <TableRow key={api.id}>
              <TableCell className="font-medium">{api.name}</TableCell>
              <TableCell>{api.category}</TableCell>
              <TableCell>{api.version}</TableCell>
              <TableCell>
                <Badge
                  variant={api.status === "活跃" ? "default" : api.status === "测试中" ? "secondary" : "destructive"}
                >
                  {api.status}
                </Badge>
              </TableCell>
              <TableCell>{api.calls.toLocaleString()}</TableCell>
              <TableCell>{api.avgResponseTime}ms</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" asChild>
                  <Link href={`/dashboard/api-management/${api.id}`}>查看详情</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/api-management/${api.id}/edit`}>编辑</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

