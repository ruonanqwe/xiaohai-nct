"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { mockMemberAnalysis } from "@/data/mock/families"

interface MemberAnalysisProps {
  members: any[]
}

export function MemberAnalysis({ members }: MemberAnalysisProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>年龄分布</CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut data={{
            labels: Object.keys(mockMemberAnalysis.ageGroups),
            datasets: [{
              data: Object.values(mockMemberAnalysis.ageGroups),
              backgroundColor: [
                'rgba(59, 130, 246, 0.5)',
                'rgba(34, 197, 94, 0.5)',
                'rgba(249, 115, 22, 0.5)',
                'rgba(168, 85, 247, 0.5)',
              ],
            }]
          }} options={{ responsive: true }} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>职业分布</CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut data={{
            labels: Object.keys(mockMemberAnalysis.occupationGroups),
            datasets: [{
              data: Object.values(mockMemberAnalysis.occupationGroups),
              backgroundColor: [
                'rgba(59, 130, 246, 0.5)',
                'rgba(34, 197, 94, 0.5)',
                'rgba(249, 115, 22, 0.5)',
              ],
            }]
          }} options={{ responsive: true }} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>收入分布</CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut data={{
            labels: Object.keys(mockMemberAnalysis.incomeRanges),
            datasets: [{
              data: Object.values(mockMemberAnalysis.incomeRanges),
              backgroundColor: [
                'rgba(59, 130, 246, 0.5)',
                'rgba(34, 197, 94, 0.5)',
                'rgba(249, 115, 22, 0.5)',
              ],
            }]
          }} options={{ responsive: true }} />
        </CardContent>
      </Card>
    </div>
  )
} 