"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  Plus, Eye, Pencil, Trash2, Search, 
  ArrowUpRight, Users, Clock, Activity, Percent,
  AlertCircle
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { apiCategories, apiStatuses, mockApiList, mockApiStats } from "@/data/mock/apis"
import { type Api, type ApiStatus } from "@/types/api"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export default function ApiManagementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedApi, setSelectedApi] = useState<Api | null>(null)

  // 过滤API列表
  const filteredApis = mockApiList.filter((api): api is Api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || api.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // 获取状态对应的Badge样式
  const getStatusBadge = (status: ApiStatus) => {
    const { label, variant } = apiStatuses[status]
    return <Badge variant={variant}>{label}</Badge>
  }

  // 处理删除
  const handleDelete = (api: Api) => {
    setSelectedApi(api)
    setDeleteDialog(true)
  }

  // 确认删除
  const confirmDelete = () => {
    // TODO: 实现删除逻辑
    toast({
      title: "删除成功",
      description: `API "${selectedApi?.name}" 已被删除`,
    })
    setDeleteDialog(false)
  }

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {/* 页面标题和添加按钮 */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">API接口管理</h1>
          <p className="text-sm text-muted-foreground">
            管理和监控系统API接口
          </p>
        </div>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 gap-2"
        >
          <Plus className="h-4 w-4" />
          添加新API
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500/5 to-blue-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总API数量</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{mockApiStats.totalApis}</div>
              <div className="text-xs text-muted-foreground">
                +{mockApiStats.lastMonthStats.apis} from last month
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-500/5 to-purple-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总调用次数</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{mockApiStats.totalCalls.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {mockApiStats.lastMonthStats.calls} from last month
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-green-500/5 to-green-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <Clock className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{mockApiStats.avgResponseTime}ms</div>
              <div className="text-xs text-muted-foreground">
                {mockApiStats.lastMonthStats.responseTime} from last month
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-yellow-500/5 to-yellow-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃API比例</CardTitle>
              <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center">
                <Activity className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{mockApiStats.activeApiRatio}%</div>
              <div className="text-xs text-muted-foreground">
                {mockApiStats.lastMonthStats.activeRatio} from last month
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 搜索和过滤 */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索API..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="所有分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有分类</SelectItem>
              {Object.entries(apiCategories).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* API列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead>API名称</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>版本</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">调用次数</TableHead>
              <TableHead className="text-right">平均响应时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApis.map((api) => (
              <TableRow
                key={api.id}
                className="group hover:bg-muted/50"
              >
                <TableCell className="font-medium">{api.name}</TableCell>
                <TableCell>{apiCategories[api.category as keyof typeof apiCategories].label}</TableCell>
                <TableCell>{api.version}</TableCell>
                <TableCell>{getStatusBadge(api.status)}</TableCell>
                <TableCell className="text-right">{api.calls.toLocaleString()}</TableCell>
                <TableCell className="text-right">{api.responseTime}ms</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => router.push(`/dashboard/api/${api.id}`)}
                      className="hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">查看详情</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => router.push(`/dashboard/api/${api.id}/edit`)}
                      className="hover:bg-yellow-50 hover:text-yellow-600"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">编辑</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(api)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">删除</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除 API "{selectedApi?.name}" 吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              删除 API 将同时删除所有相关的配置和统计数据。
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog(false)}
            >
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 