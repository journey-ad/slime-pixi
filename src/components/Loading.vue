<template>
  <div class="loading">
    <div class="bounceball"></div>
    <div class="text">加载中 {{ curProg }}%</div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  },
  props: ["curProg"],
  methods: {},
};
</script>

<style lang="stylus" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fefefe;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  color: #fbae17;
  display: inline-block;
  margin-left: 10px;
}

.bounceball {
  position: relative;
  display: inline-block;
  height: 37px;
  width: 15px;

  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fbae17;
    transform-origin: 50%;
    animation: bounce 500ms alternate infinite ease;
  }
}

@keyframes bounce {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }

  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  100% {
    top: 0;
  }
}
</style>