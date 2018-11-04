<template>
  <div id="service-apikey">
    <h1>API Key</h1>
    <table class="themed">
      <tr>
        <th>API Key</th>
        <th>메모</th>
        <th>발급일</th>
        <th>동작</th>
      </tr>
      <tr v-for="key in apiKeys" v-bind:key="key.key">
        <td><code>{{ key.key }}</code></td>
        <td>{{ key.comment }}</td>
        <td>{{ formatDateTime(key.created_at) }}</td>
        <td></td>
      </tr>
    </table>

    <input class="primary-input" type="text" placeholder="API Key 메모" v-model="inputs.comment">
    <button class="primary-button" @click="issueNewKey()">새로운 API Key 발급</button>
  </div>
</template>

<script>
import { query, mutation } from '@/services/luppiter-api';
import moment from 'moment';

export default {
  data() {
    return {
      apiKeys: [],
      inputs: { comment: null },
    };
  },
  methods: {
    formatDateTime(dateTime) {
      return moment.parseZone(dateTime).fromNow();
    },
    issueNewKey() {
      mutation(`createAPIKey(comment:"${this.inputs.comment}"){key,comment,created_at}`, this.$localStorage.get('access_token'))
        .then(data => this.apiKeys.push(data.createAPIKey));
    },
  },
  created() {
    if (!this.$localStorage.get('access_token')) {
      this.$router.push({ name: 'login' });
    }

    query('apiKeyList{key,comment,created_at}', this.$localStorage.get('access_token'))
      .then((data) => { this.apiKeys = data.apiKeyList; });
  },
};
</script>
