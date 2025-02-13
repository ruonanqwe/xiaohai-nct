export type Theme = 'light' | 'dark' | 'system'
export type Language = 'zh' | 'en'
export type BackupInterval = 'daily' | 'weekly' | 'monthly'
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
export type ApiVersion = 'v1' | 'v2'

export interface SystemSettings {
  // 基础设置
  siteName: string
  siteDescription: string
  maintenanceMode: boolean
  maintenanceAdmin: string
  
  // 界面设置
  theme: Theme
  language: 'zh' | 'en'
  timezone: string
  
  // 通知设置
  emailNotifications: {
    enabled: boolean
    server: string
    username: string
    password: string
  }
  smsNotifications: {
    enabled: boolean
    apiKey: string
    template: string
  }
  
  // 安全设置
  ipWhitelist: string[]
  loginProtection: {
    captchaEnabled: boolean
    lockoutEnabled: boolean
    locationAlert: boolean
  }
  authentication: {
    passwordLogin: boolean
    smsLogin: boolean
    qrLogin: boolean
    twoFactor: {
      google: boolean
      sms: boolean
      email: boolean
    }
  }
  
  // 系统设置
  backup: {
    enabled: boolean
    interval: BackupInterval
    retention: number
  }
  logging: {
    level: LogLevel
    types: {
      operation: boolean
      login: boolean
      system: boolean
    }
  }
  
  // API设置
  api: {
    key: string
    rateLimit: number
    version: ApiVersion
  }
  webhook: {
    events: {
      userRegister: boolean
      orderCreate: boolean
      statusChange: boolean
    }
    callbackUrl: string
  }
  
  // 监控设置
  monitoring: {
    enabled: boolean
    metrics: {
      performance: boolean
      error: boolean
      user: boolean
    }
  }
  alerts: {
    rules: {
      cpu: boolean
      memory: boolean
      disk: boolean
      api: boolean
    }
    notifications: {
      email: boolean
      sms: boolean
      dingtalk: boolean
    }
  }
}

// 完整的默认设置
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
    interval: 'daily' as BackupInterval,
    retention: 30
  },
  logging: {
    level: 'info' as LogLevel,
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
    version: 'v1' as ApiVersion
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