<script>
import { mutation } from '@/services/luppiter-api';

export default {
  name: 'Activate',
  created() {
    mutation(`activateUser(activationToken:"${this.$route.query.activation_token}"){uuid}`)
      .then(() => this.$router.push({ name: 'login' }))
      .catch(() => {
        alert('활성화에 실패했습니다.');
        this.$router.push({ name: 'login' });
      });
  },
};
</script>
