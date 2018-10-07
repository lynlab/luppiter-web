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
      <p>
        <label>비밀번호 (확인)</label><br/>
        <input name="passwordCheck" type="password" v-model="input.passwordCheck">
      </p>
      <p>
        <label>이메일</label><br/>
        <input name="email" type="email" v-model="input.email">
      </p>
    </form>
    <p id="error" v-if="error && error.length > 0">{{ error }}</p>
    <button class="primary-button" @click="register()">가입</button>
  </div>
</template>

<script>
import { mutation } from '@/services/luppiter-api';

export default {
  name: 'Register',
  data() {
    return {
      input: {
        username: '', password: '', passwordCheck: '', email: '',
      },
      error: null,
    };
  },
  methods: {
    register() {
      if (this.input.password !== this.input.passwordCheck) {
        this.error = '비밀번호와 확인이 일치하지 않습니다.';
        return;
      }

      mutation(`createUser(username:"${this.input.username}",password:"${this.input.password}",email:"${this.input.email}",redirection_url:"https://luppiter.lynlab.co.kr/web/login"){uuid}`)
        .then(() => this.$router.push({ name: 'login' }))
        .catch(() => { this.error = '가입에 실패했습니다. 이미 가입된 계정은 아닌지 확인해주세요.'; });
    },
  },
  created() {
    if (this.$localStorage.get('access_token')) {
      this.$router.push({ name: 'home' });
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
