<template>
  <div id="app">
    <transition name="fade">
      <Loading :curProg="curProg" v-if="curProg < 100 || !loaded" />
    </transition>
    <SlimePixi />
  </div>
</template>

<script>
import Loading from "./components/Loading";

export default {
  name: "App",
  data() {
    return {
      curProg: 0,
      loaded: false,
    };
  },
  created() {
    this.$bus.$on("PRELOAD", (progress) => {
      this.curProg = progress;
    });
    this.$bus.$on("LOADED", (flag) => {
      this.loaded = flag;
    });
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  components: {
    Loading,
    SlimePixi: () => import(/* webpackChunkName: "slime-pixi" */ "./components/SlimePixi"),
  },
};
</script>

<style lang="stylus">
html, body {
  position: fixed;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.6s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
