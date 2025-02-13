// 用户增长数据
export const userGrowthData = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  users: [4000, 3000, 2000, 2800, 2000, 2300],
  applications: [2500, 1500, 10000, 4000, 5000, 3500],
}

// 总体统计数据
export const overallStats = {
  totalUsers: {
    value: 10000,
    trend: "+10%",
    description: "较上月"
  },
  activeUsers: {
    value: 8000,
    trend: "+5%",
    description: "较上月"
  },
  totalApplications: {
    value: 5000,
    trend: "+20%",
    description: "较上月"
  },
  totalAmount: {
    value: 500000,
    trend: "+15%",
    description: "较上月"
  }
}

// 补贴类型分布
export const subsidyTypeDistribution = [
  { type: "教育补贴", count: 2000, amount: 200000 },
  { type: "医疗补贴", count: 1500, amount: 150000 },
  { type: "住房补贴", count: 1000, amount: 100000 },
  { type: "创业补贴", count: 500, amount: 50000 }
]

// 申请状态分布
export const applicationStatusDistribution = [
  { status: "待审核", count: 1000 },
  { status: "已批准", count: 3500 },
  { status: "已拒绝", count: 500 }
]

// 月度趋势数据
export const monthlyTrends = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  applications: [500, 700, 1000, 800, 1200, 900],
  approvalRate: [85, 88, 90, 87, 92, 89],
  averageAmount: [8000, 8500, 9000, 8800, 9200, 9100]
}

// 区域分布数据
export const districtDistribution = [
  { district: "东城区", count: 1200, amount: 120000 },
  { district: "西城区", count: 1000, amount: 100000 },
  { district: "朝阳区", count: 800, amount: 80000 },
  { district: "海淀区", count: 1500, amount: 150000 },
  { district: "丰台区", count: 500, amount: 50000 }
]

// 用户画像数据
export const userDemographics = {
  ageGroups: [
    { range: "18-25", count: 1000 },
    { range: "26-35", count: 2500 },
    { range: "36-45", count: 3500 },
    { range: "46-55", count: 2000 },
    { range: "56+", count: 1000 }
  ],
  income: [
    { range: "0-3000", count: 2000 },
    { range: "3001-5000", count: 3000 },
    { range: "5001-8000", count: 3500 },
    { range: "8001-12000", count: 1000 },
    { range: "12000+", count: 500 }
  ],
  familySize: [
    { size: "1-2人", count: 2000 },
    { size: "3-4人", count: 5000 },
    { size: "5-6人", count: 2500 },
    { size: "7人以上", count: 500 }
  ]
}

// 补贴发放效率
export const processingEfficiency = {
  averageProcessingTime: 3.5, // 天
  approvalRate: 85, // 百分比
  monthlyComparison: [
    { month: "1月", time: 4.2 },
    { month: "2月", time: 4.0 },
    { month: "3月", time: 3.8 },
    { month: "4月", time: 3.5 },
    { month: "5月", time: 3.3 },
    { month: "6月", time: 3.2 }
  ]
}

// 热门补贴排行
export const topSubsidies = [
  {
    type: "教育补贴",
    applications: 1200,
    totalAmount: 120000,
    growth: "+15%"
  },
  {
    type: "医疗补贴",
    applications: 1000,
    totalAmount: 100000,
    growth: "+12%"
  },
  {
    type: "住房补贴",
    applications: 800,
    totalAmount: 160000,
    growth: "+10%"
  },
  {
    type: "创业补贴",
    applications: 500,
    totalAmount: 200000,
    growth: "+8%"
  },
  {
    type: "养老补贴",
    applications: 300,
    totalAmount: 60000,
    growth: "+5%"
  }
] 