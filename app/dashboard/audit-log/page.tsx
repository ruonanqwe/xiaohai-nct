"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"

interface AuditLog {
  id: string
  user: string
  action: string
  details: string
  timestamp: string
  ipAddress: string
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "1",
      user: "admin@example.com",
      action: "登录",
      details: "成功登录系统",
      timestamp: "2023-06-15 09:30:22",
      ipAddress: "192.168.1.100",
    },
    {
      id: "2",
      user: "zhangsan@example.com",
      action: "创建用户",
      details: "创建新用户：李四",
      timestamp: "2023-06-15 10:15:45",
      ipAddress: "192.168.1.101",
    },
    {
      id: "3",
      user: "lisi@example.com",
      action: "修改补贴",
      details: "修改补贴金额：教育补贴",
      timestamp: "2023-06-15 11:05:33",
      ipAddress: "192.168.1.102",
    },
    {
      id: "4",
      user: "wangwu@example.com",
      action: "删除记录",
      details: "删除过期申请记录",
      timestamp: "2023-06-15 14:20:10",
      ipAddress: "192.168.1.103",
    },
    {
      id: "5",
      user: "admin@example.com",
      action: "系统配置",
      details: "更新系统配置参数",
      timestamp: "2023-06-15 16:45:58",
      ipAddress: "192.168.1.100",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">审计日志</h2>
        <CalendarDateRangePicker />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>日志搜索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="搜索用户、操作或详情..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="secondary">搜索</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>日志列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户</TableHead>
                <TableHead>操作</TableHead>
                <TableHead>详情</TableHead>
                <TableHead>时间</TableHead>
                <TableHead>IP地址</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.action}</Badge>
                  </TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">加载更多</Button>
      </div>
    </div>
  )
}

