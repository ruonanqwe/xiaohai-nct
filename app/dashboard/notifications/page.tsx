"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { mockNotifications, notificationTypes } from "@/data/mock/notifications"
import { 
  Bell, Info, AlertTriangle, CheckCircle, AlertOctagon,
  Clock, Eye, Trash2, MoreVertical, Filter, Search,
  BellRing, BellOff, RefreshCcw, MessageSquare
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Label
} from "@/components/ui/label"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [showDialog, setShowDialog] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  const unreadCount = notifications.filter(n => !n.read).length
  const errorCount = notifications.filter(n => n.type === "error").length
  const warningCount = notifications.filter(n => n.type === "warning").length
  const successCount = notifications.filter(n => n.type === "success").length

  // 过滤通知
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = 
      selectedTab === "all" ||
      (selectedTab === "unread" && !notification.read) ||
      (selectedTab === "read" && notification.read)

    return matchesSearch && matchesTab
  })

  // 处理留言查看
  const handleViewMessage = (notification: any) => {
    if (notification.type === 'message' && notification.messageData) {
      setSelectedMessage(notification.messageData)
      setShowDialog(true)
    }
  }

  // 获取图标组件
  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageSquare
      case 'info':
        return Info
      case 'warning':
        return AlertTriangle
      case 'success':
        return CheckCircle
      case 'error':
        return AlertOctagon
      default:
        return Bell
    }
  }

  return (
    <div className="space-y-6 p-6 min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            通知中心
          </h1>
          <p className="text-sm text-muted-foreground">
            查看系统通知、更新提醒和重要消息
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setNotifications(n => n.map(item => ({ ...item, read: true })))}
          >
            <Eye className="h-4 w-4" />
            全部已读
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            刷新
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500/5 to-blue-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">未读通知</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <BellRing className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-red-500/5 to-red-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">错误提醒</CardTitle>
              <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center">
                <AlertOctagon className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-yellow-500/5 to-yellow-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">警告消息</CardTitle>
              <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-green-500/5 to-green-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">成功通知</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索通知内容..."
            className="pl-9 bg-gray-50/50 border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              全部
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              <BellRing className="h-4 w-4" />
              未读 ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read" className="flex items-center gap-2">
              <BellOff className="h-4 w-4" />
              已读
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 通知列表 */}
      <ScrollArea className="h-[600px] rounded-xl border bg-white/50 backdrop-blur-sm">
        <AnimatePresence>
          <div className="space-y-4 p-4">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">暂无通知</h3>
                <p className="text-sm text-gray-500">
                  {searchTerm ? "没有找到匹配的通知" : "当前没有任何通知"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => {
                const type = notificationTypes[notification.type]
                const Icon = getIcon(notification.type)

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={cn(
                      "group relative overflow-hidden transition-all duration-200 hover:shadow-md",
                      !notification.read && "bg-blue-50/30 border-blue-200"
                    )}>
                      {!notification.read && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg font-semibold">
                                {notification.title}
                              </CardTitle>
                              <Badge variant="secondary" className={cn(type.badge)}>
                                <Icon className="h-3 w-3 mr-1" />
                                {type.label}
                              </Badge>
                              {!notification.read && (
                                <Badge variant="secondary" className="animate-pulse bg-blue-100 text-blue-700">
                                  新消息
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {format(new Date(notification.timestamp), 'PPP HH:mm', { locale: zhCN })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-2 hover:bg-blue-50 hover:text-blue-600"
                                onClick={() => setNotifications(n => 
                                  n.map(item => 
                                    item.id === notification.id ? { ...item, read: true } : item
                                  )
                                )}
                              >
                                <Eye className="h-4 w-4" />
                                标记已读
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="gap-2 hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                              删除
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  查看详情
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clock className="h-4 w-4 mr-2" />
                                  稍后提醒
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          {notification.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })
            )}
          </div>
        </AnimatePresence>
      </ScrollArea>

      {/* 留言详情对话框 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>留言详情</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <Label>留言人</Label>
                <p>{selectedMessage.name}</p>
              </div>
              <div>
                <Label>邮箱</Label>
                <p>{selectedMessage.email}</p>
              </div>
              <div>
                <Label>留言内容</Label>
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

