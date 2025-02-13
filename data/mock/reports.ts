import type { Report, ReportType, ReportCategory } from "@/types/report"

export const mockReports: Report[] = [
  {
    id: "1",
    title: "2024年第一季度工作报告",
    description: "包含用户增长、补贴发放等数据统计",
    date: "2024-03-20",
    type: "季度报告",
    category: "工作总结",
    fileSize: "2.5MB",
    status: "published" as const,
    author: "张三",
    views: 156,
    downloads: 45,
    lastModified: "2024-03-20",
    tags: ["季度报告", "数据统计", "工作总结"]
  },
  {
    id: "2",
    title: "2023年度工作总结",
    description: "全年工作成果与来年计划",
    date: "2023-12-31",
    type: "年度报告",
    category: "工作总结",
    fileSize: "5.8MB",
    status: "published" as const,
    author: "李四",
    views: 289,
    downloads: 123,
    lastModified: "2024-01-15",
    tags: ["年度报告", "工作总结"]
  },
  {
    id: "3",
    title: "农业补贴发放情况分析",
    description: "2024年一季度农业补贴发放统计与分析",
    date: "2024-03-15",
    type: "专题报告",
    category: "补贴分析",
    fileSize: "3.2MB",
    status: "draft" as const,
    author: "王五",
    views: 45,
    downloads: 12,
    lastModified: "2024-03-18",
    tags: ["补贴分析", "农业", "统计分析"]
  }
]

export const mockReportTypes: ReportType[] = [
  { id: "1", name: "季度报告" },
  { id: "2", name: "年度报告" },
  { id: "3", name: "专题报告" },
  { id: "4", name: "调研报告" }
]

export const mockReportCategories: ReportCategory[] = [
  { id: "1", name: "工作总结" },
  { id: "2", name: "补贴分析" },
  { id: "3", name: "政策研究" },
  { id: "4", name: "数据统计" }
] 