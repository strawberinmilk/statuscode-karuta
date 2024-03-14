<template>
  <div :id="$style.root">
    <div :id="$style.header">
      <el-page-header :icon="null">
        <template #title>
          <router-link to="/"> Statuscode-karuta </router-link>
        </template>

        <template #content>
          <span>
            <router-link :class="$style.header_link" to="/game">game</router-link>
            <router-link :class="$style.header_link" to="/about">about(result)</router-link>
            <router-link :class="$style.header_link" to="/about">about(credit)</router-link>
          </span>
        </template>

        <template #extra>
          <router-link :class="$style.header_link" to="/login">{{ state.loginStatus ? 'logout' : 'login' }}</router-link>
        </template>
      </el-page-header>
    </div>

    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Cookies from 'universal-cookie'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const cookies = new Cookies()
    const state = reactive({
      loginStatus: false
    })

    setInterval(() => {
      state.loginStatus = !!cookies.get('token')
    }, 100)

    return { state }
  }
})
</script>
<style lang="scss" module>
#root {
  position: relative;
  min-height: 100vh;
  margin: 0;
}

/* 謎のflexぽい動作の対策 */
@media screen and (min-width: 1024px) {
  #root {
    width: 200%;
  }
}

#header {
  margin: 0;
  padding: 0;
  .header_link {
    color: #8b0a8b;
  }
}

/* #footer {
  position: relative;
  bottom: 0;
} */
</style>
