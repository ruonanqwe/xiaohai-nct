"use client"

import { useEffect, useCallback, useRef } from 'react'
import { UserManagementProvider } from "@/contexts/user-management-context"
import { ReportManagementProvider } from "@/contexts/report-management-context"
import { FamilyManagementProvider } from "@/contexts/family-management-context"
import { SettingsProvider } from "@/contexts/settings-context"
import { useRouter } from 'next/navigation'
import { isMobileDevice, isDevToolsOpen, disableKeyboardShortcuts } from '@/lib/security'
import { useToast } from "@/components/ui/use-toast"
import { debounce } from "lodash"

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { toast } = useToast()
  const devToolsWarningShown = useRef(false)
  const toastShownTimestamp = useRef(0)

  // 限制提示频率
  const showToast = useCallback((options: Parameters<typeof toast>[0]) => {
    const now = Date.now()
    if (now - toastShownTimestamp.current > 3000) { // 3秒内不重复显示
      toastShownTimestamp.current = now
      toast(options)
    }
  }, [toast])

  useEffect(() => {
    // 移动设备检测（只在首次加载时检查）
    if (isMobileDevice()) {
      router.push('/mobile')
      return
    }

    // 禁用右键菜单
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      showToast({
        title: "操作受限",
        description: "为了系统安全，已禁用右键菜单",
        variant: "default",
      })
    }

    // 使用 debounce 处理键盘事件
    const handleKeyDown = debounce((e: KeyboardEvent) => {
      if (!disableKeyboardShortcuts(e)) {
        showToast({
          title: "操作受限",
          description: "为了系统安全，已禁用该快捷键",
          variant: "default",
        })
      }
    }, 300)

    // 降低开发者工具检测频率
    const detectDevTools = debounce(() => {
      if (isDevToolsOpen() && !devToolsWarningShown.current) {
        devToolsWarningShown.current = true
        showToast({
          title: "安全警告",
          description: "请勿使用开发者工具，这可能会导致系统不稳定",
          variant: "destructive",
          duration: 5000,
        })
      }
    }, 1000)

    // 页面可见性变化检测
    const handleVisibilityChange = debounce(() => {
      if (document.hidden) {
        // 可以添加额外的安全检查，但要注意性能
        console.log('页面不可见')
      }
    }, 500)

    // 添加事件监听
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 降低检测频率
    const devToolsInterval = setInterval(detectDevTools, 2000)

    // 清理函数
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(devToolsInterval)
      handleKeyDown.cancel()
      detectDevTools.cancel()
      handleVisibilityChange.cancel()
    }
  }, [router, showToast])

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <SettingsProvider>
        <UserManagementProvider>
          <ReportManagementProvider>
            <FamilyManagementProvider>
              {children}
            </FamilyManagementProvider>
          </ReportManagementProvider>
        </UserManagementProvider>
      </SettingsProvider>
    </div>
  )
} 