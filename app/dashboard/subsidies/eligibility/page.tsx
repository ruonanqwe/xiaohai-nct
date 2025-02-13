"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Criterion {
  id: string
  name: string
  description: string
  type: "income" | "age" | "residence" | "other"
  condition: string
  status: "active" | "inactive"
}

export default function EligibilityPage() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: "1",
      name: "收入限制",
      description: "家庭月收入不超过标准",
      type: "income",
      condition: "月收入 ≤ 5000元",
      status: "active",
    },
    {
      id: "2",
      name: "年龄要求",
      description: "申请人年龄要求",
      type: "age",
      condition: "年龄 ≥ 18岁",
      status: "active",
    },
    {
      id: "3",
      name: "户籍要求",
      description: "本地户籍要求",
      type: "residence",
      condition: "本市户籍满2年",
      status: "active",
    },
  ])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">资格条件管理</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">条件数量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criteria.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">启用条件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criteria.filter((c) => c.status === "active").length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>添加资格条件</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新资格条件</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">条件名称</Label>
                <Input id="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">条件类型</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">收入条件</SelectItem>
                    <SelectItem value="age">年龄条件</SelectItem>
                    <SelectItem value="residence">户籍条件</SelectItem>
                    <SelectItem value="other">其他条件</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">描述</Label>
                <Textarea id="description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">具体条件</Label>
                <Input id="condition" />
              </div>
            </div>
            <Button>添加</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>条件名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>具体条件</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {criteria.map((criterion) => (
            <TableRow key={criterion.id}>
              <TableCell className="font-medium">{criterion.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {
                    {
                      income: "收入条件",
                      age: "年龄条件",
                      residence: "户籍条件",
                      other: "其他条件",
                    }[criterion.type]
                  }
                </Badge>
              </TableCell>
              <TableCell>{criterion.description}</TableCell>
              <TableCell>{criterion.condition}</TableCell>
              <TableCell>
                <Badge variant={criterion.status === "active" ? "default" : "secondary"}>
                  {criterion.status === "active" ? "启用" : "禁用"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">
                  编辑
                </Button>
                <Button variant="outline">删除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

