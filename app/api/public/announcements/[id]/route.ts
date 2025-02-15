import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { mockAnnouncements } from '@/data/mock/announcements'

// 获取公开的公告详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const announcement = mockAnnouncements.find(a => 
      a.id === params.id && 
      (a.status === "已发布" || a.status === "置顶")
    )
    
    if (!announcement) {
      return NextResponse.json({
        code: 404,
        message: "公告不存在或未发布"
      }, { status: 404 })
    }
    
    return NextResponse.json({
      code: 200,
      data: announcement,
      message: "获取成功"
    })
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器错误"
    }, { status: 500 })
  }
} 