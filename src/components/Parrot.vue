<template>
  <div class="wrapper" @click="show_parrot">
    <img v-if="!this.is_clicked" />
    <img v-else :src="parrot_info.parrot" />
  </div>
</template>
<script>
export default {
  props: {
    is_clicked: Boolean,
    parrot_info: {
      parrot_index: Number,
      parrot: String
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
<style>
.wrapper {
  height: 128px;
  width: 128px;
  border: medium solid black;
}
</style>
