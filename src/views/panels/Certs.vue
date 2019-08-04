<template>
  <div class="certs-panel">
    <h1>Certs</h1>

    <h3>TLS 인증서 목록</h3>
    <div class="list-view">
      <div class="cert item" v-for="cert in certs" v-bind:key="cert.uuid">
        <p>
          <strong>{{ cert.domains[0] }}</strong>&nbsp;
          <span v-if="cert.domains.length > 1">(외 {{ cert.domains.length - 1 }}개)</span>&nbsp;
          <span class="tag" v-if="cert.state === 'submitted'">발급 준비중</span>
          <span class="tag" v-if="cert.state === 'intializing'">발급 준비중</span>
          <span class="tag" v-if="cert.state === 'verifying'">도메인 확인중</span>
          <span class="tag" v-if="cert.state === 'issued'">발급 완료</span>
          <span class="tag" v-if="cert.state === 'failed'">발급 실패</span>
          <span class="tag" v-if="cert.state === 'almost_expired'">곧 만료</span>
          <span class="tag" v-if="cert.state === 'expired'">만료</span>
        </p>
      </div>
      <div class="item" @click="modal.createCert.step = 1">
        <p>+ 새로운 인증서 발급하기</p>
      </div>
    </div>

    <modal id="modal-create-cert" v-if="modal.createCert.step" @close="modal.createCert.step = null">
      <div v-if="modal.createCert.step === 1">
        <h2>약관 동의</h2>
        <p>인증서 발급을 위해서는 <a href="https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf" target="_black">Let's Encrypt 이용 약관</a>에 동의해야합니다.</p>
        <div class="form">
          <div class="actions">
            <button class="action primary" @click="modal.createCert.step += 1">동의</button>
          </div>
        </div>
      </div>

      <div v-if="modal.createCert.step === 2">
        <h2>정보 입력</h2>
        <div class="form">
          <input type="text" placeholder="공개 이메일" v-model="modal.createCert.input.email">
          <textarea placeholder="대상 도메인" v-model="modal.createCert.input.domains" />
          <label>
            인증할 도메인을 한 줄에 하나씩 입력하세요.<br>
            예) example.com, *.example.com
          </label>
          <div class="actions">
            <button class="action primary" @click="createCertificate()">다음</button>
          </div>
        </div>
      </div>

      <div v-if="modal.createCert.step === 3">
        <h2>DNS 레코드 등록</h2>
        <p>도메인 소유권 인증을 위해, DNS 서버에 아래와 같이 CNAME 레코드를 등록해주세요.</p>
        <div class="form">
          <label v-for="domain in getRecords(modal.createCert.issueInfo.domains)" v-bind:key="domain">
            CNAME {{ domain }} :<br>
            {{ modal.createCert.issueInfo.dnsToken }}.luppiter.dev
          </label>
          <div class="actions">
            <button class="action primary" @click="load(); modal.createCert.step = null">완료</button>
          </div>
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
      certs: [],
      modal: {
        createCert: { step: null, issueInfo: null, input: { email: '', domains: '' } },
      },
    };
  },
  methods: {
    load() {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/certs/certificates`, opts)
        .then((res) => { this.certs = res.data; })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '인증서 목록을 가져오는 중 오류가 발생했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    createCertificate() {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      const data = {
        email: this.modal.createCert.input.email,
        domains: this.modal.createCert.input.domains.split('\n'),
      };

      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/certs/certificates`, data, opts)
        .then((res) => {
          this.modal.createCert.issueInfo = res.data;
          this.modal.createCert.step += 1;
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '인증서 발급 요청에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    getRecords(domains) {
      return [
        ...new Set(domains.map(d => `_acme-challenge.${d.startsWith('*.') ? d.replace('*.', '') : d}`)),
      ];
    },
  },
  created() {
    this.load();
  },
};
</script>
