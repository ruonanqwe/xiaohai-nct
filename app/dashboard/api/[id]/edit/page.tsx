"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, Save, X } from "lucide-react"
import { apiCategories, apiStatuses, mockApiList } from "@/data/mock/apis"
import { type Api, type ApiStatus, type ApiCategory, type ApiMethod } from "@/types/api"

export default function ApiEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [api, setApi] = useState<Api | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // 加载API数据
  useEffect(() => {
    const loadedApi = mockApiList.find(a => a.id === params.id)
    if (loadedApi) {
      // 确保所有必需的字段都存在并进行类型转换
      const completeApi: Api = {
        id: String(loadedApi.id), // 确保 id 是字符串
        name: loadedApi.name,
        description: loadedApi.description || '', // 提供默认值
        version: loadedApi.version,
        category: loadedApi.category as ApiCategory, // 类型断言
        status: loadedApi.status,
        method: loadedApi.method || 'GET' as ApiMethod, // 提供默认值
        params: loadedApi.params || '{}', // 提供默认值
        response: loadedApi.response || '{}', // 提供默认值
        calls: loadedApi.calls,
        responseTime: loadedApi.responseTime,
        lastModified: loadedApi.lastModified || new Date().toISOString() // 提供默认值
      }
      setApi(completeApi)
    }
    setIsLoading(false)
  }, [params.id])

  // 添加类型保护函数
  function isValidApi(api: unknown): api is Api {
    if (!api || typeof api !== 'object') return false
    
    const a = api as any
    return (
      typeof a.id === 'string' &&
      typeof a.name === 'string' &&
      typeof a.description === 'string' &&
      typeof a.version === 'string' &&
      typeof a.category === 'string' &&
      typeof a.status === 'string' &&
      typeof a.method === 'string' &&
      typeof a.params === 'string' &&
      typeof a.response === 'string' &&
      typeof a.calls === 'number' &&
      typeof a.responseTime === 'number' &&
      typeof a.lastModified === 'string'
    )
  }

  // 处理保存
  const handleSave = async () => {
    try {
      setIsSaving(true)
      // TODO: 实现保存逻辑
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟保存延迟
      
      toast({
        title: "保存成功",
        description: "API配置已更新",
      })
      router.push("/dashboard/api")
    } catch (error) {
      toast({
        title: "保存失败",
        description: "更新API时发生错误",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>加载中...</div>
  }

  if (!api || !isValidApi(api)) {
    return <div>API数据无效</div>
  }

  return (
    <div className="space-y-6 p-8 max-w-5xl mx-auto">
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
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => router.push("/dashboard/api")}
            >
              <X className="h-4 w-4" />
              取消
            </Button>
            <Button 
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              保存更改
            </Button>
          </div>
        </div>

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">仪表盘</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/api">API管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/api/${api.id}`}>{api.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            编辑
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">编辑API</h1>
          <p className="text-sm text-muted-foreground">
            修改API接口的配置信息
          </p>
        </div>
      </div>

      {/* 编辑表单 */}
      <div className="grid gap-6">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>
              设置API的基本配置信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">API名称</Label>
                <Input
                  id="name"
                  value={api.name}
                  onChange={(e) => setApi({ ...api, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">版本</Label>
                <Input
                  id="version"
                  value={api.version}
                  onChange={(e) => setApi({ ...api, version: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">分类</Label>
                <Select
                  value={api.category}
                  onValueChange={(value: ApiCategory) => setApi({ ...api, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(apiCategories).map(([key, { label }]) => (
                      <SelectItem key={key} value={key as ApiCategory}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select
                  value={api.status}
                  onValueChange={(value: ApiStatus) => setApi({ ...api, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(apiStatuses).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                value={api.description}
                onChange={(e) => setApi({ ...api, description: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* 接口配置 */}
        <Card>
          <CardHeader>
            <CardTitle>接口配置</CardTitle>
            <CardDescription>
              配置API的请求和响应参数
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>请求方法</Label>
                <Select defaultValue="GET">
                  <SelectTrigger>
                    <SelectValue placeholder="选择请求方法" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>认证方式</Label>
                <Select defaultValue="token">
                  <SelectTrigger>
                    <SelectValue placeholder="选择认证方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">无需认证</SelectItem>
                    <SelectItem value="token">Token认证</SelectItem>
                    <SelectItem value="oauth">OAuth2认证</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>请求参数</Label>
              <Textarea
                placeholder="请输入JSON格式的请求参数示例"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>响应示例</Label>
              <Textarea
                placeholder="请输入JSON格式的响应示例"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* 高级设置 */}
        <Card>
          <CardHeader>
            <CardTitle>高级设置</CardTitle>
            <CardDescription>
              配置API的高级选项
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>缓存时间 (秒)</Label>
                <Input type="number" min="0" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>速率限制 (次/分钟)</Label>
                <Input type="number" min="1" placeholder="60" />
              </div>
              <div className="space-y-2">
                <Label>超时时间 (秒)</Label>
                <Input type="number" min="1" placeholder="30" />
              </div>
              <div className="space-y-2">
                <Label>重试次数</Label>
                <Input type="number" min="0" placeholder="3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 