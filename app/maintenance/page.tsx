import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl mx-4 p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center">
            <Settings className="h-8 w-8 text-yellow-500 animate-spin-slow" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              系统维护中
            </h1>
            <p className="text-muted-foreground">
              系统正在进行维护升级，请稍后再试。
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            仅系统管理员可在维护模式下访问
          </div>

          <div className="pt-4">
            <Link href="/login">
              <Button variant="outline" className="gap-2">
                管理员登录
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
} 