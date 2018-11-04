<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li class="primary">LYnLab Luppiter</li>
        <router-link :to="{ name: 'home' }"><li>서비스</li></router-link>
        <router-link :to="{ name: 'reference' }"><li>도움말</li></router-link>
      </ul>
      <ul class="right">
        <router-link :to="{ name: 'login' }" v-if="$localStorage.get('access_token') == null"><button class="square-button" type="button">LOGIN</button></router-link>
        <router-link :to="{ name: 'logout' }" v-else><button class="square-button" type="button">LOGOUT</button></router-link>
      </ul>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
html {
  background-color: #212121;
  height: 100%;
  overflow: scroll;
}

body {
  margin: 0;
  padding: 0;
}

* {
  color: #f5f5f5;
  line-height: 1.6;
}

#app {
  height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  h1, h2, h3 { font-weight: normal; }

  code { font-size: 16px; }

  table.themed {
    margin-bottom: 20px;
    border: 1px solid #424242;
    width: 100%;

    tr {
    height: 40px;
    }

    th {
      border-bottom: 1px solid #424242;
    }

    td {
      padding: 0 10px;
    }
  }

  .material-icons {
    vertical-align: middle !important;
  }

  .primary-input {
    height: 42px;
    margin-right: 8px;
    font-size: 14px;
    border: none;
    background-color: #fafafa;
    padding: 0 8px;
    color: #212121;
  }

  .square-button {
    background-color: #00000000;
    padding: 0 14px;
    font-size: 14px;
    line-height: 36px;
    color: #eeeeee;
    border: #eeeeee 2px solid;

    &:hover {
      cursor: pointer;
    }
  }

  .primary-button {
    background-color: #3F51B5;
    padding: 10px 24px;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border: none;

    &:hover {
      background-color: #303f9f;
      cursor: pointer;
    }
  }

  #nav {
    height: 40px;
    width: 100%;
    padding: 20px 0;

    ul {
      margin: 0;
      list-style-type: none;
    }

    ul.right {
      position: fixed;
      padding-left: 0;
      right: 30px;
    }

    ul li {
      padding: 0 10px;
      float: left;
      font-size: 16px;
      letter-spacing: 1px;
      line-height: 40px;
    }

    ul li.primary {
      font-weight: bold;
    }
  }

  #content {
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
