<template>
  <div class="api-key-panel">
    <h1>Api Key</h1>
    <h3>API 키 목록</h3>
    <div class="list-view">
      <div class="api-key item" v-for="apiKey in apiKeys" v-bind:key="apiKey.key">
        <p><strong>{{ apiKey.key }}</strong> ({{ apiKey.createdAt | moment('from') }})</p>
        <p><span class="memo">{{ apiKey.memo }}</span></p>
        <p class="actions">
          <span class="action" @click="selectKey(apiKey)">콘솔에서 사용</span>
          <span class="action" @click="modal.permissions.data.targetKey = apiKey; modal.permissions.isActive = true">권한 관리</span>
          <span class="action" @click="deleteKey(apiKey)">삭제</span>
        </p>
      </div>
      <div class="api-key item" @click="modal.newKey.isActive = true">
        <p>+ 새로운 키 발급</p>
      </div>
    </div>

    <modal v-if="modal.newKey.isActive" @close="modal.newKey.isActive = false">
      <h2>새로운 API 키 발급</h2>
      <div class="form">
        <input type="text" placeholder="키 메모" v-model="modal.newKey.input.memo">
        <label>API 키 구분을 위한 50글자 이하의 메모</label>
        <div class="actions">
          <button class="action primary" @click="create()">발급</button>
        </div>
      </div>
    </modal>

    <modal id="permissions-modal" v-if="modal.permissions.isActive" @close="modal.permissions.isActive = false">
      <h2>권한 관리</h2>
      <div class="form">
        <input type="text" placeholder="권한 검색" v-model="modal.permissions.input.query" @keydown="loadPermissions()">
      </div>
      <div class="list-view">
        <div class="item" v-for="permission in modal.permissions.data.queryResult" v-bind:key="permission.key + '-' + state">
          <p>
            {{ permission.key }}
            <span class="action right"
              @click="addPermission(modal.permissions.data.targetKey, permission)"
              v-if="modal.permissions.data.targetKey.permissions.findIndex(p => p.key === permission.key) === -1">
                추가
            </span>
            <span class="action right"
              @click="removePermission(modal.permissions.data.targetKey, permission)"
              v-else>
                제거
            </span>
          </p>
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
      state: 0,
      apiKeys: [],
      modal: {
        newKey: { isActive: false, input: { memo: '' } },
        permissions: {
          isActive: false,
          input: { query: '' },
          data: { targetKey: {}, queryResult: [] },
        },
      },
    };
  },
  methods: {
    notifySuccess(title, text) {
      const opts = { group: 'luppiter', title, type: 'success' };
      if (text) {
        opts.text = text;
      }

      this.$notify(opts);
    },
    notifyError(title, text) {
      const opts = { group: 'luppiter', title, type: 'error' };
      if (text) {
        opts.text = text;
      }

      this.$notify(opts);
    },
    async load() {
      const opts = {
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys`, opts)
        .then((res) => { this.apiKeys = res.data; })
        .catch((e) => {
          this.notifyError(
            'API 키를 가져오는 중 오류가 발생했습니다.',
            `Error ${e.response.statbuttonus} (${e.response.data.error || e.response.data})`,
          );
        });
    },
    selectKey(apiKey) {
      this.$localStorage.set('luppiter.apiKey', apiKey.key);
      this.$store.commit('setApiKey', apiKey.key);
      this.notifySuccess(
        'API 키 선택 완료',
        `Luppiter Console에서 API를 호출할 때 ${apiKey.key.slice(0, 8)} 키를 사용합니다.`,
      );
    },
    deleteKey(apiKey) {
      const opts = {
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.delete(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys/${apiKey.key}`, opts)
        .then(() => {
          if (apiKey.key === this.$store.state.apiKey) {
            this.$store.commit('unsetApiKey');
            this.$localStorage.remove('luppiter.apiKey');
          }

          this.notifySuccess('API 키 삭제에 성공했습니다.');
          this.load();
        })
        .catch((e) => {
          this.notifyError(
            'API 키를 가져오는 중 오류가 발생했습니다.',
            `Error ${e.response.statbuttonus} (${e.response.data.error || e.response.data})`,
          );
        });
    },
    create() {
      const data = { memo: this.modal.newKey.input.memo };
      const opts = {
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys`, data, opts)
        .then(() => {
          this.notifySuccess('API 키 발급에 성공했습니다.');
          this.load();
          this.modal.newKey.isActive = false;
        })
        .catch((e) => {
          this.notifyError(
            'API 키 발급에 실패했습니다.',
            `Error ${e.response.statbuttonus} (${e.response.data.error || e.response.data})`,
          );
        });
    },
    loadPermissions() {
      const { query } = this.modal.permissions.input;
      if (!query || query.length < 2) {
        return;
      }

      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/permissions?query=${query}`).then((res) => {
        this.modal.permissions.data.queryResult = res.data;
      });
    },
    addPermission(key, permission) {
      const data = { key: permission.key };
      const opts = {
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys/${key.key}/permissions`, data, opts)
        .then((res) => {
          this.modal.permissions.data.targetKey.permissions = res.data;
          this.version += 1;
          this.notifySuccess('권한을 추가했습니다.');
        })
        .catch((e) => {
          this.notifyError(
            '권한 추가에 실패했습니다.',
            `Error ${e.response.statbuttonus} (${e.response.data.error || e.response.data})`,
          );
        });
    },
    removePermission(key, permission) {
      const data = { key: permission.key };
      const opts = {
        data,
        headers: { Authorization: `Bearer ${this.$localStorage.get('auth.accessToken')}` },
      };

      axios.delete(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/api_keys/${key.key}/permissions`, opts)
        .then((res) => {
          this.modal.permissions.data.targetKey.permissions = res.data;
          this.version += 1;
          this.notifySuccess('권한을 제거했습니다.');
        })
        .catch((e) => {
          this.notifyError(
            '권한 제거에 실패했습니다.',
            `Error ${e.response.statbuttonus} (${e.response.data.error || e.response.data})`,
          );
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

#permissions-modal {
  span.right {
    float: right;
    padding: 2px 10px;
    background-color: $color-button-primary;
    font-size: $font-size-small;

    &:hover {
      cursor: pointer;
      background-color: $color-button-primary-dimmed;
    }

    &:not(last-of-type) {
      margin-right: 4px;
    }
  }
}
</style>
