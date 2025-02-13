"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface MemberAnalysisProps {
  members: any[]
}

export function MemberAnalysis({ members }: MemberAnalysisProps) {
  // 分析成员数据
  const ageGroups = {
    '0-18': 0,
    '19-30': 0,
    '31-50': 0,
    '51+': 0
  }

  members.forEach(member => {
    if (member.age <= 18) ageGroups['0-18']++
    else if (member.age <= 30) ageGroups['19-30']++
    else if (member.age <= 50) ageGroups['31-50']++
    else ageGroups['51+']++
  })

  const data: ChartData<'doughnut'> = {
    labels: Object.keys(ageGroups),
    datasets: [{
      data: Object.values(ageGroups),
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(34, 197, 94, 0.5)',
        'rgba(249, 115, 22, 0.5)',
        'rgba(168, 85, 247, 0.5)',
      ],
    }]
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>年龄分布</CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  )
} 