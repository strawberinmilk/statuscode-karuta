<template>
  <div :id="$style.homeLogoInnerRoot">
    <div :id="$style.logoTextArea">
      <p>{{ state.logoText }}</p>
    </div>
    <div :id="$style.slotArea">
      <span :id="$style.slotNum">
        {{ state.slotNum }}
      </span>
      &nbsp;
      <span :id="state.slotTextStyle">
        {{ state.slotText }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, useCssModule  } from 'vue'
import delay from 'delay'
import statusCode from '../../public/statuscode.json'

export default {
  name: 'HomeLogoInner',
  async setup() {
    const state = reactive({
      logoText: '',
      slotNum: '',
      slotText: '',
      slotTextStyle: '',
    })
    return {
      state,
    }
  },
  async mounted() {
    const $style = useCssModule();
    const setRandomStatus = () => {
      const num = Math.floor(Math.random() * statusCode.length)
      this.state.slotNum = statusCode[num].statusCode
      this.state.slotText = statusCode[num].statusName
      switch(statusCode[num].statusCode.split('')[0]) {
        case '1':
          this.state.slotTextStyle = $style.info;
          break;
        case '2':
          this.state.slotTextStyle = $style.success;
          break;
        case '3':
          this.state.slotTextStyle = $style.redirect;
          break;
        case '4':
          this.state.slotTextStyle = $style.clientError;
          break;
        case '5':
          this.state.slotTextStyle = $style.serverError;
          break;
      }
    }
    ;(async () => {
      for (const char of 'statuscode-karuta'.split('')) {
        this.state.logoText += char
        await delay(100)
      }
    })()

    ;(async () => {
      const startTime = new Date().getTime()
      let delayMs = 50
      while (new Date().getTime() - startTime < 1700) {
        setRandomStatus()
        await delay(delayMs)
      }
      while (new Date().getTime() - startTime < 3700) {
        setRandomStatus()
        await delay(delayMs += 10)
      }
      this.state.slotNum = '200'
      this.state.slotText = 'OK'
      this.state.slotTextStyle = $style.success;
    })()
  }
}
</script>

<style lang="scss" module>
#homeLogoInnerRoot {
  position: relative;
  margin: 0;
}

#logoTextArea {
  position: relative;
  color: white;
  font-size: 3em;
  width: 360px;
  /* left: calc(50vw - 4.5em); */
  margin: 0 auto;
}

#slotArea {
  position: relative;
  font-size: 1.3em;
  width: 360px;
  margin: 0 auto;
}


#slotNum {
  color: #80ad89;
}

#info{
  color: #0000FF;
}

#success {
  color: #00FF00;
}

#redirect {
  color: #FFFF00
}

#clientError {
  color: #FF00FF;

}

#serverError {
  color: #FF0000;
}

</style>