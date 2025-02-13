export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ApiStatus = 'active' | 'inactive' | 'deprecated' | 'testing'
export type ApiCategory = 'core' | 'business' | 'utility' | 'analytics'

export interface Api {
  id: string
  name: string
  description: string
  version: string
  category: ApiCategory
  status: ApiStatus
  method: ApiMethod
  params: string
  response: string
  calls: number
  responseTime: number
  lastModified: string
}

export const apiCategories: Record<ApiCategory, { label: string }> = {
  core: { label: '核心功能' },
  business: { label: '业务功能' },
  utility: { label: '工具功能' },
  analytics: { label: '分析功能' }
}

export const apiStatuses: Record<ApiStatus, {
  label: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
}> = {
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
} 