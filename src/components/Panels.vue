<template>
  <div id="panels">
    <div class="panel" v-for="panel in panels" v-bind:key="panel">
      <ion-icon class="close-btn" name="close" @click="$store.commit('removePanel', panel)"></ion-icon>

      <panel-api-key v-if="panel === 'api-key'" />
      <panel-certs v-if="panel === 'certs'" />
      <panel-cloudcontainer v-if="panel === 'cloudcontainer'" />
      <panel-hosting v-if="panel === 'hosting'" />
      <panel-storage v-if="panel === 'storage'" />
    </div>

    <router-view />
  </div>
</template>

<script>
import ApiKeyPanel from '../views/panels/ApiKey.vue';
import CertsPanel from '../views/panels/Certs.vue';
import CloudContainerPanel from '../views/panels/CloudContainer.vue';
import HostingPanel from '../views/panels/Hosting.vue';
import StoragePanel from '../views/panels/Storage.vue';

export default {
  name: 'index',
  computed: {
    panels() {
      return this.$store.state.panels;
    },
  },
  components: {
    'panel-api-key': ApiKeyPanel,
    'panel-certs': CertsPanel,
    'panel-cloudcontainer': CloudContainerPanel,
    'panel-hosting': HostingPanel,
    'panel-storage': StoragePanel,
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
    min-width: 480px;
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
