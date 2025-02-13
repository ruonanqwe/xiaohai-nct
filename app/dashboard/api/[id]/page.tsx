"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiCategories, apiStatuses, mockApiList } from "@/data/mock/apis"
import { type ApiStatus } from "@/types/api"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { TableCell } from "@/components/ui/table"

export default function ApiDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const api = mockApiList.find(api => api.id === parseInt(params.id))

  if (!api) {
    return <div>API不存在</div>
  }

  return (
    <div className="space-y-6 p-6 bg-background">
      {/* 导航和标题 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            返回
          </Button>
          <Badge variant={apiStatuses[api.status].variant}>
            {apiStatuses[api.status].label}
          </Badge>
        </div>

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">仪表盘</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/api">API管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            {api.name}
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {api.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {api.description}
          </p>
        </div>
      </div>

      {/* 基本信息卡片 */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">总调用次数</p>
            <h2 className="text-2xl font-bold text-foreground">{api.calls.toLocaleString()}</h2>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">平均响应时间</p>
            <h2 className="text-2xl font-bold text-foreground">{api.responseTime}ms</h2>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">版本</p>
            <h2 className="text-2xl font-bold text-foreground">{api.version}</h2>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">分类</p>
            <h2 className="text-2xl font-bold text-foreground">
              {apiCategories[api.category as keyof typeof apiCategories].label}
            </h2>
          </div>
        </Card>
      </div>

      {/* 详细信息标签页 */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="doc">接口文档</TabsTrigger>
          <TabsTrigger value="stats">使用统计</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">接口地址</h3>
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <code className="text-sm">/api/{api.version}/users</code>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">请求方法</h3>
                <Badge>GET</Badge>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">描述</h3>
                <p className="text-muted-foreground">{api.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">最后更新</h3>
                <p className="text-muted-foreground">
                  {api.lastModified ? format(new Date(api.lastModified), 'PPp', { locale: zhCN }) : '-'}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ... 其他标签页内容 ... */}
      </Tabs>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.push(`/dashboard/api/${api.id}/edit`)}>
          编辑
        </Button>
        <Button variant="destructive">
          删除
        </Button>
      </div>
    </div>
  )
} 