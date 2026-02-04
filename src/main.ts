import { createApp } from 'vue'
import Router from './router'
import Store from './store'
import App from './App.vue'
import { permission } from "./directives/permission";
import './mockjs'

// SVG图标
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon.vue'

// 初始化页面自适应缩放
import { initFlexible } from './utils/flexible'
initFlexible({
  designWidth: 1920,  // 设计稿宽度
  maxWidth: 2560,     // 最大宽度限制
  minWidth: 1280,     // 最小宽度限制
  enableDebounce: true,
  debounceDelay: 100
})

const app = createApp(App)

// 全局注册SvgIcon组件
app.component('SvgIcon', SvgIcon)

app.use(Store);
app.use(Router);

app.directive("permission",permission);
app.mount('#app');
