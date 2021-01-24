<template>
  <div class="SlimePIXI">
    <transition name="fade">
      <Loading :curProg="curProg" v-if="curProg < 100 || !loaded" />
    </transition>
    <canvas id="webglCanvas" ref="webglCanvas"></canvas>
  </div>
</template>

<script>
// import * as PIXI from "pixi.js";
// import "@/lib/pixi-spine";
import Loading from "./Loading";
import Stats from "stats.js";
import { TweenMax, Power0 } from "gsap";
const Scroller = require("@/lib/Scroller.js");
let objScroller = null;

import {
  CONTENT_MANIFEST,
  MAIN_SCENE,
  SPINE_MANIFEST,
  ANIMATION_LIST_MAP,
  ENENT_HANDLER_MAP,
} from "@/assets/manifest";

const DECOR_STATIC_MAP = {
  15: "101",
  16: "102",
  17: "103",
  18: "104",
  19: "105",
  20: "106",
  21: "107",
  22: "108",
  23: "110",
  24: "109",
  25: "37",
  26: "78",
};
const ALL_DECOR_LIST = [
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
];
const VIST_LIST = [
  {
    id: "8",
    desc: "丘丘人*2",
    animationList: [
      {
        animationId: "57",
        desc: "与装饰物 烤肉架 -> 烤猪肉",
        occupySlime: null,
        occupyDecorate: "15",
      },
      {
        animationId: "58",
        desc: "与装饰物 烤肉架 -> 拷鸽子肉",
        occupySlime: null,
        occupyDecorate: "15",
      },
      {
        animationId: "59",
        desc: "与入住 草史莱姆、装饰 花瓶 -> 浇水",
        occupySlime: "4",
        occupyDecorate: "19",
      },
    ],
  },
  {
    id: "9",
    desc: "爆弹丘丘人",
    animationList: [
      {
        animationId: "60",
        desc: "与入住 火史莱姆 -> 小憩",
        occupySlime: "2",
        occupyDecorate: null,
      },
      {
        animationId: "61",
        desc: "与入住 火史莱姆 -> 待机",
        occupySlime: "2",
        occupyDecorate: null,
      },
    ],
  },
  {
    id: "10",
    desc: "炽热骗骗花",
    animationList: [
      {
        animationId: "64",
        desc: "与入住 草史莱姆、装饰 花瓶 -> 灭火",
        occupySlime: "4",
        occupyDecorate: "19",
      },
    ],
  },
  {
    id: "11",
    desc: "雷箭丘丘人",
    animationList: [
      {
        animationId: "67",
        desc: "与装饰物 箭靶 -> 打靶",
        occupySlime: "1",
        occupyDecorate: "18",
      },
    ],
  },
  {
    id: "12",
    desc: "幼岩龙蜥",
    animationList: [
      {
        animationId: "68",
        desc: "与装饰物 标本 -> 模仿",
        occupySlime: null,
        occupyDecorate: "24",
      },
      {
        animationId: "69",
        desc: "与岩史莱姆 -> 睡觉",
        occupySlime: "5",
        occupyDecorate: null,
      },
    ],
  },
  {
    id: "13",
    desc: "风魔龙",
    animationList: [
      {
        animationId: "70",
        desc: "眨眼睛",
        occupySlime: null,
        occupyDecorate: null,
      },
    ],
  },
  {
    id: "14",
    desc: "大伟丘+丘丘人*2",
    animationList: [
      {
        animationId: "71",
        desc: "自己躺着",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "73",
        desc: "与装饰物 舞台 -> idol 动作（带上丘丘人*2）",
        occupySlime: null,
        occupyDecorate: "27",
      },
    ],
  },
];
const SLIME_LIST = [
  {
    id: "1",
    desc: "水史莱姆",
    animationList: [
      {
        animationId: "39",
        desc: "待机",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "40",
        desc: "走动",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "46",
        desc: "与同类 雷史莱姆 -> 雷水打架",
        occupySlime: "6",
        occupyDecorate: null,
      },
    ],
  },
  {
    id: "2",
    desc: "火史莱姆",
    animationList: [
      {
        animationId: "41",
        desc: "待机",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "42",
        desc: "走动",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "74",
        desc: "与装饰 大煮锅 -> 泡澡",
        occupySlime: null,
        occupyDecorate: "16",
      },
      {
        animationId: "45",
        desc: "与同类 雷史莱姆 -> 雷火打架",
        occupySlime: "6",
        occupyDecorate: null,
      },
    ],
  },
  {
    id: "3",
    desc: "冰史莱姆",
    animationList: [
      {
        animationId: "47",
        desc: "待机",
        occupySlime: null,
        occupyDecorate: "17",
      },
      {
        animationId: "48",
        desc: "走动",
        occupySlime: null,
        occupyDecorate: "17",
      },
    ],
  },
  {
    id: "4",
    desc: "草史莱姆",
    animationList: [
      {
        animationId: "49",
        desc: "与装饰 花瓶 -> 待机",
        occupySlime: null,
        occupyDecorate: "19",
      },
      {
        animationId: "84",
        desc: "与装饰 留声机 -> 听歌",
        occupySlime: null,
        occupyDecorate: "25",
      },
    ],
  },
  {
    id: "5",
    desc: "岩史莱姆",
    animationList: [
      {
        animationId: "54",
        desc: "待机",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "55",
        desc: "走动",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "82",
        desc: "与装饰物 蹦床 -> 跳动",
        occupySlime: null,
        occupyDecorate: "22",
      },
      {
        animationId: "83",
        desc: "与装饰物 岩窝 -> 躲起来",
        occupySlime: null,
        occupyDecorate: "21",
      },
    ],
  },
  {
    id: "6",
    desc: "雷史莱姆",
    animationList: [
      {
        animationId: "43",
        desc: "待机",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "44",
        desc: "走动",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "75",
        desc: "与装饰 发电机 -> 发电联动",
        occupySlime: null,
        occupyDecorate: "20",
      },
    ],
  },
  {
    id: "7",
    desc: "风史莱姆",
    animationList: [
      {
        animationId: "52",
        desc: "待机",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "53",
        desc: "走动",
        occupySlime: null,
        occupyDecorate: null,
      },
      {
        animationId: "79",
        desc: "与装饰物 热气球 -> 休息",
        occupySlime: null,
        occupyDecorate: "26",
      },
      {
        animationId: "81",
        desc: "与装饰物 蹦床 -> 跳动",
        occupySlime: null,
        occupyDecorate: "22",
      },
    ],
  },
];

const PIXILoader = new PIXI.Loader();

let PIXI_APP = null;

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.domElement);

export default {
  name: "slime",
  data() {
    return {
      SIZE: {
        w: window.innerWidth,
        h: window.innerHeight,
      },
      isTouching: false,
      slimeList: [],
      decorateList: [],
      curProg: 0,
      loaded: false,
    };
  },
  methods: {
    preloadContent() {
      console.log("预加载图片资源");
      PIXI.utils.clearTextureCache();
      CONTENT_MANIFEST.forEach((content) => {
        PIXILoader.add(content.id, content.src);
      });
      PIXILoader.on("progress", (evt) => {
        // console.log(evt);
        this.curProg = Math.min(100, evt.progress.toFixed(1));
      })
        .on("complete", (evt) => {
          this.curProg = 100;
          console.log("图片资源加载完成");
        })
        .load(this.initScene);
    },
    initScene() {
      console.log("初始化PIXI");
      PIXI_APP = new PIXI.Application({
        view: this.$refs.webglCanvas,
        backgroundColor: 0xbef2e5,
        antialias: true,
        width: this.SIZE.w,
        height: this.SIZE.h,
        resolution: 2,
      });
      window.PIXI_APP = PIXI_APP.stage;

      PIXI_APP.ticker.add((delta) => {
        stats.update();
      });

      console.log("初始化主场景");
      MAIN_SCENE.scene.forEach((scene) => {
        const sprite = new PIXI.Sprite(
          PIXILoader.resources[scene.image].texture
        );
        const [_x, _y] = scene.position;
        const [x, y] = [_x, -_y];
        sprite.position.set(x, y);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.name = scene.id;
        if (scene.width) sprite.width = scene.width;
        PIXI_APP.stage.addChild(sprite);

        if (scene.id === "BG_MAIN_CLOUD") {
          this.$nextTick(() => {
            const _pos = sprite.position;
            TweenMax.fromTo(
              _pos,
              100,
              { x: -512 },
              {
                x: 3476,
                ease: Power0.easeNone,
                repeat: -1,
              }
            );
          });
        }
      });

      this.build3D();
      this.initControl();
      setTimeout(() => {
        this.loaded = true;
      }, 800);
    },
    build3D() {
      console.log("初始化骨骼动画");
      SLIME_LIST.forEach((slimeObj) => {
        this.slimeList.push(slimeObj.id);
      });

      this.$nextTick(() => {
        // 使用 nextTick 防止画面错位
        const _slimeSkip = []; // 需要跳过的史莱姆列表

        console.log("初始化场景装饰物品");
        ALL_DECOR_LIST.forEach((decorID) => {
          this.decorateList.push(decorID);
          const aniID = DECOR_STATIC_MAP[decorID];

          const aniConf = ANIMATION_LIST_MAP[aniID];
          if (!aniConf) {
            console.warn("不存在的装饰物品ID", decorID);
            return;
          }
          this.addSpine(aniConf); // 添加骨骼动画到场景中

          if (aniConf.occupySlime) {
            // 如果该动画占用了某只史莱姆，将其放至跳过列表
            _slimeSkip.push(aniConf.occupySlime);
          }
        });

        console.log("初始化访客");
        const vistAniList = [];
        VIST_LIST.forEach((vistObj) => {
          // console.log(vistObj);
          vistObj.animationList.forEach((ani) => {
            // 检查史莱姆占用情况
            const checkSlime =
              ani.occupySlime === null ||
              this.slimeList.indexOf(ani.occupySlime) === -1;

            // 检查装饰物品占用情况
            const checkDecorate =
              ani.occupyDecorate === null ||
              this.decorateList.indexOf(ani.occupyDecorate) !== -1;

            if (checkSlime && checkDecorate) {
              vistAniList.push(ani);
            }
          });
        });

        // 随机选取两位访客
        const aniList = this.randArr(vistAniList, 2);
        aniList.forEach((ani) => {
          if (this.slimeList.indexOf(ani.occupySlime) !== -1) {
            _slimeSkip.push(ani.occupySlime);
          }

          const aniConf = ANIMATION_LIST_MAP[ani.animationId];
          this.addSpine(aniConf);
        });

        console.log("初始化史莱姆");
        SLIME_LIST.forEach((slimeObj) => {
          // console.log(slimeObj);
          if (_slimeSkip.indexOf(slimeObj.id) !== -1) return;

          const slimeAniList = [];
          slimeObj.animationList.forEach((ani) => {
            if (ani.occupySlime !== null) {
              _slimeSkip.push(ani.occupySlime);
            }

            slimeAniList.push(ani);
          });

          const ani = this.randArr(slimeAniList);
          const aniConf = ANIMATION_LIST_MAP[ani.animationId];
          this.addSpine(aniConf);
        });
      });
    },
    initControl() {
      console.log("初始化控制器");
      const scrollerCallback = (left, top, zoom) => {
        if (PIXI_APP.stage.position.x !== -left) {
          PIXI_APP.stage.position.x = -left;
          // console.log(`当前滚动条位置:${left},${top}`);
        }
      };
      objScroller = new Scroller(scrollerCallback, {
        zooming: false,
        animating: true,
        bouncing: false,
      });

      function onTouchStart(e) {
        const i = e.data.originalEvent;
        this.isTouching = true;
        objScroller.doTouchStart(i.touches || [i], i.timeStamp);
      }

      function onTouchMove(e) {
        if (this.isTouching) {
          const i = e.data.originalEvent;
          objScroller.doTouchMove(i.touches || [i], i.timeStamp, i.scale);
        }
      }

      function onTouchEnd(e) {
        const i = e.data.originalEvent;
        objScroller.doTouchEnd(i.timeStamp);
        this.isTouching = false;
      }

      // 允许接受事件响应
      PIXI_APP.stage.interactive = true;
      // 绑定鼠标和触摸事件
      PIXI_APP.stage
        .on("touchstart", onTouchStart)
        .on("mousedown", onTouchStart)
        .on("touchmove", onTouchMove)
        .on("mousemove", onTouchMove)
        .on("touchend", onTouchEnd)
        .on("mouseup", onTouchEnd);

      this.resize();
      window.addEventListener("resize", this.resize);
    },
    resize() {
      this.SIZE = {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };

      const screenScaleRito = document.documentElement.clientHeight / 750;
      const _offsetX = 3476 * screenScaleRito; //控制位移

      // PIXI_APP.stage.anchor.x = 0.5
      // PIXI_APP.stage.anchor.y = 0.5
      PIXI_APP.stage.pivot.x = -PIXI_APP.stage.width / 2;
      PIXI_APP.stage.pivot.y = -PIXI_APP.stage.height / 2;
      PIXI_APP.stage.scale.set(screenScaleRito, screenScaleRito);
      PIXI_APP.resize(this.SIZE.w, this.SIZE.h);
      PIXI_APP.stage.position.set(0, 0);
      this.$refs.webglCanvas.width = this.SIZE.w * 2;
      this.$refs.webglCanvas.height = this.SIZE.h * 2;
      this.$refs.webglCanvas.style.width = this.SIZE.w + "px";
      this.$refs.webglCanvas.style.height = this.SIZE.h + "px";

      objScroller.setDimensions(
        this.SIZE.w,
        this.SIZE.h,
        _offsetX,
        this.SIZE.h
      );
      objScroller.setPosition(0, 0);
    },
    addSpine(aniConf) {
      if (!aniConf) return;

      // 若场景中已存在此精灵，则替换播放的动画
      const _spineObj = PIXI_APP.stage.getChildByName(aniConf.objectName);
      if (_spineObj) {
        _spineObj.state.aniId = aniConf.spineAnimation;
        _spineObj.state.setAnimation(0, aniConf.spineAnimation, true);
        return;
      }

      const aniName = aniConf.objectName.toLowerCase();
      const spineObj = SPINE_MANIFEST[aniName];
      if (!spineObj) {
        console.warn("骨骼动画不存在", aniName);
        return;
      }

      const { atlas, json } = spineObj;

      // 初始化材质图
      const texture = PIXILoader.resources[aniName].data;

      // 初始化动作图集
      const spineAtlas = new PIXI.spine.core.TextureAtlas(
        atlas,
        (line, callback) => {
          callback(PIXI.BaseTexture.from(texture));
        }
      );

      const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(
        spineAtlas
      );
      const spineJsonParser = new PIXI.spine.core.SkeletonJson(
        spineAtlasLoader
      );

      spineJsonParser.scale = 1;

      const spineData = spineJsonParser.readSkeletonData(json);

      // 初始化Spine对象
      const spine = new PIXI.spine.Spine(spineData);

      spine.name = aniConf.objectName;
      spine.aniId = aniConf.spineAnimation;
      spine.state.setAnimation(0, aniConf.spineAnimation, true);
      spine.x = 0;
      spine.y = 0;
      spine.zIndex = aniConf.zIndex || 0; // 设置z轴排序

      if (aniConf.click) {
        spine.interactive = true;
        console.log("此精灵拥有点击事件", spine.name, aniConf.click);

        // 点击事件处理
        this.$bus.$emit("handleBindEvent", { type: aniConf.click, el: spine });
      }

      // 加入场景
      PIXI_APP.stage.addChild(spine);
      // 每次加入新元素时对场景元素进行排序
      PIXI_APP.stage.children.sort(
        (itemA, itemB) => itemA.zIndex - itemB.zIndex
      );

      if (aniConf.child) {
        console.log(
          "此动画包含一组子动画定义",
          aniConf.objectName,
          aniConf.child
        );
        // 包含子动画的情况递归添加至场景中
        aniConf.child.forEach((child) => {
          this.addSpine(child);
        });
      }
    },
    // 处理精灵事件
    handleBindEvent() {
      this.$bus.$on("handleBindEvent", (evt) => {
        // console.log(evt);
        const { type, el } = evt;
        el.on("click", ENENT_HANDLER_MAP[type]);
        el.on("touchstart", ENENT_HANDLER_MAP[type]);
      });
    },
    /**
     * 数组随机取任意个数
     * 
     */
    randArr(arr, n = 1) {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result.length === 1 ? result[0] : result;
    },
  },
  mounted() {
    this.preloadContent();
    this.handleBindEvent();
  },
  beforeDestroy() {
    this.$bus.$off();
  },
  components: {
    Loading,
  },
};
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.6s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>