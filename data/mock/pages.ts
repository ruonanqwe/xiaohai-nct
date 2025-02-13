export const mockPages = [
  {
    id: "1",
    title: "首页",
    slug: "home",
    content: "欢迎来到我们的网站",
    status: "published" as const,
    template: "默认模板",
    author: "管理员",
    lastModified: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "关于我们",
    slug: "about",
    content: "了解我们的故事",
    status: "published" as const,
    template: "单页模板",
    author: "管理员",
    lastModified: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    title: "服务",
    slug: "services",
    content: "我们提供的服务",
    status: "draft" as const,
    template: "列表模板",
    author: "编辑",
    lastModified: "2024-01-13T09:15:00Z",
  },
]

export type Page = typeof mockPages[0] 