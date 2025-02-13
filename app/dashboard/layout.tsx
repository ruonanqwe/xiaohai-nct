"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Home,
  Gift,
  ChevronDown,
  MenuIcon,
  BarChart,
  Settings,
  FileText,
  Bell,
  LogOut,
  Megaphone,
  Code,
  Globe,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import dynamic from 'next/dynamic'
import { logout } from "@/app/actions/auth"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "仪表盘", href: "/dashboard" },
  { icon: Users, label: "用户管理", href: "/dashboard/users" },
  { icon: Users, label: "家庭账户", href: "/dashboard/families" },
  {
    icon: Gift,
    label: "补贴管理",
    href: "/dashboard/subsidy-overview",
    subItems: [
      { label: "补贴总览", href: "/dashboard/subsidy-overview" },
      { label: "热门补贴", href: "/dashboard/subsidies/hot" },
      { label: "政策咨询", href: "/dashboard/subsidies/policy" },
      { label: "补贴类型", href: "/dashboard/subsidy-types" },
      { label: "申请流程", href: "/dashboard/subsidies/process" },
      { label: "资格条件", href: "/dashboard/subsidies/eligibility" },
    ],
  },
  { icon: FileText, label: "申请审核", href: "/dashboard/applications" },
  { icon: BarChart, label: "数据统计", href: "/dashboard/statistics" },
  { icon: Megaphone, label: "更新和公告", href: "/dashboard/announcements" },
  { icon: Bell, label: "通知中心", href: "/dashboard/notifications" },
  {
    icon: FileText,
    label: "文档管理",
    href: "/dashboard/documents",
    subItems: [
      { label: "隐私政策", href: "/dashboard/documents/privacy" },
      { label: "用户协议", href: "/dashboard/documents/terms" },
      { label: "操作手册", href: "/dashboard/documents/manual" },
      { label: "常见问题", href: "/dashboard/documents/faq" },
    ],
  },
  { icon: Settings, label: "系统设置", href: "/dashboard/settings" },
  { icon: Code, label: "API管理", href: "/dashboard/api-management" },
  { icon: Globe, label: "官网管理", href: "/dashboard/website-management" },
]

// 优化动态导入
const NotificationsDropdown = dynamic(() => import('./notifications-dropdown'), {
  ssr: false,
  loading: () => <div className="w-10 h-10 flex items-center justify-center">
    <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
  </div>
})

const HelpCenter = dynamic(() => import('./help-center'), {
  ssr: false,
  loading: () => <div className="w-10 h-10 flex items-center justify-center">
    <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
  </div>
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // 使用 useMemo 缓存菜单项的预加载
  const prefetchRoutes = useMemo(() => {
    return menuItems.reduce((acc: string[], item) => {
      acc.push(item.href)
      if (item.subItems) {
        acc.push(...item.subItems.map(subItem => subItem.href))
      }
      return acc
    }, [])
  }, [])

  // 优化预加载逻辑
  useEffect(() => {
    const prefetchAll = async () => {
      const promises = prefetchRoutes.map(route => router.prefetch(route))
      await Promise.all(promises)
    }
    prefetchAll()
  }, [prefetchRoutes, router])

  // 优化路由切换处理
  const handleLinkClick = useCallback((href: string) => {
    if (href !== pathname) {
      setOpenSubmenu(null)
      setIsRouteChanging(true)
      requestAnimationFrame(() => {
        router.push(href)
      })
    }
  }, [pathname, router])

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      router.push("/login")
    }
  }

  // 优化加载状态处理
  useEffect(() => {
    if (isRouteChanging) {
      const timer = setTimeout(() => {
        setIsRouteChanging(false)
      }, 300) // 减少动画时间
      return () => clearTimeout(timer)
    }
  }, [isRouteChanging])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-transform duration-150 ease-in-out flex flex-col`}
      >
        <div className="p-3 flex items-center justify-between">
          <h1 className={`text-lg font-bold ${isSidebarOpen ? "" : "hidden"}`}>农财通</h1>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-gray-800" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className={`px-3 mb-3 ${isSidebarOpen ? "" : "hidden"}`}>
          <Input placeholder="搜索..." className="h-8 text-sm" />
        </div>
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className={`flex items-center ${
                  isSidebarOpen 
                    ? "px-3 py-2 text-sm"
                    : "justify-center py-2 px-0"
                } hover:bg-gray-800 ${
                  pathname === item.href ? "bg-gray-800" : ""
                }`}
              >
                <item.icon className={`h-5 w-5 ${isSidebarOpen ? "mr-3" : ""}`} />
                {isSidebarOpen && (
                  <>
                    <span className="text-sm">{item.label}</span>
                    {item.subItems && (
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${
                          openSubmenu === item.href ? "rotate-180" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          setOpenSubmenu(openSubmenu === item.href ? null : item.href)
                        }}
                      />
                    )}
                  </>
                )}
              </Link>
              {item.subItems && openSubmenu === item.href && isSidebarOpen && (
                <div className="bg-gray-800/50">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      onClick={() => handleLinkClick(subItem.href)}
                      className={`
                        block px-10 py-2 text-sm 
                        hover:bg-gray-700/50
                        transition-colors duration-200
                        ${pathname === subItem.href 
                          ? "bg-gray-700/50 text-white" 
                          : "text-gray-300"
                        }
                        border-l-2 border-transparent
                        ${pathname === subItem.href ? "border-blue-500" : ""}
                      `}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src="/avatars/03.png" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-medium leading-tight">管理员</p>
                <p className="text-xs text-gray-400 leading-tight">1963876196@qq.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800">仪表盘</h2>
            <div className="flex items-center space-x-4">
              <NotificationsDropdown />
              <HelpCenter />
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 relative">
          <div 
            className={cn(
              "container mx-auto px-4 sm:px-6 lg:px-8 py-6",
              "page-transition"
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

