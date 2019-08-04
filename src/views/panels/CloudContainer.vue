<template>
  <div class="cloudcontainer-panel">
    <h1>CloudContainer</h1>

    <h3>태스크 목록</h3>
    <div class="list-view">
      <div class="task item" v-for="task in tasks" v-bind:key="task.uuid">
        <p><strong>{{ task.name }}</strong> ({{ task.image }})</p>
        <p>{{ task.createdAt | moment('from') }}</p>
        <p class="actions">
          <span class="action" @click="runTask(task)">지금 실행</span>
          <span class="action" @click="showUpdateTask(task)">변경</span>
          <span class="action" @click="deleteTask(task)">삭제</span>
        </p>
      </div>
      <div class="item" @click="modal.createTask.mode = 'create'">
        <p>+ 새로운 태스크 만들기</p>
      </div>
    </div>

    <modal id="modal-create-task" v-if="modal.createTask.mode" @close="modal.createTask.mode = null">
      <h2 v-if="modal.createTask.mode === 'create'">새로운 태스크 만들기</h2>
      <h2 v-if="modal.createTask.mode === 'update'">태스크 변경</h2>
      <div class="form">
        <input type="text" placeholder="태스크 이름" v-model="modal.createTask.input.name">
        <label>100글자 이하</label>

        <input type="text" placeholder="Docker 이미지" v-model="modal.createTask.input.image">
        <label>이미지는 immutable 해야합니다.</label>

        <input type="text" placeholder="Docker 커맨드" v-model="modal.createTask.input.commands">
        <label>예시: sh run.sh</label>

        <textarea placeholder="KEY=VALUE" v-model="modal.createTask.input.envs" />
        <label>환경변수를 한 줄에 하나씩 입력해주세요.</label>
        <div class="actions">
          <button v-if="modal.createTask.mode === 'create'" class="action primary" @click="createTask()">만들기</button>
          <button v-if="modal.createTask.mode === 'update'" class="action primary" @click="updateTask()">변경</button>
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
      tasks: [],
      modal: {
        createTask: {
          mode: null,
          taskUuid: null,
          input: {
            name: '', image: '', commands: '', envs: '',
          },
        },
      },
    };
  },
  methods: {
    load() {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.get(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/cloudcontainer/tasks`, opts)
        .then((res) => { this.tasks = res.data; })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '태스크 목록을 가져오는 중 오류가 발생했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    showUpdateTask(task) {
      this.modal.createTask = {
        mode: 'update',
        taskUuid: task.uuid,
        input: {
          name: task.name, image: task.image, commands: task.commands.join(' '), envs: task.envs.join('\n'),
        },
      };
    },
    createTask() {
      const { input } = this.modal.createTask;
      const data = {
        name: input.name,
        image: input.image,
        commands: input.commands.split(' '),
        envs: input.envs.split('\n'),
      };

      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/cloudcontainer/tasks`, data, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '태스크가 생성되었습니다.', type: 'success' });
          this.load();
          this.modal.createTask.mode = false;
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '태스크 생성에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    updateTask() {
      const { input } = this.modal.createTask;
      const data = {
        name: input.name,
        image: input.image,
        commands: input.commands ? input.commands.split(' ') : [],
        envs: input.envs ? input.envs.split('\n') : [],
      };

      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.put(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/cloudcontainer/tasks/${this.modal.createTask.taskUuid}`, data, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '태스크가 변경되었습니다.', type: 'success' });
          this.load();
          this.modal.createTask.mode = null;
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '태스크 변경에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    deleteTask(task) {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.delete(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/cloudcontainer/tasks/${task.uuid}`, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '태스크 삭제에 성공했습니다.', type: 'success' });
          this.load();
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '태스크 삭제에 실패했습니다.',
            text: `Error ${e.response.status} (${e.response.data.error || e.response.data})`,
            type: 'error',
          });
        });
    },
    runTask(task) {
      const opts = { headers: { 'X-Api-Key': this.$store.state.apiKey } };
      axios.post(`${process.env.VUE_APP_LUPPITER_HOST}/vulcan/cloudcontainer/tasks/${task.uuid}/run`, {}, opts)
        .then(() => {
          this.$notify({ group: 'luppiter', title: '태스크 실행 요청에 성공했습니다. 실행 결과는 Logbase에서 확인하실 수 있습니다.', type: 'success' });
          this.load();
        })
        .catch((e) => {
          this.$notify({
            group: 'luppiter',
            title: '태스크 실행에 실패했습니다.',
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
