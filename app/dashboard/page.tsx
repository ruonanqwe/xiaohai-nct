"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentApplications } from "@/components/dashboard/recent-applications"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Users, Home, FileText, Clock } from "lucide-react"
import { formatNumber, formatPercentageChange } from "@/lib/utils"
import { StatCard } from "@/components/dashboard/stat-card"
import { Analytics } from "@/components/dashboard/analytics"
import { ReportsManagement } from "@/components/dashboard/reports"
import { mockDashboardStats } from "@/data/mock/families"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">仪表盘</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>下载报告</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">总览</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
          <TabsTrigger value="reports">报告</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="总用户数"
              value={formatNumber(mockDashboardStats.totalUsers)}
              change={formatPercentageChange(mockDashboardStats.totalUserChange)}
              icon={Users}
            />
            <StatCard
              title="家庭账户数"
              value={formatNumber(mockDashboardStats.familyAccounts)}
              change={formatPercentageChange(mockDashboardStats.familyAccountChange)}
              icon={Home}
            />
            <StatCard
              title="补贴申请数"
              value={formatNumber(mockDashboardStats.subsidyApplications)}
              change={formatPercentageChange(mockDashboardStats.subsidyApplicationChange)}
              icon={FileText}
            />
            <StatCard
              title="待审核申请"
              value={formatNumber(mockDashboardStats.pendingReviews)}
              change={formatPercentageChange(mockDashboardStats.pendingReviewChange)}
              icon={Clock}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>概览</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>最近申请</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentApplications />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

