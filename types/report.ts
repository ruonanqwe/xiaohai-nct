export interface Report {
  id: string
  title: string
  description: string
  date: string
  type: string
  category: string
  fileSize: string
  status: "published" | "draft" | "archived"
  author: string
  views: number
  downloads: number
  lastModified: string
  tags: string[]
}

export interface ReportType {
  id: string
  name: string
}

export interface ReportCategory {
  id: string
  name: string
} 