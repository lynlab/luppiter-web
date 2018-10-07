<template>
  <div id="login">
    <h1>로그인</h1>
    <form>
      <p>
        <label>아이디</label><br/>
        <input name="username" type="text" maxlength="255" v-model="input.username">
      </p>
      <p>
        <label>비밀번호</label><br/>
        <input name="password" type="password" v-model="input.password">
      </p>
    </form>
    <p id="error" v-if="error">아이디와 비밀번호를 확인해주세요.</p>
    <button class="primary-button" @click="login()">로그인</button>
    <p>계정이 없으신가요? <router-link :to="{ name: 'register' }">회원가입</router-link></p>
  </div>
</template>

<script>
import { mutation } from '@/services/luppiter-api';

export default {
  name: 'Login',
  data() {
    return {
      input: { username: '', password: '' },
      error: false,
    };
  },
  methods: {
    login() {
      mutation(`createAccessToken(username:"${this.input.username}",password:"${this.input.password}"){token,valid_until}`)
        .then((data) => {
          this.$localStorage.set('access_token', data.createAccessToken.token);
          this.redirect();
        })
        .catch(() => { this.error = true; });
    },
    redirect() {
      if (this.$route.query.callback_url) {
        window.location = (`${this.$route.query.callback_url}?access_token=${this.$localStorage.get('access_token')}`);
      } else {
        this.$router.push({ name: 'home' });
      }
    },
  },
  created() {
    const accessToken = this.$localStorage.get('access_token');
    if (accessToken) {
      this.redirect();
    }
  },
};
</script>

<style lang="scss" scoped>
#login {
  max-width: 320px;
  margin: 0 auto;

  #error {
    color: #f44336;
  }

  input {
    background-color: #212121;
    border: none;
    border-bottom: #757575 1px solid;
    margin: 4px 0;
    width: 100%;
    height: 30px;
    font-size: 16px;

    &:focus {
     border-bottom: #f5f5f5 1px solid;
    }
  }

  button {
    width: 100%;
  }
}
</style>
