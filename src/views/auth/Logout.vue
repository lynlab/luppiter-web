<template>
  <p>Redirecting...</p>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$localStorage.set('access_token', '');
    this.$router.push({ name: 'home' });
  },
};
</script>
