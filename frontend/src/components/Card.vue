<template>
  <div :id="$style.root" @click="$emit('cardClick', cardNum)">
    <div :id="$style.disable" v-if="!enable">
      <div :id="$style.disableInner"></div>
    </div>
    <div :id="$style.cardText">
      <p>{{ statusCode }}</p>
    </div>
    <img :id="$style.img" src="/card.jpg" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CardComponent',
  props: {
    statusCode: String,
    cardNum: Number,
    enable: Boolean
  }
}
</script>

<style lang="scss" module>
@use '@/datas/constants';

#root {
  width: 100%;
  position: relative;
}

#disable {
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 10px;
  z-index: constants.$componentHighZI;
}

#disableInner {
  height: 100%;
  width: 100%;
  background-color: gray;
  opacity: 0.8;
  z-index: constants.$componentHighZI;
}

#cardText {
  position: absolute;
  z-index: constants.$componentMiddleZI;
  width: 100%;
  font-size: 3.5em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  text-align: center;
}

#img {
  padding: 10px;
  width: 100%;
  z-index: constants.$componentLowerZI;
}
</style>