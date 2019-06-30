<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  components: {
    navigation: Navigation,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Spoqa Han Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background-color: $color-background;
  color: $color-text;
}
</style>
