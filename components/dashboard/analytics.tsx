"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from 'chart.js'
import { mockAnalytics } from "@/data/mock/analytics"

// 注册所有需要的 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement
)

export function Analytics() {
  // 使用 mockAnalytics 中的数据
  const stats = {
    averageApprovalTime: mockAnalytics.averageApprovalTime,
    approvalRate: mockAnalytics.approvalRate,
    averageSubsidyAmount: mockAnalytics.averageSubsidyAmount,
    satisfactionScore: mockAnalytics.satisfactionScore,
    lastMonthComparison: mockAnalytics.lastMonthComparison
  }

  return (
    <div className="space-y-6">
      {/* 顶部统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均审批时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageApprovalTime}天</div>
            <p className="text-xs text-muted-foreground">
              较上月缩短{Math.abs(stats.lastMonthComparison.approvalTime)}天
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">审批通过率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvalRate}%</div>
            <p className="text-xs text-muted-foreground">较上月提升{Math.abs(stats.lastMonthComparison.approvalRate)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">月均补贴金额</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{stats.averageSubsidyAmount}</div>
            <p className="text-xs text-muted-foreground">较上月增长{Math.abs(stats.lastMonthComparison.subsidyAmount)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">满意度评分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.satisfactionScore}/5.0</div>
            <p className="text-xs text-muted-foreground">较上月提升{Math.abs(stats.lastMonthComparison.satisfaction)}分</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要图表 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>补贴申请与审批趋势</CardTitle>
            <CardDescription>近6个月申请和审批数据对比</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={mockAnalytics.barData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>用户增长分析</CardTitle>
            <CardDescription>用户总数与活跃用户变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <Line data={mockAnalytics.lineData} options={{ responsive: true }} />
          </CardContent>
        </Card>
      </div>

      {/* 补充图表 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>补贴类型分布</CardTitle>
            <CardDescription>各类补贴申请占比</CardDescription>
          </CardHeader>
          <CardContent>
            <Pie data={mockAnalytics.pieData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>申请状态分布</CardTitle>
            <CardDescription>当前申请处理状态分析</CardDescription>
          </CardHeader>
          <CardContent>
            <Doughnut data={mockAnalytics.doughnutData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>地区分布情况</CardTitle>
            <CardDescription>各地区申请数量统计</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={mockAnalytics.regionBarData} options={{ 
              responsive: true,
              indexAxis: 'y'  // 横向柱状图
            }} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 