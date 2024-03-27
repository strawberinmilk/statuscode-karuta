<template>
  <main :id="$style.root">
    <h1 :id="$style.title">About</h1>
    <h3>お借りしたもの</h3>
    <table :class="$style.table">
      <tr>
        <th>ステータスコード説明文</th>
        <th>
          <a target="_blank" href="https://developer.mozilla.org/ja/docs/Web/HTTP/Status">
            Mozilla MDN Web Docs
          </a>
          <br />
          (CC BY-SA 2.5 DEED)
        </th>
      </tr>
      <tr>
        <th>声</th>
        <th>
          <a target="_blank" href="https://www.ah-soft.com/voiceroid/kotonoha/"
            >VOICEROID2 琴葉茜 琴葉葵</a
          >
        </th>
      </tr>
      <tr>
        <th>カード素材</th>
        <th>
          <a target="_blank" href="https://www.irasutoya.com/search?q=%E3%83%A2%E3%83%87%E3%83%A0"
            >いらすとや</a
          >
        </th>
      </tr>
      <tr>
        <th>音量アイコン画像</th>
        <th>
          <a target="_blank" href="https://fonts.google.com/icons?icon.query=volume">Google Font</a>
        </th>
      </tr>
      <tr>
        <th>効果音</th>
        <th><a target="_blank" href="https://soundeffect-lab.info">効果音ラボ</a></th>
      </tr>
    </table>

    <h3>制作 rin;</h3>
    <ul>
      <li :class="$style.li">
        <a target="_blank" href="https://twitter.com/strawbeRinMilk">Twitter(現X)</a>
      </li>
      <li :class="$style.li"><a target="_blank" href="https://strawberrymilk.dev">strawberrymilk.dev</a></li>
      <li :class="$style.li">
        <a target="_blank" href="https://www.amazon.co.jp/hz/wishlist/ls/9A75OFYW2EJI?ref_=wl_share"
          >Amazon</a
        >
      </li>
      <li :class="$style.li">
        <a target="_blank" href="https://github.com/strawberinmilk">GitHub</a>
      </li>
      <li :class="$style.li"><a target="_blank" href="https://qiita.com/strawbeRinMilk">Qiita</a></li>
    </ul>

    <h3>使用技術</h3>
    <table :class="$style.table">
      <tr>
        <th>言語</th>
        <th>TypeScript</th>
      </tr>
      <tr>
        <th>DB</th>
        <th>Postgres</th>
      </tr>
      <tr>
        <th>バックエンド</th>
        <th>NestJS</th>
      </tr>
      <tr>
        <th>フロントエンド</th>
        <th>Vue.js</th>
      </tr>
      <tr>
        <th>ORM</th>
        <th>TypeORM</th>
      </tr>
      <tr>
        <th>エディタ</th>
        <th>VisualStudioCodeInsider</th>
      </tr>
      <tr>
        <th>APIデバッグ</th>
        <th>Postman</th>
      </tr>
      <tr>
        <th>DBデバッグ</th>
        <th>DBeaver</th>
      </tr>
      <tr>
        <th>開発環境</th>
        <th>WSL Ubuntu22.04</th>
      </tr>
      <tr>
        <th>本番環境</th>
        <th>dokku</th>
      </tr>
    </table>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AboutView',
  setup() {}
})
</script>

<style lang="scss" module>
#root {
  width: 100%;
  text-align: center;
}
#title {
  text-align: left;
}
.table {
  margin: 0 auto;
}
.li {
  list-style: none;
}
</style>
