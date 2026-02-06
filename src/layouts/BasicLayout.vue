<template>
  <lay-config-provider
    :themeVariable="appStore.themeVariable"
    :theme="appStore.theme"
    :locales="locales"
    :locale="appStore.locale"
  >
    <lay-layout
      :class="[
        'top-nav-layout',
        appStore.tab ? 'has-tab' : '',
        appStore.collapse ? 'collapse' : '',
        appStore.greyMode ? 'grey-mode' : '',
        isHomePage ? 'home-layout' : ''
      ]"
    >
      <!-- 首页工作台头部 -->
      <ScreenHeader
        v-if="isHomePage"
        :isFullscreen="isFullscreen"
        :showBack="false"
        @toggle-fullscreen="toggleFullscreen"
        @logout="handleLogout"
      />
      <!-- 头部导航 - 占满整行 -->
      <lay-header
        v-else
        style="display: flex"
        :class="[
          appStore.theme !== 'dark' ? 'header-primary' : ''
        ]"
      >
        <!-- 系统名称 -->
        <div class="header-logo">
          <span class="header-title">办公用房管理系统</span>
        </div>
        <!-- 菜单分组 -->
        <lay-menu
          v-if="appStore.subfield && appStore.subfieldPosition == 'head'"
          class="layui-nav-center"
          :selectedKey="mainSelectedKey"
          @changeSelectedKey="changeMainSelectedKey"
        >
          <template v-for="(menu, index) in mainMenus" :key="index">
            <lay-menu-item :id="menu.id" v-if="index < 4">
              <template #title>{{ menu.title }}</template>
            </lay-menu-item>
          </template>
        </lay-menu>
        <lay-dropdown
          v-if="appStore.subfield && appStore.subfieldPosition == 'head'"
          trigger="hover"
          placement="bottom"
        >
          <lay-icon
            type="layui-icon-more"
            style="padding: 0px 15px"
          ></lay-icon>
          <template #content>
            <lay-dropdown-menu>
              <template v-for="(menu, index) in mainMenus">
                <lay-dropdown-menu-item
                  :key="menu.id"
                  v-if="index >= 4"
                  @click="changeMainSelectedKey(menu.id)"
                  >{{ menu.title }}</lay-dropdown-menu-item
                >
              </template>
            </lay-dropdown-menu>
          </template>
        </lay-dropdown>
        <lay-menu class="layui-layout-right">
          <lay-menu-item>
            <lay-fullscreen v-slot="{ toggle, isFullscreen }">
              <lay-icon
                @click="toggle()"
                :type="
                  isFullscreen
                    ? 'layui-icon-screen-restore'
                    : 'layui-icon-screen-full'
                "
              ></lay-icon>
            </lay-fullscreen>
          </lay-menu-item>
          <lay-menu-item>
            <lay-dropdown updateAtScroll placement="bottom">
              <lay-icon type="layui-icon-username"></lay-icon>
              <template #content>
                <lay-dropdown-menu>
                  <lay-dropdown-menu-item @click="toUserInfo">
                    <template #default>用户信息</template>
                  </lay-dropdown-menu-item>
                  <lay-dropdown-menu-item @click="toSystemSet">
                    <template #default>系统设置</template>
                  </lay-dropdown-menu-item>
                  <lay-line></lay-line>
                  <lay-dropdown-menu-item @click="logOut">
                    <template #default>注销登录</template>
                  </lay-dropdown-menu-item>
                </lay-dropdown-menu>
              </template>
            </lay-dropdown>
          </lay-menu-item>
          <lay-menu-item @click="changeVisible">
            <lay-icon type="layui-icon-more-vertical"></lay-icon>
          </lay-menu-item>
        </lay-menu>
      </lay-header>
      <!-- 下方主体区域 -->
      <lay-layout class="main-container">
        <!-- 遮盖层 -->
        <div
          v-if="!appStore.collapse"
          class="layui-layer-shade hidden-sm-and-up"
          @click="collapse"
        ></div>
        <!-- 核心菜单  -->
        <lay-side
          :width="sideWidth"
          :class="[
            appStore.sideTheme == 'dark' ? 'dark changeBgc' : 'light',
            appStore.theme !== 'dark' && !isHomePage ? 'theme-light' : ''
          ]"
        >
          <div class="side-menu-wrapper">
            <div
              class="side-menu1"
              v-if="appStore.subfield && appStore.subfieldPosition == 'side'"
            >
              <global-main-menu
                :collapse="true"
                :menus="mainMenus"
                :selectedKey="mainSelectedKey"
                @changeSelectedKey="changeMainSelectedKey"
              ></global-main-menu>
            </div>
            <div class="side-menu2">
              <global-menu
                :collapse="appStore.collapse"
                :menus="menus"
                :openKeys="openKeys"
                :selectedKey="selectedKey"
                @changeOpenKeys="changeOpenKeys"
                @changeSelectedKey="changeSelectedKey"
              ></global-menu>
            </div>
          </div>
          <!-- 收起侧边栏按钮 -->
          <div class="side-collapse-btn" @click="collapse">
            <lay-icon
              :type="appStore.collapse ? 'layui-icon-spread-left' : 'layui-icon-shrink-right'"
            ></lay-icon>
          </div>
        </lay-side>
        <lay-layout style="width: 0px">
          <lay-body>
            <global-tab
              :class="
                appStore.tagsTheme == 'concise'
                  ? ''
                  : appStore.tagsTheme == 'underpainting'
                  ? 'underpainting'
                  : 'designer'
              "
            >
            </global-tab>
            <global-content></global-content>
          </lay-body>
          <lay-footer></lay-footer>
        </lay-layout>
      </lay-layout>
    </lay-layout>
    <global-setup v-model="visible"></global-setup>
  </lay-config-provider>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useAppStore } from '../store/app'
import { useUserStore } from '../store/user'
import GlobalSetup from './global/GlobalSetup.vue'
import GlobalContent from './global/GlobalContent.vue'
import GlobalTab from './global/GlobalTab.vue'
import GlobalMenu from './global/GlobalMenu.vue'
import GlobalMainMenu from './global/GlobalMainMenu.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import { px2rem } from '../utils/px2rem-converter'
import { useRouter, useRoute } from 'vue-router'
import { useMenu } from './composable/useMenu'
import zh_CN from '../lang/zh_CN'
import en_US from '../lang/en_US'

export default {
  components: {
    GlobalSetup,
    GlobalContent,
    GlobalTab,
    GlobalMenu,
    GlobalMainMenu,
    ScreenHeader
  },
  setup() {
    const appStore = useAppStore()
    const userInfoStore = useUserStore()
    const fullscreenRef = ref()
    const visible = ref(false)
    const isFullscreen = ref(false)
    const sideWidthCollapsed = ref(px2rem(50))
    const sideWidthExpanded = ref(px2rem(200))

    const sideWidth = computed(() =>
      appStore.collapse
        ? sideWidthCollapsed.value
        : sideWidthExpanded.value
    )
    const router = useRouter()
    const route = useRoute()

    // 判断是否是首页
    const isHomePage = computed(() => route.path === '/workspace/workbench')

    const {
      selectedKey,
      openKeys,
      menus,
      mainMenus,
      mainSelectedKey,
      changeMainSelectedKey,
      changeSelectedKey,
      changeOpenKeys
    } = useMenu()

    // 全屏切换
    const toggleFullscreen = async () => {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    }

    // 监听全屏状态变化
    const handleFullscreenChange = () => {
      isFullscreen.value = !!document.fullscreenElement
    }

    // 返回首页工作台
    const handleGoBack = () => {
      router.push('/workspace/workbench')
    }

    // 退出登录
    const handleLogout = () => {
      userInfoStore.token = ''
      userInfoStore.userInfo = {}
      router.push('/login')
    }

    onMounted(() => {
      if (document.body.clientWidth < 768) {
        appStore.collapse = true
      }
      userInfoStore.loadMenus()
      userInfoStore.loadPermissions()
      document.addEventListener('fullscreenchange', handleFullscreenChange)
    })

    onUnmounted(() => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    })

    const changeVisible = () => {
      visible.value = !visible.value
    }

    const currentIndex = ref('1')

    const collapse = () => {
      appStore.collapse = !appStore.collapse
    }

    const refresh = () => {
      appStore.routerAlive = false
      setTimeout(function () {
        appStore.routerAlive = true
      }, 500)
    }

    const logOut = () => {
      userInfoStore.token = ''
      userInfoStore.userInfo = {}
      router.push('/login')
    }

    const locales = [
      { name: 'zh_CN', locale: zh_CN, merge: true },
      { name: 'en_US', locale: en_US, merge: true }
    ]

    function toUserInfo() {
      router.push('/enrollee/profile')
    }

    function toSystemSet() {
      router.push('/system/menu')
    }

    return {
      sideWidth,
      mainSelectedKey,
      fullscreenRef,
      appStore,
      visible,
      isFullscreen,
      menus,
      mainMenus,
      userInfoStore,
      currentIndex,
      selectedKey,
      openKeys,
      collapse,
      changeOpenKeys,
      changeSelectedKey,
      changeMainSelectedKey,
      changeVisible,
      refresh,
      logOut,
      locales,
      toUserInfo,
      toSystemSet,
      isHomePage,
      toggleFullscreen,
      handleGoBack,
      handleLogout
    }
  }
}
</script>

<style lang="scss">
/* ============================================
   顶部导航布局 - 头部占满整行
   ============================================ */
.top-nav-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 首页背景图 */
.top-nav-layout.home-layout {
  background-image: url('@/assets/dashboard/bg-layout.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.top-nav-layout > .layui-header {
  flex-shrink: 0;
  width: 100%;
}

.top-nav-layout > .main-container {
  flex: 1;
  overflow: hidden;
}

/* 内容区域布局优化 */
.top-nav-layout .main-container .layui-body {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 侧边栏高度调整 */
.top-nav-layout .layui-side {
  top: 0;
  height: 100%;
}

@media screen and (max-width: 767px) {
  .layui-side {
    position: absolute;
    height: 100%;
  }
}

/* ============================================
   头部导航 - 系统名称
   ============================================ */
.header-logo {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 68px;
  flex-shrink: 0;
}

.header-title {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 22px;
  color: #FFFFFF;
  line-height: 31px;
  letter-spacing: 4px;
  white-space: nowrap;
}

/* ============================================
   头部导航 - 日间模式主色背景样式
   仅在 appStore.theme !== 'dark' 时添加此类
   ============================================ */
.header-primary {
  background-color: var(--global-primary-color) !important;
}

/* 日间主色背景 - 系统名称白色 */
.header-primary .header-title {
  color: #fff;
}

/* 日间主色背景 - 所有文字/图标统一白色 */
.header-primary .layui-nav *,
.header-primary .layui-nav-item .layui-icon {
  color: #fff !important;
}

/* 日间主色背景 - 图标悬停效果 */
.header-primary .layui-nav-item .layui-icon:hover {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.15) !important;
}

/* 日间主色背景 - 中间菜单选中状态 */
.header-primary .layui-nav.layui-nav-center .layui-this {
  background-color: rgba(255, 255, 255, 0.15);
}

/* ============================================
   首页侧边栏透明
   ============================================ */
.home-layout .layui-side {
  background: linear-gradient(90deg, rgba(30,223,247,0.3) 0%, rgba(30,223,247,0.02) 85.62%, rgba(30,223,247,0) 100%) !important;
}

/* 首页内容区背景透明 */
.home-layout .layui-body {
  background: transparent !important;
}

/* 首页仪表盘背景透明 */
.home-layout .dashboard-wrapper {
  background: transparent !important;
}

/* 首页地图面板背景透明 */
.home-layout .map-panel {
  background-color: transparent !important;
}

/* 首页仪表盘页面无内边距 */
.home-layout .dashboard-page {
  padding: 0 !important;
}

/* 首页标签栏移除上边框 */
.home-layout .global-tab {
  border-top: none !important;
}

/* 首页标签栏移除下拉图标 */
.home-layout .global-tab .layui-icon-down {
  display: none !important;
}

/* 首页标签默认背景色 */
.home-layout .layui-body>.global-tab>.layui-tab>.layui-tab-head>.layui-tab-title>li {
  background: rgba(34, 79, 167, 0.2) !important;
  color: #fff !important;
}

/* 首页标签高亮背景色 */
.home-layout .layui-body>.global-tab>.layui-tab>.layui-tab-head>.layui-tab-title>li.layui-this {
  background: linear-gradient(360deg, rgba(27, 193, 200, 0.5) 0%, rgba(27, 193, 200, 0) 100%), #0061CE !important;
}

/* ============================================
   头部导航 - 默认样式（夜间模式或无 header-primary 类时）
   ============================================ */
/*鼠标经过背景色*/
.layui-header .layui-nav-item .layui-icon:hover {
  background: whitesmoke !important;
}

/*图标默认颜色*/
.layui-header .layui-nav-item .layui-icon {
  color: #666;
}

/*取消默认a标签的padding*/
.layui-header .layui-nav-item > a {
  padding: 0 !important;
}

/*扩大图标尺寸*/
.layui-header .layui-nav-item .layui-icon {
  height: 68px;
  padding: 24px;
}

/*鼠标经过图标时改变颜色为主题色*/
.layui-header .layui-nav-item .layui-icon:hover {
  color: var(--global-primary-color) !important;
}

.grey-mode {
  filter: grayscale(1);
}

.side-menu-wrapper {
  width: 100%;
  overflow-y: auto;
  height: calc(100% - 40px); /* 减去折叠按钮 40px */
  display: flex;
}

/* 侧边栏折叠按钮 */
.side-collapse-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  box-sizing: border-box;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.65);
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.side-collapse-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

/* 浅色侧边栏的折叠按钮 */
.light .side-collapse-btn {
  color: #666;
}

.light .side-collapse-btn:hover {
  color: var(--global-primary-color);
  background: rgba(0, 0, 0, 0.05);
}

.side-menu-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.side-menu-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(40, 51, 62);
}

.light .side-menu-wrapper::-webkit-scrollbar-thumb {
  background-color: #e2e2e2;
}

.side-menu1 {
  width: 60px;
  flex: 0 0 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.light .side-menu1 {
  border-right: 1px solid whitesmoke;
}

.side-menu2 {
  flex: 1;
}

.changeBgc {
  background-color: #171717 !important;
}

/* 非夜间模式下的侧边栏样式 */
.theme-light.changeBgc {
  background: #062A53 url('@/assets/common/bg-menu.png') no-repeat bottom center / 100% auto !important;
}

.theme-light .layui-nav-tree .layui-nav-child {
  background-color: transparent !important;
}

/* 侧边栏子菜单背景透明 */
.layui-side .layui-nav-tree .layui-nav-child {
  background-color: transparent !important;
}

.underpainting {
  border-top: none !important;
}

.layui-tab-title {
  .layui-this {
    color: var(--global-primary-color) !important;
    border-bottom: 2px solid var(--global-primary-color) !important;
    background-color: #009b8e0d !important;

    .layui-icon {
      color: var(--global-primary-color) !important;
    }
  }
}
.layui-body
  > .global-tab
  > .layui-tab
  > .layui-tab-head
  > .layui-tab-title
  > li {
  height: 38px;
  line-height: 38px;
}
.designer {
  padding-left: 5px;
  box-sizing: border-box;
  .layui-tab-head {
    background-color: unset !important;
  }

  .layui-tab-title {
    background-color: unset !important;
    > li {
      background-color: #fff;
      margin: 5px 0 0 5px;
      border-radius: 4px;
      height: 32px !important;
      line-height: 32px !important;
    }
  }
}
</style>
