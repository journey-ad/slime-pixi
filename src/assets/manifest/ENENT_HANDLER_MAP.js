let lock = false,
  count = 0,
  daweiLock = false,
  lsjPlay = true;

PIXI.spine.core.AnimationState.prototype.clearListenersByName = function (
  listenerName
) {
  this.listeners.forEach((listener) => {
    for (let key in listener) {
      if (key === listenerName) {
        if (Object.keys(listener).length === 1) {
          this.removeListener(listener);
        } else {
          delete listener[key];
        }
      }
    }
  });
};
const EventHandlerMap = {
  ON_CLICK_HUA: evt => {
    if (!evt.target || !evt.target.state) return

    if (!lock && ["hpdj1", "hpdj2", "hpdj3"].includes(evt.target.state.aniId)) {
      lock = true;
      count++;
      evt.target.state.addListener({
        complete: (e) => {
          if (evt.target && evt.target.state) {
            evt.target.state.clearListenersByName("complete");
            evt.target.state.setAnimation(0, "hpdj1", true, 2);
            evt.target.state.aniId = "hpdj1";
          }

          // console.log(e);
          lock = false;
          if (count === 3) {
            count = 0;
          }
        },
      });
      const aniId = count !== 3 ? "hpdj2" : "hpdj3"
      evt.target.state.setAnimation(0, aniId, false);
      evt.target.state.aniId = aniId;
    }
  },
  ON_CLICK_LSJ: evt => {
    if (!evt.target || !evt.target.state) return
    lsjPlay = !lsjPlay
    evt.target.state.setAnimation(0, lsjPlay ? "animation" : "jintai", true);
  },
  ON_CLICK_XUESHAN: evt => {
    // TODO
  },
  ON_CLICK_QIQIU: evt => {
    if (!evt.target || !evt.target.state) return

    evt.target.state.setAnimation(0, "hudong", true);
    evt.target.state.setAnimation(1, "daiji02", true);
  },
  ON_CLICK_QIQIU1: evt => {
    if (!evt.target || !evt.target.state) return

    evt.target.state.setAnimation(0, "daiji01", true);
    evt.target.state.setAnimation(1, "daiji03", true);
  },
  ON_CLICK_BAO: evt => {
    if (!evt.target || !evt.target.state) return

    if (!lock) {
      lock = true;
      count++;
      evt.target.state.addListener({
        complete: (e) => {
          if (evt.target && evt.target.state) {
            evt.target.state.clearListenersByName("complete");
            evt.target.state.setAnimation(0, "daiji", true, 2);
            evt.target.state.aniId = "daiji";
          }

          // console.log(e);
          lock = false;
          if (count === 3) {
            count = 0;
          }
        },
      });
      const aniId = count !== 3 ? "yaodo" : "pzt"
      evt.target.state.setAnimation(0, aniId, false);
      evt.target.state.aniId = aniId;
    }
  },
  ON_CLICK_DAWEI: evt => {
    if (!evt.target || !evt.target.state) return

    if (!daweiLock) {
      daweiLock = true;
      evt.target.state.addListener({
        complete: (e) => {
          if (evt.target && evt.target.state) {
            evt.target.state.clearListenersByName("complete");
            evt.target.state.setAnimation(0, "shujiao", true);
          }
          daweiLock = false;
        },
      });
      evt.target.state.setAnimation(0, "danji", false);
    }
  },
  ON_CLICK_PIANPIAN: evt => {
    if (!evt.target || !evt.target.state) return

    if (!lock) {
      lock = true;
      count++;
      evt.target.state.addListener({
        complete: (e) => {
          if (evt.target && evt.target.state) {
            evt.target.state.clearListenersByName("complete");
            evt.target.state.setAnimation(0, "daiji", true, 2);
            evt.target.state.aniId = "daiji";
          }

          // console.log(e);
          lock = false;
          if (count === 3) {
            count = 0;
          }
        },
      });
      const aniId = count !== 3 ? "dou" : "beng"
      evt.target.state.setAnimation(0, aniId, false);
      evt.target.state.aniId = aniId;

      if(count===3){
        const caoSlime = evt.target.parent.getChildByName('DECOR_HUA_SLIME_CAO__49_84')
        if(caoSlime) caoSlime.state.setAnimation(0, "hpdj5", false, 2);
      }
    }
  },
};

export default EventHandlerMap