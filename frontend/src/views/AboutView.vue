<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="apiGet()">apiGet</button>
    <button @click="apiPost()">apiPost</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue';
import axios from 'axios';
export default defineComponent({
  name: 'SampleView',
  setup() {
    const apiGet = async () => {
      const res = await axios.get('/api/hoge');
      alert(res.data);
    }
    const apiPost = async () => {
      const res = await axios.post('/api/hoge',{
        text: 'test'
      });
      alert(res.data);
    }
    return {
      apiGet,
      apiPost,
    };
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
