"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FamilyProfileProps {
  family: any
}

export function FamilyProfile({ family }: FamilyProfileProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium">家庭名称</div>
              <div className="text-sm text-muted-foreground">{family.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium">登记日期</div>
              <div className="text-sm text-muted-foreground">{family.registrationDate}</div>
            </div>
            <div>
              <div className="text-sm font-medium">家庭住址</div>
              <div className="text-sm text-muted-foreground">{family.address}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 