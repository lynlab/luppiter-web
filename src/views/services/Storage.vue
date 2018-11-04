<template>
  <div id="service-storage">
    <h1>Storage</h1>
    <p>Storage 데이터를 관리합니다.</p>

    <h3>API Key 활성화</h3>
    <PermissionHandler v-bind:service="'Storage'" v-on:change="onChange"/>

    <h3>Bucket 관리</h3>
    <p v-if="!hasPermission">이 API Key에는 Bucket에 접근할 권한이 없습니다.</p>
    <div v-else>
      <table class="themed">
        <tr>
          <th>이름</th>
          <th>UUID</th>
          <th>공개여부</th>
          <th>동작</th>
        </tr>
        <tr v-for="bucket in buckets" v-bind:key="bucket.uuid">
          <td>{{ bucket.name }}</td>
          <td>{{ bucket.uuid }}</td>
          <td>{{ bucket.isPublic ? '공개' : '비공개' }}</td>
          <td><a :href="`/services/storage/upload?bucket=${bucket.name}&apiKey=${apiKey}`"><i class="material-icons">cloud_upload</i></a></td>
        </tr>
      </table>

      <input class="primary-input" type="text" placeholder="이름 입력" v-model="inputs.bucketName">
      <button class="primary-button" @click="createNewBucket()">Bucket 만들기</button>
    </div>
  </div>
</template>

<script>
import { apiQuery, apiMutation } from '@/services/luppiter-api';

export default {
  data() {
    return {
      buckets: [],
      apiKey: null,
      hasPermission: false,
      inputs: {
        bucketName: null,
      },
    };
  },
  methods: {
    onChange(apiKey, hasPermission) {
      this.apiKey = apiKey;
      this.hasPermission = hasPermission;
      if (!hasPermission) {
        this.hasPermission = false;
        return;
      }

      this.hasPermission = true;
      apiQuery('storageBuckets{uuid name isPublic}', apiKey).then((data) => {
        this.buckets = data.storageBuckets;
      });
    },
    createNewBucket() {
      apiMutation(`createStorageBucket(name:"${this.inputs.bucketName}"){uuid}`, this.apiKey).then(() => {
        this.onChange(this.apiKey, this.hasPermission);
      });
    },
  },
  created() {
    if (!this.$localStorage.get('access_token')) {
      this.$router.push({ name: 'login' });
    }
  },
};
</script>
