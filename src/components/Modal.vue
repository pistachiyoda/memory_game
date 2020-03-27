<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <p>self ranking</p>
          <div
            v-for="(result, index) in resultList"
            :key="index"
            :class="{
              'border border-primary': result * 1000 === currentResult
            }"
          >
            <div class="d-inline">{{ index + 1 }}:</div>
            <div class="d-inline mx-1">
              {{ result }}
            </div>
            <div class="d-inline">sec</div>
          </div>
          <button @click="$emit('close')" class="mt-2">close</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    resultList: null,
    currentResult: null
  }
};
</script>
<style lang="stylus" scoped>
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    width: 200px;
  }

  &-content {
    padding: 10px 20px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
}

.modal-window {
transition: opacity 0.4s, transform 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
