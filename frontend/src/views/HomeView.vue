<template>
  <main>
    <HomeLogo v-if="state.animationShow" />
    <h1>Statuscode-karuta</h1>
    <router-link to="/game/easy">easy</router-link>
    <router-link to="/game/normal">normal</router-link>
    <router-link to="/game/medium">medium</router-link>
    <router-link to="/game/hard">hard</router-link>
    <router-link to="/game/lunatic">lunatic</router-link>

    <router-link to="/lobby">lobby</router-link>
    <router-link to="/about">about</router-link>
    <el-button @click="animationPlay">アニメーション再生</el-button>
  </main>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import Cookies from 'universal-cookie'
import { reactive } from 'vue'
import HomeLogo from '../components/HomeLogo.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeLogo
  },
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

    const animationPlay = () => {
      cookies.set('animation_viewed', now)
      state.animationShow = false
      nextTick(() => {
        state.animationShow = true
      })
    }

    return {
      state,
      animationPlay
    }
  }
})
</script>

<style lang="scss" module>
</style>