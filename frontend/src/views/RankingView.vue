<template>
  <main>
    <h1>Ranking</h1>
    <div>
      <h3>直近一か月の上位スコア者</h3>
      <el-select @change="getRankScore" v-model="state.gameModeForRank">
        <el-option
          v-for="gameMode in state.gameModes"
          :key="gameMode"
          :label="gameMode"
          :value="gameMode"
        />
      </el-select>
      <el-row>
        <el-col :span="6">順位</el-col>
        <el-col :span="6">名前</el-col>
        <el-col :span="6">スコア</el-col>
        <el-col :span="6">日付</el-col>
      </el-row>
      <el-row v-for="(score, i) of state.rankScores" :key="score.uuid">
        <el-col :span="6">{{ i + 1 }}位</el-col>
        <el-col :span="6">{{ score.userName }}</el-col>
        <el-col :span="6">{{ score.score }}</el-col>
        <el-col :span="6">{{ new Date(score.createdAt).toLocaleDateString() }}</el-col>
      </el-row>
    </div>
    <div>
      <h3>マイスコア</h3>
      <div v-if="!state.token">この機能はログインすると利用できます</div>
      <div v-if="state.token">
        <el-row>
          <el-col :span="24" :md="6">
            <p>開始日</p>
            <el-date-picker v-model="state.from" type="date" placeholder="開始日" />
          </el-col>
          <el-col :span="24" :md="6">
            <p>終了日</p>
            <el-date-picker v-model="state.to" type="date" placeholder="開始日" />
          </el-col>
          <el-col :span="24" :md="6">
            <p>ゲームモード</p>
            <el-select v-model="state.gameMode">
              <el-option
                v-for="gameMode in state.gameModes"
                :key="gameMode"
                :label="gameMode"
                :value="gameMode"
              />
            </el-select>
          </el-col>
          <el-col :span="24" :md="6">
            <p>ソート</p>
            <el-select v-model="state.sort">
              <el-option value="dateASC" label="日時昇順" />
              <el-option value="dateDESE" label="日時降順" />
              <el-option value="scoreASC" label="スコア昇順" />
              <el-option value="scoreDESE" label="スコア降順" />
            </el-select>
          </el-col>
        </el-row>
        <el-button @click="getMyScore">取得</el-button>

        <div>
          <el-row v-for="score of state.myScores" :key="score.uuid">
            <el-col :span="12">{{ score.score }}</el-col>
            <el-col :span="12">{{ new Date(score.createdAt).toLocaleDateString() }}</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { type Score, type GameMode, GameModes } from '@/datas/dto'

export default defineComponent({
  name: 'rankingView',
  setup() {
    const cookies = new Cookies()

    const from = new Date()
    from.setMonth(from.getMonth() - 1)
    from.setHours(0)
    from.setMinutes(0)
    from.setSeconds(0)
    from.setMilliseconds(0)

    const to = new Date()
    to.setHours(0)
    to.setMinutes(0)
    to.setSeconds(0)
    to.setMilliseconds(0)

    const state: {
      gameModeForRank: GameMode
      rankScores: Score[]

      gameMode: GameMode
      gameModes: string[]
      myScores: Score[]
      token: string
      from: Date
      to: Date
      sort: string
    } = reactive({
      gameModeForRank: 'easy',
      rankScores: [],

      gameMode: 'easy',
      gameModes: GameModes,
      myScores: [],
      token: cookies.get('token'),
      from,
      to,
      sort: 'dateASC'
    })

    const getRankScore = async (gameMode: string) => {
      state.rankScores = (
        await axios.post('/api/score/ranking', {
          gameMode
        })
      ).data
    }

    const getMyScore = async (gameMode: string) => {
      const to = new Date(state.to)
      to.setDate(state.to.getDate() + 1)
      to.setMilliseconds(-1)
      state.myScores = (
        await axios.post(
          '/api/score/log',
          {
            gameMode: state.gameMode,
            from: state.from,
            to,
            order: state.sort
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`
            }
          }
        )
      ).data
    }

    ;(async () => {
      try {
        await getRankScore(state.gameMode)
      } catch (e) {}
    })()
    return {
      state,
      getRankScore,
      getMyScore
    }
  }
})
</script>

<style lang="scss" module>
</style>