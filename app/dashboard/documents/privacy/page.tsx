"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, History, Eye } from "lucide-react"

interface PrivacyPolicy {
  id: string
  version: string
  content: string
  publishDate: string
  status: "published" | "draft"
  changelog: string
}

export default function PrivacyPolicyPage() {
  const [policies, setPolicies] = useState<PrivacyPolicy[]>([
    {
      id: "1",
      version: "v2.1",
      content: `# 隐私政策

## 1. 信息收集
我们收集的信息包括但不限于：
- 基本个人信息（姓名、联系方式等）
- 身份认证信息
- 补贴申请相关信息

## 2. 信息使用
我们收集的信息将用于：
- 处理补贴申请
- 验证申请资格
- 提供客户服务

## 3. 信息保护
我们采取严格的安全措施保护您的信息：
- 数据加密存储
- 访问权限控制
- 定期安全审计

## 4. 信息共享
我们不会未经您的同意与第三方共享您的个人信息，除非：
- 法律法规要求
- 政府部门依法查询
- 履行补贴发放义务所必需

## 5. 您的权利
您有权：
- 访问您的个人信息
- 更正不准确的信息
- 删除个人信息
- 撤回同意

## 6. 联系我们
如有任何问题，请联系：
电话：17318132503
邮箱：privacy@example.com`,
      publishDate: "2024-02-12",
      status: "published",
      changelog: "更新了数据保护相关条款",
    },
    {
      id: "2",
      version: "v2.0",
      content: "历史版本内容...",
      publishDate: "2024-01-15",
      status: "published",
      changelog: "全面更新隐私政策",
    },
  ])

  const [editingPolicy, setEditingPolicy] = useState<PrivacyPolicy | null>(null)
  const [previewMode, setPreviewMode] = useState<"web" | "mobile">("web")

  const handlePublish = (id: string) => {
    setPolicies(policies.map((policy) => (policy.id === id ? { ...policy, status: "published" as const } : policy)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">隐私政策管理</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>创建新版本</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>创建新版本</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="version">版本号</Label>
                <Input id="version" placeholder="例：v2.2" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">政策内容</Label>
                <Textarea
                  id="content"
                  placeholder="使用Markdown格式编写政策内容..."
                  className="min-h-[400px] font-mono"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="changelog">更新说明</Label>
                <Input id="changelog" placeholder="简要说明本次更新内容" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">保存为草稿</Button>
              <Button>发布</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">当前版本</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{policies[0].version}</div>
            <p className="text-xs text-muted-foreground">发布于 {policies[0].publishDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">历史版本数</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{policies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">查看次数</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">近7天</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">当前版本</TabsTrigger>
          <TabsTrigger value="history">历史版本</TabsTrigger>
          <TabsTrigger value="preview">预览</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>当前版本 ({policies[0].version})</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline">编辑</Button>
                  <Button>发布新版本</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea value={policies[0].content} className="min-h-[600px] font-mono" readOnly />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>历史版本</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{policy.version}</h4>
                        <Badge variant={policy.status === "published" ? "default" : "secondary"}>
                          {policy.status === "published" ? "已发布" : "草稿"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">发布于 {policy.publishDate}</p>
                      <p className="text-sm text-muted-foreground">{policy.changelog}</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        对比
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>预览效果</CardTitle>
                <div className="space-x-2">
                  <Button variant={previewMode === "web" ? "default" : "outline"} onClick={() => setPreviewMode("web")}>
                    网页版
                  </Button>
                  <Button
                    variant={previewMode === "mobile" ? "default" : "outline"}
                    onClick={() => setPreviewMode("mobile")}
                  >
                    移动版
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`border rounded-lg p-4 mx-auto ${previewMode === "mobile" ? "max-w-sm" : "max-w-4xl"}`}>
                <div className="prose max-w-none dark:prose-invert">
                  {/* 这里应该使用Markdown渲染组件来渲染内容 */}
                  <div dangerouslySetInnerHTML={{ __html: policies[0].content }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

