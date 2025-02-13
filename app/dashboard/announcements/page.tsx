"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Megaphone, Search, Plus, Calendar, Tag, Edit, Trash2, Eye, Pin, Clock,
  AlertTriangle, CheckCircle, Info, Bell, ArrowUp
} from "lucide-react"
import { 
  mockAnnouncements, 
  announcementTypes, 
  announcementPriorities,
  announcementStatuses,
  announcementTags,
  type Announcement 
} from "@/data/mock/announcements"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)

  // 过滤公告
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || announcement.type === selectedType
    return matchesSearch && matchesType
  })

  // 置顶公告排在前面
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.status === "置顶" && b.status !== "置顶") return -1
    if (a.status !== "置顶" && b.status === "置顶") return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="space-y-6 p-6 min-h-screen bg-gray-50">
      {/* 页面标题区域 */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            更新和公告
          </h1>
          <p className="text-sm text-muted-foreground">
            管理和发布系统公告、更新通知和重要信息
          </p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)} 
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
        >
          <Plus className="h-4 w-4" />
          创建公告
        </Button>
      </div>

      {/* 统计卡片区域 */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500/5 to-blue-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总公告数</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Megaphone className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {announcements.length}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1 bg-green-50 text-green-600 hover:bg-green-100">
                  <CheckCircle className="h-3 w-3" />
                  已发布 {announcements.filter(a => a.status === "已发布").length}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  草稿 {announcements.filter(a => a.status === "草稿").length}
                </Badge>
              </div>
            </CardContent>
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
              <CardTitle className="text-sm font-medium">置顶公告</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Pin className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {announcements.filter(a => a.status === "置顶").length}
              </div>
            </CardContent>
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
              <CardTitle className="text-sm font-medium">本月发布</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {announcements.filter(a => {
                  const thisMonth = new Date().getMonth()
                  return new Date(a.date).getMonth() === thisMonth
                }).length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 搜索和筛选区域 */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索公告标题或内容..."
            className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px] bg-gray-50/50 border-gray-200">
              <SelectValue placeholder="公告类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              {announcementTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 公告列表区域 */}
      <ScrollArea className="h-[600px] rounded-xl border bg-white/50 backdrop-blur-sm">
        <AnimatePresence>
          <div className="space-y-4 p-4">
            {sortedAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "group relative overflow-hidden transition-all duration-200 hover:shadow-md",
                  announcement.status === "置顶" && "border-blue-200 bg-blue-50/30"
                )}>
                  {announcement.status === "置顶" && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  )}
                  {announcement.priority === "高" && (
                    <div className="absolute top-0 right-0 w-1 h-full bg-red-500" />
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl font-semibold">
                            {announcement.title}
                          </CardTitle>
                          {announcement.status === "置顶" && (
                            <Badge variant="secondary" className="animate-pulse bg-blue-100 text-blue-700">
                              <Pin className="h-3 w-3 mr-1" />
                              置顶
                            </Badge>
                          )}
                          <Badge variant={
                            announcement.priority === "高" ? "destructive" :
                            announcement.priority === "中" ? "default" :
                            "secondary"
                          } className="gap-1">
                            {announcement.priority === "高" && <AlertTriangle className="h-3 w-3" />}
                            {announcement.priority || "低"}优先级
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(announcement.date), 'PPP', { locale: zhCN })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            {announcement.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Info className="h-4 w-4" />
                            {announcement.author}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="gap-2 hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                          预览
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="gap-2 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => {
                            setEditingAnnouncement(announcement)
                            setDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          编辑
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                          删除
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 whitespace-pre-line">
                      {announcement.content}
                    </p>
                    {announcement.tags && announcement.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {announcement.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </ScrollArea>

      {/* 创建/编辑对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[1000px]">
            <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingAnnouncement ? "编辑公告" : "创建新公告"}
            </DialogTitle>
            <DialogDescription>
              在这里{editingAnnouncement ? "修改" : "创建"}系统公告，填写完成后点击保存。
            </DialogDescription>
            </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            {/* 左侧表单 */}
            <form className="space-y-4 pr-6 border-r">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  标题
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="请输入公告标题"
                  defaultValue={editingAnnouncement?.title}
                  className="bg-gray-50/50"
                />
                </div>

              <div className="grid gap-2">
                <Label htmlFor="content">
                  内容
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                  <Textarea
                    id="content"
                  placeholder="请输入公告内容"
                  rows={8}
                  defaultValue={editingAnnouncement?.content}
                  className="bg-gray-50/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">
                    公告类型
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select defaultValue={editingAnnouncement?.type}>
                    <SelectTrigger className="bg-gray-50/50">
                      <SelectValue placeholder="选择公告类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcementTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="priority">优先级</Label>
                  <Select defaultValue={editingAnnouncement?.priority || "低"}>
                    <SelectTrigger className="bg-gray-50/50">
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcementPriorities.map(priority => (
                        <SelectItem 
                          key={priority.value} 
                          value={priority.value}
                          className="flex items-center gap-2"
                        >
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            priority.value === "高" && "bg-red-500",
                            priority.value === "中" && "bg-yellow-500",
                            priority.value === "低" && "bg-green-500",
                          )} />
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">发布状态</Label>
                  <Select defaultValue={editingAnnouncement?.status || "草稿"}>
                    <SelectTrigger className="bg-gray-50/50">
                      <SelectValue placeholder="选择发布状态" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcementStatuses.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tags">标签</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-50/50">
                      <SelectValue placeholder="选择标签" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcementTags.map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="gap-2"
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                >
                  <CheckCircle className="h-4 w-4" />
                  {editingAnnouncement ? "保存修改" : "发布公告"}
                </Button>
              </DialogFooter>
            </form>

            {/* 右侧预览 */}
      <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">实时预览</Label>
                <Badge variant="outline" className="text-xs">
                  预览模式
                </Badge>
              </div>
              <Card className="bg-gray-50/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-semibold">
                      {editingAnnouncement?.title || "标题预览"}
                    </CardTitle>
                    {/* 状态标签 */}
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {editingAnnouncement?.status || "草稿"}
                    </Badge>
                    {/* 优先级标签 */}
                    <Badge variant="outline" className="gap-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        editingAnnouncement?.priority === "高" ? "bg-red-500" :
                        editingAnnouncement?.priority === "中" ? "bg-yellow-500" :
                        "bg-green-500"
                      )} />
                      {editingAnnouncement?.priority === "高" ? "高优先级" : 
                       editingAnnouncement?.priority === "中" ? "中优先级" : 
                       "低优先级"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {editingAnnouncement?.date ? 
                        format(new Date(editingAnnouncement.date), 'PPP', { locale: zhCN }) :
                        format(new Date(), 'PPP', { locale: zhCN })
                      }
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {editingAnnouncement?.type || "类型预览"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Info className="h-4 w-4" />
                      {editingAnnouncement?.author || "系统管理员"}
                    </div>
              </div>
            </CardHeader>
            <CardContent>
                  <p className="text-gray-600 whitespace-pre-line min-h-[200px]">
                    {editingAnnouncement?.content || "内容预览"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {editingAnnouncement?.tags?.map((tag, index) => (
                      <Badge variant="outline" className="bg-gray-50/50" key={index}>
                        {tag}
                      </Badge>
                    )) || (
                      <Badge variant="outline" className="bg-gray-50/50">
                        标签预览
                      </Badge>
                    )}
                  </div>
            </CardContent>
          </Card>
            </div>
      </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

