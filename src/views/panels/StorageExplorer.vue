<template>
  <div id="storage-explorer-panel" class="container">
    <h1>파일 목록</h1>
    <div class="list-view">
      <div class="item" v-for="file in files" v-bind:key="file.name">
        <p>
          <a :href="`https://luppiter.dev/storage/${bucketName}/${file.name}`" target="_blank">{{ file.name }}</a>&nbsp;
          <span class="dimmed">({{ Math.round(file.size / 1024) }} KB)</span>
        </p>
        <p class="dimmed">{{ file.updatedAt | moment('from') }}</p>
      </div>
      <div class="item" @click="loadMore()" v-if="hasNext">
        <p>더 불러오기</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      files: [],
      hasNext: true,
    };
  },
  props: {
    bucketName: String,
  },
  methods: {
    load(cursor) {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      let query = '';
      if (cursor) {
        query = `?cursor=${cursor}`;
      }
      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/storage/buckets/${this.bucketName}/files${query}`, opts)
        .then((res) => {
          this.files = this.files.concat(res.data);
          if (res.data.length === 0) {
            this.hasNext = false;
          }
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '파일 목록을 가져오는 중 오류가 발생했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    loadMore() {
      const cursor = Buffer.from(this.files[this.files.length - 1].name).toString('base64');
      this.load(cursor);
    },
  },
  created() {
    this.load();
  },
};
</script>

<style lang="scss">
a {
  color: $color-text;
}
</style>
