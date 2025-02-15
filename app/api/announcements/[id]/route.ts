import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { mockAnnouncements } from '@/data/mock/announcements'

// 获取单个公告
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const announcement = mockAnnouncements.find(a => a.id === params.id)
    
    if (!announcement) {
      return NextResponse.json({
        code: 404,
        message: "公告不存在"
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

// 更新公告
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const index = mockAnnouncements.findIndex(a => a.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({
        code: 404,
        message: "公告不存在"
      }, { status: 404 })
    }
    
    // 更新公告
    mockAnnouncements[index] = {
      ...mockAnnouncements[index],
      ...body,
      lastModified: new Date().toISOString()
    }
    
    return NextResponse.json({
      code: 200,
      data: mockAnnouncements[index],
      message: "更新成功"
    })
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器错误"
    }, { status: 500 })
  }
}

// 删除公告
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = mockAnnouncements.findIndex(a => a.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({
        code: 404,
        message: "公告不存在"
      }, { status: 404 })
    }
    
    mockAnnouncements.splice(index, 1)
    
    return NextResponse.json({
      code: 200,
      message: "删除成功"
    })
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器错误"
    }, { status: 500 })
  }
} 