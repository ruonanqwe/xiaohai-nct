"use client"

import { Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { mockStatistics } from "@/data/mock/families"

// 注册必要的图表组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export function Overview() {
  // 趋势图配置
  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '月度趋势',
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: '月份'
        }
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: '数量'
        },
        beginAtZero: true
      }
    }
  }

  // 趋势数据
  const trendData = {
    labels: mockStatistics.monthlyTrend.map(item => {
      const [year, month] = item.month.split('-')
      return `${month}月`
    }),
    datasets: [
      {
        label: '新增家庭',
        data: mockStatistics.monthlyTrend.map(item => item.families),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        order: 2
      },
      {
        label: '补贴发放',
        data: mockStatistics.monthlyTrend.map(item => item.subsidies),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        order: 1
      }
    ],
  }

  // 补贴类型分布图配置
  const typeDistOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: '补贴类型分布',
      },
    }
  }

  // 补贴类型分布数据
  const typeDistData = {
    labels: Object.keys(mockStatistics.subsidyDistribution),
    datasets: [
      {
        data: Object.values(mockStatistics.subsidyDistribution),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      }
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-[350px]">
        <Bar options={trendOptions} data={trendData} />
      </div>
      <div className="h-[350px]">
        <Doughnut options={typeDistOptions} data={typeDistData} />
      </div>
    </div>
  )
}

