<template>
  <div class="toggle-switch" @click="toggle()">
    <div :class="['switch', on ? 'on' : 'off']" >
      <div class="button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: { initialState: Boolean },
  data() { return { on: this.initialState }; },
  methods: {
    toggle() {
      this.on = !this.on;
      this.$emit('on', this.on);
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle-switch {
  .switch {
    height: 42px;
    width: 80px;
    float: left;

    .button {
      margin: 4px;
      height: 34px;
      width: 40px;
      background: #ffffff;
    }

    &.on {
      background: #3F51B5;
      .button { margin-left: 36px; }
    }

    &.off {
      background: #bdbdbd;
    }
  }
}
</style>
