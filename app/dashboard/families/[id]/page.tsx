"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Users, 
  Home, 
  Wallet,
  FileText,
  PlusCircle,
  Pencil,
  UserMinus,
  AlertTriangle,
  UserPlus
} from "lucide-react"
import { 
  mockFamilies, 
  mockSubsidyApplications, 
  mockRelationTypes, 
  mockOccupationTypes, 
  mockSubsidyCategories,
  mockHouseTypes,
  mockDistricts,
  mockApplicationStatuses
} from "@/data/mock/families"
import { FamilyProfile } from "@/components/dashboard/families/family-profile"
import { MemberAnalysis } from "@/components/dashboard/families/member-analysis"

// 获取显示标签的辅助函数
const getLabel = (value: string, options: { value: string, label: string }[]) => {
  return options.find(opt => opt.value === value)?.label || value
}

export default function FamilyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [addMemberOpen, setAddMemberOpen] = useState(false)
  const [addSubsidyOpen, setAddSubsidyOpen] = useState(false)

  // 从测试数据中获取家庭信息
  const family = mockFamilies.find(f => f.id === params.id)
  const familySubsidies = mockSubsidyApplications.filter(s => s.familyId === params.id)

  if (!family) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="text-xl font-semibold mb-2">家庭不存在</div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回列表
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* 返回按钮 */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Button 
          variant="outline" 
          size="responsive" 
          onClick={() => router.back()}
        >
          <ArrowLeft />
          返回
        </Button>
        <Button 
          size="responsive" 
          onClick={() => setAddMemberOpen(true)}
        >
          <UserPlus />
          添加成员
        </Button>
        <Button 
          size="responsive" 
          onClick={() => setAddSubsidyOpen(true)}
        >
          <Wallet />
          申请补贴
        </Button>
      </div>

      {/* 标题和操作按钮 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{family.name}</h1>
      </div>

      {/* 主要内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">基本信息</TabsTrigger>
          <TabsTrigger value="members">家庭成员</TabsTrigger>
          <TabsTrigger value="subsidies">补贴记录</TabsTrigger>
        </TabsList>

        {/* 基本信息标签页 */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label>所属区域</Label>
                  <div className="text-sm mt-1">{getLabel(family.district, mockDistricts)}</div>
                </div>
                <div>
                  <Label>住房类型</Label>
                  <div className="text-sm mt-1">{getLabel(family.houseType, mockHouseTypes)}</div>
                </div>
                <div>
                  <Label>家庭住址</Label>
                  <div className="text-sm mt-1">{family.address}</div>
                </div>
              </CardContent>
            </Card>
            {/* ... 其他卡片 ... */}
          </div>
        </TabsContent>

        {/* 家庭成员标签页 */}
        <TabsContent value="members">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>关系</TableHead>
                <TableHead>职业</TableHead>
                <TableHead>年龄</TableHead>
                <TableHead>月收入</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {family.members_detail.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{getLabel(member.relation, mockRelationTypes)}</TableCell>
                  <TableCell>{getLabel(member.occupation, mockOccupationTypes)}</TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>¥{member.income}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* 补贴记录标签页 */}
        <TabsContent value="subsidies">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>补贴类型</TableHead>
                <TableHead>申请金额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>申请日期</TableHead>
                <TableHead>审批日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {familySubsidies.map((subsidy) => (
                <TableRow key={subsidy.id}>
                  <TableCell>{getLabel(subsidy.type, mockSubsidyCategories)}</TableCell>
                  <TableCell>¥{subsidy.amount}</TableCell>
                  <TableCell>
                    <Badge>{getLabel(subsidy.status, mockApplicationStatuses)}</Badge>
                  </TableCell>
                  <TableCell>{subsidy.applyDate}</TableCell>
                  <TableCell>{subsidy.approveDate || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* 添加成员对话框 */}
      <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
        {/* ... 对话框内容 ... */}
      </Dialog>

      {/* 申请补贴对话框 */}
      <Dialog open={addSubsidyOpen} onOpenChange={setAddSubsidyOpen}>
        {/* ... 对话框内容 ... */}
      </Dialog>
    </div>
  )
} 