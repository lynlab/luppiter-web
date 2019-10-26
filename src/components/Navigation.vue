  <template>
  <nav>
    <div class="item" @click="onClickSignIn()" v-if="!$store.state.accessToken">
      <ion-icon class="icon" name="contact"></ion-icon>
      <p class="description">로그인</p>
    </div>
    <div class="item" @click="onClickSignOut()" v-else>
      <ion-icon class="icon" name="contact"></ion-icon>
      <p class="description">로그아웃</p>
    </div>
    <div class="item" @click="$store.commit('addPanel', { name: 'api-key' })" v-if="$store.state.accessToken">
      <ion-icon class="icon" name="key"></ion-icon>
      <p class="description">{{ $store.state.apiKey ? $store.state.apiKey.slice(0, 8) : 'API Keys' }}</p>
    </div>

    <template v-if="$store.state.accessToken">
      <hr>

      <div class="item" @click="$store.commit('addPanel', { name: 'storage' })">
        <ion-icon class="icon" name="filing"></ion-icon>
        <p class="description">Storage</p>
      </div>

      <hr>

      <div class="item" @click="$store.commit('addPanel', { name: 'certs' })">
        <ion-icon class="icon" name="lock"></ion-icon>
        <p class="description">Certs</p>
      </div>

      <hr>

      <div class="item" @click="$store.commit('addPanel', { name: 'hosting' })">
        <ion-icon class="icon" name="globe"></ion-icon>
        <p class="description">Hosting</p>
      </div>
      <div class="item" @click="$store.commit('addPanel', { name: 'cloudcontainer' })">
        <ion-icon class="icon" name="cube"></ion-icon>
        <p class="description">Container</p>
      </div>
    </template>
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
      this.$store.commit('removeAllPanels');

      this.$localStorage.remove('auth.accessToken');
      this.$localStorage.remove('auth.refreshToken');
      this.$localStorage.remove('auth.expireAt');
      this.$store.commit('unsetAccessToken');

      this.$localStorage.remove('luppiter.apiKey');
      this.$store.commit('unsetApiKey');

      this.isSignedIn = false;

      this.$store.commit('signout');
      this.$notify({ group: 'luppiter', title: '로그아웃에 성공했습니다. 또 만나요!', type: 'success' });
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
      color: $color-text-dimmed;
    }

    ion-icon.icon {
      font-size: 28px;
    }

    p.description {
      margin: 0;
      font-size: 12px;
    }
  }

  hr {
    margin: 5px 10px;
    border: 0;
    border-top: solid $color-border 1px;
  }
}
</style>
