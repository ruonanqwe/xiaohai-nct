"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { mockReports } from "@/data/mock/reports"
import type { Report } from "@/types/report"

interface ReportManagementContextType {
  reports: Report[]
  setReports: (reports: Report[]) => void
  addReport: (report: Partial<Report>) => void
  updateReport: (id: string, data: Partial<Report>) => void
  deleteReport: (id: string) => void
  viewReport: (id: string) => void
  downloadReport: (id: string) => void
}

const ReportManagementContext = createContext<ReportManagementContextType | undefined>(undefined)

export function ReportManagementProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>(mockReports)

  const addReport = useCallback((reportData: Partial<Report>) => {
    const newReport: Report = {
      id: String(Date.now()),
      title: reportData.title || "",
      description: reportData.description || "",
      date: new Date().toISOString().split('T')[0],
      type: reportData.type || "",
      category: reportData.category || "",
      fileSize: reportData.fileSize || "0KB",
      status: "draft",
      author: reportData.author || "",
      views: 0,
      downloads: 0,
      lastModified: new Date().toISOString().split('T')[0],
      tags: reportData.tags || []
    }
    setReports(prev => [...prev, newReport])
  }, [])

  const updateReport = useCallback((id: string, data: Partial<Report>) => {
    setReports(prev => prev.map(report => 
      report.id === id ? { ...report, ...data, lastModified: new Date().toISOString().split('T')[0] } : report
    ))
  }, [])

  const deleteReport = useCallback((id: string) => {
    setReports(prev => prev.filter(report => report.id !== id))
  }, [])

  const viewReport = useCallback((id: string) => {
    setReports(prev => prev.map(report =>
      report.id === id ? { ...report, views: report.views + 1 } : report
    ))
  }, [])

  const downloadReport = useCallback((id: string) => {
    setReports(prev => prev.map(report =>
      report.id === id ? { ...report, downloads: report.downloads + 1 } : report
    ))
  }, [])

  return (
    <ReportManagementContext.Provider value={{
      reports,
      setReports,
      addReport,
      updateReport,
      deleteReport,
      viewReport,
      downloadReport
    }}>
      {children}
    </ReportManagementContext.Provider>
  )
}

export function useReportManagement() {
  const context = useContext(ReportManagementContext)
  if (context === undefined) {
    throw new Error("useReportManagement must be used within a ReportManagementProvider")
  }
  return context
} 