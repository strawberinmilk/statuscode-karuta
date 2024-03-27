<template>
  <div :id="$style.homeLogoRoot">
    <Suspense>
      <HomeLogoInner />
    </Suspense>
  </div>
</template>

<script lang="ts">
import HomeLogoInner from './HomeLogoInner.vue'

export default {
  name: 'HomeLogo',
  components: {
    HomeLogoInner
  }
}
</script>

<style lang="scss" module>
#homeLogoRoot {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(rgb(70, 0, 70), rgb(0, 40, 50));

  animation-name: home_logo_root;
  animation-delay: 4.5s;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes home_logo_root {
  0% {
    opacity: 1;
    z-index: 1000;
  }
  100% {
    opacity: 0;
    z-index: -1000;
  }
}
</style>