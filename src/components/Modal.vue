<template>
  <div class="modal">
    <div class="content">
      <ion-icon class="close-btn" name="close" @click="$emit('close')"></ion-icon>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: $color-dim;

  .content {
    background-color: $color-panel;
    border: $color-border solid 1px;
    margin: 10vh auto;
    padding: 20px;
    width: 360px;

    .close-btn {
      float: right;
      margin-right: -5px;
      font-size: 20px;

      &:hover { cursor: pointer; }
    }
  }
}
</style>
