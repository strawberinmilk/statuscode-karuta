<template>
  <main>
    <HomeLogo v-if="state.animationShow" />
    Statuscode-karuta(HomeView)
    <router-link to="/game/easy">easy</router-link>
    <router-link to="/game/normal">normal</router-link>
    <router-link to="/game/hard">hard</router-link>
    <router-link to="/game/lunatic">lunatic</router-link>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cookies from 'universal-cookie'
import { reactive } from 'vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const state = reactive({
      animationShow: true
    })

    const cookies = new Cookies()

    const now = new Date().getTime()
    const diffMS = now - Number(cookies.get('animation_viewed'))
    const diffDay = diffMS / 1000 / 60 / 60 / 24 // num / ms / s / m / h
    if (!cookies.get('animation_viewed')) {
      console.log('初閲覧')
      cookies.set('animation_viewed', now)
    } else if (3 < diffDay) {
      console.log('閲覧から3日経過')
      cookies.set('animation_viewed', now)
    } else {
      console.log('3日以内に閲覧')
      state.animationShow = false
    }

    return {
      state
    }
  }
})
</script>

<style lang="scss" module>
</style>