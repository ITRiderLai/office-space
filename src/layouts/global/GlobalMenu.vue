<template>
  <lay-menu
    :tree="true"
    :collapse="collapse"
    :level="appStore.level"
    :inverted="appStore.inverted"
    :theme="appStore.sideTheme"
    :openKeys="openKeys"
    :selectedKey="selectedKey"
    @changeOpenKeys="changeOpenKeys"
    @changeSelectedKey="changeSelectedKey"
  >
    <GlobalMenuItem :menus="menus"></GlobalMenuItem>
  </lay-menu>
</template>

<script lang="ts">
export default {
  name: "GlobalMenu",
};
</script>

<script lang="ts" setup>
import { useAppStore } from "../../store/app";
import GlobalMenuItem from "./GlobalMenuItem.vue";

const appStore = useAppStore();

interface MenuProps {
  collapse: boolean;
  selectedKey: string;
  openKeys: string[];
  menus: any[];
}

const props = withDefaults(defineProps<MenuProps>(), {
  collapse: false,
});

const emits = defineEmits(['changeOpenKeys', 'changeSelectedKey'])

const changeOpenKeys = (keys: string[]) => {
  emits("changeOpenKeys", keys);
}

const changeSelectedKey = (key: string) => {
  emits("changeSelectedKey", key);
};

</script>

<style>
.layui-nav-tree * {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px !important;
  color: rgba(255, 255, 255, 0.8);
}

.layui-nav-tree .layui-nav-item > a,
.layui-nav-tree.inverted .layui-nav-item > a {
  padding: 3px 22px;
}

.layui-nav-tree.inverted .layui-this > a {
  padding: 3px 16px;
}

.layui-nav-tree .layui-nav-item > a > span {
  padding-left: 10px;
}

/* 图标容器垂直居中 */
.layui-nav-tree .layui-nav-item > a > i {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  transform: translateY(2px);
}

.layui-nav-tree .layui-nav-item > a .layui-nav-more {
  font-size: 12px!important;
  padding: 3px 0px;
}

/* 二级子菜单左边距 */
.layui-nav-tree .layui-nav-child .layui-nav-item a {
  padding-left: 45px;
}

/* 左侧菜单高亮样式 - 白色背景，主色字体，加粗 */
.layui-nav-tree .layui-this > a,
.layui-nav-tree.inverted .layui-this > a,
.layui-nav-tree .layui-nav-child .layui-this > a {
  background-color: #fff !important;
}

.layui-nav-tree .layui-this *,
.layui-nav-tree.inverted .layui-this *,
.layui-nav-tree .layui-nav-child .layui-this * {
  color: var(--global-primary-color) !important;
  fill: var(--global-primary-color) !important;
  font-weight: 600 !important;
}

</style>