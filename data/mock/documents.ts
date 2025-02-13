export interface Document {
  id: string
  title: string
  type: "legal" | "manual" | "faq" | "policy"
  version: string
  lastUpdated: string
  status: "draft" | "published"
  author: string
  description?: string
  content?: string
  tags?: string[]
}

export const documentTypes = {
  legal: {
    label: "法律文件",
    color: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700"
  },
  manual: {
    label: "操作手册",
    color: "bg-green-500",
    badge: "bg-green-100 text-green-700"
  },
  faq: {
    label: "常见问题",
    color: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-700"
  },
  policy: {
    label: "政策文件",
    color: "bg-purple-500",
    badge: "bg-purple-100 text-purple-700"
  }
} as const

export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "隐私政策",
    type: "legal",
    version: "v2.1",
    lastUpdated: "2024-02-12",
    status: "published",
    author: "法务部",
    description: "用户数据收集和使用规范",
    content: `
# 隐私政策

## 1. 信息收集
我们收集的信息类型包括：
- 基本信息：姓名、联系方式
- 设备信息：设备型号、操作系统
- 使用数据：访问时间、使用时长

## 2. 信息使用
我们如何使用您的信息：
- 提供和改进服务
- 个性化用户体验
- 安全防护

## 3. 信息保护
我们采取的保护措施：
- 数据加密存储
- 访问权限控制
- 安全审计机制
    `
  },
  {
    id: "2",
    title: "用户协议",
    type: "legal",
    version: "v1.8",
    lastUpdated: "2024-02-10",
    status: "published",
    author: "法务部",
    description: "平台使用条款和规则",
    content: `
# 用户协议

## 服务条款
1. 服务范围
2. 用户责任
3. 平台权利

## 使用规则
- 遵守相关法律法规
- 不得从事违法活动
- 保护账号安全

## 其他条款
* 协议修改
* 争议解决
* 免责声明
    `
  },
  {
    id: "3",
    title: "操作手册",
    type: "manual",
    version: "v3.0",
    lastUpdated: "2024-02-08",
    status: "published",
    author: "技术部",
    description: "系统功能使用说明"
  },
  {
    id: "4",
    title: "常见问题",
    type: "faq",
    version: "v2.5",
    lastUpdated: "2024-02-05",
    status: "published",
    author: "客服部",
    description: "用户常见问题解答"
  }
] 