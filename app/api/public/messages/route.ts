import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Message, MessageResponse } from '@/types/message'
import { MessageFilter } from '@/lib/message-filter'
import { z } from 'zod'

// 验证模式
const messageSchema = z.object({
  name: z.string().min(2, "姓名至少2个字符").max(50, "姓名不能超过50个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  content: z.string().min(5, "留言内容至少5个字符").max(500, "留言内容不能超过500个字符")
})

// 接收留言
export async function POST(request: NextRequest) {
  try {
    // 获取IP地址
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'
    
    // 检查频率限制
    const rateLimit = MessageFilter.checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json({
        code: 429,
        message: rateLimit.message || "请求过于频繁",
      }, { status: 429 })
    }

    const body = await request.json()
    
    // 验证数据
    const validationResult = messageSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({
        code: 400,
        message: "数据验证失败",
        error: validationResult.error.errors[0].message
      }, { status: 400 })
    }

    // 检查敏感词
    const contentCheck = MessageFilter.checkContent(body.content)
    if (!contentCheck.safe) {
      return NextResponse.json({
        code: 400,
        message: "留言包含敏感内容",
        error: `发现敏感词: ${contentCheck.words?.join(', ')}`
      }, { status: 400 })
    }

    // 检查垃圾留言
    if (MessageFilter.isSpam(body.content)) {
      return NextResponse.json({
        code: 400,
        message: "疑似垃圾留言",
        error: "请调整留言内容后重试"
      }, { status: 400 })
    }
    
    // 构造留言数据
    const message: Message = {
      ...validationResult.data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    
    // 转发到您的后端 API
    const res = await fetch('https://xiaohai-nct.netlify.app/api/public/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })
    
    const data: MessageResponse = await res.json()
    
    if (!res.ok) {
      throw new Error(data.message || '留言提交失败')
    }
    
    return NextResponse.json(data)

  } catch (error) {
    console.error('留言提交错误:', error)
    return NextResponse.json({
      code: 500,
      message: "留言提交失败",
      error: error instanceof Error ? error.message : "未知错误"
    }, { status: 500 })
  }
} 