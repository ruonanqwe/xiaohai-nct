"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  Search, Filter, FileText, CheckCircle, XCircle, Eye, 
  AlertTriangle, Clock, Phone, User, Calendar, FileCheck, Users, Download 
} from "lucide-react"
import { 
  mockApplications, 
  mockSubsidyTypes, 
  mockApplicationStatuses,
  mockPriorities,
  type Application 
} from "@/data/mock/applications"
import { useRouter } from "next/navigation"

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const router = useRouter()

  // 统计数据
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === "待审核").length,
    approved: applications.filter(app => app.status === "已批准").length,
    rejected: applications.filter(app => app.status === "已拒绝").length,
  }

  // 处理审批
  const handleApprove = (id: string) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id ? { 
          ...app, 
          status: "已批准",
          details: {
            ...app.details,
            reviewDate: new Date().toISOString().split('T')[0],
            reviewer: "当前审核员"
          }
        } : app
      )
    )
  }

  // 处理拒绝
  const handleReject = (id: string) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id ? {
          ...app,
          status: "已拒绝",
          details: {
            ...app.details,
            reviewDate: new Date().toISOString().split('T')[0],
            reviewer: "当前审核员"
          }
        } : app
      )
    )
  }

  // 过滤申请
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesType = typeFilter === "all" || app.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleDownloadFiles = (files: string[] | undefined) => {
    if (!files?.length) return
    console.log('下载文件:', files)
  }

  const handleRequestDocuments = (id: string) => {
    console.log('请求补充材料:', id)
  }

  const handlePrintNotice = (application: Application) => {
    console.log('打印通知:', application)
  }

  const handleReview = (id: string) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id ? {
          ...app,
          status: "待审核",
          details: {
            ...app.details,
            reviewDate: undefined,
            reviewComments: undefined
          }
        } : app
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">申请审核</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            待处理: {stats.pending}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <FileCheck className="h-3 w-3" />
            已处理: {stats.approved + stats.rejected}
          </Badge>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总申请数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审核</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已批准</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已拒绝</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索申请人、补贴类型..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="补贴类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有类型</SelectItem>
            {mockSubsidyTypes.map(type => (
              <SelectItem key={type.value} value={type.label}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="申请状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有状态</SelectItem>
            {mockApplicationStatuses.map(status => (
              <SelectItem key={status.value} value={status.label}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 申请列表 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>申请人</TableHead>
              <TableHead>补贴类型</TableHead>
              <TableHead>类别</TableHead>
              <TableHead>申请金额</TableHead>
              <TableHead>优先级</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>申请日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{application.applicant}</div>
                      <div className="text-sm text-muted-foreground">{application.contact}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{application.type}</TableCell>
                <TableCell>{application.category}</TableCell>
                <TableCell>¥{application.amount}</TableCell>
                <TableCell>
                  <Badge variant={
                    application.priority === "高" ? "destructive" :
                    application.priority === "中" ? "default" :
                    "secondary"
                  }>
                    {application.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    application.status === "已批准" ? "default" :
                    application.status === "已拒绝" ? "destructive" :
                    "secondary"
                  }>
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell>{application.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setSelectedApp(application)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => window.location.href = `tel:${application.contact}`}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => router.push(`/dashboard/families/${application.familyId}`)}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                    {application.details.attachments && application.details.attachments.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDownloadFiles(application.details.attachments)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {application.status === "待审核" && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApprove(application.id)}
                          className="h-8"
                        >
                          批准
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(application.id)}
                          className="h-8"
                        >
                          拒绝
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRequestDocuments(application.id)}
                          className="h-8"
                        >
                          补充材料
                        </Button>
                      </>
                    )}
                    {(application.status === "已批准" || application.status === "已拒绝") && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrintNotice(application)}
                          className="h-8"
                        >
                          打印通知
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(application.id)}
                          className="h-8"
                        >
                          重新审核
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 详情对话框 */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>申请详情</DialogTitle>
            <DialogDescription>
              申请编号: {selectedApp?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>申请人: {selectedApp.applicant}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>联系方式: {selectedApp.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>申请日期: {selectedApp.date}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">补贴信息</h4>
                  <div className="space-y-2">
                    <div>补贴类型: {selectedApp.type}</div>
                    <div>申请金额: ¥{selectedApp.amount}</div>
                    <div>补贴类别: {selectedApp.category}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">申请原因</h4>
                <p>{selectedApp.details.reason}</p>
              </div>

              {selectedApp.details.notes && (
                <div>
                  <h4 className="font-medium mb-2">备注说明</h4>
                  <p>{selectedApp.details.notes}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">附件材料</h4>
                <div className="flex gap-2">
                  {selectedApp.details.attachments?.map((file, index) => (
                    <Badge key={index} variant="secondary">
                      <FileText className="h-4 w-4 mr-1" />
                      {file}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedApp.details.reviewComments && (
                <div>
                  <h4 className="font-medium mb-2">审核意见</h4>
                  <div className="space-y-2">
                    <p>{selectedApp.details.reviewComments}</p>
                    {selectedApp.details.reviewer && (
                      <div className="text-sm text-muted-foreground">
                        审核人: {selectedApp.details.reviewer}
                        {selectedApp.details.reviewDate && ` (${selectedApp.details.reviewDate})`}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

