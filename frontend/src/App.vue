<template>
  <div :id="$style.root">
    <el-page-header :id="$style.header" :icon="null">
      <template #title>
        <router-link to="/">
          Statuscode-karuta
        </router-link>
      </template>

      <template #content>
        <span class="$style.pc">
          <router-link :class="$style.header_link" to="/about">about(リザルト？)</router-link>
          
          <router-link :class="$style.header_link" to="/about">about(リザルト？)</router-link>
        </span>
      </template>

    </el-page-header>

    <RouterView />
    <!-- <footer :id="$style.footer">©2023 rin;</footer> -->
  </div>
</template>

<style lang="scss" module>
#root {
  height: 90vh;
  margin: 0;
}

#header {
  margin: 0;
  padding: 0;
}

.header_link {
  color: #8b0a8b;
}

/* #footer {
  position: relative;
  bottom: 0;
} */

</style>
