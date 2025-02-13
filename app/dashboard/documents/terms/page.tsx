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

interface Terms {
  id: string
  version: string
  content: string
  publishDate: string
  status: "published" | "draft"
  changelog: string
}

export default function TermsPage() {
  const [terms, setTerms] = useState<Terms[]>([
    {
      id: "1",
      version: "v2.1",
      content: `# 用户协议

## 1. 协议范围
本协议是您与我们之间关于使用农业财务管理系统的约定。

## 2. 账户注册
2.1 注册资格
- 具有完全民事行为能力的自然人
- 法律法规允许的组织机构

2.2 注册流程
- 提供真实、准确的信息
- 设置安全的账户密码
- 保护账户安全

## 3. 服务内容
3.1 补贴申请
- 提供补贴信息查询
- 在线提交补贴申请
- 跟踪申请进度

3.2 信息管理
- 维护个人/家庭信息
- 管理申请记录
- 查看补贴发放情况

## 4. 用户义务
- 遵守法律法规
- 提供真实信息
- 保护账户安全
- 合理使用系统

## 5. 免责声明
- 系统维护导致的暂时无法使用
- 不可抗力因素导致的服务中断
- 第三方原因导致的损失

## 6. 协议修改
我们保留修改本协议的权利，修改后的协议将通过网站公告通知用户。

## 7. 联系方式
如有问题，请联系：
电话：17318132503
邮箱：1963876196@qq.com`,
      publishDate: "2024-02-12",
      status: "published",
      changelog: "更新了服务内容相关条款",
    },
    {
      id: "2",
      version: "v2.0",
      content: "历史版本内容...",
      publishDate: "2024-01-15",
      status: "published",
      changelog: "全面更新用户协议",
    },
  ])

  const [previewMode, setPreviewMode] = useState<"web" | "mobile">("web")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">用户协议管理</h2>
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
                <Label htmlFor="content">协议内容</Label>
                <Textarea
                  id="content"
                  placeholder="使用Markdown格式编写协议内容..."
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
            <div className="text-2xl font-bold">{terms[0].version}</div>
            <p className="text-xs text-muted-foreground">发布于 {terms[0].publishDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">历史版本数</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{terms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">查看次数</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
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
                <CardTitle>当前版本 ({terms[0].version})</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline">编辑</Button>
                  <Button>发布新版本</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea value={terms[0].content} className="min-h-[600px] font-mono" readOnly />
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
                {terms.map((term) => (
                  <div key={term.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{term.version}</h4>
                        <Badge variant={term.status === "published" ? "default" : "secondary"}>
                          {term.status === "published" ? "已发布" : "草稿"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">发布于 {term.publishDate}</p>
                      <p className="text-sm text-muted-foreground">{term.changelog}</p>
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
                  <div dangerouslySetInnerHTML={{ __html: terms[0].content }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

