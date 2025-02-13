"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

const initialHotSubsidies = [
  { id: 1, name: "低收入家庭补贴", applicants: 1500, isVisible: true },
  { id: 2, name: "老年人医疗补贴", applicants: 1200, isVisible: true },
  { id: 3, name: "残疾人就业补贴", applicants: 800, isVisible: true },
]

export default function HotSubsidiesPage() {
  const [subsidies, setSubsidies] = useState(initialHotSubsidies)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleVisibilityToggle = (id: number) => {
    setSubsidies(
      subsidies.map((subsidy) => (subsidy.id === id ? { ...subsidy, isVisible: !subsidy.isVisible } : subsidy)),
    )
  }

  const filteredSubsidies = subsidies.filter((subsidy) => subsidy.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">热门补贴</h2>

      <div className="flex justify-between items-center">
        <Input placeholder="搜索热门补贴..." value={searchTerm} onChange={handleSearch} className="max-w-sm" />
        <Button>添加热门补贴</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>补贴名称</TableHead>
            <TableHead>申请人数</TableHead>
            <TableHead>是否可见</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubsidies.map((subsidy) => (
            <TableRow key={subsidy.id}>
              <TableCell>{subsidy.name}</TableCell>
              <TableCell>{subsidy.applicants}</TableCell>
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

