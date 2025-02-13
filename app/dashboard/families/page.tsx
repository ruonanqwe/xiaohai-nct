"use client"

import { FamilyList } from "@/components/dashboard/families/family-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockDistricts, mockStatistics, mockFamilyStats, mockSubsidyStatuses } from "@/data/mock/families"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFamilyManagement } from "@/contexts/family-management-context"
import { useRouter } from "next/navigation"
import { FamilyDialog } from "@/components/dashboard/families/family-dialog"
import { useState } from "react"

export default function FamiliesPage() {
  const { families } = useFamilyManagement()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  
  // 计算统计数据
  const stats = {
    totalFamilies: families.length,
    totalMembers: families.reduce((acc, family) => acc + family.members, 0),
    averageIncome: families.reduce((acc, family) => acc + family.monthlyIncome, 0) / families.length
  }

  // 在列表项点击时的路由
  const handleFamilyClick = (id: string) => {
    console.log('Navigating to family:', id)
    router.push(`/dashboard/families/${id}`)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总家庭数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFamilies}</div>
            <p className="text-xs text-muted-foreground">
              较上月增长 {mockFamilyStats.familyGrowthRate}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总成员数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              平均每户 {(stats.totalMembers / stats.totalFamilies).toFixed(1)} 人
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均家庭收入</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{stats.averageIncome}/月</div>
            <p className="text-xs text-muted-foreground">
              较上月增长 {mockFamilyStats.incomeGrowthRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索家庭账户..." className="pl-8" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="所有区域" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有区域</SelectItem>
              {mockDistricts.map(district => (
                <SelectItem key={district.value} value={district.value}>
                  {district.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="所有状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有状态</SelectItem>
              {mockSubsidyStatuses.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            size="responsive" 
            className="w-full sm:w-auto"
            onClick={() => setDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            添加家庭
          </Button>
        </div>
      </div>

      {/* 家庭列表 */}
      <FamilyList />

      {/* 添加家庭对话框 */}
      <FamilyDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  )
} 