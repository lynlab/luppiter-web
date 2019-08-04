<template>
  <div id="panels">
    <div class="panel" v-for="panel in panels" v-bind:key="panel.name">
      <ion-icon class="close-btn" name="close" @click="$emit('destroy', panel)"></ion-icon>

      <panel-api-key v-if="panel.name === 'api-key'" />
      <panel-certs v-if="panel.name === 'certs'" />
      <panel-cloudcontainer v-if="panel.name === 'cloudcontainer'" />
      <panel-storage v-if="panel.name === 'storage'" />
    </div>

    <router-view />
  </div>
</template>

<script>
import ApiKeyPanel from '../views/panels/ApiKey.vue';
import StoragePanel from '../views/panels/Storage.vue';
import CertsPanel from '../views/panels/Certs.vue';
import CloudContainerPanel from '../views/panels/CloudContainer.vue';

export default {
  name: 'index',
  components: {
    'panel-api-key': ApiKeyPanel,
    'panel-certs': CertsPanel,
    'panel-cloudcontainer': CloudContainerPanel,
    'panel-storage': StoragePanel,
  },
  props: {
    panels: Array,
  },
};
</script>

<style lang="scss" scoped>
#panels {
  width: 100%;
  display: flex;
  overflow-x: scroll;

  .panel {
    margin: 10px 5px;
    padding: 30px;
    width: 480px;
    min-width: 400px;
    background-color: $color-panel;
    border: $color-border solid 1px;

    &:first-of-type { margin-left: 10px; }

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
