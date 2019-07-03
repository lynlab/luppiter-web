<template>
  <div class="index">
    <div class="panel" v-for="panel in panels" v-bind:key="panel.name">
      <ion-icon class="close-btn" name="close" @click="$emit('destroy', panel)"></ion-icon>

      <panel-api-key v-if="panel.name === 'api-key'" />
      <panel-storage v-if="panel.name === 'storage'" />
    </div>

    <router-view />
  </div>
</template>

<script>
import ApiKeyPanel from '../views/panels/ApiKey.vue';
import StoragePanel from '../views/panels/Storage.vue';

export default {
  name: 'index',
  components: {
    'panel-api-key': ApiKeyPanel,
    'panel-storage': StoragePanel,
  },
  props: {
    panels: Array,
  },
};
</script>

<style lang="scss" scoped>
.index {
  overflow-y: scroll;
  width: calc(100% - 80px);

  .panel {
    margin: 10px auto;
    padding: 30px;
    max-width: 1000px;
    background-color: $color-panel;
    border: $color-border solid 1px;

    .close-btn {
      float: right;
      margin-top: -10px;
      margin-right: -10px;
      font-size: 30px;

      &:hover { cursor: pointer; }
    }
  }
}
</style>
