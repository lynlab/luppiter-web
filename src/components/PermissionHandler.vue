<template>
  <div class="permission-handler">
    <SelectBox id="key-select" placeholder="API Key 선택" v-on:select="onSelect" v-bind:options="apiKeys.map(key => { return {key: key.key, text: `${key.key.slice(0, 8)} (${key.comment})`} })"/>
    <div class="toggle-wrapper" v-if="selectedAPIKey">
      <ToggleSwitch v-for="key in apiKeys" v-if="key.key === selectedAPIKey.key" v-bind:key="key.key" :initial-state="hasPermission" v-on:on="addPermission" />
    </div>
  </div>
</template>

<script>
import { query, mutation } from '@/services/luppiter-api';

export default {
  name: 'PermissionHandler',
  props: ['service'],
  data() {
    return {
      apiKeys: [],
      selectedAPIKey: null,
      hasPermission: false,
    };
  },
  methods: {
    onSelect(selectedKey) {
      this.selectedAPIKey = this.apiKeys.find(key => key.key === selectedKey);
      this.hasPermission = (this.selectedAPIKey.permissions.find(p => p.startsWith(`${this.service}::`)) !== undefined);
    },
    addPermission(turnedOn) {
      if (turnedOn) {
        mutation(`addPermissionToAPIKey(key:"${this.selectedAPIKey.key}",permission:"${this.service}::*"){key}`, this.$localStorage.get('access_token'))
          .catch(() => alert('권한 활성화에 실패했습니다.'));
      } else {
        mutation(`removePermissionFromAPIKey(key:"${this.selectedAPIKey.key}",permission:"${this.service}::*"){key}`, this.$localStorage.get('access_token'))
          .catch(() => alert('권한 비활성화에 실패했습니다.'));
      }
    },
  },
  created() {
    query('apiKeyList{key,comment,permissions}', this.$localStorage.get('access_token'))
      .then((data) => { this.apiKeys = data.apiKeyList; });
  },
};
</script>

<style lang="scss">
.permission-handler {
  .select-box {
    float: left;
    margin-bottom: 8px;
  }

  .toggle-wrapper {
    margin-left: 8px;
    float: left;
  }
}
</style>
