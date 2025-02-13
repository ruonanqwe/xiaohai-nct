"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  FileUp,
  Calendar,
  Filter,
  Trash2,
  Share2,
  History
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ReportDialog } from "./report-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

interface Report {
  id: string
  title: string
  description: string
  date: string
  type: string
  category: string
  fileSize: string
  status: "published" | "draft" | "archived"
  author: string
  views: number
  downloads: number
  lastModified: string
  tags: string[]
}

// 初始报告数据
const initialReports: Report[] = [
  {
    id: "1",
    title: "2025年第一季度工作报告",
    description: "包括用户增长、补贴发放等数据统计",
    date: "2025-02-20",
    type: "季度报告",
    category: "工作总结",
    fileSize: "2.5MB",
    status: "published",
    author: "张三",
    views: 156,
    downloads: 45,
    lastModified: "2025-02-20",
    tags: ["季度报告", "数据统计", "工作总结"]
  },
  {
    id: "2",
    title: "2024年度工作总结",
    description: "全年工作成果与来年计划",
    date: "2024-12-31",
    type: "年度报告",
    category: "工作总结",
    fileSize: "5.8MB",
    status: "draft",
    author: "李四",
    views: 89,
    downloads: 23,
    lastModified: "2025-01-15",
    tags: ["年度报告", "工作总结"]
  }
]

export function ReportsManagement() {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<Report | null>(null)

  // 统计数据
  const stats = {
    total: reports.length,
    published: reports.filter((r: Report) => r.status === "published").length,
    drafts: reports.filter((r: Report) => r.status === "draft").length,
    archived: reports.filter((r: Report) => r.status === "archived").length,
    totalViews: reports.reduce((acc: number, r: Report) => acc + r.views, 0),
    totalDownloads: reports.reduce((acc: number, r: Report) => acc + r.downloads, 0),
  }

  const filteredReports = reports.filter((report: Report) => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || report.type === selectedType
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory
    const matchesStatus = activeTab === "all" || report.status === activeTab

    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* 顶部统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总报告数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              已发布 {stats.published} | 草稿 {stats.drafts}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总浏览量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <Progress value={75} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">下载次数</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads}</div>
            <Progress value={60} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">归档报告</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.archived}</div>
            <div className="text-xs text-muted-foreground mt-1">
              占比 {((stats.archived / stats.total) * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 操作栏 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索报告..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="报告类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="年度报告">年度报告</SelectItem>
            <SelectItem value="季度报告">季度报告</SelectItem>
            <SelectItem value="专项报告">专项报告</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="报告分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            <SelectItem value="工作总结">工作总结</SelectItem>
            <SelectItem value="数据分析">数据分析</SelectItem>
            <SelectItem value="政策分析">政策分析</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setDialogOpen(true)}>
          <FileUp className="h-4 w-4 mr-2" />
          上传新报告
        </Button>
      </div>

      {/* 报告列表 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="published">已发布</TabsTrigger>
          <TabsTrigger value="draft">草稿箱</TabsTrigger>
          <TabsTrigger value="archived">已归档</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          {report.status === "draft" && (
                            <Badge variant="secondary">草稿</Badge>
                          )}
                          {report.status === "archived" && (
                            <Badge variant="outline">已归档</Badge>
                          )}
                        </div>
                        <CardDescription>{report.description}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          {report.tags.map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {report.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {report.views} 次浏览
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {report.downloads} 次下载
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          类型: {report.type} | 分类: {report.category} | 大小: {report.fileSize}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          预览
                        </Button>
                        <Button size="sm" disabled={report.status === "draft"}>
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          分享
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingReport(report)
                            setDialogOpen(true)
                          }}
                        >
                          编辑
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* 上传/编辑对话框 */}
      <ReportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={(data) => {
          console.log('提交数据:', data)
          setDialogOpen(false)
        }}
        initialData={editingReport}
      />
    </div>
  )
} 