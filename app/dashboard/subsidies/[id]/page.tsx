"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Subsidy {
  id: string
  name: string
  description: string
  amount: number
  eligibility: string
  startDate: string
  endDate: string
  status: string
}

interface Application {
  id: string
  applicant: string
  status: string
  applicationDate: string
}

export default function SubsidyDetailsPage() {
  const params = useParams()
  const [subsidy, setSubsidy] = useState<Subsidy | null>(null)
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    // 模拟API调用
    const fetchSubsidy = async () => {
      // 这里应该是一个实际的API调用
      const subsidyData: Subsidy = {
        id: params.id as string,
        name: "教育补贴",
        description: "为低收入家庭的学生提供教育补助",
        amount: 5000,
        eligibility: "家庭年收入低于5万元的在校学生",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        status: "活跃",
      }
      setSubsidy(subsidyData)
    }

    const fetchApplications = async () => {
      // 这里应该是一个实际的API调用
      const applicationsData: Application[] = [
        { id: "1", applicant: "张三", status: "已批准", applicationDate: "2023-05-01" },
        { id: "2", applicant: "李四", status: "审核中", applicationDate: "2023-06-01" },
        { id: "3", applicant: "王五", status: "已拒绝", applicationDate: "2023-05-15" },
      ]
      setApplications(applicationsData)
    }

    fetchSubsidy()
    fetchApplications()
  }, [params.id])

  if (!subsidy) {
    return <div>加载中...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">补贴详情</h2>

      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">补贴名称</Label>
              <Input id="name" value={subsidy.name} readOnly />
            </div>
            <div>
              <Label htmlFor="amount">补贴金额</Label>
              <Input id="amount" value={`¥${subsidy.amount}`} readOnly />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description">描述</Label>
              <Textarea id="description" value={subsidy.description} readOnly />
            </div>
            <div className="col-span-2">
              <Label htmlFor="eligibility">申请条件</Label>
              <Textarea id="eligibility" value={subsidy.eligibility} readOnly />
            </div>
            <div>
              <Label htmlFor="startDate">开始日期</Label>
              <Input id="startDate" value={subsidy.startDate} readOnly />
            </div>
            <div>
              <Label htmlFor="endDate">结束日期</Label>
              <Input id="endDate" value={subsidy.endDate} readOnly />
            </div>
            <div>
              <Label htmlFor="status">状态</Label>
              <Input id="status" value={subsidy.status} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>申请记录</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>申请人</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>申请日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.applicant}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.status === "已批准"
                          ? "default"
                          : application.status === "已拒绝"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{application.applicationDate}</TableCell>
                  <TableCell>
                    <Button variant="outline">查看详情</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">编辑补贴信息</Button>
        <Button variant="destructive">停用补贴</Button>
      </div>
    </div>
  )
}

