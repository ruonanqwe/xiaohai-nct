import { Application } from "@/data/mock/applications"

// 申请风险评分系统
interface RiskScore {
  score: number // 0-100，越高风险越大
  factors: string[] // 风险因素
  recommendations: string[] // 建议措施
  level: "低" | "中" | "高" // 风险等级
}

// 智能审核结果
interface AutoReviewResult {
  recommendation: "批准" | "拒绝" | "需人工审核"
  confidence: number // 0-1，置信度
  riskScore: RiskScore
  reasons: string[]
  suggestedAmount?: number
  similarCases?: Array<{
    id: string
    similarity: number
    result: string
  }>
  processingTimeEstimate?: number // 预计处理时间（天）
}

// 欺诈检测结果
interface FraudDetectionResult {
  isSuspicious: boolean
  score: number // 0-100
  reasons: string[]
  patterns: string[]
}

export class ApplicationAnalysisService {
  private static readonly RISK_THRESHOLDS = {
    LOW: 30,
    MEDIUM: 60,
    HIGH: 80
  }

  private static readonly AMOUNT_THRESHOLDS = {
    EDUCATION: { MIN: 1000, MAX: 20000 },
    MEDICAL: { MIN: 1000, MAX: 50000 },
    HOUSING: { MIN: 5000, MAX: 100000 },
    BUSINESS: { MIN: 5000, MAX: 200000 }
  }

  // 风险评分计算
  static calculateRiskScore(application: Application): RiskScore {
    const factors: string[] = []
    const recommendations: string[] = []
    let score = 0

    // 1. 申请金额异常检测
    const amountRisk = this.analyzeAmountRisk(application)
    score += amountRisk.score
    factors.push(...amountRisk.factors)
    recommendations.push(...amountRisk.recommendations)

    // 2. 申请频率检测
    const frequencyRisk = this.analyzeFrequencyRisk(application)
    score += frequencyRisk.score
    factors.push(...frequencyRisk.factors)
    recommendations.push(...frequencyRisk.recommendations)

    // 3. 材料完整性检查
    const completenessRisk = this.analyzeCompletenessRisk(application)
    score += completenessRisk.score
    factors.push(...completenessRisk.factors)
    recommendations.push(...completenessRisk.recommendations)

    // 4. 欺诈检测
    const fraudRisk = this.detectFraud(application)
    if (fraudRisk.isSuspicious) {
      score += fraudRisk.score
      factors.push(...fraudRisk.reasons)
      recommendations.push("建议进行实地核查")
    }

    // 5. 优先级评估
    const priorityAdjustment = this.analyzePriorityRisk(application)
    score = Math.max(0, Math.min(100, score + priorityAdjustment))

    return {
      score,
      factors,
      recommendations,
      level: score <= this.RISK_THRESHOLDS.LOW ? "低" :
             score <= this.RISK_THRESHOLDS.MEDIUM ? "中" : "高"
    }
  }

  // 金额风险分析
  private static analyzeAmountRisk(application: Application) {
    const factors: string[] = []
    const recommendations: string[] = []
    let score = 0

    const threshold = this.AMOUNT_THRESHOLDS[application.type as keyof typeof this.AMOUNT_THRESHOLDS]
    if (threshold) {
      if (application.amount < threshold.MIN) {
        score += 10
        factors.push("申请金额低于最低标准")
        recommendations.push("建议核实申请金额的合理性")
      } else if (application.amount > threshold.MAX) {
        score += 30
        factors.push("申请金额超过最高限额")
        recommendations.push("建议要求详细支出说明")
      }
    }

    return { score, factors, recommendations }
  }

  // 申请频率分析
  private static analyzeFrequencyRisk(application: Application) {
    // 模拟从数据库获取历史申请记录
    const recentApplications = []
    const factors: string[] = []
    const recommendations: string[] = []
    let score = 0

    const monthlyLimit = {
      "教育补贴": 1,
      "医疗补贴": 2,
      "住房补贴": 1,
      "创业补贴": 1
    }[application.type] || 1

    if (recentApplications.length > monthlyLimit) {
      score += 25
      factors.push(`${application.type}每月申请次数超限`)
      recommendations.push("建议核实多次申请的必要性")
    }

    return { score, factors, recommendations }
  }

  // 材料完整性分析
  private static analyzeCompletenessRisk(application: Application) {
    const factors: string[] = []
    const recommendations: string[] = []
    let score = 0

    const completeness = this.checkDocumentCompleteness(application)
    if (completeness < 0.6) {
      score += 30
      factors.push("关键材料缺失")
      recommendations.push("建议补充必要申请材料")
    } else if (completeness < 0.8) {
      score += 15
      factors.push("部分材料缺失")
      recommendations.push("建议补充辅助材料")
    }

    return { score, factors, recommendations }
  }

  // 优先级风险分析
  private static analyzePriorityRisk(application: Application) {
    const adjustments = {
      "高": -20,
      "中": 0,
      "低": 10
    }[application.priority] || 0

    return adjustments
  }

  // 欺诈检测
  private static detectFraud(application: Application): FraudDetectionResult {
    const patterns: string[] = []
    const reasons: string[] = []
    let score = 0

    // 1. 检查申请材料一致性
    if (this.checkDocumentInconsistency(application)) {
      score += 30
      patterns.push("材料信息不一致")
      reasons.push("申请材料中的信息存在矛盾")
    }

    // 2. 检查异常申请模式
    if (this.checkAbnormalPattern(application)) {
      score += 25
      patterns.push("异常申请模式")
      reasons.push("申请行为存在异常模式")
    }

    // 3. 历史信用检查
    const creditIssues = this.checkCreditHistory(application)
    if (creditIssues.length > 0) {
      score += 20
      patterns.push("历史信用问题")
      reasons.push(...creditIssues)
    }

    return {
      isSuspicious: score > 50,
      score,
      reasons,
      patterns
    }
  }

  // 检查文档一致性
  private static checkDocumentInconsistency(application: Application): boolean {
    // 实现文档信息一致性检查逻辑
    return false
  }

  // 检查异常申请模式
  private static checkAbnormalPattern(application: Application): boolean {
    // 实现异常模式检测逻辑
    return false
  }

  // 检查信用历史
  private static checkCreditHistory(application: Application): string[] {
    // 实现信用历史检查逻辑
    return []
  }

  // 查找相似案例
  private static findSimilarCases(application: Application) {
    // 实现相似案例查找逻辑
    return []
  }

  // 预测处理时间
  private static estimateProcessingTime(application: Application): number {
    const baseTime = 3 // 基础处理时间（天）
    let adjustments = 0

    // 根据优先级调整
    if (application.priority === "高") adjustments -= 1
    if (application.priority === "低") adjustments += 1

    // 根据材料完整性调整
    const completeness = this.checkDocumentCompleteness(application)
    if (completeness < 0.8) adjustments += 2

    // 根据风险等级调整
    const risk = this.calculateRiskScore(application)
    if (risk.level === "高") adjustments += 2

    return Math.max(1, baseTime + adjustments)
  }

  // 智能审核决策
  static autoReview(application: Application): AutoReviewResult {
    const riskScore = this.calculateRiskScore(application)
    const reasons: string[] = []
    let recommendation: "批准" | "拒绝" | "需人工审核" = "需人工审核"
    let confidence = 0.5

    // 1. 风险评估
    if (riskScore.score <= this.RISK_THRESHOLDS.LOW) {
      recommendation = "批准"
      confidence = 0.9
      reasons.push("风险评分较低")
    } else if (riskScore.score >= this.RISK_THRESHOLDS.HIGH) {
      recommendation = "拒绝"
      confidence = 0.8
      reasons.push("风险评分过高")
    }

    // 2. 欺诈检测
    const fraudResult = this.detectFraud(application)
    if (fraudResult.isSuspicious) {
      recommendation = "需人工审核"
      confidence = Math.max(confidence, 0.85)
      reasons.push(...fraudResult.reasons)
    }

    // 3. 相似案例分析
    const similarCases = this.findSimilarCases(application)
    if (similarCases.length > 0) {
      confidence = Math.min(confidence + 0.1, 1)
    }

    // 4. 处理时间预测
    const processingTimeEstimate = this.estimateProcessingTime(application)

    return {
      recommendation,
      confidence,
      riskScore,
      reasons,
      suggestedAmount: this.calculateSuggestedAmount(application),
      similarCases,
      processingTimeEstimate
    }
  }

  // 计算建议金额
  private static calculateSuggestedAmount(application: Application): number {
    // 基于历史数据和申请类型计算建议金额
    const baseAmount = {
      "教育补贴": 5000,
      "医疗补贴": 3000,
      "住房补贴": 8000,
      "创业补贴": 10000
    }[application.type] || 5000

    // 根据优先级调整
    const priorityMultiplier = {
      "高": 1.2,
      "中": 1.0,
      "低": 0.8
    }[application.priority]

    return baseAmount * priorityMultiplier
  }

  // 检查文档完整性
  private static checkDocumentCompleteness(application: Application): number {
    const requiredDocs = {
      "教育补贴": ["学费单", "户口本", "收入证明"],
      "医疗补贴": ["医疗费用清单", "诊断证明"],
      "住房补贴": ["房屋照片", "维修预算单", "房产证"],
      "创业补贴": ["营业执照", "经营计划书"]
    }[application.type] || []

    if (!application.details.attachments) return 0

    const attachedDocs = application.details.attachments.map(file => 
      file.toLowerCase().replace('.pdf', '').replace('.jpg', '')
    )

    const matchedDocs = requiredDocs.filter(doc => 
      attachedDocs.some(attached => attached.includes(doc.toLowerCase()))
    )

    return matchedDocs.length / requiredDocs.length
  }

  // 添加新的分析方法
  private static analyzeApplicantHistory(application: Application) {
    // 模拟从数据库获取历史记录
    const history = {
      previousApplications: [],
      creditScore: 85,
      violations: []
    }

    const factors: string[] = []
    const recommendations: string[] = []
    let score = 0

    // 信用评分分析
    if (history.creditScore < 60) {
      score += 30
      factors.push("申请人信用评分较低")
      recommendations.push("建议进行更严格的审核")
    }

    // 违规记录分析
    if (history.violations.length > 0) {
      score += 25
      factors.push("存在违规记录")
      recommendations.push("建议核实违规情况的改善状况")
    }

    return { score, factors, recommendations }
  }

  // 智能金额分析
  private static analyzeAmount(application: Application) {
    const result = {
      isReasonable: true,
      adjustmentSuggestion: 0,
      reasons: [] as string[]
    }

    // 基于家庭收入的合理性分析
    const monthlyIncome = 10000 // 模拟获取家庭月收入
    const requestRatio = application.amount / monthlyIncome

    if (requestRatio > 5) {
      result.isReasonable = false
      result.reasons.push("申请金额超过家庭月收入的5倍")
      result.adjustmentSuggestion = monthlyIncome * 3
    }

    // 基于历史数据的分析
    const historicalAverage = 5000 // 模拟获取历史平均值
    const deviation = Math.abs(application.amount - historicalAverage) / historicalAverage

    if (deviation > 0.5) {
      result.reasons.push("申请金额与历史平均值差异较大")
    }

    return result
  }

  // 材料真实性验证
  private static validateDocuments(application: Application) {
    const validationResult = {
      isValid: true,
      issues: [] as string[],
      confidence: 1.0
    }

    // 图像真实性检测
    const imageFiles = application.details.attachments?.filter(file => 
      file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png')
    ) || []

    if (imageFiles.length > 0) {
      // 模拟图像分析结果
      const imageAnalysis = {
        hasManipulation: false,
        quality: "high",
        metadata: {}
      }

      if (imageAnalysis.hasManipulation) {
        validationResult.isValid = false
        validationResult.issues.push("检测到图片可能被篡改")
        validationResult.confidence -= 0.3
      }
    }

    // 文档一致性检查
    const documentConsistency = this.checkDocumentConsistency(application)
    if (!documentConsistency.isConsistent) {
      validationResult.isValid = false
      validationResult.issues.push(...documentConsistency.issues)
      validationResult.confidence -= 0.2
    }

    return validationResult
  }

  // 文档一致性检查
  private static checkDocumentConsistency(application: Application) {
    return {
      isConsistent: true,
      issues: [] as string[]
    }
  }

  // 优先级智能调整
  private static adjustPriority(application: Application) {
    let priority = application.priority
    const factors = [] as string[]

    // 紧急程度评估
    const urgencyScore = this.calculateUrgencyScore(application)
    if (urgencyScore > 80) {
      priority = "高"
      factors.push("情况紧急")
    }

    // 特殊情况考虑
    if (this.hasSpecialCircumstances(application)) {
      priority = "高"
      factors.push("存在特殊情况")
    }

    return { priority, factors }
  }

  // 计算紧急程度
  private static calculateUrgencyScore(application: Application): number {
    // 实现紧急程度评分逻辑
    return 50
  }

  // 检查特殊情况
  private static hasSpecialCircumstances(application: Application): boolean {
    // 实现特殊情况检查逻辑
    return false
  }
} 