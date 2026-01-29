<template>
  <div class="global-tab" v-if="appStore.tab">
    <lay-tab
      :modelValue="currentPath"
      :allowClose="true"
      @change="to"
      @close="close"
    >
      <template :key="tab" v-for="tab in tabs">
        <lay-tab-item :id="tab.id" :title="tab.title" :closable="tab.closable">
          <template #title>
            <span class="dot"></span>
            {{ tab.title }}
          </template>
        </lay-tab-item>
      </template>
    </lay-tab>
    <lay-dropdown>
      <lay-icon type="layui-icon-down" :class=" appStore.tagsTheme == 'designer' ? 'designer-last-icon' : ''"></lay-icon>
      <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeAll"
            >关闭全部</lay-dropdown-menu-item
          >
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeOther"
            >关闭其他</lay-dropdown-menu-item
          >
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeCurrent"
            >关闭当前</lay-dropdown-menu-item
          >
        </lay-dropdown-menu>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GlobalTab'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../../store/app'
import { useTab } from '../composable/useTab'

const appStore = useAppStore()
const route = useRoute()

const { tabs, to, close, closeAll, closeOther, closeCurrent, currentPath } =
  useTab()
function toChangPage(id: any) {
  to(id)
}
</script>

<style lang="less">
.global-tab {
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-top: 1px solid whitesmoke;
  z-index: 999;
}

.global-tab .layui-tab {
  flex-grow: 1;
  width: calc(100% - 40px);
}

/* Tab滚动按钮样式 */
.global-tab .layui-tab .layui-tab-bar {
  width: 14px;
  height: 32px;
  background: rgba(119, 119, 119, 0.1);
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.global-tab .layui-tab .layui-tab-bar:hover {
  background: rgba(119, 119, 119, 0.2);
}

.global-tab .layui-tab .layui-tab-bar .layui-icon {
  font-size: 12px;
  color: #666;
}

.global-tab .layui-tab .layui-tab-bar.prev {
  border: none;
}

/* Tab标题项不被挤压 */
.global-tab .layui-tab .layui-tab-title.is-top {
  display: flex;
  flex-wrap: nowrap;
  height: 32px !important;
}

.global-tab .layui-tab .layui-tab-title.is-top > li {
  flex-shrink: 0;
}

.layui-body > .global-tab > .layui-tab > .layui-tab-head > .layui-tab-title > li {
  height: 32px !important;
  line-height: 32px !important;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #202020;
}

.layui-body > .global-tab > .layui-tab > .layui-tab-head > .layui-tab-title > li:not(.layui-this) {
  background: rgba(119, 119, 119, 0.1) !important;
  background-color: rgba(119, 119, 119, 0.1) !important;
}

.global-tab > i {
  width: 32px;
  background: rgba(119, 119, 119, 0.1);
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-left: none;
  border-radius: 4px;
}

.global-tab .layui-tab .dot {
  display: inline-block;
  background-color: whitesmoke;
  margin-right: 8px;
  border-radius: 50px;
  height: 8px;
  width: 8px;
}

.global-tab .layui-tab .layui-this .dot {
  background-color: var(--global-primary-color);
}

.global-tab .layui-tab .layui-tab-close:hover {
  background: transparent !important;
  color: #e2e2e2 !important;
}
.designer {
  display: flex;
  width: calc(100% - 15px);
  height: 37px;
  position: relative;
  font-size: 14px;
  color: dimgray;
  cursor: pointer;

  .layui-tab .layui-tab-bar {
    height: 32px;
    line-height: 32px;
    margin-top: 5px;
  }

  .layui-tab .layui-tab-bar.prev {
    border-left: none;
    height: 32px;
    line-height: 32px;
    margin-top: 5px;
  }

  box-shadow: unset;
  z-index: 999;
  .designer-tab {
    display: inline-block;
    flex-grow: 1;
    width: 100%;
    padding-left: 15px;
  }
  .designer-tab-item {
    display: inline-block;
    height: 32px !important;
    line-height: 32px !important;
    padding: 0px 10px;
    margin-top: 5px;
    background-color: #fff;
    border-radius: 4px;
    margin-right: 5px;
  }
  .dot {
    display: inline-block;
    background-color: whitesmoke;
    margin-right: 8px;
    border-radius: 50px;
    height: 8px;
    width: 8px;
  }

  .designer-close {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 20px;
    margin-left: 8px;
    top: 1px;
    text-align: center;
    font-size: 14px;
    color: var(--global-neutral-color-8);
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }
}
.dot-this {
  background-color: var(--global-primary-color) !important;
}
.designer-last-icon {
  width: 32px !important;
  height: 32px !important;
  background: white;
  margin-top: 5px;
  line-height: 32px !important;
  text-align: center;
  border-radius: 4px;
}
</style>
