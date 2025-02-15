import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { mockAnnouncements } from '@/data/mock/announcements'

// 更新公告状态
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    
    if (!status || !["已发布", "草稿", "置顶"].includes(status)) {
      return NextResponse.json({
        code: 400,
        message: "无效的状态值"
      }, { status: 400 })
    }
    
    const index = mockAnnouncements.findIndex(a => a.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({
        code: 404,
        message: "公告不存在"
      }, { status: 404 })
    }
    
    // 如果要置顶,先取消其他公告的置顶状态
    if (status === "置顶") {
      mockAnnouncements.forEach(a => {
        if (a.status === "置顶") {
          a.status = "已发布"
        }
      })
    }
    
    mockAnnouncements[index].status = status
    
    return NextResponse.json({
      code: 200,
      data: mockAnnouncements[index],
      message: "状态更新成功"
    })
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器错误"
    }, { status: 500 })
  }
} 