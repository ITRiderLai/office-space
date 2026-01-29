<template>
    <template v-for="(menu, index) in menus" :key="index">
        <template v-if="menu.children">
            <lay-sub-menu :id="menu.id">
                <template #icon>
                    <!-- svg:开头使用SvgIcon，否则使用layui图标 -->
                    <SvgIcon v-if="menu.icon && menu.icon.startsWith('svg:')"
                             :name="menu.icon.replace('svg:', '')"
                             size="16px" />
                    <lay-icon v-else :type="menu.icon"></lay-icon>
                </template>
                <template #title>{{ menu.title }}</template>
                <GlobalMenuItem :menus="menu.children"></GlobalMenuItem>
            </lay-sub-menu>
        </template>
        <template v-else>
            <lay-menu-item :id="menu.id">
                <template #icon>
                    <SvgIcon v-if="menu.icon && menu.icon.startsWith('svg:')"
                             :name="menu.icon.replace('svg:', '')"
                             size="16px" />
                    <lay-icon v-else :type="menu.icon"></lay-icon>
                </template>
                <template #title>{{ menu.title }}</template>
            </lay-menu-item>
        </template>
    </template>
</template>

<script lang="ts">
import GlobalMenuItem from "./GlobalMenuItem.vue"
import { defineComponent } from "vue";

export default defineComponent({
    name:  "GlobalMenuItem",
    props: {
        menus: {
            type: Object
        }
    }
})
</script>