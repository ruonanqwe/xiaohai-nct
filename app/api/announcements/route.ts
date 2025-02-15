// GET /api/announcements - 获取公告列表
// POST /api/announcements - 创建新公告
// PUT /api/announcements/{id} - 更新公告
// DELETE /api/announcements/{id} - 删除公告
// GET /api/announcements/{id} - 获取单个公告详情
// PUT /api/announcements/{id}/status - 更新公告状态（发布/置顶等） 

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { mockAnnouncements } from '@/data/mock/announcements'
import type { Announcement } from '@/data/mock/announcements'

// 获取公告列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    
    let announcements = [...mockAnnouncements]
    
    // 根据类型筛选
    if (type) {
      announcements = announcements.filter(a => a.type === type)
    }
    
    // 根据状态筛选
    if (status) {
      announcements = announcements.filter(a => a.status === status)
    }
    
    // 按日期降序排序
    announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
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

// 创建新公告
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证必填字段
    if (!body.title || !body.content || !body.type) {
      return NextResponse.json({
        code: 400,
        message: "标题、内容和类型为必填项"
      }, { status: 400 })
    }
    
    const newAnnouncement: Announcement = {
      id: String(Date.now()),
      title: body.title,
      content: body.content,
      type: body.type,
      status: body.status || "草稿",
      date: new Date().toISOString().split('T')[0],
      author: body.author || "系统管理员",
      tags: body.tags || [],
      priority: body.priority || "中"
    }
    
    // 在实际应用中,这里应该是数据库操作
    mockAnnouncements.push(newAnnouncement)
    
    return NextResponse.json({
      code: 200,
      data: newAnnouncement,
      message: "创建成功"
    })
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器错误"
    }, { status: 500 })
  }
} 