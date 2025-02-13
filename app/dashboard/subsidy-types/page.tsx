"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Gift, TrendingUp, Users } from "lucide-react"

interface SubsidyType {
  id: string
  name: string
  description: string
  eligibility: string
  maxAmount: number
  duration: string
  status: "active" | "inactive"
  applicantCount: number
  totalAmount: number
}

export default function SubsidyTypesPage() {
  const [types, setTypes] = useState<SubsidyType[]>([
    {
      id: "1",
      name: "教育补贴",
      description: "为低收入家庭学生提供教育支持",
      eligibility: "家庭年收入低于5万元的在校学生",
      maxAmount: 5000,
      duration: "每学期",
      status: "active",
      applicantCount: 150,
      totalAmount: 750000,
    },
    {
      id: "2",
      name: "医疗补贴",
      description: "为特殊疾病患者提供医疗费用支持",
      eligibility: "特定疾病患者，需提供医院证明",
      maxAmount: 10000,
      duration: "每年",
      status: "active",
      applicantCount: 80,
      totalAmount: 800000,
    },
    {
      id: "3",
      name: "住房补贴",
      description: "为低收入家庭提供住房租金补贴",
      eligibility: "本地户籍，家庭月收入低于3000元",
      maxAmount: 1000,
      duration: "每月",
      status: "active",
      applicantCount: 200,
      totalAmount: 200000,
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">补贴类型管理</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>添加补贴类型</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>添加新补贴类型</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">补贴名称</Label>
                  <Input id="name" placeholder="输入补贴名称" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">最高金额</Label>
                  <Input id="maxAmount" type="number" placeholder="输入最高补贴金额" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">补贴描述</Label>
                <Textarea id="description" placeholder="详细描述补贴的用途和特点" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eligibility">申请条件</Label>
                <Textarea id="eligibility" placeholder="列出申请该补贴的具体条件" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">发放周期</Label>
                  <Input id="duration" placeholder="例：每月、每季度、每年" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">状态</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="active">启用</option>
                    <option value="inactive">禁用</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">取消</Button>
              <Button>保存</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">补贴类型总数</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{types.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">申请总人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{types.reduce((sum, type) => sum + type.applicantCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">补贴总金额</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{(types.reduce((sum, type) => sum + type.totalAmount, 0) / 10000).toFixed(1)}万
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>补贴类型列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>补贴名称</TableHead>
                <TableHead>最高金额</TableHead>
                <TableHead>发放周期</TableHead>
                <TableHead>申请人数</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {types.map((type) => (
                <TableRow key={type.id}>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell>¥{type.maxAmount.toLocaleString()}</TableCell>
                  <TableCell>{type.duration}</TableCell>
                  <TableCell>{type.applicantCount}</TableCell>
                  <TableCell>
                    <Badge variant={type.status === "active" ? "default" : "secondary"}>
                      {type.status === "active" ? "启用" : "禁用"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

