<template>
  <div class="storage-panel">
    <h1>Storage</h1>

    <h3>버킷 목록</h3>
    <div class="list-view">
      <div class="bucket item" v-for="bucket in buckets" v-bind:key="bucket.name">
        <p>
          <strong>{{ bucket.name }}</strong> ({{ bucket.createdAt | moment('from') }})
          <span class="tag" v-if="bucket.isPublic"><ion-icon name="unlock"></ion-icon> 공개</span>
          <span class="tag" v-else><ion-icon name="lock"></ion-icon> 비공개</span>
        </p>
        <p class="actions">
          <span class="action" @click="deleteBucket(bucket)">삭제</span>
          <span class="action" @click="modal.updateBucket.input.bucket = bucket; modal.updateBucket.isActive = true" v-if="!bucket.isPublic">공개로 전환</span>
        </p>
      </div>
      <div class="item" @click="modal.createBucket.isActive = true">
        <p>+ 새로운 버킷 만들기</p>
      </div>
    </div>

    <modal id="modal-create-bucket" v-if="modal.createBucket.isActive" @close="modal.createBucket.isActive = false">
      <h2>새로운 버킷 만들기</h2>
      <div class="form">
        <input type="text" placeholder="버킷 이름" v-model="modal.createBucket.input.name">
        <label>100글자 이하 (버킷 이름은 URL에 사용됩니다.)</label>
        <div class="actions">
          <button class="action primary" @click="createBucket()">생성</button>
        </div>
      </div>
    </modal>

    <modal id="modal-create-bucket" v-if="modal.updateBucket.isActive" @close="modal.updateBucket.isActive = false">
      <h2>버킷을 공개로 전환</h2>
      <p>{{ modal.updateBucket.input.bucket.name }} 버킷을 공개로 전환하시겠습니까? 공개된 버킷은 <strong>다시 비공개로 전환할 수 없습니다.</strong></p>
      <div class="form">
        <div class="actions">
          <button class="action primary" @click="updateBucket(modal.updateBucket.input.bucket, { isPublic: true })">전환</button>
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
      buckets: [],
      modal: {
        createBucket: { isActive: false, input: { name: '', isPublic: false } },
        updateBucket: { isActive: false, input: { bucket: null } },
      },
    };
  },
  methods: {
    load() {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/storage/buckets`, opts)
        .then((res) => { this.buckets = res.data; })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '버킷 목록을 가져오는 중 오류가 발생했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    createBucket() {
      const data = this.modal.createBucket.input;
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/storage/buckets`, data, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '버킷이 생성되었습니다.', type: 'success' });
          this.load();
          this.modal.createBucket.isActive = false;
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '버킷 추가에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    updateBucket(bucket, data) {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.put(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/storage/buckets/${this.modal.updateBucket.input.bucket.name}`, data, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '버킷이 생성되었습니다.', type: 'success' });
          this.load();
          this.modal.updateBucket.isActive = false;
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '버킷 추가에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    deleteBucket(bucket) {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.delete(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/storage/buckets/${bucket.name}`, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '버킷 삭제에 성공했습니다.', type: 'success' });
          this.load();
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '버킷 삭제에 실패했습니다.',
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
.bucket {
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
}
</style>
