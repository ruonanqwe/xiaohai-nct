import * as z from "zod"

// API基本信息验证模式
export const apiSchema = z.object({
  name: z.string()
    .min(2, "名称至少需要2个字符")
    .max(50, "名称不能超过50个字符"),
  version: z.string()
    .regex(/^v\d+(\.\d+)?(\.\d+)?$/, "版本号格式应为 v1.0.0"),
  category: z.string()
    .min(1, "请选择分类"),
  status: z.enum(["active", "inactive", "deprecated", "testing"]),
  description: z.string()
    .min(10, "描述至少需要10个字符")
    .max(500, "描述不能超过500个字符"),
})

// API接口配置验证模式
export const apiConfigSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  auth: z.enum(["none", "token", "oauth"]),
  params: z.string()
    .refine(
      (val) => {
        try {
          JSON.parse(val)
          return true
        } catch {
          return false
        }
      },
      "请输入有效的JSON格式"
    ),
  response: z.string()
    .refine(
      (val) => {
        try {
          JSON.parse(val)
          return true
        } catch {
          return false
        }
      },
      "请输入有效的JSON格式"
    ),
})

// API高级设置验证模式
export const apiAdvancedSchema = z.object({
  cacheTime: z.number()
    .min(0, "缓存时间不能为负数")
    .max(3600, "缓存时间不能超过1小时"),
  rateLimit: z.number()
    .min(1, "速率限制至少为1")
    .max(1000, "速率限制不能超过1000"),
  timeout: z.number()
    .min(1, "超时时间至少为1秒")
    .max(30, "超时时间不能超过30秒"),
  retries: z.number()
    .min(0, "重试次数不能为负数")
    .max(5, "重试次数不能超过5次"),
}) 