"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

const initialOtherSubsidies = [
  { id: 1, name: "创业补贴", category: "就业", isVisible: true },
  { id: 2, name: "节能家电补贴", category: "环保", isVisible: false },
  { id: 3, name: "农业技术推广补贴", category: "农业", isVisible: true },
]

export default function OtherSubsidiesPage() {
  const [subsidies, setSubsidies] = useState(initialOtherSubsidies)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleVisibilityToggle = (id: number) => {
    setSubsidies(
      subsidies.map((subsidy) => (subsidy.id === id ? { ...subsidy, isVisible: !subsidy.isVisible } : subsidy)),
    )
  }

  const filteredSubsidies = subsidies.filter(
    (subsidy) =>
      subsidy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subsidy.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">其他补贴</h2>

      <div className="flex justify-between items-center">
        <Input placeholder="搜索补贴..." value={searchTerm} onChange={handleSearch} className="max-w-sm" />
        <Button>添加新补贴</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>补贴名称</TableHead>
            <TableHead>类别</TableHead>
            <TableHead>是否可见</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubsidies.map((subsidy) => (
            <TableRow key={subsidy.id}>
              <TableCell>{subsidy.name}</TableCell>
              <TableCell>{subsidy.category}</TableCell>
              <TableCell>
                <Switch checked={subsidy.isVisible} onCheckedChange={() => handleVisibilityToggle(subsidy.id)} />
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

