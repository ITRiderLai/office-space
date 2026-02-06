# office-space

办公用房管理系统

## 环境要求

| 依赖 | 版本要求 | 说明 |
|------|----------|------|
| Node.js | >= 18.0.0 | 推荐使用 LTS 版本 |
| pnpm | >= 8.0.0 | 项目使用 pnpm 作为包管理器 |
| Vue | 3.x | 前端框架 |
| Vite | 5.x | 构建工具 |

## 快速开始

1. 安装依赖

```bash
pnpm install
```

2. 启动开发服务器

```bash
pnpm dev
```

3. 构建生产版本

```bash
pnpm build
```

4. 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
src/
├── composables/          # 组合式函数
├── views/                # 页面视图
│   ├── workSpace/       # 工作台模块
│   └── dataScreen/      # 数据大屏模块
└── assets/              # 静态资源
```

## 技术栈

- Vue 3 + TypeScript
- Vite
- ECharts
- Highcharts
- Sass/Scss
