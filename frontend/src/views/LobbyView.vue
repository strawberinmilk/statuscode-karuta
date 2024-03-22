<template>
  <main :id="$style.root">
    <h1>Lobby</h1>
    <div>
      <h3>HTTPステータスコードとは</h3>
      <p>
        あなたがお持ちのスマホやPCでWebサイトを閲覧するとき、ブラウザからこのURLのデータをくださいとWebサーバに送られるデータ、これをリクエストと呼びます。
        その返事をレスポンスと呼びます。レスポンスはWebサーバごとにまちまちであるため、3桁の数字で処理がどのようになったのか、例えば成功したのか失敗したのかどこで失敗したのかを、大まかに伝える仕組みとして標準化されたのがHTTPステータスコードです。その3桁の数字をカードに、意味合いを読み札としてかるたができるゲームです。ログインなしで遊べます。
      </p>
    </div>

    <div>
      <h3>難易度</h3>
      <ul>
        <li><router-link to="/game/easy">easy</router-link></li>
        非常によく使われる6種類のステータスコードが出題されます。Webサーフィンを嗜む方向け。
        <li><router-link to="/game/normal">normal</router-link></li>
        Webエンジニアなら目にするであろう12種類のステータスコードが出題されます。Webエンジニア初心者向け。
        <li><router-link to="/game/medium">medium</router-link></li>
        収録されている63種類の中からランダムな12個のステータスコードが出題されます。Webエンジニア上級者向け。
        <li><router-link to="/game/hard">hard</router-link></li>
        収録されている63種類の全てが出題されます。このモードでは探しやすくするためにカードが番号順に並びます。WWW完全に理解した方向け。
        <li><router-link to="/game/lunatic">lunatic</router-link></li>
        収録されている63種類の全てが出題されます。hardとの違いはランダムにカードが配置されるのでコードが頭に浮かんでも更にカードを探す必要があります。奇特な方向け。
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LobbyView',
  setup() {}
})
</script>

<style lang="scss" module>
#root {
  width: 100%;
  text-align: left;
}
</style>