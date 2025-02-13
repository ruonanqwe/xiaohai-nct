"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "新的补贴申请",
      description: "张三提交了一份新的教育补贴申请",
      time: "10分钟前",
      read: false,
    },
    {
      id: "2",
      title: "系统更新",
      description: "系统将在今晚22:00进行例行维护",
      time: "1小时前",
      read: false,
    },
    {
      id: "3",
      title: "申请审核完成",
      description: "李四的医疗补贴申请已被批准",
      time: "2小时前",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <ScrollArea className="h-80">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="p-4 focus:bg-accent cursor-pointer"
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
                {!notification.read && (
                  <Badge variant="secondary" className="mt-1">
                    未读
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

