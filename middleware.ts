import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 从本地存储中获取维护模式状态
const getMaintenanceMode = () => {
  try {
    return localStorage.getItem('maintenanceMode') === 'true'
  } catch {
    return false
  }
}

// 从本地存储中获取管理员信息
const getMaintenanceAdmin = () => {
  try {
    return localStorage.getItem('maintenanceAdmin') || ''
  } catch {
    return ''
  }
}

export function middleware(request: NextRequest) {
  // 获取维护模式状态
  const maintenanceMode = getMaintenanceMode()
  const maintenanceAdmin = getMaintenanceAdmin()
  
  // 获取当前用户信息（这里应该根据你的认证系统来实现）
  const currentUser = request.cookies.get('user')?.value

  // 如果是维护页面，直接允许访问
  if (request.nextUrl.pathname === '/maintenance') {
    return NextResponse.next()
  }

  // 如果处于维护模式且当前用户不是维护管理员
  if (maintenanceMode && currentUser !== maintenanceAdmin) {
    // 如果是 API 请求
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: '系统维护中，暂时无法访问' },
        { status: 503 }
      )
    }
    
    // 如果是页面请求，重定向到维护页面
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 匹配所有需要保护的路径
     * 排除静态资源和一些特殊路径
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 