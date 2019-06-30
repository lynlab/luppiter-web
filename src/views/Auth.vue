<template>
  <div class="auth">
  </div>
</template>

<script>
export default {
  name: 'auth',
  created() {
    if (!this.$route.query.accessToken) {
      const endpoint = `${window.location.protocol}//${window.location.host}`;
      window.location = `https://auth.lynlab.co.kr/web/signin?appId=325fcc52-3c29-46b8-bb33-a30d20abf7c6&redirectUrl=${endpoint}/auth`;
    } else {
      this.$localStorage.set('auth.accessToken', this.$route.query.accessToken);
      this.$localStorage.set('auth.refreshToken', this.$route.query.refreshToken);
      this.$localStorage.set('auth.expireAt', this.$route.query.expireAt);

      this.$router.push({ name: 'index' });
    }
  },
};
</script>
