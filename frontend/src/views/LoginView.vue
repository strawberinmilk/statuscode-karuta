<template>
  <main>
    <div v-if="!state.loginStatus">
      <h1>login</h1>
      <el-input v-model="state.email" placeholder="メールアドレス"></el-input>
      <el-input v-model="state.password" placeholder="パスワード" type="password"></el-input>
      <el-button @click="login">ログイン</el-button>
      <router-link to="/signup">アカウントを作成する方はこちら</router-link>
    </div>
    <div v-if="state.loginStatus">
      <el-button @click="logout">ログアウト</el-button>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Cookies from 'universal-cookie'
import axios from 'axios'
import * as notification from '../datas/notification'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const state = reactive({
      email: '',
      password: '',
      loginStatus: false
    })

    const cookies = new Cookies()
    state.loginStatus = !!cookies.get('token')

    const login = async () => {
      try {
        const res = await axios.post('/api/auth/login', {
          email: state.email,
          password: state.password
        })
        cookies.set('token', res.data.access_token)
        state.loginStatus = true
      } catch (e) {
        if (axios.isAxiosError(e) && e.response && e.response.request.status === 401) {
          notification.error(
            '401 Unauthorized:ログインに失敗しました',
            'メールアドレスまたはパスワードが正しくありません'
          )
        } else {
          notification.error('エラー', 'ログインに失敗しました')
        }
      }
    }

    const logout = async () => {
      cookies.set('token', '')
      state.loginStatus = false
    }
    return {
      state,
      login,
      logout
    }
  }
})
</script>

<style lang="scss" module>
</style>