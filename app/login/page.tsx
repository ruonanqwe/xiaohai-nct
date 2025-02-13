"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { authenticate } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const onSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = authenticate(formData)
      
      if (result.success) {
        // 使用 Promise.all 并行处理存储和路由跳转
        await Promise.all([
          // 异步存储用户信息
          new Promise(resolve => {
            sessionStorage.setItem('user', JSON.stringify(result.user))
            resolve(true)
          }),
          // 预加载仪表盘页面
          router.prefetch('/dashboard')
        ])
        
        router.push('/dashboard')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('登录失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }, [formData, router])

  // 修改输入处理逻辑
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // 预加载仪表盘页面
  useEffect(() => {
    router.prefetch('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-200 hover:shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">农财通</h1>
            <p className="text-gray-600">欢迎回来，请登录您的账号</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">账号</Label>
              <Input
                id="email"
                placeholder="请输入账号"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                className="h-11 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">密码</Label>
              <Input
                id="password"
                placeholder="请输入密码"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-gray-600">
                  记住我
                </label>
              </div>
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                忘记密码？
              </Button>
            </div>

            <Button 
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                "登录"
              )}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-6">
              还没有账号？{" "}
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => {}}
              >
                立即注册
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

