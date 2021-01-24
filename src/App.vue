<template>
  <div id="app">
    <SlimePixi />
  </div>
</template>

<script>
import SlimePixi from "./components/SlimePixi.vue";

export default {
  name: "App",
  components: {
    SlimePixi,
  },
};
</script>

<style lang="stylus">
html, body {
  position: fixed;
  overflow: hidden;
}
</style>
