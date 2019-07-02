/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: null,
    accessToken: null,
    accessTokenExpireAt: -1,
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
  },
});
