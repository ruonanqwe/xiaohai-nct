"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const initialPolicies = [
  { id: 1, title: "2023年教育补助政策", department: "教育部", status: "已发布" },
  { id: 2, title: "新型农村合作医疗政策", department: "卫生部", status: "草稿" },
  { id: 3, title: "城市低保政策调整", department: "民政部", status: "审核中" },
]

export default function PolicyConsultationPage() {
  const [policies, setPolicies] = useState(initialPolicies)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">政策咨询</h2>

      <div className="flex justify-between items-center">
        <Input placeholder="搜索政策..." value={searchTerm} onChange={handleSearch} className="max-w-sm" />
        <Button>添加新政策</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>政策标题</TableHead>
            <TableHead>发布部门</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPolicies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell>{policy.title}</TableCell>
              <TableCell>{policy.department}</TableCell>
              <TableCell>
                <Badge variant={policy.status === "已发布" ? "default" : "secondary"}>{policy.status}</Badge>
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

