import type { Metadata } from 'next'
import './globals.css'
import { ClientLayout } from './client-layout'

// 导出 metadata 配置
export const metadata: Metadata = {
  title: '农业财务管理系统',
  description: '高效的补贴申请和管理平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
