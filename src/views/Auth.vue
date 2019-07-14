<template>
  <div class="auth">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'auth',
  created() {
    if (!this.$route.query.accessToken) {
      const endpoint = `${window.location.protocol}//${window.location.host}`;
      window.location = `https://auth.lynlab.co.kr/web/signin?appId=325fcc52-3c29-46b8-bb33-a30d20abf7c6&redirectUrl=${endpoint}/auth`;
      return;
    }

    const { accessToken, refreshToken, expireAt } = this.$route.query;
    const opts = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/auth/me`, opts)
      .then(() => {
        this.$localStorage.set('auth.accessToken', accessToken);
        this.$localStorage.set('auth.refreshToken', refreshToken);
        this.$localStorage.set('auth.expireAt', expireAt);

        this.$store.commit('setAccessToken', accessToken);
      })
      .catch((e) => {
        this.$notify({
          group: 'luppiter',
          title: '로그인에 실패했습니다.',
          text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
          type: 'error',
        });
      })
      .finally(() => this.$router.push({ name: 'index' }));
  },
};
</script>
