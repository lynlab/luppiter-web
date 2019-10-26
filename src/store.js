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
    addPanel(state, key) {
      if (state.panels.findIndex(k => k === key) === -1) {
        state.panels.push(key);
      }
    },
    removePanel(state, key) {
      state.panels = state.panels.filter(k => k !== key);
    },
    removeAllPanels(state) {
      state.panels = [];
    },
  },
});
