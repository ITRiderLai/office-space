import { layer } from "@layui/layui-vue";
import { computed, ComputedRef, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { diff } from "../../library/arrayUtil";
import { getParents, getNode } from "../../library/treeUtil";
import { useAppStore } from "../../store/app";
import { useUserStore } from "../../store/user";

export function useMenu() {

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const appStore = useAppStore();
  const selectedKey = ref(route.path);
  const openKeys = ref<string[]>([]);
  const isAccordion = computed(() => appStore.accordion);
  const isSubfield = computed(() => appStore.subfield);
  const mainSelectedKey = ref("/workspace");
  const isInitialized = ref(false);
  const userCollapsing = ref(false);

  const menus = computed(() => {
    if(isSubfield.value) {
        const node = getNode(userStore.menus, mainSelectedKey.value);
        if(node) {
            return node.children;
        } else {
            return [];
        }
    } else {
        return userStore.menus;
    }
  });

  const mainMenus: ComputedRef<any[]> = computed(() => {
    if(isSubfield.value) {
        return userStore.menus;
    } else {
        return [];
    }
  });

  watch(
    () => route.path,
    (newPath, oldPath) => {
      selectedKey.value = newPath;
      // 首次加载或路由真正变化时才自动展开父菜单，且不是用户主动收起时
      const isRouteChanged = !isInitialized.value || (oldPath !== undefined && oldPath !== newPath);
      if (isRouteChanged && !userCollapsing.value) {
        isInitialized.value = true;
        const andParents = getParents(menus.value, newPath);
        if (andParents && andParents.length > 0) {
          let andParentKeys = andParents.map((item: any) => item.id);
          if (isAccordion.value) {
            openKeys.value = [...andParentKeys];
          } else {
            openKeys.value = [...andParentKeys, ...openKeys.value];
          }
        }
      }
      userCollapsing.value = false;
    },
    { immediate: true }
  );

  const to = (id: string) => {
    router.push(id);
  };

  function changeSelectedKey(key: string) {
    var node = getNode(userStore.menus, key);

    if (node.type && node.type == "modal") {
      layer.open({
        type: "iframe",
        content: node.id,
        area: ["80%", "80%"],
        maxmin: true,
      });
      return;
    }

    if (node.type && node.type == "blank") {
      window.open(node.id, "_blank");
      return;
    }

    to(key);
  }

  function changeOpenKeys(keys: string[]) {
    // 标记用户正在收起菜单
    if (keys.length < openKeys.value.length) {
      userCollapsing.value = true;
    }

    const addArr = diff(openKeys.value, keys);
    if (keys.length > openKeys.value.length && isAccordion.value) {
      var arr = getParents(menus.value, addArr[0]);
      if(arr && arr.length > 0) {
        openKeys.value = arr.map((item: any) => {
          return item.id;
        });
      }
    } else {
      openKeys.value = keys;
    }
  }

  function changeMainSelectedKey(key: string) {

    var node = getNode(userStore.menus, key);

    if (node.type && node.type == "modal") {
      layer.open({
        type: "iframe",
        content: node.id,
        area: ["80%", "80%"],
        maxmin: true,
      });
      return;
    }

    if (node.type && node.type == "blank") {
      window.open(node.id, "_blank");
      return;
    }

    mainSelectedKey.value = key;
  }

  return {
    selectedKey,
    openKeys,
    changeOpenKeys,
    changeSelectedKey,
    isAccordion,
    menus,
    mainMenus,
    mainSelectedKey,
    changeMainSelectedKey
  };
}
