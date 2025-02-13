"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  Plus, Eye, Pencil, Trash2, Search, FileText, 
  Layout, Globe, Calendar, AlertCircle
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { mockPages } from "@/data/mock/pages"
import { type Page } from "@/data/mock/pages"  // 使用导出的 Page 类型

// 页面状态类型
type PageStatus = 'published' | 'draft'

const pageStatuses: Record<PageStatus, {
  label: string
  variant: "default" | "secondary" | "destructive" | "outline"
}> = {
  published: {
    label: "已发布",
    variant: "default"
  },
  draft: {
    label: "草稿",
    variant: "secondary"
  }
}

export default function PagesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"list" | "new">("list")
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedPage, setSelectedPage] = useState<(typeof mockPages)[0] | null>(null)

  // 统计数据
  const stats = {
    total: mockPages.length,
    published: mockPages.filter(p => p.status === "published").length,
    draft: mockPages.filter(p => p.status === "draft").length
  }

  // 过滤页面
  const filteredPages = mockPages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 获取状态对应的Badge
  const getStatusBadge = (status: PageStatus) => {
    const { label, variant } = pageStatuses[status]
    return <Badge variant={variant}>{label}</Badge>
  }

  // 处理删除
  const handleDelete = (page: typeof mockPages[0]) => {
    setSelectedPage(page)
    setDeleteDialog(true)
  }

  // 确认删除
  const confirmDelete = () => {
    toast({
      title: "删除成功",
      description: `页面 "${selectedPage?.title}" 已被删除`,
    })
    setDeleteDialog(false)
  }

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">官网页面管理</h1>
          <p className="text-sm text-muted-foreground">
            管理和编辑官网页面内容
          </p>
        </div>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 gap-2"
          onClick={() => setActiveTab("new")}
        >
          <Plus className="h-4 w-4" />
          新建页面
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500/5 to-blue-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总页面数</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-green-500/5 to-green-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已发布页面</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <Globe className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.published}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-yellow-500/5 to-yellow-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">草稿页面</CardTitle>
              <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center">
                <Layout className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draft}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 主要内容区 */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "list" | "new")}>
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="list" className="data-[state=active]:bg-background">
              页面列表
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-background">
              编辑页面
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索页面..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[300px]"
              />
            </div>
          </div>
        </div>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50">
                  <TableHead>标题</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>模板</TableHead>
                  <TableHead>作者</TableHead>
                  <TableHead>最后修改</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow
                    key={page.id}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <Badge variant={page.status === "published" ? "default" : "secondary"}>
                        {page.status === "published" ? "已发布" : "草稿"}
                      </Badge>
                    </TableCell>
                    <TableCell>{page.template}</TableCell>
                    <TableCell>{page.author}</TableCell>
                    <TableCell>
                      {format(new Date(page.lastModified), 'PPp', { locale: zhCN })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(`/${page.slug}`, '_blank')}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">预览</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedPage(page)
                            setActiveTab("new")
                          }}
                          className="hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">编辑</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(page)}
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
        </TabsContent>

        <TabsContent value="new">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">编辑页面内容</h2>
                  <p className="text-sm text-muted-foreground">
                    使用富文本编辑器编辑页面内容
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">保存草稿</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500">
                    发布页面
                  </Button>
                </div>
              </div>
              {/* TODO: 添加富文本编辑器组件 */}
              <div className="min-h-[500px] border rounded-lg p-4">
                富文本编辑器将在这里
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除页面 "{selectedPage?.title}" 吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              删除页面将同时删除所有相关的内容和配置。
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