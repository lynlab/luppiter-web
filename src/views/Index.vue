<template>
  <div class="index">
    <div class="panel" v-for="panel in panels" v-bind:key="panel.name">
      <panel-api-key v-if="panel.name === 'api-key'" />
    </div>
  </div>
</template>

<script>
import ApiKeyPanel from './panels/ApiKey.vue';

export default {
  name: 'index',
  components: {
    'panel-api-key': ApiKeyPanel,
  },
  props: {
    panels: Array,
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: calc(100% - 80px);

  .panel {
    margin: 10px auto;
    padding: 30px;
    max-width: 1000px;
    background-color: $color-panel;
    border: $color-border solid 1px;
  }
}
</style>
