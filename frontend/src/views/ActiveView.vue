<template>
  <div>
    <div v-if="!state.activeStatus">トークン有効性を確認しています</div>
    <div v-if="state.activeStatus">アカウントが有効になりました。ログインしてください。</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import * as notification from '../datas/notification'

export default defineComponent({
  name: 'ActiveView',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeStatus: false
    })

    ;(async () => {
      try {
        await axios.post(`/api/auth/active`, {
          token: route.params.token
        })
        state.activeStatus = true
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          if (e.response.request.status === 401) {
            notification.error('エラー', 'トークンが無効です')
          }
        } else {
          notification.error('エラー', 'アカウント作成に失敗しました')
        }
      }
    })()

    return {
      state
    }
  }
})
</script>

<style lang="scss" module>
</style>