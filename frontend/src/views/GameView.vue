<template>
  <div :id="$style.root">
    <!--全画面表示用要素ここから-->
    <!--グレーアウト fixed-->
    <div
      :id="$style.backgroundGrayOut"
      v-if="
        state.gameStep === 'standby' ||
        state.gameStep === 'cardAnswer' ||
        state.gameStep === 'showResult'
      "
    ></div>

    <!--stanby画面-->
    <div :id="$style.stanbyBox" v-if="state.gameStep === 'standby'">
      <p>ゲームを開始します</p>
      <el-button @click="gameStart">開始</el-button>
    </div>

    <!--回答解説画面-->
    <div :class="$style.box_80_80" v-if="state.gameStep === 'cardAnswer'">
      <el-row>
        <el-col :span="18">問題文</el-col>
        <el-col :span="6">ステータスコード</el-col>
      </el-row>
      <el-row>
        <el-col :span="18">{{ state.answerResult.statusCode.statusText }}</el-col>
        <el-col :span="6">{{ state.answerResult.statusCode.status }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">残り時間</el-col>
        <el-col :span="2"></el-col>
        <el-col :span="4">今回スコア</el-col>
        <el-col :span="2"></el-col>
        <el-col :span="4">これまでのスコア</el-col>
        <el-col :span="2"></el-col>
        <el-col :span="5">累計スコア</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">{{ state.answerResult.rimitTime }}</el-col>
        <el-col :span="2">→</el-col>
        <el-col :span="4">{{ state.answerResult.currentPoint }}</el-col>
        <el-col :span="2">+</el-col>
        <el-col :span="4">{{ state.answerResult.untilPoint }}</el-col>
        <el-col :span="2">=</el-col>
        <el-col :span="5">{{ state.answerResult.totalPoint }}</el-col>
      </el-row>
      <el-button v-if="state.inPlayCard.length" @click="nextCard">次の問題へ</el-button>
      <el-button v-if="!state.inPlayCard.length" @click="showResult">結果確認</el-button>
    </div>

    <!--リザルト画面-->
    <div :class="$style.box_80_80" v-if="state.gameStep === 'showResult'">
      <h2>Result</h2>
      <div :id="$style.resultInner">
        <el-row>
          <el-col :span="6">得点</el-col>
          <el-col :span="6">答えた数</el-col>
          <el-col :span="6">タイムアップした数</el-col>
          <el-col :span="6">順位</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">{{ state.totalPoint }}</el-col>
          <el-col :span="6">{{ state.lastResult.numberToGive - state.lastResult.miss }}</el-col>
          <el-col :span="6">{{ state.lastResult.miss }}</el-col>
          <el-col :span="6">{{ state.lastResult.rank }}</el-col>
        </el-row>
        <br />
        <div v-if="!unResetState.token">
          <h3>スコアを登録する</h3>
          <div :id="$style.inputParent">
            <el-input
              v-model="unResetState.userName"
              placeholder="名前を入力してください"
            ></el-input>
          </div>
          <el-button @click="setName" :disabled="state.lastResult.sended">登録</el-button>
        </div>
        <br />
        <br />
        <el-row>
          <el-col :span="12"><el-button @click="nextGame()">もう一度遊ぶ</el-button></el-col>
          <el-col :span="12"><el-button @click="$router.push('/')">トップへ</el-button></el-col>
        </el-row>
      </div>
    </div>
    <!--全画面表示用要素ここまで-->

    <!--ステータスバー-->
    <el-row :id="$style.status" v-if="state.gameStep === 'cardGet'">
      <el-col :span="15">&nbsp;{{ state.currentStatusCode.statusText }} </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">残り時間:&nbsp;{{ state.rimitTime.toFixed(1) }}</el-col>
      <el-col :span="4">スコア:&nbsp;{{ state.totalPoint }}</el-col>
    </el-row>

    <!--カードエリア-->
    <el-row>
      <el-col :span="4" :xs="8" v-for="data of state.cardList" :key="data.cardNum">
        <Card
          :cardNum="data.cardNum"
          :enable="data.enable"
          :statusCode="data.statusCodeData.statusCode"
          @cardClick="(cardNum) => cardClick(cardNum)"
        />
      </el-col>
    </el-row>
    <div :id="$style.volume" @click="audioVolume">
      <img v-if="!unResetState.volume" src="/icon/volume_on.svg" />
      <img v-if="unResetState.volume" src="/icon/volume_off.svg" />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * customの実装 後で
 * お手付き処理
 */
import { defineComponent, reactive } from 'vue'
import { useRoute /*, useRouter */ } from 'vue-router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Card from '@/components/Card.vue'
import rawStatusCodeJson from '@/datas/statusCode.json'
import type { StatusCode, VoiceAudio } from '@/datas/dto'
import * as notification from '../datas/notification'

const tmpStatusData = {
  status: '',
  statusCode: '',
  statusName: '',
  statusText: '',
  statusCodeId: -1,
  statusNameId: -1,
  statusTextId: -1
}

export default defineComponent({
  name: 'GameView',
  components: {
    Card
  },
  setup() {
    const statusCodeJson = [...rawStatusCodeJson]

    // const router = useRouter()
    const route = useRoute()
    const cookies = new Cookies()

    if (cookies.get('volume') === undefined) {
      cookies.set('volume', 1)
    }

    // TODO: customの実装
    const mode: 'easy' | 'normal' | 'hard' | 'lunatic' | 'custom' = (() => {
      switch (route.params.mode) {
        case 'easy':
          return 'easy'
        case 'normal':
          return 'normal'
        case 'hard':
          return 'hard'
        case 'lunatic':
          return 'lunatic'
        default:
          return 'custom'
      }
    })()

    // ゲームモード変数
    const randomMap = mode !== 'hard' /* || mode === 'custom' && route */ ? true : false
    const numberToGive = (() => {
      // return 12 // debug
      switch (mode) {
        case 'easy':
          return 6
        case 'normal':
          return 12
        case 'hard':
          return 63
        case 'lunatic':
          return 63
        // case 'custom':
        //   return route.hoge.fuga
        default:
          return 12
      }
    })()

    // debug 変数
    const randomRead = true // falseにすると0番目から読み上げられるようになる
    const tickerRateMs = 100 // tickerの速さ(ms)
    const rimitTime = 30 // 回答制限時間(s)
    const pointRatio = 100 // ポイント倍率
    const debug = false // ログ制御

    const unResetState: {
      userName: string
      volume: number
      token: string
    } = reactive({
      userName: cookies.get('userName') || '',
      volume: Number(cookies.get('volume')),
      token: cookies.get('token')
    })

    const state: {
      cardList: { cardNum: number; enable: boolean; statusCodeData: StatusCode }[]
      inPlayCard: number[]
      gameStep: 'standby' | 'cardGet' | 'cardAnswer' | 'showResult'
      currentCard: number
      currentStatusCode: StatusCode
      rimitTime: number
      totalPoint: number
      answerResult: {
        statusCode: StatusCode
        rimitTime: string
        currentPoint: number
        untilPoint: number
        totalPoint: number
      }
      lastResult: {
        numberToGive: number
        miss: number
        rank: string
        uuid: string
        sended: boolean
      }
    } = reactive({
      cardList: [],
      inPlayCard: [],
      gameStep: 'standby',
      currentCard: -1,
      currentStatusCode: { ...tmpStatusData },
      rimitTime: 0,
      totalPoint: 0,
      answerResult: {
        statusCode: { ...tmpStatusData },
        rimitTime: '',
        currentPoint: 0,
        untilPoint: 0,
        totalPoint: 0
      },
      lastResult: {
        numberToGive,
        miss: 0,
        rank: '',
        uuid: '',
        sended: false
      }
    })
    // stateを弄ったらinitもなおすこと

    // 初期化処理
    const init = () => {
      debug && console.log('game init')
      state.cardList = []
      state.inPlayCard = []
      state.gameStep = 'standby'
      state.currentCard = -1
      state.currentStatusCode = { ...tmpStatusData }
      state.rimitTime = 0
      state.totalPoint = 0
      state.answerResult = {
        statusCode: { ...tmpStatusData },
        rimitTime: '',
        currentPoint: 0,
        untilPoint: 0,
        totalPoint: 0
      }
      state.lastResult = {
        numberToGive,
        miss: 0,
        rank: '問い合わせ中...',
        sended: false,
        uuid: ''
      }
      const rawStatusCodeList = (() => {
        if (mode !== 'easy') {
          return statusCodeJson
        } else {
          return statusCodeJson.filter((statusCode) => {
            return ['200', '400', '403', '404', '500', '502'].indexOf(statusCode.statusCode) !== -1
          })
        }
      })()
      for (let i = 0; i < numberToGive; i++) {
        // カード配布
        const hitCard = randomMap ? Math.floor(Math.random() * rawStatusCodeList.length) : 0
        state.cardList.push({
          cardNum: i,
          enable: true,
          statusCodeData: rawStatusCodeList.splice(hitCard, 1)[0]
        })
        state.inPlayCard.push(i)
        state.gameStep = 'standby'
      }
    }

    init()

    // audio
    debug && console.log('audio init')
    const audio = new Audio()
    audio.volume = unResetState.volume
    let voiceAudio: VoiceAudio[] = []
    const audioPlay = () => {
      if (voiceAudio.length === 0) return
      const akane = voiceAudio[0].akane
      const track = voiceAudio[0].track
      audio.src = `/voice/${akane ? 'akane' : 'aoi'}/${akane ? 'akane' : 'aoi'}-${track}.wav`
      audio.play()
      voiceAudio.shift()
    }
    const audioSetAndPlay = (newVoiceAudio: VoiceAudio[]) => {
      audio.pause()
      voiceAudio = newVoiceAudio
      audioPlay()
    }
    const audioResetAndStop = () => {
      voiceAudio = []
      audio.pause()
    }
    audio.onended = (event) => {
      audioPlay()
    }
    const audioVolume = () => {
      const vol = unResetState.volume ? 0 : 1
      unResetState.volume = vol
      audio.volume = vol
      cookies.set('volume', vol)
    }

    // ticker
    debug && console.log('ticker init')
    const ticker = setInterval(() => {
      if (state.gameStep === 'cardGet') {
        // 残り時間を減らす
        state.rimitTime -= tickerRateMs / 1000
        if (state.rimitTime < 0.9) {
          // 0秒になったら強制的に解説画面へ
          state.rimitTime = 0
          state.lastResult.miss++
          answer()
        }
      }
    }, tickerRateMs)

    // step standby→cardGet処理
    // レンダープロセスから呼ばれる想定
    const gameStart = () => {
      debug && console.log('func: gameStart')
      if (state.gameStep !== 'standby') {
        console.error('error gameStep:standby でないのに gameStart関数が呼ばれました')
        return
      }
      currentCardInit()
    }

    // step gameStart|cardAnswer→cardGet処理 読み札の設定と読み上げカウントダウン開始
    const currentCardInit = () => {
      debug && console.log('func: currentCardInit')
      // 読み札の確定
      const num = randomRead ? Math.floor(Math.random() * state.inPlayCard.length) : 0
      const currentCard = state.inPlayCard[num]
      const currentStatusCode = state.cardList[currentCard].statusCodeData

      // 読み札と残り時間の設定
      state.currentCard = currentCard
      state.currentStatusCode = currentStatusCode
      state.rimitTime = rimitTime

      state.gameStep = 'cardGet'

      audioSetAndPlay([{ akane: true, track: currentStatusCode.statusTextId }])
    }

    // カードクリック処理
    // レンダープロセスから呼ばれる想定
    const cardClick = (cardNum: number) => {
      if (state.gameStep !== 'cardGet') {
        console.error('error gameStep:cardGet でないのに cardClick 関数が呼ばれました')
        return
      }
      debug && console.log(`func: cardClick click: ${cardNum}`)
      if (state.currentCard === cardNum) {
        // 正解カードクリック
        answer()
      } else if (!state.cardList[cardNum].enable) {
        // disableカード誤クリック 処理なし
      } else {
        // TODO: お手付き処理
        console.warn('お手付き')
      }
    }

    // step cardGet→cardAnswer処理
    // 時間切れでtickerから呼ばれるパターンとカードクリックで呼ばれるパターンがある
    const answer = () => {
      debug && console.log('func: answer')
      const currentCardData = state.cardList[state.currentCard]
      const currentStatusCode = currentCardData.statusCodeData
      audioSetAndPlay([
        { akane: true, track: currentStatusCode.statusCodeId },
        { akane: true, track: currentStatusCode.statusNameId },
        { akane: true, track: currentStatusCode.statusTextId }
      ])
      // 点数計算
      const currentPoint = Number(state.rimitTime.toFixed(1)) * pointRatio
      const totalPoint = state.totalPoint + currentPoint

      // 結果表示
      state.answerResult = {
        statusCode: currentStatusCode,
        rimitTime: state.rimitTime.toFixed(1),
        currentPoint,
        untilPoint: state.totalPoint,
        totalPoint: totalPoint
      }

      // 取ったカードを無効化
      currentCardData.enable = false
      state.inPlayCard = state.inPlayCard.filter((card) => {
        return card !== state.currentCard
      })

      // 後処理
      state.gameStep = 'cardAnswer'
      state.currentCard = -1
      state.currentStatusCode = { ...tmpStatusData }
      state.rimitTime = 0
      state.totalPoint = totalPoint
    }

    // step cardAnswer→cardGet処理
    const nextCard = () => {
      if (state.gameStep !== 'cardAnswer') {
        console.error('error gameStep:cardAnswer でないのに nextCard 関数が呼ばれました')
        return
      }
      debug && console.log('func: nextCard')
      audioResetAndStop()
      currentCardInit()
    }

    // step cardAnswer→showResult処理
    const showResult = async () => {
      if (state.gameStep !== 'cardAnswer') {
        console.error('error gameStep:cardAnswer でないのに nextCard 関数が呼ばれました')
        return
      }
      debug && console.log('func: showResult')
      audioResetAndStop()

      // スコア登録処理
      if (unResetState.token) {
        const res = await axios.post(
          '/api/score/member',
          {
            score: state.totalPoint,
            gameMode: mode
          },
          {
            headers: {
              Authorization: `Bearer ${unResetState.token}`
            }
          }
        )
        state.lastResult.uuid = res.data.uuid
        state.lastResult.rank = `${res.data.rank}位 / ${res.data.allCount}人中`
      } else {
        try {
          const res = await axios.post('/api/score/guest', {
            score: state.totalPoint,
            gameMode: mode
          })
          state.lastResult.uuid = res.data.uuid
          state.lastResult.rank = `${res.data.rank}位 / ${res.data.allCount}人中`
        } catch {}
      }

      state.gameStep = 'showResult'
    }

    // showResult 画面において名前を登録する
    const setName = async () => {
      if (!unResetState.userName || state.lastResult.sended) return
      state.lastResult.sended = true
      cookies.set('userName', unResetState.userName)

      try {
        await axios.put('/api/score', {
          uuid: state.lastResult.uuid,
          userName: unResetState.userName
        })
        notification.success('名前を登録しました', '')
      } catch (e: any) {
        notification.error('名前登録に失敗しました', '')
      }
    }

    // step showResult→standby処理
    const nextGame = () => {
      if (state.gameStep !== 'showResult') {
        console.error('error gameStep:showResult でないのに nextGame 関数が呼ばれました')
        return
      }
      debug && console.log('func: showResult')
      init()
      state.gameStep = 'standby'
    }

    return {
      state,
      unResetState,
      audioVolume,
      gameStart,
      cardClick,
      nextCard,
      showResult,
      nextGame,
      setName,

      audio,
      ticker
    }
  },
  unmounted() {
    this.audio.pause()
    this.state.gameStep = 'standby'
    clearInterval(this.ticker)
  }
})
</script>

<style lang="scss" module>
@use '@/datas/constants';

#root {
  position: relative;
}

#backgroundGrayOut {
  position: fixed;
  // top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: constants.$backgroundGrayoutColor;
  opacity: 0.8;
  z-index: constants.$viewHighZI;
}

#stanbyBox {
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 150px);
  height: 100px;
  width: 300px;
  background: linear-gradient(constants.$popupBlue, constants.$popupBlack, constants.$popupBlue);
  border-radius: 10px;
  opacity: 1;
  z-index: constants.$viewHighZI;
  text-align: center;
  font-size: 2em;
}

.box_80_80 {
  position: fixed;
  top: calc(50% - 40vh);
  left: calc(50% - 40vw);
  height: 80vh;
  width: 80vw;
  background: linear-gradient(constants.$popupBlue, constants.$popupBlack, constants.$popupBlue);
  border-radius: 30px;
  opacity: 1;
  z-index: constants.$viewHighZI;
  padding: 10px;
}

#status {
  position: sticky;
  top: 0;
  background: linear-gradient(constants.$popupBlue, constants.$popupBlack, constants.$popupBlue);
  z-index: constants.$viewHighZI;
}

#resultInner {
  text-align: center;
  #inputParent {
    max-width: 500px;
    margin: 0 auto;
  }
}

#volume {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 40px;
  width: 40px;
  border-radius: 0 20px 0 0;
  background-color: constants.$volumeColor;
  img {
    height: 40px;
    width: 40px;
  }
}
</style>
