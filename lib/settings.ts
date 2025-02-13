import { SystemSettings } from "@/types/settings"

// 完整的默认配置
export const defaultSettings: SystemSettings = {
  // 基础设置
  siteName: "农业财务管理系统",
  siteDescription: "高效的补贴申请和管理平台",
  maintenanceMode: false,
  maintenanceAdmin: "",
  
  // 界面设置
  theme: 'light',
  language: 'zh',
  timezone: 'Asia/Shanghai',
  
  // 通知设置
  emailNotifications: {
    enabled: false,
    server: '',
    username: '',
    password: ''
  },
  smsNotifications: {
    enabled: false,
    apiKey: '',
    template: '【补贴系统】您的验证码是：{code}，{time}分钟内有效。'
  },
  
  // 安全设置
  ipWhitelist: [],
  loginProtection: {
    captchaEnabled: true,
    lockoutEnabled: true,
    locationAlert: true
  },
  authentication: {
    passwordLogin: true,
    smsLogin: false,
    qrLogin: false,
    twoFactor: {
      google: false,
      sms: false,
      email: false
    }
  },
  
  // 系统设置
  backup: {
    enabled: false,
    interval: 'daily',
    retention: 30
  },
  logging: {
    level: 'info',
    types: {
      operation: true,
      login: true,
      system: true
    }
  },
  
  // API设置
  api: {
    key: '',
    rateLimit: 100,
    version: 'v1'
  },
  webhook: {
    events: {
      userRegister: false,
      orderCreate: false,
      statusChange: false
    },
    callbackUrl: ''
  },
  
  // 监控设置
  monitoring: {
    enabled: false,
    metrics: {
      performance: true,
      error: true,
      user: false
    }
  },
  alerts: {
    rules: {
      cpu: true,
      memory: true,
      disk: true,
      api: true
    },
    notifications: {
      email: true,
      sms: true,
      dingtalk: false
    }
  }
}

// 加载配置
export function loadSettings(): SystemSettings {
  if (typeof window === 'undefined') return defaultSettings
  
  try {
    const savedSettings = localStorage.getItem('systemSettings')
    if (!savedSettings) {
      return defaultSettings
    }
    
    return {
      ...defaultSettings,
      ...JSON.parse(savedSettings),
    }
  } catch (error) {
    console.error('加载设置失败:', error)
    return defaultSettings
  }
}

// 保存配置
export function saveSettings(settings: SystemSettings): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('systemSettings', JSON.stringify(settings))
  } catch (error) {
    console.error('保存设置失败:', error)
  }
}

// 更新单个配置项
export function updateSetting<K extends keyof SystemSettings>(
  key: K,
  value: SystemSettings[K]
): void {
  const settings = loadSettings()
  saveSettings({
    ...settings,
    [key]: value
  })
}

// 深度合并对象
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target }
  
  Object.keys(source).forEach((key: keyof T) => {
    const sourceValue = source[key]
    const targetValue = target[key]
    
    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object'
    ) {
      result[key] = deepMerge(
        targetValue as Record<string, any>,
        sourceValue as Record<string, any>
      ) as T[keyof T]
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[keyof T]
    }
  })
  
  return result
}

// 验证设置有效性
function validateSettings(settings: SystemSettings): void {
  // 验证必填字段
  if (!settings.siteName) {
    throw new Error('网站名称不能为空')
  }
  
  // 验证邮件配置
  if (settings.emailNotifications.enabled) {
    if (!settings.emailNotifications.server) {
      throw new Error('邮件服务器地址不能为空')
    }
    if (!settings.emailNotifications.username) {
      throw new Error('邮箱账号不能为空')
    }
    if (!settings.emailNotifications.password) {
      throw new Error('邮箱密码不能为空')
    }
  }
  
  // 验证短信配置
  if (settings.smsNotifications.enabled && !settings.smsNotifications.apiKey) {
    throw new Error('短信 API 密钥不能为空')
  }
  
  // 验证备份配置
  if (settings.backup.enabled) {
    if (settings.backup.retention < 1 || settings.backup.retention > 365) {
      throw new Error('备份保留时间必须在 1-365 天之间')
    }
  }
  
  // 验证 API 配置
  if (settings.api.rateLimit < 1 || settings.api.rateLimit > 1000) {
    throw new Error('API 速率限制必须在 1-1000 次/分钟之间')
  }
}

// 移除敏感信息
function sanitizeSettings(settings: SystemSettings): SystemSettings {
  const sanitized = { ...settings }
  
  // 移除密码
  if (sanitized.emailNotifications.password) {
    sanitized.emailNotifications.password = '******'
  }
  
  // 移除 API 密钥
  if (sanitized.smsNotifications.apiKey) {
    sanitized.smsNotifications.apiKey = '******'
  }
  if (sanitized.api.key) {
    sanitized.api.key = '******'
  }
  
  return sanitized
}

// 应用设置
function applySettings(settings: SystemSettings): void {
  // 应用语言
  document.documentElement.lang = settings.language
  
  // 应用时区
  try {
    Intl.DateTimeFormat(undefined, { timeZone: settings.timezone })
  } catch (error) {
    console.error('时区设置无效:', error)
  }
  
  // 应用监控设置
  if (settings.monitoring.enabled) {
    // 初始化性能监控
    if (settings.monitoring.metrics.performance) {
      initPerformanceMonitoring()
    }
    // 初始化错误追踪
    if (settings.monitoring.metrics.error) {
      initErrorTracking()
    }
    // 初始化用户行为追踪
    if (settings.monitoring.metrics.user) {
      initUserTracking()
    }
  }
}

// 性能监控初始化
function initPerformanceMonitoring(): void {
  // 实现性能监控逻辑
  console.log('初始化性能监控')
}

// 错误追踪初始化
function initErrorTracking(): void {
  // 实现错误追踪逻辑
  console.log('初始化错误追踪')
}

// 用户行为追踪初始化
function initUserTracking(): void {
  // 实现用户行为追踪逻辑
  console.log('初始化用户行为追踪')
}

// 使用示例
updateSetting('language', 'zh') // 类型安全 