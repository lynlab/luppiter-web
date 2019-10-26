/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: null,
    accessToken: null,
    accessTokenExpireAt: -1,
    panels: [],
  },
  mutations: {
    setApiKey(state, key) {
      state.apiKey = key;
    },
    unsetApiKey(state) {
      state.apiKey = null;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    unsetAccessToken(state) {
      state.accessToken = null;
    },
    addPanel(state, { name, payload }) {
      if (state.panels.findIndex(panel => panel.name === name) === -1) {
        state.panels.push({ name, payload });
      }
    },
    removePanel(state, name) {
      state.panels = state.panels.filter(panel => panel.name !== name);
    },
    removeAllPanels(state) {
      state.panels = [];
    },
  },
});
