"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { SystemSettings } from '@/types/settings'
import { loadSettings, saveSettings, defaultSettings } from '@/lib/settings'
import { useToast } from "@/components/ui/use-toast"

interface SettingsContextType {
  settings: SystemSettings
  updateSettings: (newSettings: Partial<SystemSettings>) => void
  isLoading: boolean
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // 初始化设置
  useEffect(() => {
    const savedSettings = loadSettings()
    setSettings(savedSettings)
    setIsLoading(false)
  }, [])

  // 更新设置
  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)
      saveSettings(updatedSettings)

      toast({
        title: "设置已更新",
        description: "系统设置已成功保存",
      })
    } catch (error) {
      toast({
        title: "更新失败",
        description: "保存设置时发生错误",
        variant: "destructive",
      })
    }
  }

  // 应用设置
  useEffect(() => {
    if (!isLoading) {
      // 应用语言
      document.documentElement.lang = settings.language
    }
  }, [settings, isLoading])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 