<template>
  <div class="wrapper" @click="show_parrot">
    <img v-if="!this.is_clicked" />
    <img v-else :src="parrotInfo.parrot_name" />
  </div>
</template>
<script>
export default {
  props: {
    is_clicked: Boolean,
    parrotInfo: {
      parrot_index: Number,
      parrot_name: String
    }
  },
  methods: {
    show_parrot() {
      this.$emit("clicked", this.parrotInfo);
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
}

.wrapper {
  width: 70px;
  height: 70px;
  border: medium solid #707070;
}
@media screen and (min-width: 768px) {
  .wrapper {
    width: 120px;
    height: 120px;
    border: medium solid #707070;
  }
}
</style>
