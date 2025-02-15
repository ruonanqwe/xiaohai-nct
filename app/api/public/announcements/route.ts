import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { mockAnnouncements } from '@/data/mock/announcements'

// 获取公开的公告列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // 只获取已发布和置顶的公告
    let announcements = mockAnnouncements.filter(a => 
      a.status === "已发布" || a.status === "置顶"
    )
    
    // 根据类型筛选
    if (type) {
      announcements = announcements.filter(a => a.type === type)
    }
    
    // 置顶的公告排在前面，然后按日期降序排序
    announcements.sort((a, b) => {
      if (a.status === "置顶" && b.status !== "置顶") return -1
      if (a.status !== "置顶" && b.status === "置顶") return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    
    // 限制返回数量
    announcements = announcements.slice(0, limit)
    
    return NextResponse.json({
      code: 200,
      data: announcements,
      message: "获取成功"
    })
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器错误"
    }, { status: 500 })
  }
} 