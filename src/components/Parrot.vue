<template>
  <div class="wrapper" @click="show_parrot">
    <img v-if="!this.is_clicked" />
    <img v-else :src="parrot" />
  </div>
</template>
<script>
export default {
  props: {
    parrot: String
  },
  data: function() {
    return {
      is_clicked: false
    };
  },
  methods: {
    show_parrot: function() {
      const self = this;
      this.is_clicked = true;
      window.setTimeout(function() {
        self.is_clicked = false;
      }, 2000);
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
