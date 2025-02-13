"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  registrationDate: string
  lastLogin: string
}

interface Subsidy {
  id: string
  name: string
  amount: number
  status: string
  applicationDate: string
}

export default function UserDetailsPage() {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [subsidies, setSubsidies] = useState<Subsidy[]>([])

  useEffect(() => {
    // 模拟API调用
    const fetchUser = async () => {
      // 这里应该是一个实际的API调用
      const userData: User = {
        id: params.id as string,
        name: "张三",
        email: "zhangsan@example.com",
        role: "普通用户",
        status: "活跃",
        registrationDate: "2023-01-15",
        lastLogin: "2023-06-10",
      }
      setUser(userData)
    }

    const fetchSubsidies = async () => {
      // 这里应该是一个实际的API调用
      const subsidiesData: Subsidy[] = [
        { id: "1", name: "教育补贴", amount: 1000, status: "已批准", applicationDate: "2023-05-01" },
        { id: "2", name: "医疗补贴", amount: 500, status: "审核中", applicationDate: "2023-06-01" },
      ]
      setSubsidies(subsidiesData)
    }

    fetchUser()
    fetchSubsidies()
  }, [params.id])

  if (!user) {
    return <div>加载中...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">用户详情</h2>

      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">姓名</Label>
              <Input id="name" value={user.name} readOnly />
            </div>
            <div>
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" value={user.email} readOnly />
            </div>
            <div>
              <Label htmlFor="role">角色</Label>
              <Input id="role" value={user.role} readOnly />
            </div>
            <div>
              <Label htmlFor="status">状态</Label>
              <Input id="status" value={user.status} readOnly />
            </div>
            <div>
              <Label htmlFor="registrationDate">注册日期</Label>
              <Input id="registrationDate" value={user.registrationDate} readOnly />
            </div>
            <div>
              <Label htmlFor="lastLogin">最后登录</Label>
              <Input id="lastLogin" value={user.lastLogin} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="subsidies">
        <TabsList>
          <TabsTrigger value="subsidies">补贴申请</TabsTrigger>
          <TabsTrigger value="activity">活动日志</TabsTrigger>
        </TabsList>
        <TabsContent value="subsidies">
          <Card>
            <CardHeader>
              <CardTitle>补贴申请历史</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>补贴名称</TableHead>
                    <TableHead>金额</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>申请日期</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subsidies.map((subsidy) => (
                    <TableRow key={subsidy.id}>
                      <TableCell>{subsidy.name}</TableCell>
                      <TableCell>¥{subsidy.amount}</TableCell>
                      <TableCell>{subsidy.status}</TableCell>
                      <TableCell>{subsidy.applicationDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>活动日志</CardTitle>
            </CardHeader>
            <CardContent>
              <p>这里可以显示用户的活动日志，如登录记录、操作历史等。</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">编辑用户信息</Button>
        <Button variant="destructive">禁用账户</Button>
      </div>
    </div>
  )
}

