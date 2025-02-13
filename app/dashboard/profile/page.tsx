"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/avatars/01.png",
    role: "管理员",
    department: "IT部门",
    joinDate: "2022-01-01",
  })

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理更新逻辑
    console.log("Profile updated")
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理密码更改逻辑
    console.log("Password changed")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">个人资料</h2>

      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-semibold">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>个人资料</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">角色</Label>
                    <Input id="role" value={user.role} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">部门</Label>
                    <Input id="department" value={user.department} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">入职日期</Label>
                    <Input id="joinDate" value={user.joinDate} readOnly />
                  </div>
                </div>
                <Button type="submit">更新资料</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>修改密码</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">当前密码</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认新密码</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button type="submit">修改密码</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

