<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <div class="font-weight-bold">
            <div class="border-bottom pb-1 mb-2">Self Ranking</div>
            <div v-if="isRankOut">
              <div>Out of Rank!</div>
              <div class="mb-3">Your time is {{ currentResult/1000 }}sec 🤨</div>
            </div>
          </div>
          <ol>
            <li
              v-for="(result, index) in resultList"
              :key="index"
              :class="{
              'border border-primary': result * 1000 === currentResult
            }"
            >
              <div class="d-inline mx-1">{{ result }}</div>
              <div class="d-inline">sec</div>
            </li>
          </ol>
          <button @click="$emit('close')" class="mt-2 btn btn-info">close</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    resultList: null,
    currentResult: null,
    isRankOut: null
  }
};
</script>
<style lang="stylus" scoped>
li {
  line-height: 1.15;
}

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
    width: 250px;
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

@media screen and (min-width: 768px) {
  button {
    font-size: 30px;
  }

  .modal {
    &-window {
      width: 380px;
      font-size: 30px;
    }
  }
}
</style>
