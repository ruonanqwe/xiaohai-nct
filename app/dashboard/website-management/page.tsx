"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Eye, Edit, Trash2, Plus, Search, FileText, Globe, Layout } from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

// 页面类型定义
interface Page {
  id: string
  title: string
  slug: string
  content: string
  status: "published" | "draft"
  template: string
  author: string
  lastModified: string
}

// 模拟数据
const mockPages: Page[] = [
  {
    id: "1",
    title: "首页",
    slug: "home",
    content: "欢迎来到我们的网站",
    status: "published",
    template: "默认模板",
    author: "管理员",
    lastModified: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "关于我们",
    slug: "about",
    content: "了解我们的故事",
    status: "published",
    template: "单页模板",
    author: "管理员",
    lastModified: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    title: "服务",
    slug: "services",
    content: "我们提供的服务",
    status: "draft",
    template: "列表模板",
    author: "编辑",
    lastModified: "2024-01-13T09:15:00Z",
  },
]

export default function WebsiteManagementPage() {
  const { toast } = useToast()
  const [pages, setPages] = useState<Page[]>(mockPages)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"list" | "edit">("list")
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  // 统计数据
  const stats = {
    total: pages.length,
    published: pages.filter(p => p.status === "published").length,
    draft: pages.filter(p => p.status === "draft").length
  }

  // 过滤页面
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 处理编辑
  const handleEdit = (page: Page) => {
    setEditingPage(page)
    setActiveTab("edit")
  }

  // 处理保存
  const handleSave = () => {
    if (editingPage) {
      setPages(pages.map(p => p.id === editingPage.id ? editingPage : p))
      setEditingPage(null)
      setActiveTab("list")
      toast({
        title: "保存成功",
        description: "页面内容已更新",
      })
    }
  }

  // 处理删除
  const handleDelete = (page: Page) => {
    setSelectedPage(page)
    setDeleteDialog(true)
  }

  // 确认删除
  const confirmDelete = () => {
    if (selectedPage) {
      setPages(pages.filter(p => p.id !== selectedPage.id))
      setDeleteDialog(false)
      toast({
        title: "删除成功",
        description: `页面 "${selectedPage.title}" 已被删除`,
      })
    }
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
          onClick={() => {
            setEditingPage({
              id: String(Date.now()),
              title: "",
              slug: "",
              content: "",
              status: "draft",
              template: "默认模板",
              author: "管理员",
              lastModified: new Date().toISOString(),
            })
            setActiveTab("edit")
          }}
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
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "list" | "edit")}>
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="list" className="data-[state=active]:bg-background">
              页面列表
            </TabsTrigger>
            <TabsTrigger value="edit" className="data-[state=active]:bg-background">
              编辑页面
            </TabsTrigger>
          </TabsList>
          {activeTab === "list" && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索页面..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[300px]"
              />
            </div>
          )}
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
                          onClick={() => handleEdit(page)}
                          className="hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <Edit className="h-4 w-4" />
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

        <TabsContent value="edit">
          {editingPage ? (
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium">
                      {editingPage.id ? "编辑页面" : "新建页面"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      编辑页面内容和设置
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setEditingPage(null)
                        setActiveTab("list")
                      }}
                    >
                      取消
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                      onClick={handleSave}
                    >
                      保存更改
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">页面标题</Label>
                      <Input
                        id="title"
                        value={editingPage.title}
                        onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                        placeholder="输入页面标题"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={editingPage.slug}
                        onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                        placeholder="输入页面路径"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template">页面模板</Label>
                      <Select
                        value={editingPage.template}
                        onValueChange={(value) => setEditingPage({ ...editingPage, template: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择页面模板" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="默认模板">默认模板</SelectItem>
                          <SelectItem value="单页模板">单页模板</SelectItem>
                          <SelectItem value="列表模板">列表模板</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">状态</Label>
                      <Select
                        value={editingPage.status}
                        onValueChange={(value: "published" | "draft") => 
                          setEditingPage({ ...editingPage, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择页面状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">已发布</SelectItem>
                          <SelectItem value="draft">草稿</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">页面内容</Label>
                    <Textarea
                      id="content"
                      value={editingPage.content}
                      onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                      placeholder="输入页面内容"
                      rows={15}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              请从页面列表中选择一个页面进行编辑，或点击"新建页面"按钮创建新页面。
            </div>
          )}
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

