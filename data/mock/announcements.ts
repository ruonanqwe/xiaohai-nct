export interface Announcement {
  id: string
  title: string
  content: string
  type: "系统更新" | "政策变更" | "系统维护" | "其他"
  status: "已发布" | "草稿" | "置顶"
  date: string
  author: string
  tags?: string[]
  priority?: "高" | "中" | "低"
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "系统升级通知",
    content: "我们将在本周末进行系统升级，届时系统将暂停服务4小时。\n\n升级内容包括：\n1. 性能优化\n2. 安全性提升\n3. 新功能上线",
    type: "系统更新",
    status: "已发布",
    date: "2025-01-20",
    author: "系统管理员",
    priority: "高",
    tags: ["系统更新", "维护", "重要"]
  },
  {
    id: "2",
    title: "新政策实施通知",
    content: "从下月起，我们将实施新的补贴申请流程，请各位用户注意。\n\n主要变更：\n1. 简化申请步骤\n2. 提高审核效率\n3. 优化补贴发放时间",
    type: "政策变更",
    status: "置顶",
    date: "2025-02-13",
    author: "政策部门",
    priority: "高",
    tags: ["政策更新", "重要"]
  },
  {
    id: "3",
    title: "年度系统维护计划",
    content: "我们将于本月底进行年度系统维护，可能会影响部分功能的使用。\n\n维护范围：\n1. 数据库优化\n2. 服务器升级\n3. 安全漏洞修复",
    type: "系统维护",
    status: "草稿",
    date: "2025-02-12",
    author: "技术部门",
    priority: "中",
    tags: ["维护"]
  },
  {
    id: "4",
    title: "节假日工作安排",
    content: "关于春节期间的工作安排通知。\n\n请各部门注意：\n1. 值班安排\n2. 紧急联系方式\n3. 特殊情况处理流程",
    type: "其他",
    status: "已发布",
    date: "2025-02-01",
    author: "人事部门",
    priority: "中",
    tags: ["通知", "假期"]
  }
]

export const announcementTypes = [
  { value: "系统更新", label: "系统更新" },
  { value: "政策变更", label: "政策变更" },
  { value: "系统维护", label: "系统维护" },
  { value: "其他", label: "其他" }
] as const

export const announcementStatuses = [
  { value: "已发布", label: "已发布" },
  { value: "草稿", label: "草稿" },
  { value: "置顶", label: "置顶" }
] as const

export const announcementPriorities = [
  { value: "高", label: "高", color: "red" },
  { value: "中", label: "中", color: "yellow" },
  { value: "低", label: "低", color: "green" }
] as const

export const announcementTags = [
  "系统更新",
  "维护",
  "重要",
  "政策更新",
  "通知",
  "假期",
  "培训",
  "活动"
] as const 