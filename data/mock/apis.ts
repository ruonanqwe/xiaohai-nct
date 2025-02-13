import { ApiMethod, ApiStatus, ApiCategory } from "@/types/api"

export const apiCategories = {
  core: {
    label: "核心功能",
    description: "系统核心业务功能"
  },
  business: {
    label: "业务功能",
    description: "补贴申请相关功能"
  },
  analytics: {
    label: "分析功能",
    description: "数据统计和分析"
  },
  tools: {
    label: "工具功能",
    description: "辅助工具和功能"
  },
  notification: {
    label: "通知功能",
    description: "消息推送和通知"
  }
} as const

export const apiStatuses = {
  active: {
    label: '活跃',
    variant: 'default'
  },
  inactive: {
    label: '停用',
    variant: 'secondary'
  },
  deprecated: {
    label: '已弃用',
    variant: 'destructive'
  },
  testing: {
    label: '测试中',
    variant: 'outline'
  }
} as const

export const mockApiStats = {
  totalApis: 5,
  totalCalls: 48100,
  avgResponseTime: 240,
  activeApiRatio: 60,
  lastMonthStats: {
    apis: 3,
    calls: "20.1%",
    responseTime: "-5%",
    activeRatio: "+10%"
  }
}

export const mockApiList = [
  {
    id: "1",
    name: "用户认证",
    description: "用户登录和认证接口",
    version: "v1",
    category: "core" as ApiCategory,
    status: "active" as ApiStatus,
    method: "POST" as ApiMethod,
    params: JSON.stringify({
      username: "string",
      password: "string"
    }, null, 2),
    response: JSON.stringify({
      token: "string",
      user: { id: "string", name: "string" }
    }, null, 2),
    calls: 15000,
    responseTime: 120,
    lastModified: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    name: "补贴申请",
    description: "补贴申请流程和审核相关接口",
    version: "v2",
    category: "business" as ApiCategory,
    status: "testing" as ApiStatus,
    method: "POST" as ApiMethod,
    params: JSON.stringify({
      applicationId: "string",
      data: "object"
    }, null, 2),
    response: JSON.stringify({
      success: "boolean",
      message: "string"
    }, null, 2),
    calls: 5000,
    responseTime: 200,
    lastModified: "2024-01-14T15:30:00Z"
  },
  {
    id: 3,
    name: "数据统计",
    category: "analytics",
    version: "v1",
    status: "deprecated" as ApiStatus,
    calls: 100,
    responseTime: 500,
    description: "数据分析和报表生成接口",
    lastUpdated: "2024-03-10T09:15:00Z"
  },
  {
    id: 4,
    name: "文件上传",
    category: "tools",
    version: "v1",
    status: "active" as ApiStatus,
    calls: 8000,
    responseTime: 300,
    description: "文件上传和管理接口",
    lastUpdated: "2024-03-13T11:20:00Z"
  },
  {
    id: 5,
    name: "消息推送",
    category: "notification",
    version: "v2",
    status: "active" as ApiStatus,
    calls: 20000,
    responseTime: 80,
    description: "系统消息和通知推送接口",
    lastUpdated: "2024-03-15T08:45:00Z"
  }
] 