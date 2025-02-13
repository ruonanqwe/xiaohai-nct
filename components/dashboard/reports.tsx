"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Filter, Search, FileUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { ReportDialog } from "./report-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useReportManagement } from "@/contexts/report-management-context"
import { mockReportTypes, mockReportCategories } from "@/data/mock/reports"
import type { Report } from "@/types/report"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export function ReportsManagement() {
  const { 
    reports, 
    addReport, 
    updateReport, 
    deleteReport,
    viewReport,
    downloadReport 
  } = useReportManagement()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<Report | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingReportId, setDeletingReportId] = useState<string | null>(null)

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || report.type === selectedType
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory

    return matchesSearch && matchesType && matchesCategory
  })

  const handleSubmit = (data: any) => {
    if (editingReport) {
      // 处理编辑
      const updatedReports = reports.map(report =>
        report.id === editingReport.id
          ? { ...report, ...data, date: new Date().toISOString().split('T')[0] }
          : report
      )
      updateReport(editingReport.id, data)
    } else {
      // 处理新增
      const newReport = {
        id: String(Date.now()),
        ...data,
        date: new Date().toISOString().split('T')[0],
        fileSize: data.file ? `${(data.file.size / (1024 * 1024)).toFixed(1)}MB` : "0MB"
      }
      addReport(data)
    }
    setEditingReport(null)
  }

  const handleStatusChange = (reportId: string, status: Report['status']) => {
    updateReport(reportId, { status })
  }

  const handleDeleteClick = (reportId: string) => {
    setDeletingReportId(reportId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingReportId) {
      deleteReport(deletingReportId)
      setDeleteDialogOpen(false)
      setDeletingReportId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* 添加新报告按钮 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">报告管理</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <FileUp className="h-4 w-4 mr-2" />
          上传新报告
        </Button>
      </div>

      {/* 搜索和筛选区域 */}
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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="报告类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            {mockReportTypes.map(type => (
              <SelectItem key={type.id} value={type.name}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="报告分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            {mockReportCategories.map(category => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 报告列表 */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    {report.status === "draft" && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        草稿
                      </span>
                    )}
                    {report.status === "archived" && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        已归档
                      </span>
                    )}
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    <Eye className="h-4 w-4 inline mr-1" />
                    {report.views}
                    <Download className="h-4 w-4 inline mx-1" />
                    {report.downloads}
                  </div>
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    作者: {report.author} | 发布日期: {report.date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    类型: {report.type} | 分类: {report.category} | 大小: {report.fileSize}
                  </p>
                  {report.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {report.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewReport(report.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    预览
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => downloadReport(report.id)}
                    disabled={report.status === "draft"}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    下载
                  </Button>
                  <Select
                    value={report.status}
                    onValueChange={(value) => 
                      handleStatusChange(report.id, value as Report['status'])
                    }
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">草稿</SelectItem>
                      <SelectItem value="published">已发布</SelectItem>
                      <SelectItem value="archived">已归档</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(report.id)}
                  >
                    删除
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">没有找到匹配的报告</p>
        </div>
      )}

      {/* 添加对话框组件 */}
      <ReportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editingReport}
      />

      {/* 添加确认对话框 */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="删除报告"
        description="确定要删除这份报告吗？此操作无法撤销。"
      />
    </div>
  )
} 