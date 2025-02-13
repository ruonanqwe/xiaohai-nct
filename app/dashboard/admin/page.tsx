"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

const initialAdmins = [
  {
    id: 1,
    name: "管理员1",
    email: "admin1@example.com",
    canAddUsers: true,
    canDeleteUsers: true,
    canManageSubsidies: true,
  },
  {
    id: 2,
    name: "管理员2",
    email: "admin2@example.com",
    canAddUsers: true,
    canDeleteUsers: false,
    canManageSubsidies: true,
  },
]

export default function AdminSettingsPage() {
  const [admins, setAdmins] = useState(initialAdmins)
  const [newAdminName, setNewAdminName] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")

  const handleAddAdmin = () => {
    if (newAdminName && newAdminEmail) {
      setAdmins([
        ...admins,
        {
          id: admins.length + 1,
          name: newAdminName,
          email: newAdminEmail,
          canAddUsers: false,
          canDeleteUsers: false,
          canManageSubsidies: false,
        },
      ])
      setNewAdminName("")
      setNewAdminEmail("")
    }
  }

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id))
  }

  const handlePermissionChange = (id: number, permission: string) => {
    setAdmins(
      admins.map((admin) => {
        if (admin.id === id) {
          return { ...admin, [permission]: !admin[permission as keyof typeof admin] }
        }
        return admin
      }),
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">管理员设置</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">添加新管理员</h3>
        <div className="flex space-x-2">
          <Input placeholder="姓名" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} />
          <Input
            placeholder="邮箱"
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
          />
          <Button onClick={handleAddAdmin}>添加</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">管理员列表</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>添加用户</TableHead>
              <TableHead>删除用户</TableHead>
              <TableHead>管理补贴</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Switch
                    checked={admin.canAddUsers}
                    onCheckedChange={() => handlePermissionChange(admin.id, "canAddUsers")}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={admin.canDeleteUsers}
                    onCheckedChange={() => handlePermissionChange(admin.id, "canDeleteUsers")}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={admin.canManageSubsidies}
                    onCheckedChange={() => handlePermissionChange(admin.id, "canManageSubsidies")}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDeleteAdmin(admin.id)}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

