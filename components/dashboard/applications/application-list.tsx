"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Application } from "@/data/mock/applications"
import { Eye, Phone, Users, Download, FileText } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ApplicationAnalysisService } from "@/lib/services/application-analysis"

interface ApplicationListProps {
  applications: Application[]
  onViewDetails: (application: Application) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onRequestDocuments: (id: string) => void
}

export function ApplicationList({
  applications,
  onViewDetails,
  onApprove,
  onReject,
  onRequestDocuments
}: ApplicationListProps) {
  // 获取智能审核建议
  const getAutoReviewResult = (application: Application) => {
    return ApplicationAnalysisService.autoReview(application)
  }

  return (
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
          {applications.map((application) => {
            const autoReview = getAutoReviewResult(application)
            const showWarning = autoReview.riskScore.score > 50

            return (
              <TableRow 
                key={application.id}
                className={cn({
                  "bg-red-50": showWarning && application.status === "待审核"
                })}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{application.applicant}</div>
                      <div className="text-sm text-muted-foreground">{application.contact}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{application.type}</TableCell>
                <TableCell>{application.category}</TableCell>
                <TableCell>¥{application.amount.toLocaleString()}</TableCell>
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
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      autoReview.recommendation === "批准" ? "default" :
                      autoReview.recommendation === "拒绝" ? "destructive" :
                      "secondary"
                    }>
                      {autoReview.confidence > 0.7 ? "AI建议" : "待定"}: {autoReview.recommendation}
                    </Badge>
                    {showWarning && (
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-2">
                            <p className="font-medium">风险提示</p>
                            <ul className="list-disc list-inside text-sm">
                              {autoReview.riskScore.factors.map((factor, index) => (
                                <li key={index}>{factor}</li>
                              ))}
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => onViewDetails(application)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>查看详情</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => window.location.href = `tel:${application.contact}`}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>联系申请人</TooltipContent>
                      </Tooltip>

                      {application.details.attachments && application.details.attachments.length > 0 && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>下载附件</TooltipContent>
                        </Tooltip>
                      )}

                      {application.status === "待审核" ? (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onRequestDocuments(application.id)}
                              >
                                补充材料
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>请求补充材料</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => onApprove(application.id)}
                              >
                                批准
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>批准申请</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onReject(application.id)}
                              >
                                拒绝
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>拒绝申请</TooltipContent>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                打印通知
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>打印审核通知</TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
} 