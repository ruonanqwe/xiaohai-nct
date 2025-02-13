export const mockUsers = [
  {
    id: "01",
    name: "张大力",
    email: "zhangdali@example.com",
    role: "管理员",
    status: "活跃",
    lastLogin: "2024-02-25 09:30",
    registrationDate: "2023-12-01",
    department: "农业部"
  },
  {
    id: "02",
    name: "李小花",
    email: "lixiaohua@example.com",
    role: "普通用户",
    status: "活跃",
    lastLogin: "2024-02-24 15:45",
    registrationDate: "2023-12-15",
    department: "财政部"
  },
  {
    id: "03",
    name: "王建国",
    email: "wangjianguo@example.com",
    role: "普通用户",
    status: "禁用",
    lastLogin: "2024-02-20 11:20",
    registrationDate: "2024-01-05",
    department: "农业部"
  },
  {
    id: "04",
    name: "赵玲玲",
    email: "zhaolingling@example.com",
    role: "管理员",
    status: "活跃",
    lastLogin: "2024-02-25 10:15",
    registrationDate: "2023-11-20",
    department: "财政部"
  },
  {
    id: "05",
    name: "钱明",
    email: "qianming@example.com",
    role: "普通用户",
    status: "活跃",
    lastLogin: "2024-02-23 14:30",
    registrationDate: "2024-01-10",
    department: "农业部"
  }
]

export const mockDepartments = [
  { id: "1", name: "农业部" },
  { id: "2", name: "财政部" }
]

export const mockRoles = [
  { id: "1", name: "管理员" },
  { id: "2", name: "普通用户" }
]

export const mockStatistics = {
  totalUsers: 5,
  activeUsers: 4,
  disabledUsers: 1,
  departmentDistribution: {
    "农业部": 3,
    "财政部": 2
  },
  roleDistribution: {
    "管理员": 2,
    "普通用户": 3
  },
  registrationTrend: [
    { month: "2023-11", count: 1 },
    { month: "2023-12", count: 2 },
    { month: "2024-01", count: 2 }
  ]
} 