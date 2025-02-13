"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SubsidyCategory {
  id: string
  name: string
  description: string
  subsidyCount: number
  totalAmount: number
  status: "active" | "inactive"
}

export default function SubsidyCategoriesPage() {
  const [categories, setCategories] = useState<SubsidyCategory[]>([
    {
      id: "1",
      name: "教育补贴",
      description: "针对学生和教育相关支出的补贴",
      subsidyCount: 5,
      totalAmount: 1000000,
      status: "active",
    },
    {
      id: "2",
      name: "医疗补贴",
      description: "针对医疗支出和健康保险的补贴",
      subsidyCount: 3,
      totalAmount: 800000,
      status: "active",
    },
    {
      id: "3",
      name: "住房补贴",
      description: "针对住房支出和租金的补贴",
      subsidyCount: 4,
      totalAmount: 1500000,
      status: "active",
    },
  ])

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })

  const handleAddCategory = () => {
    const newId = (categories.length + 1).toString()
    setCategories([
      ...categories,
      {
        id: newId,
        name: newCategory.name,
        description: newCategory.description,
        subsidyCount: 0,
        totalAmount: 0,
        status: "active",
      },
    ])
    setNewCategory({ name: "", description: "" })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">补贴类型管理</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">补贴类型数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总补贴数量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.subsidyCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总补贴金额</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{(categories.reduce((sum, cat) => sum + cat.totalAmount, 0) / 10000).toFixed(2)}万
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>添加新类型</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新补贴类型</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">类型名称</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleAddCategory}>添加</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>类型名称</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>补贴数量</TableHead>
            <TableHead>总金额</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.subsidyCount}</TableCell>
              <TableCell>¥{(category.totalAmount / 10000).toFixed(2)}万</TableCell>
              <TableCell>
                <Badge variant={category.status === "active" ? "default" : "secondary"}>
                  {category.status === "active" ? "启用" : "禁用"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">
                  编辑
                </Button>
                <Button variant="outline">查看详情</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

