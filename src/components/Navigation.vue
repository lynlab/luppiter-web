<template>
  <nav>
    <div class="item" @click="onClickSignIn()" v-if="!isSignedIn">
      <ion-icon class="icon" name="lock"></ion-icon>
      <p class="description">로그인</p>
    </div>
    <div class="item" @click="onClickSignOut()" v-else>
      <ion-icon class="icon" name="lock"></ion-icon>
      <p class="description">로그아웃</p>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isSignedIn: this.$localStorage.get('auth.accessToken') && (parseInt(this.$localStorage.get('auth.expireAt'), 10) > new Date().getTime()),
    };
  },
  methods: {
    onClickSignIn() {
      this.$router.push({ name: 'auth' });
    },
    onClickSignOut() {
      this.$localStorage.remove('auth.accessToken', null);
      this.$localStorage.remove('auth.refreshToken', null);
      this.$localStorage.remove('auth.expireAt', null);

      this.isSignedIn = false;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  height: 100%;
  text-align: center;
  padding: 15px 0;
  width: 80px;
  background-color: $color-panel;

  .item {
    padding: 10px 0;
    a {
      color: $color-text;
      text-decoration: none;
    }

    &:hover {
      cursor: pointer;
      color: $color-text-focus;
    }

    ion-icon.icon {
      font-size: 28px;
    }

    p.description {
      margin: 0;
      font-size: 12px;
    }
  }
}
</style>
