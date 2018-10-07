<template>
  <div class="select-box">
    <div class="select" @click="toggle()">
      <p class="selected">{{ selected ? selected : placeholder }}</p>
      <p class="arrow"><i class="material-icons">{{ optionsOpened ? 'arrow_drop_up' : 'arrow_drop_down' }}</i></p>
    </div>
    <div :class="['options', optionsOpened ? 'active' : '' ]">
      <div class="option" v-for="option in options" v-bind:key="option" @click="select(option)">
        <p>{{ option }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectBox',
  props: ['options', 'placeholder'],
  data() {
    return {
      selected: null,
      optionsOpened: false,
    };
  },
  methods: {
    select(selected) {
      this.$emit('select', selected);
      this.optionsOpened = false;
      this.selected = selected;
    },
    toggle() {
      this.optionsOpened = !this.optionsOpened;
    },
  },
};
</script>

<style lang="scss">
.select-box {
  * {
    color: #212121;
    user-select: none;
  }

  .select {
    width: 24em;
    background-color: #fafafa;
    border: none;
    padding: 0 12px;
    color: #212121;
    position: relative;

    p {
      display: inline-block;
      padding: 14px 0;
      margin: 0;
      font-size: 14px;
      line-height: 14px;
    }

    .arrow {
      padding: 9px 0;
      position: absolute;
      right: 8px;
    }
  }

  .options {
    display: none;
    visibility: hidden;
    background-color: #fafafa;
    width: calc(24em + 24px);
    position: absolute;
    z-index: 10;

    .option {
      &:hover {
        background-color: #eeeeee;
      }

      p {
        margin: 0;
        padding: 8px 12px;
        font-size: 14px;
      }

    }

    &.active {
      display: block;
      visibility: visible;
    }
  }
}
</style>
