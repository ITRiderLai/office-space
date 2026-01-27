# BasicLayout.vue 架构分析文档

## 1. 概述

`BasicLayout.vue` 是项目的核心布局组件，位于 `src/layouts/BasicLayout.vue`，采用 Vue 3 Options API + Composition API 混合模式，基于 layui-vue 组件库实现后台管理系统的经典布局结构。

**文件路径**: `src/layouts/BasicLayout.vue`
**代码行数**: 约 450 行
**技术栈**: Vue 3 + TypeScript + Less + layui-vue

---

## 2. 整体架构

### 2.1 布局结构图

```
┌─────────────────────────────────────────────────────────────┐
│                    lay-config-provider                       │
│  (主题变量 / 主题模式 / 国际化配置)                           │
├─────────────────────────────────────────────────────────────┤
│                        lay-layout                            │
├──────────────┬──────────────────────────────────────────────┤
│              │                lay-layout                     │
│   lay-side   ├──────────────────────────────────────────────┤
│   (侧边栏)   │              lay-header (头部导航)            │
│              ├──────────────────────────────────────────────┤
│  - Logo      │              lay-body (内容区)                │
│  - 主菜单    │  - GlobalTab (标签页)                         │
│  - 子菜单    │  - GlobalContent (路由内容)                   │
│              ├──────────────────────────────────────────────┤
│              │              lay-footer (底部)                │
└──────────────┴──────────────────────────────────────────────┘
```

### 2.2 模板结构层级

```
lay-config-provider
└── lay-layout
    ├── div.layui-layer-shade (遮罩层，移动端)
    ├── lay-side (侧边栏)
    │   ├── lay-logo
    │   └── div.side-menu-wrapper
    │       ├── div.side-menu1 (主菜单，分栏模式)
    │       └── div.side-menu2 (子菜单)
    └── lay-layout
        ├── lay-header (头部)
        │   ├── lay-menu.layui-layout-left
        │   ├── lay-menu.layui-nav-center (分栏菜单)
        │   └── lay-menu.layui-layout-right
        ├── lay-body
        │   ├── global-tab
        │   └── global-content
        └── lay-footer
```

---

## 3. 组件依赖关系

### 3.1 子组件列表

| 组件名 | 路径 | 职责 |
|--------|------|------|
| `GlobalSetup` | `./global/GlobalSetup.vue` | 系统设置抽屉面板 |
| `GlobalContent` | `./global/GlobalContent.vue` | 路由内容渲染区 |
| `GlobalBreadcrumb` | `./global/GlobalBreadcrumb.vue` | 面包屑导航 |
| `GlobalTab` | `./global/GlobalTab.vue` | 多标签页管理 |
| `GlobalMenu` | `./global/GlobalMenu.vue` | 侧边栏菜单 |
| `GlobalMainMenu` | `./global/GlobalMainMenu.vue` | 主菜单（分栏模式） |
| `GlobalMessageTab` | `./global/GlobalMessageTab.vue` | 消息通知面板 |

### 3.2 外部依赖

| 依赖 | 用途 |
|------|------|
| `vue` | `computed`, `onMounted`, `ref` |
| `vue-router` | `useRouter` 路由跳转 |
| `pinia` | `useAppStore`, `useUserStore` |
| `layui-vue` | UI 组件库 |

---

## 4. 状态管理

### 4.1 使用的 Store

```typescript
const appStore = useAppStore()      // 应用配置状态
const userInfoStore = useUserStore() // 用户信息状态
```

### 4.2 appStore 关键状态字段

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `string` | `'light'` | 主题模式（light/dark） |
| `themeVariable` | `object` | - | 主题变量配置 |
| `locale` | `string` | `'zh_CN'` | 当前语言 |
| `collapse` | `boolean` | `false` | 侧边栏是否折叠 |
| `tab` | `boolean` | `true` | 是否显示标签页 |
| `breadcrumb` | `boolean` | `true` | 是否显示面包屑 |
| `logo` | `boolean` | `true` | 是否显示Logo |
| `greyMode` | `boolean` | `false` | 灰色模式（哀悼模式） |
| `sideTheme` | `string` | `'dark'` | 侧边栏主题 |
| `subfield` | `boolean` | `false` | 是否启用菜单分栏 |
| `subfieldPosition` | `string` | `'side'` | 分栏位置（side/head） |
| `tagsTheme` | `string` | `'concise'` | 标签页主题样式 |
| `routerAlive` | `boolean` | `true` | 路由刷新控制 |

### 4.3 userInfoStore 关键方法

| 方法 | 说明 |
|------|------|
| `loadMenus()` | 加载用户菜单数据 |
| `loadPermissions()` | 加载用户权限数据 |

---

## 5. 核心功能实现

### 5.1 侧边栏宽度计算

```typescript
const sideWidth = computed(() =>
  appStore.collapse
    ? '60px'                                    // 折叠状态：60px
    : appStore.subfield && appStore.subfieldPosition == 'side'
    ? '280px'                                   // 分栏模式（侧边）：280px
    : '220px'                                   // 默认宽度：220px
)
```

**宽度规则**:
- 折叠状态: `60px`
- 分栏模式（侧边位置）: `280px` = 主菜单 60px + 子菜单 220px
- 普通模式: `220px`

### 5.2 菜单逻辑（useMenu Composable）

```typescript
const {
  selectedKey,           // 当前选中菜单项 key
  openKeys,              // 展开的菜单组 keys
  menus,                 // 子菜单数据
  mainMenus,             // 主菜单数据（分栏模式）
  mainSelectedKey,       // 主菜单选中项
  changeMainSelectedKey, // 切换主菜单回调
  changeSelectedKey,     // 切换子菜单回调
  changeOpenKeys         // 展开/收起菜单组回调
} = useMenu()
```

### 5.3 响应式处理

```typescript
onMounted(() => {
  // 移动端自动折叠侧边栏
  if (document.body.clientWidth < 768) {
    appStore.collapse = true
  }
  // 加载用户数据
  userInfoStore.loadMenus()
  userInfoStore.loadPermissions()
})
```

### 5.4 页面刷新实现

```typescript
const refresh = () => {
  appStore.routerAlive = false
  setTimeout(function () {
    appStore.routerAlive = true
  }, 500)
}
```

通过控制 `routerAlive` 实现无刷新重载页面内容。

### 5.5 注销登录

```typescript
const logOut = () => {
  const userInfoStore = useUserStore()
  userInfoStore.token = ''
  userInfoStore.userInfo = {}
  router.push('/login')
}
```

---

## 6. 头部导航功能分布

### 6.1 布局结构

```
┌────────────────────────────────────────────────────────────────────┐
│  [折叠] [刷新] [面包屑]    [菜单分组...]    [全屏][消息][语言][用户][设置] │
│  ←── layui-layout-left ──→ ←─ nav-center ─→ ←── layui-layout-right ──→ │
└────────────────────────────────────────────────────────────────────┘
```

### 6.2 功能详情

| 位置 | 功能 | 组件/实现 | 条件渲染 |
|------|------|----------|----------|
| 左侧 | 折叠按钮 | `lay-menu-item` + `lay-icon` | 始终显示 |
| 左侧 | 刷新按钮 | `lay-menu-item` + `lay-icon` | `hidden-xs-only` |
| 左侧 | 面包屑 | `GlobalBreadcrumb` | `appStore.breadcrumb` |
| 中间 | 菜单分组 | `lay-menu` + `lay-dropdown` | `subfield && subfieldPosition == 'head'` |
| 右侧 | 全屏切换 | `lay-fullscreen` | 始终显示 |
| 右侧 | 消息通知 | `GlobalMessageTab` | 始终显示 |
| 右侧 | 语言切换 | `lay-dropdown` | 始终显示 |
| 右侧 | 用户菜单 | `lay-dropdown` | 始终显示 |
| 右侧 | 设置面板 | `lay-icon` | 始终显示 |

### 6.3 用户下拉菜单项

| 菜单项 | 路由/方法 | 说明 |
|--------|-----------|------|
| 用户信息 | `/enrollee/profile` | 跳转个人中心 |
| 系统设置 | `/system/menu` | 跳转系统设置 |
| 注销登录 | `logOut()` | 清除登录状态 |

---

## 7. 侧边栏功能

### 7.1 结构说明

```vue
<lay-side :width="sideWidth" :class="appStore.sideTheme == 'dark' ? 'dark changeBgc' : 'light'">
  <lay-logo v-if="appStore.logo"></lay-logo>
  <div class="side-menu-wrapper">
    <!-- 主菜单（分栏模式） -->
    <div class="side-menu1" v-if="appStore.subfield && appStore.subfieldPosition == 'side'">
      <global-main-menu :collapse="true" :menus="mainMenus" ... />
    </div>
    <!-- 子菜单 -->
    <div class="side-menu2">
      <global-menu :collapse="appStore.collapse" :menus="menus" ... />
    </div>
  </div>
</lay-side>
```

### 7.2 分栏模式

当 `appStore.subfield = true` 且 `appStore.subfieldPosition = 'side'` 时：

```
┌──────────┬─────────────────┐
│          │                 │
│  主菜单  │     子菜单      │
│  (60px)  │    (220px)      │
│          │                 │
└──────────┴─────────────────┘
```

---

## 8. 样式架构

### 8.1 响应式断点

```less
@media screen and (max-width: 767px) {
  .layui-side {
    position: absolute;  // 移动端侧边栏绝对定位覆盖
    height: 100vh;
  }
}
```

### 8.2 主题样式类

| 类名 | 应用位置 | 作用 |
|------|----------|------|
| `.dark` | lay-side | 深色侧边栏主题 |
| `.light` | lay-side | 浅色侧边栏主题 |
| `.changeBgc` | lay-side | 深色背景（#171717） |
| `.grey-mode` | lay-layout | 灰色滤镜模式 |
| `.has-tab` | lay-layout | 显示标签页时的布局 |
| `.collapse` | lay-layout | 折叠状态样式 |

### 8.3 标签页主题

| 主题值 | 样式类 | 效果描述 |
|--------|--------|----------|
| `concise` | （无额外类） | 简洁风格，默认样式 |
| `underpainting` | `.underpainting` | 底纹风格，选中项有背景色 |
| 其他值 | `.designer` | 设计师风格，卡片式标签 |

### 8.4 头部图标交互样式

```less
// 图标容器扩大，提升点击体验
.layui-header .layui-nav-item .layui-icon {
  height: 50px;
  padding: 20px;
  color: #666;
}

// 鼠标悬停效果
.layui-header .layui-nav-item .layui-icon:hover {
  background: whitesmoke !important;
  color: var(--global-primary-color) !important;
}
```

### 8.5 滚动条自定义

```less
.side-menu-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.side-menu-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(40, 51, 62);  // 深色主题
}

.light .side-menu-wrapper::-webkit-scrollbar-thumb {
  background-color: #e2e2e2;  // 浅色主题
}
```

---

## 9. 国际化配置

### 9.1 语言包配置

```typescript
import zh_CN from '../lang/zh_CN'
import en_US from '../lang/en_US'

const locales = [
  { name: 'zh_CN', locale: zh_CN, merge: true },
  { name: 'en_US', locale: en_US, merge: true }
]
```

### 9.2 语言切换

```vue
<lay-dropdown-menu-item @click="() => (appStore.locale = 'zh_CN')">
  中文
</lay-dropdown-menu-item>
<lay-dropdown-menu-item @click="() => (appStore.locale = 'en_US')">
  英文
</lay-dropdown-menu-item>
```

---

## 10. 遮罩层机制

```vue
<div
  v-if="!appStore.collapse"
  class="layui-layer-shade hidden-sm-and-up"
  @click="collapse"
></div>
```

**作用**:
- 仅在移动端（`hidden-sm-and-up`）显示
- 当侧边栏展开时显示遮罩
- 点击遮罩自动收起侧边栏
- 提升移动端用户体验

---

## 11. 数据流向图

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Router    │───▶│  useMenu()  │───▶│ BasicLayout │
└─────────────┘    └─────────────┘    └─────────────┘
                          │                   │
                          ▼                   ▼
                   ┌─────────────┐    ┌─────────────┐
                   │  菜单数据   │    │  GlobalMenu │
                   │  selectedKey│    │  GlobalTab  │
                   │  openKeys   │    │  ...        │
                   └─────────────┘    └─────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  appStore   │◀──▶│ BasicLayout │◀──▶│ GlobalSetup │
└─────────────┘    └─────────────┘    └─────────────┘
      │
      ▼
 主题/语言/布局配置
```

---

## 12. 生命周期流程

```
组件挂载 (onMounted)
    │
    ├──► 检测屏幕宽度
    │         │
    │         └──► < 768px ──► appStore.collapse = true
    │
    ├──► userInfoStore.loadMenus()
    │
    └──► userInfoStore.loadPermissions()

用户交互
    │
    ├──► 点击菜单项 ──► changeSelectedKey() ──► 路由跳转
    │
    ├──► 点击折叠按钮 ──► collapse() ──► appStore.collapse 切换
    │
    ├──► 点击刷新按钮 ──► refresh() ──► routerAlive 重置
    │
    ├──► 点击设置按钮 ──► changeVisible() ──► GlobalSetup 显示
    │
    ├──► 切换语言 ──► appStore.locale 更新
    │
    └──► 点击注销 ──► logOut() ──► 清除 token ──► 跳转 /login
```

---

## 13. 配置项汇总

### 13.1 lay-config-provider 配置

| 属性 | 值来源 | 说明 |
|------|--------|------|
| `themeVariable` | `appStore.themeVariable` | 主题色变量 |
| `theme` | `appStore.theme` | 主题模式 |
| `locales` | 本地定义 | 语言包列表 |
| `locale` | `appStore.locale` | 当前语言 |

### 13.2 lay-layout 动态类

| 类名 | 条件 | 说明 |
|------|------|------|
| `has-tab` | `appStore.tab` | 启用标签页 |
| `collapse` | `appStore.collapse` | 侧边栏折叠 |
| `grey-mode` | `appStore.greyMode` | 灰色模式 |

---

## 14. 待优化建议

| 问题 | 当前状态 | 建议 |
|------|----------|------|
| API 风格混用 | Options API + Composition API | 迁移到 `<script setup>` 语法 |
| 硬编码路由 | `/enrollee/profile`, `/system/menu` | 提取为路由常量 |
| 刷新机制 | `setTimeout` 500ms | 考虑使用 `nextTick` |
| 夜间模式头部样式 | 需要覆盖 darkreader 变量 | 参考项目开发文档第9节 |
| 类型定义 | 部分缺失 | 补充 TypeScript 类型 |

---

## 15. 相关文件索引

| 文件 | 说明 |
|------|------|
| `src/layouts/BasicLayout.vue` | 主布局组件（本文档分析对象） |
| `src/layouts/composable/useMenu.ts` | 菜单逻辑 Composable |
| `src/layouts/global/*.vue` | 布局子组件 |
| `src/store/app.ts` | 应用配置 Store |
| `src/store/user.ts` | 用户信息 Store |
| `src/lang/zh_CN.ts` | 中文语言包 |
| `src/lang/en_US.ts` | 英文语言包 |
| `docs/项目开发文档.md` | 项目开发规范文档 |
