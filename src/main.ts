import { createApp } from 'vue'
import Router from './router'
import Store from './store'
import App from './App.vue'
import { permission } from "./directives/permission";
import './mockjs'

// SVG图标
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon.vue'

const app = createApp(App)

// 全局注册SvgIcon组件
app.component('SvgIcon', SvgIcon)

app.use(Store);
app.use(Router);

app.directive("permission",permission);
app.mount('#app');
