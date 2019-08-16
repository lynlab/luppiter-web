<template>
  <div class="hosting-panel">
    <h1>Hosting</h1>

    <h3>인스턴스 목록</h3>
    <div class="list-view">
      <div class="instance item" v-for="instance in instances" v-bind:key="instance.uuid">
        <p><strong>{{ instance.name }}</strong> ({{ instance.createdAt | moment('from') }})</p>
        <p>도메인: {{ instance.domain }}</p>
        <p>CNAME: {{ instance.domainCname }}</p>
        <div class="actions">
          <span class="action" @click="deleteInstance(instance)">삭제</span>
        </div>
      </div>
      <div class="item" @click="showCreateInstance()">
        <p>+ 새로운 인스턴스 만들기</p>
      </div>
    </div>

    <modal id="modal-create-instance" v-if="modal.createInstance.isActive" @close="modal.createInstance.isActive = false">
      <h2>새로운 인스턴스 만들기</h2>
      <h4>인스턴스 설정</h4>
      <div class="form">
        <input type="text" placeholder="인스턴스 이름" v-model="modal.createInstance.input.name">
      </div>

      <h4>도메인 설정</h4>
      <div class="form">
        <input type="text" placeholder="호스팅 도메인 (CNAME)" v-model="modal.createInstance.input.domain">
      </div>
      <v-select v-model="modal.createInstance.input.certificateUuid"
                :options="modal.createInstance.certs"
                :reduce="cert => cert.uuid" />

      <h4>백엔드 설정</h4>
      <v-select v-model="modal.createInstance.input.backendProps.bucketName" :options="modal.createInstance.buckets" />
      <div class="form">
        <input type="text" placeholder="Luppiter Storage Prefix" v-model="modal.createInstance.input.backendProps.filePrefix">
        <div class="pretty p-default checkbox">
          <input type="checkbox" v-model="modal.createInstance.input.backendProps.redirectToIndex">
          <div class="state p-primary label">
            <label>SPA 설정 (index.html 리다이렉트)</label>
          </div>
        </div>
        <div class="actions">
          <button class="action primary" @click="createInstance()">만들기</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import 'vue-select/dist/vue-select.css';

export default {
  data() {
    return {
      instances: [],
      modal: {
        createInstance: {
          isActive: false,
          certs: [],
          buckets: [],
          input: {
            name: '',
            domain: null,
            certificateUuid: '',
            backendType: 'storage',
            backendProps: { bucketName: '', filePrefix: '', redirectToIndex: false },
          },
        },
      },
    };
  },
  methods: {
    load() {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/hosting/instances`, opts)
        .then((res) => { this.instances = res.data; })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '인스턴스 목록을 가져오는 중 오류가 발생했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    async showCreateInstance() {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      let certs;
      let buckets;
      try {
        certs = await axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/certs/certificates`, opts);
        buckets = await axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/storage/buckets`, opts);
      } catch (e) {
        this.$notify({
          group: 'luppiter',
          title: '정보를 가져오는 중 오류가 발생했습니다.',
          text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
          type: 'error',
        });
        return;
      }

      this.modal.createInstance.buckets = buckets.data.filter(bucket => bucket.isPublic).map(bucket => bucket.name);
      this.modal.createInstance.certs = certs.data.filter(cert => cert.state === 'issued').map((cert) => {
        const label = cert.domains.length > 1 ? `${cert.domains[0]} 외 ${cert.domains.length - 1}개` : cert.domains[0];
        return { label, uuid: cert.uuid };
      });

      this.modal.createInstance.isActive = true;
    },
    createInstance() {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      const data = this.modal.createInstance.input;
      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/hosting/instances`, data, opts)
        .then(() => {
          this.$notify({
            group: 'luppiter',
            title: '인스턴스가 생성되었습니다.',
            text: '발급된 DNS는 전파에 최대 24시간이 소요될 수 있습니다.',
            type: 'success',
          });
          this.load();
          this.modal.createInstance.isActive = false;
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '인스턴스 생성에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    deleteInstance(instance) {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.delete(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/hosting/instances/${instance.uuid}`, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '인스턴스 삭제에 성공했습니다.', type: 'success' });
          this.load();
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '인스턴스 삭제에 실패했습니다.',
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
