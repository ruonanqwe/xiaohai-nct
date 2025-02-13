"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  overallStats, 
  userGrowthData,
  subsidyTypeDistribution,
  applicationStatusDistribution,
  monthlyTrends,
  districtDistribution,
  userDemographics,
  processingEfficiency,
  topSubsidies 
} from "@/data/mock/statistics"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Users, Activity, FileText, Wallet, TrendingUp, PieChart, Map, Clock } from "lucide-react"

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function StatisticsPage() {
  // 趋势图表配置
  const trendChartData = {
    labels: userGrowthData.months,
    datasets: [
      {
        label: '用户数',
        data: userGrowthData.users,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: '补贴申请',
        data: userGrowthData.applications,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  // 补贴类型分布图表
  const subsidyTypeChartData = {
    labels: subsidyTypeDistribution.map(item => item.type),
    datasets: [{
      data: subsidyTypeDistribution.map(item => item.amount),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ],
    }]
  }

  // 区域分布图表
  const districtChartData = {
    labels: districtDistribution.map(item => item.district),
    datasets: [{
      label: '申请数量',
      data: districtDistribution.map(item => item.count),
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
    }]
  }

  // 添加新的图表配置
  const approvalTrendChartData = {
    labels: monthlyTrends.months,
    datasets: [{
      label: '审批通过率',
      data: monthlyTrends.approvalRate,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true,
      yAxisID: 'y1'
    }, {
      label: '平均金额',
      data: monthlyTrends.averageAmount,
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true,
      yAxisID: 'y2'
    }]
  }

  const userDemographicsChartData = {
    labels: userDemographics.ageGroups.map(group => group.range),
    datasets: [{
      label: '年龄分布',
      data: userDemographics.ageGroups.map(group => group.count),
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
    }]
  }

  // 图表通用配置
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">数据统计</h1>
        <div className="flex gap-2">
          <select className="rounded-md border px-3 py-1">
            <option>最近7天</option>
            <option>最近30天</option>
            <option>最近90天</option>
          </select>
          <button className="px-3 py-1 bg-primary text-white rounded-md">
            导出报告
          </button>
        </div>
      </div>

      {/* 总体统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalUsers.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overallStats.totalUsers.trend} {overallStats.totalUsers.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.activeUsers.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overallStats.activeUsers.trend} {overallStats.activeUsers.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">补贴申请数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalApplications.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overallStats.totalApplications.trend} {overallStats.totalApplications.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">补贴发放金额</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalAmount.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overallStats.totalAmount.trend} {overallStats.totalAmount.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 趋势图表和补贴类型分布 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>增长趋势</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Line data={trendChartData} options={options} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>补贴类型分布</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Doughnut data={subsidyTypeChartData} options={options} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 区域分布和处理效率 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>区域分布</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={districtChartData} options={options} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>处理效率</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">平均处理时间</span>
                  <span className="font-bold">{processingEfficiency.averageProcessingTime} 天</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div 
                    className="h-2 bg-blue-500 rounded" 
                    style={{ width: `${(processingEfficiency.averageProcessingTime/5)*100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">审批通过率</span>
                  <span className="font-bold">{processingEfficiency.approvalRate}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div 
                    className="h-2 bg-green-500 rounded" 
                    style={{ width: `${processingEfficiency.approvalRate}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 热门补贴排行 */}
      <Card>
        <CardHeader>
          <CardTitle>热门补贴排行</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSubsidies.map((subsidy, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                  <div>
                    <div className="font-medium">{subsidy.type}</div>
                    <div className="text-sm text-muted-foreground">
                      申请数: {subsidy.applications}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">¥{subsidy.totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-green-500">{subsidy.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 用户画像分析 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>用户年龄分布</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={userDemographicsChartData} options={options} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>家庭规模分布</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userDemographics.familySize.map((size, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{size.size}</span>
                    <span className="text-sm font-medium">{size.count}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{ width: `${(size.count / 5000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 收入分布和审批趋势 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>家庭收入分布</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userDemographics.income.map((income, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm">{income.range}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-green-500 rounded"
                        style={{ width: `${(income.count / 3500) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-sm text-right">{income.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>审批趋势分析</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Line 
                data={approvalTrendChartData} 
                options={{
                  ...options,
                  scales: {
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      max: 100,
                    },
                    y2: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 处理效率详情 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>处理效率月度对比</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="space-y-4">
                {processingEfficiency.monthlyComparison.map((month, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{month.month}</span>
                      <span className="text-sm font-medium">{month.time}天</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${(month.time / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-500">
                  {processingEfficiency.averageProcessingTime}天
                </div>
                <div className="text-sm text-gray-500">平均处理时间</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-500">
                  {processingEfficiency.approvalRate}%
                </div>
                <div className="text-sm text-gray-500">审批通过率</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 补贴类型详细分析 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>补贴类型详情</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subsidyTypeDistribution.map((type, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{type.type}</span>
                    <span className="text-green-500">¥{type.amount.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500">申请数量: {type.count}</div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded">
                    <div
                      className="h-1.5 bg-blue-500 rounded"
                      style={{ width: `${(type.count / 2000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>区域分布详情</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {districtDistribution.map((district, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{district.district}</span>
                    <span className="text-green-500">¥{district.amount.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500">申请数量: {district.count}</div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded">
                    <div
                      className="h-1.5 bg-blue-500 rounded"
                      style={{ width: `${(district.count / 1500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

