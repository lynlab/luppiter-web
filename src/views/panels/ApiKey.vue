<template>
  <div class="api-key-panel">
    <h1>Api Key</h1>
    <h3>API 키 목록</h3>
    <div class="list-view">
      <div class="api-key item" v-for="apiKey in apiKeys" v-bind:key="apiKey.key">
        <p><strong>{{ apiKey.key }}</strong> ({{ apiKey.createdAt | moment('from') }})</p>
        <p><span class="memo">{{ apiKey.memo }}</span></p>
        <p class="actions">
          <span class="action" @click="select(apiKey)">콘솔에서 사용</span>
          <span class="action" @click="delete_(apiKey)">삭제</span>
        </p>
      </div>
      <div class="api-key item" @click="modal.isActive = true">
        <p>+ 새로운 키 발급</p>
      </div>
    </div>

    <modal v-if="modal.isActive" @close="modal.isActive = false">
      <h2>새로운 API 키 발급</h2>
      <div class="form">
        <input type="text" placeholder="키 메모" v-model="modal.input.memo">
        <label>API 키 구분을 위한 50글자 이하의 메모</label>
        <div class="actions">
          <button class="action primary" @click="create()">발급</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiKeys: [],
      modal: {
        isActive: false,
        input: { memo: '' },
      },
    };
  },
  methods: {
    async load() {
      const opts = {
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys`, opts)
        .then((res) => { this.apiKeys = res.data; })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: 'API 키를 가져오는 중 오류가 발생했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    select(apiKey) {
      this.$localStorage.set('luppiter.apiKey', apiKey.key);
      this.$store.commit('setApiKey', apiKey.key);
      this.$notify({
        group: 'luppiter',
        title: 'API 키 선택 완료',
        text: `Luppiter Console에서 API를 호출할 때 ${apiKey.key.slice(0, 8)} 키를 사용합니다.`,
        type: 'success',
      });
    },
    delete_(apiKey) {
      const opts = {
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.delete(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys/${apiKey.key}`, opts)
        .then(() => {
          if (apiKey.key === this.$store.state.apiKey) {
            this.$store.commit('unsetApiKey');
            this.$localStorage.remove('luppiter.apiKey');
          }

          this.$notify({ group: 'luppiter', title: 'API 키 삭제에 성공했습니다.', type: 'success' });
          this.load();
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: 'API 키 삭제에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    create() {
      const data = { memo: this.modal.input.memo };
      const opts = {
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys`, data, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: 'API 키 발급에 성공했습니다.', type: 'success' });
          this.load();
          this.modal.isActive = false;
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: 'API 키 발급에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
  },
  created() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
.api-key {
  .actions {
    padding: 10px 0;
    font-size: $font-size-small;

    .action {
      padding: 2px 10px;
      background-color: $color-button-primary;

      &:hover {
        cursor: pointer;
        background-color: $color-button-primary-dimmed;
      }

      &:not(last-of-type) {
        margin-right: 4px;
      }
    }
  }

  .memo { color: $color-text-dimmed; }
}
</style>
