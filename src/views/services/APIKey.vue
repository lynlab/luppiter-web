<template>
  <div id="service-apikey">
    <h1>API Key</h1>
    <table>
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
    query('apiKeyList{key,comment,created_at}', this.$localStorage.get('access_token'))
      .then((data) => { this.apiKeys = data.apiKeyList; });
  },
};
</script>


<style scoped lang="scss">
#service-apikey {
  table {
    margin-bottom: 20px;
    border: 1px solid #424242;
    width: 100%;
  }

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
</style>
