<template>
  <div id="app">
    <navigation @menu="onMenu" @signout="onSignOut()" />
    <router-view :panels="panels" />

    <notifications group="luppiter" />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  components: {
    navigation: Navigation,
  },
  data() {
    return {
      panels: [],
    };
  },
  methods: {
    onMenu(name) {
      if (this.panels.findIndex(panel => panel.name === name) !== -1) {
        return;
      }
      this.panels.push({ name });
    },
    onSignOut() {
      this.panels = [];
    },
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

.vue-notification {
  margin-top: 4px;
  margin-bottom: 0;
}
</style>
