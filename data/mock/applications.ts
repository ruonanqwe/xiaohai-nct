export interface ApplicationDetails {
  reason: string
  attachments?: string[]  // 附件文件
  notes?: string         // 备注说明
  reviewer?: string      // 审核人
  reviewDate?: string    // 审核日期
  reviewComments?: string // 审核意见
  [key: string]: any     // 其他动态字段
}

export interface Application {
  id: string
  applicant: string
  type: string
  amount: number
  status: "待审核" | "已批准" | "已拒绝"
  date: string
  familyId: string
  priority: "高" | "中" | "低"  // 优先级
  category: string      // 补贴类别
  submitter: string     // 提交人（可能是代理人）
  contact: string       // 联系方式
  details: ApplicationDetails
}

export const mockApplications: Application[] = [
  { 
    id: "1", 
    applicant: "张三", 
    type: "教育补贴", 
    amount: 5000, 
    status: "待审核", 
    date: "2023-06-01",
    familyId: "f001",
    priority: "高",
    category: "学费补助",
    submitter: "张三",
    contact: "13800138000",
    details: {
      reason: "子女上学费用",
      schoolName: "实验小学",
      grade: "三年级",
      semester: "2023秋季",
      attachments: ["学费单.pdf", "户口本.pdf", "收入证明.pdf"],
      notes: "单亲家庭，母亲无固定工作",
      reviewer: "李主任",
      reviewComments: "建议优先处理，家庭情况确实困难"
    }
  },
  { 
    id: "2", 
    applicant: "李四", 
    type: "医疗补贴", 
    amount: 3000, 
    status: "已批准", 
    date: "2023-05-28",
    familyId: "f002",
    priority: "中",
    category: "慢性病补助",
    submitter: "李四",
    contact: "13900139000",
    details: {
      reason: "慢性病治疗",
      hospital: "市第一医院",
      disease: "高血压",
      duration: "6个月",
      attachments: ["医疗费用清单.pdf", "诊断证明.pdf"],
      notes: "需要长期服药",
      reviewer: "王医生",
      reviewDate: "2023-05-30",
      reviewComments: "符合慢性病补助条件，建议通过"
    }
  },
  { 
    id: "3", 
    applicant: "王五", 
    type: "住房补贴", 
    amount: 10000, 
    status: "待审核", 
    date: "2023-06-02",
    familyId: "f003",
    priority: "高",
    category: "房屋维修",
    submitter: "王五",
    contact: "13700137000",
    details: {
      reason: "房屋修缮",
      address: "幸福小区3号楼",
      area: "80平米",
      usage: "维修屋顶漏水",
      attachments: ["房屋照片.jpg", "维修预算单.pdf", "房产证.pdf"],
      notes: "屋顶漏水严重，影响居住安全",
      reviewer: "张工",
      reviewComments: "现场已勘察，情况属实，建议尽快处理"
    }
  },
  { 
    id: "4", 
    applicant: "赵六", 
    type: "创业补贴", 
    amount: 8000, 
    status: "已拒绝", 
    date: "2023-05-30",
    familyId: "f004",
    priority: "中",
    category: "小微企业",
    submitter: "赵六",
    contact: "13600136000",
    details: {
      reason: "开设小店",
      businessType: "便利店",
      location: "阳光路15号",
      plan: "社区便民服务",
      attachments: ["营业执照.pdf", "经营计划书.pdf"],
      notes: "已有相关行业经验",
      reviewer: "陈科长",
      reviewDate: "2023-06-01",
      reviewComments: "申请材料不完整，缺少可行性分析报告"
    }
  },
  { 
    id: "5", 
    applicant: "钱七", 
    type: "教育补贴", 
    amount: 6000, 
    status: "待审核", 
    date: "2023-06-03",
    familyId: "f005",
    priority: "低",
    category: "职业培训",
    submitter: "钱七",
    contact: "13500135000",
    details: {
      reason: "职业培训",
      course: "电工证培训",
      institution: "技能培训中心",
      duration: "3个月",
      attachments: ["培训报名表.pdf", "身份证复印件.pdf"],
      notes: "希望通过培训提升就业能力",
      reviewer: "刘主任",
      reviewComments: "建议先核实培训机构资质"
    }
  },
]

export const mockSubsidyTypes = [
  { value: "education", label: "教育补贴", categories: ["学费补助", "助学金", "职业培训"] },
  { value: "medical", label: "医疗补贴", categories: ["慢性病补助", "重大疾病", "医疗保险"] },
  { value: "housing", label: "住房补贴", categories: ["房屋维修", "租房补贴", "购房补贴"] },
  { value: "business", label: "创业补贴", categories: ["小微企业", "个体工商户", "农业创业"] },
  { value: "other", label: "其他补贴", categories: ["临时救助", "节日补助", "特殊补助"] },
]

export const mockApplicationStatuses = [
  { 
    value: "pending", 
    label: "待审核",
    description: "申请已提交，等待审核",
    color: "secondary" 
  },
  { 
    value: "approved", 
    label: "已批准",
    description: "申请已通过审核",
    color: "default"
  },
  { 
    value: "rejected", 
    label: "已拒绝",
    description: "申请未通过审核",
    color: "destructive"
  },
]

export const mockPriorities = [
  { value: "high", label: "高", color: "red" },
  { value: "medium", label: "中", color: "yellow" },
  { value: "low", label: "低", color: "green" },
] 