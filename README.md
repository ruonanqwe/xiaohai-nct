# 农业财务管理系统

一个现代化的农业财务管理系统，用于处理补贴申请和管理等相关业务。

## 功能特点

- 📊 数据可视化
- 🔐 安全认证
- 📱 响应式设计
- 🌐 多语言支持
- 🎨 主题定制
- 📝 文档管理
- 📈 报表生成
- 👥 用户管理
- 🔔 消息通知

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **组件**: Radix UI
- **状态管理**: React Context
- **表单**: React Hook Form
- **验证**: Zod
- **图表**: Recharts
- **动画**: Framer Motion
- **日期**: date-fns
- **工具**: Lodash

## 开始使用

1. 克隆项目
git clone https://github.com/ruonanqwe/nong.git
2. 安装依赖
npm install
3. 启动开发环境
npm run dev
4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

2/
├── app/           # Next.js App Router 目录
│ ├── api/         # API 路由
│ │ ├── auth/      # 认证相关 API
│ │ ├── subsidies/ # 补贴相关 API
│ │ └── users/     # 用户相关 API
│ ├── dashboard/   # 仪表盘页面
│ │ ├── layout.tsx # 仪表盘布局
│ │ ├── page.tsx   # 仪表盘主页
│ │ ├── subsidies/ # 补贴管理
│ │ ├── users/     # 用户管理
│ │ ├── families/  # 家庭管理
│ │ └── settings/  # 系统设置
│ ├── mobile/      # 移动端页面
│ ├── client-layout.tsx # 客户端布局组件
│ ├── layout.tsx   # 根布局
│ └── page.tsx     # 首页
├── components/    # 共享组件
│ ├── ui/          # UI 基础组件
│ │ ├── button.tsx # 按钮组件   
│ │ ├── card.tsx   # 卡片组件
│ │ └── ...        # 其他组件   
│ ├── forms/       # 表单组件
│ ├── charts/      # 图表组件
│ └── layout/      # 布局组件
| └── dashboard/   # 仪表盘组件
| └── ...          # 其他组件
├── contexts/      # React Context
│ ├── user-management-context.tsx # 用户管理上下文  
│ ├── report-management-context.tsx # 报表管理上下文
│ └── settings-context.tsx # 设置上下文
├── data/          # 数据和常量
│ ├── mock/        # 模拟数据
│ └── constants/   # 常量定义
├── lib/           # 工具函数
│ ├── security.ts  # 安全相关
│ ├── api.ts       # API 工具
│ └── utils.ts     # 通用工具
├── public/        # 静态资源
│ ├── images/      # 图片资源
│ └── icons/       # 图标资源
├── styles/        # 样式文件
│ └── globals.css  # 全局样式
├── types/         # TypeScript 类型
│ ├── api.ts       # API 类型
│ ├── user.ts      # 用户类型
│ └── subsidy.ts   # 补贴类型
├── .env           # 环境变量
├── .env.local     # 本地环境变量
├── .gitignore     # Git 忽略配置
├── next.config.js # Next.js 配置
├── package.json   # 项目依赖
├── postcss.config.js # PostCSS 配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json  # TypeScript 配置
├── CONTRIBUTING.md # 贡献指南
└── README.md      # 项目说明

## 开发指南

- 遵循 TypeScript 严格模式
- 使用 ESLint 和 Prettier 保持代码风格
- 组件使用 Radix UI + Tailwind CSS
- 状态管理优先使用 React Context
- 表单验证使用 Zod Schema

## 部署

1. 构建生产版本
npm run build
2. 部署到服务器
npm run start

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

- 项目负责人: [ruonanqwe](mailto:1963876196@qq.com)
- 项目主页: [GitHub](https://github.com/ruonanqwe/nong)

## 致谢

感谢所有为本项目做出贡献的开发者！



