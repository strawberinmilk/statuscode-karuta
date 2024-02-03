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
      </el-page-header>
    </div>

    <RouterView />
  </div>
</template>

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
