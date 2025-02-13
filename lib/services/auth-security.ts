interface LoginAttempt {
  timestamp: number
  ip: string
  username: string
  success: boolean
}

interface SecurityConfig {
  maxAttempts: number      // 最大尝试次数
  lockoutDuration: number  // 锁定时长(毫秒)
  windowDuration: number   // 检查时间窗口(毫秒)
  ipRateLimit: number      // IP限制次数/分钟
}

interface SecurityLog {
  timestamp: number
  type: 'login' | 'logout' | 'password_change' | 'security_alert'
  username: string
  ip: string
  userAgent?: string
  details?: any
}

interface DeviceInfo {
  userAgent: string
  ip: string
  location?: string
  lastSeen: number
  trusted: boolean
}

// 添加会话接口
interface Session {
  id: string
  username: string
  ip: string
  userAgent: string
  createdAt: number
  expiresAt: number
}

export class AuthSecurityService {
  private static loginAttempts: LoginAttempt[] = []
  private static lockedAccounts: Map<string, number> = new Map() // username -> lockUntil
  private static lockedIPs: Map<string, number> = new Map()      // ip -> lockUntil
  
  private static readonly config: SecurityConfig = {
    maxAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15分钟
    windowDuration: 5 * 60 * 1000,   // 5分钟
    ipRateLimit: 30                  // 每分钟30次
  }

  private static securityLogs: SecurityLog[] = []
  private static knownDevices: Map<string, Map<string, DeviceInfo>> = new Map() // username -> (deviceId -> info)
  private static suspiciousIPs: Set<string> = new Set()

  // 检查登录请求是否允许
  static async validateLoginRequest(username: string, ip: string): Promise<{
    allowed: boolean
    reason?: string
    remainingAttempts?: number
    lockoutRemaining?: number
  }> {
    // 1. 检查账号是否被锁定
    const accountLockTime = this.lockedAccounts.get(username)
    if (accountLockTime && accountLockTime > Date.now()) {
      const remaining = Math.ceil((accountLockTime - Date.now()) / 1000)
      return {
        allowed: false,
        reason: "账号已被锁定",
        lockoutRemaining: remaining
      }
    }

    // 2. 检查IP是否被锁定
    const ipLockTime = this.lockedIPs.get(ip)
    if (ipLockTime && ipLockTime > Date.now()) {
      const remaining = Math.ceil((ipLockTime - Date.now()) / 1000)
      return {
        allowed: false,
        reason: "IP已被锁定",
        lockoutRemaining: remaining
      }
    }

    // 3. 检查IP频率限制
    const ipAttempts = this.getRecentIPAttempts(ip)
    if (ipAttempts >= this.config.ipRateLimit) {
      this.lockIP(ip)
      return {
        allowed: false,
        reason: "IP请求过于频繁"
      }
    }

    // 4. 检查账号失败次数
    const failedAttempts = this.getRecentFailedAttempts(username)
    const remainingAttempts = this.config.maxAttempts - failedAttempts

    if (failedAttempts >= this.config.maxAttempts) {
      this.lockAccount(username)
      return {
        allowed: false,
        reason: "失败尝试次数过多",
        remainingAttempts: 0
      }
    }

    return {
      allowed: true,
      remainingAttempts
    }
  }

  // 记录登录尝试
  static recordLoginAttempt(attempt: Omit<LoginAttempt, 'timestamp'>) {
    this.loginAttempts.push({
      ...attempt,
      timestamp: Date.now()
    })

    // 清理旧记录
    this.cleanupOldRecords()
  }

  // 获取最近失败尝试次数
  private static getRecentFailedAttempts(username: string): number {
    const now = Date.now()
    return this.loginAttempts.filter(attempt => 
      attempt.username === username &&
      !attempt.success &&
      (now - attempt.timestamp) <= this.config.windowDuration
    ).length
  }

  // 获取IP最近请求次数
  private static getRecentIPAttempts(ip: string): number {
    const now = Date.now()
    return this.loginAttempts.filter(attempt =>
      attempt.ip === ip &&
      (now - attempt.timestamp) <= 60000 // 1分钟内
    ).length
  }

  // 锁定账号
  private static lockAccount(username: string) {
    const lockUntil = Date.now() + this.config.lockoutDuration
    this.lockedAccounts.set(username, lockUntil)
  }

  // 锁定IP
  private static lockIP(ip: string) {
    const lockUntil = Date.now() + this.config.lockoutDuration
    this.lockedIPs.set(ip, lockUntil)
  }

  // 清理过期记录
  private static cleanupOldRecords() {
    const now = Date.now()

    // 清理登录记录
    this.loginAttempts = this.loginAttempts.filter(
      attempt => (now - attempt.timestamp) <= this.config.windowDuration
    )

    // 清理过期锁定
    for (const [username, lockTime] of this.lockedAccounts) {
      if (lockTime <= now) {
        this.lockedAccounts.delete(username)
      }
    }

    for (const [ip, lockTime] of this.lockedIPs) {
      if (lockTime <= now) {
        this.lockedIPs.delete(ip)
      }
    }
  }

  // 检查密码强度
  static checkPasswordStrength(password: string): {
    score: number  // 0-100
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0

    // 1. 长度检查
    if (password.length < 8) {
      feedback.push("密码长度应不少于8位")
    } else {
      score += Math.min((password.length * 5), 30)
    }

    // 2. 复杂度检查
    if (/[a-z]/.test(password)) score += 10
    if (/[A-Z]/.test(password)) score += 10
    if (/[0-9]/.test(password)) score += 10
    if (/[^A-Za-z0-9]/.test(password)) score += 15

    // 3. 常见模式检查
    if (/(.)\1{2,}/.test(password)) {
      score -= 10
      feedback.push("避免使用重复字符")
    }

    if (/^(?:abc|123|qwe|password|admin|user)/i.test(password)) {
      score -= 20
      feedback.push("避免使用常见密码模式")
    }

    // 4. 键盘模式检查
    const keyboardPatterns = ['qwerty', 'asdfgh', '123456']
    if (keyboardPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
      score -= 15
      feedback.push("避免使用键盘上连续的字符")
    }

    // 5. 提供建议
    if (score < 50) {
      feedback.push("建议使用大小写字母、数字和特殊字符的组合")
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      feedback
    }
  }

  // 生成安全的临时密码
  static generateTempPassword(): string {
    const length = 12
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let password = ""
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }

    return password
  }

  // 异常行为检测
  static detectAnomalousActivity(username: string, ip: string, userAgent: string): {
    suspicious: boolean
    risk: number
    reasons: string[]
  } {
    const reasons: string[] = []
    let risk = 0

    // 1. 检查登录时间模式
    const unusualTime = this.isUnusualLoginTime()
    if (unusualTime) {
      risk += 20
      reasons.push("非常规登录时间")
    }

    // 2. 检查地理位置异常
    const locationRisk = this.checkLocationRisk(ip)
    if (locationRisk.suspicious) {
      risk += locationRisk.risk
      reasons.push(locationRisk.reason)
    }

    // 3. 检查设备异常
    const deviceRisk = this.checkDeviceRisk(username, userAgent)
    if (deviceRisk.suspicious) {
      risk += deviceRisk.risk
      reasons.push(deviceRisk.reason)
    }

    // 4. 检查行为模式
    const behaviorRisk = this.analyzeBehaviorPattern(username)
    if (behaviorRisk.suspicious) {
      risk += behaviorRisk.risk
      reasons.push(behaviorRisk.reason)
    }

    return {
      suspicious: risk > 50,
      risk,
      reasons
    }
  }

  // 设备指纹识别
  static generateDeviceFingerprint(userAgent: string, ip: string): string {
    // 基于多个因素生成设备唯一标识
    const components = [
      userAgent,
      ip,
      // 可以添加更多设备特征
      // screen.resolution
      // installed fonts
      // browser plugins
      // timezone
    ]
    
    // 使用 SHA-256 生成指纹
    return this.hashString(components.join('|'))
  }

  // 可信设备管理
  static addTrustedDevice(username: string, deviceInfo: Omit<DeviceInfo, 'lastSeen' | 'trusted'>) {
    const deviceId = this.generateDeviceFingerprint(deviceInfo.userAgent, deviceInfo.ip)
    const userDevices = this.knownDevices.get(username) || new Map()
    
    userDevices.set(deviceId, {
      ...deviceInfo,
      lastSeen: Date.now(),
      trusted: true
    })

    this.knownDevices.set(username, userDevices)
  }

  // 二次验证管理
  static shouldRequire2FA(username: string, ip: string, userAgent: string): boolean {
    const deviceId = this.generateDeviceFingerprint(userAgent, ip)
    const userDevices = this.knownDevices.get(username)
    
    if (!userDevices?.has(deviceId)) {
      return true // 未知设备要求二次验证
    }

    const deviceInfo = userDevices.get(deviceId)!
    if (!deviceInfo.trusted) {
      return true // 不可信设备要求二次验证
    }

    // 检查其他风险因素
    const risk = this.detectAnomalousActivity(username, ip, userAgent)
    return risk.suspicious
  }

  // 安全日志记录
  static logSecurityEvent(event: Omit<SecurityLog, 'timestamp'>) {
    const log: SecurityLog = {
      ...event,
      timestamp: Date.now()
    }
    
    this.securityLogs.push(log)
    
    // 如果是安全警报,可能需要采取额外措施
    if (event.type === 'security_alert') {
      this.handleSecurityAlert(log)
    }
  }

  // 处理安全警报
  private static handleSecurityAlert(alert: SecurityLog) {
    // 1. 记录可疑IP
    if (alert.details?.suspiciousIP) {
      this.suspiciousIPs.add(alert.ip)
    }

    // 2. 可以添加通知管理员的逻辑
    this.notifySecurityTeam(alert)

    // 3. 根据警报类型采取相应措施
    if (alert.details?.type === 'brute_force') {
      this.lockAccount(alert.username)
      this.lockIP(alert.ip)
    }
  }

  // 会话安全管理
  static validateSession(sessionId: string, ip: string, userAgent: string): boolean {
    // 1. 验证会话是否存在且未过期
    const session = this.getSession(sessionId)
    if (!session) return false

    // 2. 验证IP和设备信息是否匹配
    if (session.ip !== ip || session.userAgent !== userAgent) {
      this.logSecurityEvent({
        type: 'security_alert',
        username: session.username,
        ip,
        userAgent,
        details: {
          type: 'session_hijacking_attempt',
          originalIP: session.ip,
          originalUserAgent: session.userAgent
        }
      })
      return false
    }

    return true
  }

  // 密码历史管理
  private static passwordHistory: Map<string, string[]> = new Map() // username -> hashed passwords

  static checkPasswordHistory(username: string, newPassword: string): boolean {
    const hashedPassword = this.hashString(newPassword)
    const history = this.passwordHistory.get(username) || []
    
    // 检查是否在最近的密码历史中
    return !history.includes(hashedPassword)
  }

  static addToPasswordHistory(username: string, password: string) {
    const hashedPassword = this.hashString(password)
    const history = this.passwordHistory.get(username) || []
    
    // 保持最近的5个密码记录
    history.unshift(hashedPassword)
    if (history.length > 5) {
      history.pop()
    }
    
    this.passwordHistory.set(username, history)
  }

  // 辅助方法
  private static isUnusualLoginTime(): boolean {
    const hour = new Date().getHours()
    return hour >= 22 || hour <= 6
  }

  private static checkLocationRisk(ip: string): {
    suspicious: boolean
    risk: number
    reason: string
  } {
    // 实现IP地理位置风险评估
    return {
      suspicious: false,
      risk: 0,
      reason: ''
    }
  }

  private static checkDeviceRisk(username: string, userAgent: string): {
    suspicious: boolean
    risk: number
    reason: string
  } {
    // 实现设备风险评估
    return {
      suspicious: false,
      risk: 0,
      reason: ''
    }
  }

  private static analyzeBehaviorPattern(username: string): {
    suspicious: boolean
    risk: number
    reason: string
  } {
    // 实现行为模式分析
    return {
      suspicious: false,
      risk: 0,
      reason: ''
    }
  }

  private static hashString(str: string): string {
    // 实现安全的哈希算法
    return str // 这里应该使用真实的哈希函数
  }

  // 修改 getSession 方法返回类型
  private static getSession(sessionId: string): Session | null {
    // 实现会话获取逻辑
    // 这里仅作为示例返回 null
    return null
  }

  private static notifySecurityTeam(alert: SecurityLog) {
    // 实现安全团队通知逻辑
    console.log('Security Alert:', alert)
  }
} 