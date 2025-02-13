export const mockFamilies = [
  {
    id: "1",
    name: "张小家",
    members: 4,
    address: "北京市朝阳区",
    monthlyIncome: 20000,
    subsidyStatus: "issued",
    lastUpdate: "2024-03-15",
    district: "urban",
    houseType: "commercial",
    registrationDate: "2024-01-15",
    members_detail: [
      { id: "1", name: "张大力", relation: "householder", age: 45, occupation: "engineer", income: 12000 },
      { id: "2", name: "李小花", relation: "spouse", age: 42, occupation: "teacher", income: 8000 },
      { id: "3", name: "张小明", relation: "child", age: 15, occupation: "student", income: 0 },
      { id: "4", name: "张小红", relation: "child", age: 12, occupation: "student", income: 0 }
    ]
  },
  {
    id: "2",
    name: "李家",
    members: 3,
    address: "上海市浦东新区",
    monthlyIncome: 25000,
    subsidyStatus: "pending",
    lastUpdate: "2024-03-10",
    district: "urban",
    houseType: "rental",
    registrationDate: "2024-02-20",
    members_detail: [
      {
        id: "3",
        name: "李明",
        relation: "householder",
        age: 35,
        occupation: "engineer",
        income: 15000
      }
    ]
  }
]

export const mockSubsidyApplications = [
  {
    id: "1",
    familyId: "1",
    type: "education",
    amount: 5000,
    status: "issued",
    applyDate: "2024-01-20",
    approveDate: "2024-02-01",
    description: "子女教育补贴申请"
  },
  {
    id: "2",
    familyId: "2",
    type: "housing",
    amount: 3000,
    status: "pending",
    applyDate: "2024-03-01",
    description: "租房补贴申请"
  }
]

export const mockSubsidyTypes = [
  { value: "education", label: "教育补贴", maxAmount: 10000 },
  { value: "medical", label: "医疗补贴", maxAmount: 20000 },
  { value: "housing", label: "住房补贴", maxAmount: 5000 }
]

export const mockDistricts = [
  { value: "urban", label: "城区" },
  { value: "suburban", label: "郊区" },
  { value: "rural", label: "农村" }
]

export const mockHouseTypes = [
  { value: "commercial", label: "商品房" },
  { value: "rental", label: "租房" },
  { value: "affordable", label: "保障房" },
  { value: "other", label: "其他" }
]

export const mockStatistics = {
  totalFamilies: 2,
  totalMembers: 7,
  averageIncome: 22500,
  subsidyDistribution: {
    "education": 1,
    "housing": 1,
    "medical": 0
  },
  districtDistribution: {
    "urban": 2,
    "suburban": 0,
    "rural": 0
  },
  monthlyTrend: [
    { month: "2023-11", families: 1, subsidies: 0 },
    { month: "2023-12", families: 2, subsidies: 1 },
    { month: "2024-01", families: 3, subsidies: 2 },
    { month: "2024-02", families: 2, subsidies: 3 },
    { month: "2024-03", families: 4, subsidies: 2 },
    { month: "2024-04", families: 3, subsidies: 4 }
  ]
}

export const mockSubsidyTrends = {
  monthly: [
    { month: "2023-11", applications: 2, approvals: 0, totalAmount: 0 },
    { month: "2023-12", applications: 3, approvals: 1, totalAmount: 5000 },
    { month: "2024-01", applications: 4, approvals: 2, totalAmount: 8000 },
    { month: "2024-02", applications: 3, approvals: 3, totalAmount: 12000 },
    { month: "2024-03", applications: 5, approvals: 2, totalAmount: 7000 },
    { month: "2024-04", applications: 4, approvals: 4, totalAmount: 15000 }
  ],
  byType: {
    "education": { count: 12, amount: 25000 },
    "medical": { count: 8, amount: 16000 },
    "housing": { count: 5, amount: 6000 }
  },
  byDistrict: {
    "urban": { count: 15, amount: 30000 },
    "suburban": { count: 6, amount: 12000 },
    "rural": { count: 4, amount: 5000 }
  }
}

export const mockDashboardStats = {
  totalUsers: 2,
  totalUserChange: 20.1,
  familyAccounts: 2,
  familyAccountChange: 10.5,
  subsidyApplications: 2,
  subsidyApplicationChange: 35.2,
  pendingReviews: 2,
  pendingReviewChange: 4.1
}

export const mockRelationTypes = [
  { value: "householder", label: "户主" },
  { value: "spouse", label: "配偶" },
  { value: "child", label: "子女" },
  { value: "parent", label: "父母" }
]

export const mockOccupationTypes = [
  { value: "engineer", label: "工程师" },
  { value: "teacher", label: "教师" },
  { value: "student", label: "学生" },
  { value: "other", label: "其他" }
]

export const mockSubsidyCategories = [
  { value: "education", label: "教育补贴" },
  { value: "medical", label: "医疗补贴" },
  { value: "housing", label: "住房补贴" }
]

export const mockApplicationStatuses = [
  { value: "pending", label: "待审核" },
  { value: "approved", label: "已通过" },
  { value: "issued", label: "已发放" },
  { value: "rejected", label: "已拒绝" }
]

export const mockRecentActivities = [
  {
    date: "2024-02-20",
    title: "提交补贴申请",
    type: "education",
    status: "pending",
    description: "教育补贴申请已提交，等待审核"
  },
  {
    date: "2024-02-15",
    title: "更新家庭信息",
    description: "更新了家庭住址信息"
  },
  {
    date: "2024-02-01",
    title: "补贴发放",
    description: "医疗补贴已发放 ¥3,000"
  }
]

export const mockSubsidyEligibility = {
  education: {
    eligible: true,
    reason: "符合教育补贴申请条件，有在学子女"
  },
  medical: {
    eligible: true,
    reason: "符合医疗补贴申请条件"
  },
  housing: {
    eligible: false,
    reason: "月收入超过住房补贴申请上限"
  }
}

export const mockFamilyStats = {
  familyGrowthRate: 10.5,
  incomeGrowthRate: 5.2
}

export const mockSubsidyStatuses = [
  { value: "all", label: "所有状态" },
  { value: "issued", label: "已发放" },
  { value: "pending", label: "已申请" },
  { value: "none", label: "未申请" }
]

export const mockMemberAnalysis = {
  ageGroups: {
    '0-18': 2,
    '19-30': 1,
    '31-50': 2,
    '51+': 0
  },
  occupationGroups: {
    'engineer': 2,
    'teacher': 1,
    'student': 2
  },
  incomeRanges: {
    '0-5000': 2,
    '5001-10000': 1,
    '10001+': 2
  }
}

export const mockRecentApplications = [
  {
    id: "1",
    familyName: "张小家",
    type: "education",
    amount: 5000,
    date: "2024-03-20",
    status: "pending"
  },
  {
    id: "2",
    familyName: "李家",
    type: "housing",
    amount: 3000,
    date: "2024-03-18",
    status: "approved"
  }
] 