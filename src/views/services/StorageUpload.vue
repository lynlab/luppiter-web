<template>
  <div id="service-storage-upload">
    <h1>Storage 파일 업로드</h1>

    <h2>파일 선택</h2>
    <input type="file" ref="files" @change="onChange" multiple>

    <h3>선택된 파일</h3>
    <ul>
      <li v-for="select in selects" v-bind:key="select.file.name">
        <span v-if="select.file.size > 10 * 1024 * 1024"><del>{{ select.file.name }} ({{ getFileSizeText(select.file.size) }})</del> 10MB 이상의 파일은 업로드할 수 없습니다.</span>
        <span v-else>{{ select.file.name }} ({{ getFileSizeText(select.file.size) }})</span>
        &nbsp;
        <span v-if="select.result === 'success'"><i class="material-icons">check_circle</i></span>
        <span v-else-if="select.result === 'error'"><i class="material-icons">error_outline</i></span>
      </li>
    </ul>
    <button class="primary-button" @click="upload()">업로드</button>
  </div>
</template>

<script>
import { uploadFile } from '@/services/luppiter-api';

export default {
  data() {
    return {
      selects: [],
    };
  },
  methods: {
    getFileSizeText(size) {
      if (size < 1024 * 1024) {
        return `${Math.round((size / 1024) * 100) / 100} KB`;
      }
      return `${Math.round((size / (1024 * 1024)) * 100) / 100} MB`;
    },
    onChange() {
      this.selects = [...this.$refs.files.files].map(file => ({ file, result: null }));
    },
    upload() {
      this.selects.forEach((select, idx) => {
        const { file } = select;
        if (file.size > 10 * 1024 * 1024 || select.result) {
          return;
        }

        uploadFile(file, this.$route.query.bucket, file.name)
          .then(() => { this.selects[idx].result = 'success'; })
          .catch(() => { this.selects[idx].result = 'error'; });
      });
    },
  },
};
</script>

