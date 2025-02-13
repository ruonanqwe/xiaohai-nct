"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFamilyManagement } from "@/contexts/family-management-context"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export function FamilyList() {
  const { families } = useFamilyManagement()
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)
  const router = useRouter()

  const handleRowClick = (id: string) => {
    console.log('Row clicked:', id)
    router.push(`/dashboard/families/${id}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>家庭信息</TableHead>
            <TableHead>成员数</TableHead>
            <TableHead>住址</TableHead>
            <TableHead>月收入</TableHead>
            <TableHead>补贴状态</TableHead>
            <TableHead>最后更新</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {families.map((family) => (
            <TableRow 
              key={family.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => {
                console.log('Row clicked:', family.id)
                handleRowClick(family.id)
              }}
            >
              <TableCell>
                <div>
                  <div className="font-medium">{family.name}</div>
                  <div className="text-sm text-muted-foreground">
                    登记日期: {family.registrationDate}
                  </div>
                </div>
              </TableCell>
              <TableCell>{family.members}人</TableCell>
              <TableCell>
                <div className="text-sm">
                  {family.address}
                  <div className="text-muted-foreground">
                    {family.houseType}
                  </div>
                </div>
              </TableCell>
              <TableCell>¥{family.monthlyIncome}/月</TableCell>
              <TableCell>
                <Badge
                  variant={family.subsidyStatus === "issued" ? "default" : "secondary"}
                >
                  {family.subsidyStatus}
                </Badge>
              </TableCell>
              <TableCell>{family.lastUpdate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">打开菜单</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation()
                      handleRowClick(family.id)
                    }}>
                      查看详情
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      编辑信息
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      补贴申请
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 