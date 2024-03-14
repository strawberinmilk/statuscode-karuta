<template>
  <main>
    <div v-if="!state.signupStatus">
      <h1>Signup</h1>
      <el-input v-model="state.email" placeholder="メールアドレス"></el-input>
      <el-input v-model="state.password" placeholder="パスワード" type="password"></el-input>
      <el-input
        v-model="state.passwordCheck"
        placeholder="パスワード(再入力)"
        type="password"
      ></el-input>
      <el-input v-model="state.name" placeholder="名前"></el-input>
      <el-button @click="signup">アカウントを作成</el-button>
    </div>
    <div v-if="state.signupStatus">
      アカウントが仮作成されました。メールアドレスを確認してください。<br />
      <router-link to="/"> トップへ </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import * as notification from '../datas/notification'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const state = reactive({
      signupStatus: false,
      email: '',
      password: '',
      passwordCheck: '',
      name: ''
    })

    const signup = async () => {
      if (!state.email || !state.password || !state.passwordCheck || !state.name) {
        notification.error('入力値エラー', '全ての項目を入力してください')
        return
      }
      if (state.password !== state.passwordCheck) {
        notification.error('入力値エラー', 'パスワードが一致しません')
        return
      }
      try {
        await axios.post('/api/auth/signup', {
          email: state.email,
          password: state.password,
          name: state.name
        })
        state.signupStatus = true
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          if (e.response.request.status === 401) {
            notification.error(
              'アカウント作成に失敗しました',
              'メールアドレスまたは名前が使用されています'
            )
          }
        } else {
          notification.error('エラー', 'アカウント作成に失敗しました')
        }
      }
    }

    return {
      state,
      signup
    }
  }
})
</script>

<style lang="scss" module>
</style>