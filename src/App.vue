<template>
  <div id="app">
    <navigation @signout="onSignOut()" />
    <panels />

    <notifications group="luppiter" />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Panels from './components/Panels.vue';

export default {
  components: {
    navigation: Navigation,
    panels: Panels,
  },
  created() {
    const apiKey = this.$localStorage.get('luppiter.apiKey');
    if (apiKey) {
      this.$store.commit('setApiKey', apiKey);
    }

    const accessToken = this.$localStorage.get('auth.accessToken');
    if (accessToken) {
      this.$store.commit('setAccessToken', accessToken);
    }
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

h1, h2 {
  font-weight: normal;
  margin-top: 0;
}

h4 {
  margin-bottom: 0px;
}

a {
  color: $color-text-link;
  text-decoration: none;

  &:hover { text-decoration: underline; }
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

#panels {
  width: calc(100vw - 80px);
}

.vue-notification {
  margin-top: 4px;
  margin-bottom: 0;
}

.dimmed {
  font-size: $font-size-small;
  color: $color-text-dimmed;
}
</style>
