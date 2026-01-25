<template>
  <div class="login-page">
    <div class="login-card">
      <!-- 用户名 -->
      <div class="form-item">
        <label class="form-label">用户名</label>
        <lay-input
          v-model="loginForm.account"
          placeholder="请输入用户名"
          :allow-clear="true"
        />
      </div>

      <!-- 密码 -->
      <div class="form-item">
        <label class="form-label">密码</label>
        <lay-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          :allow-clear="true"
          password
        />
      </div>

      <!-- 验证码 -->
      <div class="form-item">
        <label class="form-label">验证码</label>
        <div class="captcha-row">
          <lay-input
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            :allow-clear="true"
            @keyup.enter="handleLogin"
          />
          <div class="captcha-img" @click="refreshCaptcha">
            <img :src="captchaUrl" alt="验证码" />
          </div>
        </div>
      </div>

      <!-- 记住密码 -->
      <div class="form-item remember-row">
        <lay-checkbox
          v-model="remember"
          skin="primary"
          label="记住密码"
        />
      </div>

      <!-- 登录按钮 -->
      <div class="form-item">
        <lay-button
          type="primary"
          :fluid="true"
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </lay-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { layer } from '@layui/layer-vue'
import { login } from '@/api/module/user'
import { getCaptcha } from '@/api/module/captcha'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const loginForm = reactive({
  account: 'admin',
  password: '123456',
  captcha: ''
})

// 记住密码
const remember = ref(true)

// 加载状态
const loading = ref(false)

// 验证码
const captchaUrl = ref('')
const captchaKey = ref('')

// 获取验证码
const refreshCaptcha = async () => {
  try {
    const { data, code } = await getCaptcha()
    if (code === 200) {
      captchaUrl.value = data.image
      captchaKey.value = data.key
    }
  } catch (error) {
    console.error('获取验证码失败:', error)
  }
}

// 登录
const handleLogin = async () => {
  if (!loginForm.account) {
    layer.msg('请输入用户名', { icon: 0 })
    return
  }
  if (!loginForm.password) {
    layer.msg('请输入密码', { icon: 0 })
    return
  }
  if (!loginForm.captcha) {
    layer.msg('请输入验证码', { icon: 0 })
    return
  }

  loading.value = true
  try {
    const { data, code, msg } = await login({
      account: loginForm.account,
      password: loginForm.password,
      captcha: loginForm.captcha,
      captchaKey: captchaKey.value
    })

    if (code === 200) {
      // 记住密码
      if (remember.value) {
        localStorage.setItem('rememberAccount', loginForm.account)
      } else {
        localStorage.removeItem('rememberAccount')
      }

      layer.msg(msg || '登录成功', { icon: 1 }, async () => {
        userStore.token = data.token
        await userStore.loadMenus()
        await userStore.loadPermissions()
        router.push('/')
      })
    } else {
      layer.msg(msg || '登录失败', { icon: 2 })
      refreshCaptcha()
    }
  } catch (error) {
    layer.msg('登录失败，请稍后重试', { icon: 2 })
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  refreshCaptcha()
  // 恢复记住的账号
  const savedAccount = localStorage.getItem('rememberAccount')
  if (savedAccount) {
    loginForm.account = savedAccount
  }
})
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/login/login-full-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 500px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.captcha-row {
  display: flex;
  gap: 10px;
}

.captcha-row :deep(.layui-input-wrapper) {
  flex: 1;
}

.captcha-img {
  width: 120px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
}

.captcha-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.captcha-img:hover {
  border-color: var(--global-primary-color);
}

.remember-row {
  margin-bottom: 24px;
}

.remember-row :deep(.layui-checkbox-skin) {
  border-color: var(--global-primary-color);
}

.remember-row :deep(.layui-checkbox-skin.layui-checkbox-checked) {
  background-color: var(--global-primary-color);
  border-color: var(--global-primary-color);
}

.form-item :deep(.layui-btn) {
  height: 44px;
  font-size: 16px;
}

/* 响应式 */
@media (max-width: 560px) {
  .login-card {
    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 30px;
  }
}
</style>
