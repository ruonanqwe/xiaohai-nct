export interface Notification {
  id: string
  title: string
  content: string
  type: "info" | "warning" | "success" | "error"
  timestamp: string
  read: boolean
  icon?: string
  link?: string
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "新的补贴申请",
    content: "张三提交了一份新的教育补贴申请",
    type: "info",
    timestamp: "2025-02-13 14:30",
    read: false,
  },
  {
    id: "2",
    title: "系统更新",
    content: "系统将在今晚22:00进行例行维护",
    type: "warning",
    timestamp: "2025-02-12 10:15",
    read: false,
  },
  {
    id: "3",
    title: "申请审核完成",
    content: "李四的医疗补贴申请已被批准",
    type: "success",
    timestamp: "2025-02-11 16:45",
    read: true,
  },
  {
    id: "4",
    title: "数据异常警告",
    content: "检测到用户数据异常波动，请及时查看",
    type: "error",
    timestamp: "2025-02-10 09:20",
    read: true,
  }
]

export const notificationTypes = {
  info: {
    label: "信息",
    color: "bg-blue-500",
    icon: "Info",
    badge: "bg-blue-100 text-blue-700"
  },
  warning: {
    label: "警告",
    color: "bg-yellow-500",
    icon: "AlertTriangle",
    badge: "bg-yellow-100 text-yellow-700"
  },
  success: {
    label: "成功",
    color: "bg-green-500",
    icon: "CheckCircle",
    badge: "bg-green-100 text-green-700"
  },
  error: {
    label: "错误",
    color: "bg-red-500",
    icon: "AlertOctagon",
    badge: "bg-red-100 text-red-700"
  }
} as const 