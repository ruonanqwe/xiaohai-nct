"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Application } from "@/data/mock/applications"
import { FileText, Phone, Calendar, User, Clock, Download } from "lucide-react"

interface ApplicationDetailDialogProps {
  application: Application | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  onRequestDocuments?: (id: string) => void
}

export function ApplicationDetailDialog({
  application,
  open,
  onOpenChange,
  onApprove,
  onReject,
  onRequestDocuments
}: ApplicationDetailDialogProps) {
  if (!application) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>申请详情</DialogTitle>
            <Badge
              variant={
                application.status === "已批准" ? "default" :
                application.status === "已拒绝" ? "destructive" :
                "secondary"
              }
            >
              {application.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">基本信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>申请人：{application.applicant}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>联系方式：{application.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>申请日期：{application.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>优先级：
                  <Badge variant={
                    application.priority === "高" ? "destructive" :
                    application.priority === "中" ? "default" :
                    "secondary"
                  }>
                    {application.priority}
                  </Badge>
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* 补贴信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">补贴信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>补贴类型：{application.type}</div>
              <div>补贴类别：{application.category}</div>
              <div>申请金额：¥{application.amount.toLocaleString()}</div>
            </div>
          </div>

          <Separator />

          {/* 申请原因 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">申请原因</h3>
            <p className="text-gray-600">{application.details.reason}</p>
          </div>

          {/* 附件材料 */}
          {application.details.attachments && application.details.attachments.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">附件材料</h3>
                <div className="flex flex-wrap gap-2">
                  {application.details.attachments.map((file, index) => (
                    <Button key={index} variant="outline" size="sm" className="gap-2">
                      <FileText className="h-4 w-4" />
                      {file}
                      <Download className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 审核信息 */}
          {application.details.reviewComments && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">审核信息</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">{application.details.reviewComments}</p>
                  {application.details.reviewer && (
                    <p className="text-sm text-muted-foreground">
                      审核人：{application.details.reviewer}
                      {application.details.reviewDate && ` (${application.details.reviewDate})`}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* 操作按钮 */}
          {application.status === "待审核" && (
            <>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => onRequestDocuments?.(application.id)}
                >
                  请求补充材料
                </Button>
                <Button
                  variant="default"
                  onClick={() => onApprove?.(application.id)}
                >
                  批准申请
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onReject?.(application.id)}
                >
                  拒绝申请
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 