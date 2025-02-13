"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  Settings, Mail, Upload, Save, Shield, Database, 
  Globe, Clock, BellRing, FileType, Users, Key,
  Smartphone, Webhook, Network, HardDrive, Cpu, 
  LineChart, Lock, UserCheck
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSettings } from "@/contexts/settings-context"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { settings, updateSettings, isLoading } = useSettings()
  const { toast } = useToast()
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [maxFileSize, setMaxFileSize] = useState("10")
  const [adminName, setAdminName] = useState("")
  const [maintenanceDialog, setMaintenanceDialog] = useState(false)
  const [adminError, setAdminError] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(settings.theme)
  const [language, setLanguage] = useState<'zh' | 'en'>(settings.language)
  const [timezone, setTimezone] = useState(settings.timezone)
  const [backupEnabled, setBackupEnabled] = useState(false)
  const [backupInterval, setBackupInterval] = useState("daily")
  const [logRetention, setLogRetention] = useState("30")
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [ipWhitelist, setIpWhitelist] = useState("")
  const [apiRateLimit, setApiRateLimit] = useState("100")
  const [monitoringEnabled, setMonitoringEnabled] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState(true)
  const [errorTracking, setErrorTracking] = useState(true)
  const [userTracking, setUserTracking] = useState(false)

  // 使用 settings 的值作为初始值
  const [siteName, setSiteName] = useState(settings.siteName)
  const [siteDescription, setSiteDescription] = useState(settings.siteDescription)

  // 当 settings 加载完成后更新状态
  useEffect(() => {
    if (!isLoading) {
      setSiteName(settings.siteName)
      setSiteDescription(settings.siteDescription)
      setTheme(settings.theme)
      setLanguage(settings.language)
      setTimezone(settings.timezone)
    }
  }, [settings, isLoading])

  // 处理维护模式切换
  const handleMaintenanceToggle = (checked: boolean) => {
    if (checked) {
      setMaintenanceDialog(true)
    } else {
      if (settings.maintenanceAdmin === "邓博海") {
        updateSettings({
    maintenanceMode: false,
          maintenanceAdmin: ""
        })
      } else {
        setAdminError(true)
      }
    }
  }

  // 验证管理员并启用维护模式
  const handleMaintenanceConfirm = () => {
    if (adminName === "邓博海") {
      updateSettings({
        maintenanceMode: true,
        maintenanceAdmin: adminName
      })
      setMaintenanceDialog(false)
      setAdminError(false)
    } else {
      setAdminError(true)
    }
  }

  // 保存所有设置
  const handleSaveSettings = async () => {
    try {
      await updateSettings({
        siteName,
        siteDescription,
        theme: theme as 'light' | 'dark' | 'system',
        language: language as 'zh' | 'en',
        timezone,
        // ... 其他设置项
      })

      // 应用主题
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
      } else {
        root.classList.add(theme)
      }

      toast({
        title: "设置已更新",
        description: "系统设置已成功保存并应用",
      })
    } catch (error) {
      toast({
        title: "保存失败",
        description: "更新设置时发生错误",
        variant: "destructive",
      })
    }
  }

  // 处理主题变更
  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value)
  }

  // 处理语言变更
  const handleLanguageChange = (value: 'zh' | 'en') => {
    setLanguage(value)
  }

  if (isLoading) {
    return <div>加载中...</div>
  }

  return (
    <div className="space-y-6 p-6 min-h-screen bg-background">
      {/* 页面标题 */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          系统设置
        </h1>
        <p className="text-sm text-muted-foreground">
          管理系统配置和基本设置
        </p>
        </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6 bg-muted">
          <TabsTrigger value="basic" className="flex items-center gap-2 data-[state=active]:bg-background">
            <Settings className="h-4 w-4" />
            基础设置
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            通知设置
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            安全设置
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            系统设置
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            API 设置
          </TabsTrigger>
          <TabsTrigger value="monitor" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            监控设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 基本设置卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    基本设置
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    配置系统的基本信息和参数
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">网站名称</Label>
                    <Input
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="bg-background text-foreground"
                    />
                  </div>
        <div className="space-y-2">
                    <Label className="text-foreground">网站描述</Label>
          <Textarea
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      className="bg-background text-foreground"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label className="flex flex-col space-y-1">
                      <span className="text-foreground">维护模式</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        启用后仅指定管理员可访问系统
                      </span>
                    </Label>
                    <Switch
                      id="maintenance"
                      checked={maintenanceMode}
                      onCheckedChange={handleMaintenanceToggle}
          />
        </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 界面设置卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    界面设置
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    配置系统界面和本地化选项
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">主题模式</Label>
                    <Select value={theme} onValueChange={handleThemeChange}>
                      <SelectTrigger className="bg-background text-foreground">
                        <SelectValue placeholder="选择主题模式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">浅色模式</SelectItem>
                        <SelectItem value="dark">深色模式</SelectItem>
                        <SelectItem value="system">跟随系统</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">系统语言</Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="bg-background text-foreground">
                        <SelectValue placeholder="选择系统语言" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh">简体中文</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">时区设置</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-background text-foreground">
                        <SelectValue placeholder="选择时区" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                        <SelectItem value="Asia/Tokyo">日本标准时间 (UTC+9)</SelectItem>
                        <SelectItem value="America/New_York">美国东部时间 (UTC-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="notification" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 通知设置卡片保持不变 */}

            {/* 短信通知 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    短信通知
                  </CardTitle>
                  <CardDescription>
                    配置短信通知服务
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sms" className="flex flex-col space-y-1">
                      <span>短信通知</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        启用后将通过短信发送重要通知
                      </span>
                    </Label>
          <Switch
                      id="sms"
                      checked={smsEnabled}
                      onCheckedChange={setSmsEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>API密钥</Label>
                    <Input
                      type="password"
                      placeholder="请输入短信服务API密钥"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      disabled={!smsEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>通知模板</Label>
                    <Textarea
                      placeholder="请输入短信通知模板"
                      rows={3}
                      disabled={!smsEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 访问控制 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gray-500" />
                    访问控制
                  </CardTitle>
                  <CardDescription>
                    配置系统访问权限和安全策略
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>IP 白名单</Label>
                    <Textarea
                      placeholder="每行输入一个 IP 地址"
                      value={ipWhitelist}
                      onChange={(e) => setIpWhitelist(e.target.value)}
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">
                      留空表示允许所有 IP 访问
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>登录保护</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">启用验证码</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">登录失败锁定</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">异地登录提醒</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 认证设置 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-gray-500" />
                    认证设置
                  </CardTitle>
                  <CardDescription>
                    配置用户认证和授权方式
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>认证方式</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">账号密码认证</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch />
                        <span className="text-sm">短信验证码登录</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch />
                        <span className="text-sm">扫码登录</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>双因素认证</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch />
                        <span className="text-sm">Google Authenticator</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch />
                        <span className="text-sm">短信验证码</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch />
                        <span className="text-sm">邮箱验证码</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 数据备份 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-gray-500" />
                    数据备份
                  </CardTitle>
                  <CardDescription>
                    配置系统数据备份策略
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label className="flex flex-col space-y-1">
                      <span>自动备份</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        启用后将定期备份系统数据
                      </span>
                    </Label>
          <Switch
                      checked={backupEnabled}
                      onCheckedChange={setBackupEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>备份周期</Label>
                    <Select 
                      value={backupInterval}
                      onValueChange={setBackupInterval}
                      disabled={!backupEnabled}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择备份周期" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">每天</SelectItem>
                        <SelectItem value="weekly">每周</SelectItem>
                        <SelectItem value="monthly">每月</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>备份保留时间（天）</Label>
                    <Input
                      type="number"
                      value={logRetention}
                      onChange={(e) => setLogRetention(e.target.value)}
                      min="1"
                      max="365"
                      disabled={!backupEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 系统日志 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileType className="h-5 w-5 text-gray-500" />
                    系统日志
                  </CardTitle>
                  <CardDescription>
                    配置系统日志记录策略
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>日志级别</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue placeholder="选择日志级别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">调试</SelectItem>
                        <SelectItem value="info">信息</SelectItem>
                        <SelectItem value="warn">警告</SelectItem>
                        <SelectItem value="error">错误</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>日志类型</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">操作日志</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">登录日志</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">系统日志</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* API 配置 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5 text-gray-500" />
                    API 配置
                  </CardTitle>
                  <CardDescription>
                    配置 API 访问和限制策略
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>API 密钥</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="••••••••••••••••"
                      />
                      <Button variant="outline">
                        重新生成
                      </Button>
                    </div>
                  </div>
        <div className="space-y-2">
                    <Label>速率限制 (次/分钟)</Label>
          <Input
            type="number"
                      value={apiRateLimit}
                      onChange={(e) => setApiRateLimit(e.target.value)}
                      min="1"
                      max="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>API 版本</Label>
                    <Select defaultValue="v1">
                      <SelectTrigger>
                        <SelectValue placeholder="选择 API 版本" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v1">V1 (稳定版)</SelectItem>
                        <SelectItem value="v2">V2 (测试版)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Webhook 设置 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-gray-500" />
                    Webhook 设置
                  </CardTitle>
                  <CardDescription>
                    配置系统事件通知
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>事件通知</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">用户注册</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">订单创建</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">状态变更</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>回调地址</Label>
                    <Input placeholder="https://api.example.com/webhook" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="monitor" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 性能监控 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-gray-500" />
                    性能监控
                  </CardTitle>
                  <CardDescription>
                    配置系统性能监控策略
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label className="flex flex-col space-y-1">
                      <span>性能监控</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        启用后将收集系统性能数据
                      </span>
                    </Label>
                    <Switch
                      checked={monitoringEnabled}
                      onCheckedChange={setMonitoringEnabled}
          />
        </div>
                  <div className="space-y-2">
                    <Label>监控指标</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={performanceMetrics}
                          onCheckedChange={setPerformanceMetrics}
                          disabled={!monitoringEnabled}
                        />
                        <span className="text-sm">性能指标</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={errorTracking}
                          onCheckedChange={setErrorTracking}
                          disabled={!monitoringEnabled}
                        />
                        <span className="text-sm">错误追踪</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={userTracking}
                          onCheckedChange={setUserTracking}
                          disabled={!monitoringEnabled}
                        />
                        <span className="text-sm">用户行为</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 告警设置 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    告警设置
                  </CardTitle>
                  <CardDescription>
                    配置系统告警规则和通知方式
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>告警规则</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">CPU 使用率 {'>'} 80%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">内存使用率 {'>'} 80%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">磁盘使用率 {'>'} 90%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">接口响应时间 {'>'} 2s</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>通知方式</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">邮件通知</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">短信通知</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">钉钉通知</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 管理员验证对话框 */}
      <Dialog open={maintenanceDialog} onOpenChange={setMaintenanceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>启用维护模式</DialogTitle>
            <DialogDescription>
              请输入管理员姓名以启用维护模式。启用后，系统将仅允许指定管理员访问。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">管理员姓名</Label>
              <Input
                id="adminName"
                placeholder="请输入管理员姓名"
                value={adminName}
                onChange={(e) => {
                  setAdminName(e.target.value)
                  setAdminError(false)
                }}
              />
              {adminError && (
                <div className="flex items-center gap-2 text-sm text-red-500 mt-1">
                  <AlertCircle className="h-4 w-4" />
                  管理员姓名不正确
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setMaintenanceDialog(false)
                setAdminError(false)
                setAdminName("")
              }}
            >
              取消
            </Button>
            <Button
              onClick={handleMaintenanceConfirm}
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
            >
              确认启用
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button 
          size="lg"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4" />
          保存设置
        </Button>
      </div>
    </div>
  )
}

