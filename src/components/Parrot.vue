<template>
  <div class="wrapper" @click="show_parrot">
    <img v-if="!this.is_clicked" />
    <img v-else :src="parrot_info.parrot_name" />
  </div>
</template>
<script>
export default {
  props: {
    is_clicked: Boolean,
    parrot_info: {
      parrot_index: Number,
      parrot_name: String
    }
  },
  data: function() {
    return {};
  },
  methods: {
    show_parrot: function() {
      this.$emit("clicked", this.parrot_info);
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .wrapper {
    width: 120px;
    height: 120px;
    border: medium solid #707070;
  }
}
</style>
