"use strict";
cc._RF.push(module, 'd07b9yPNn5E+YAypEgyraZQ', 'StartView');
// Scripts/StartView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        btn_startGame: cc.Button

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this.btn_startGame.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1.0, 1.2), cc.scaleTo(1.0, 1.0))));
    }
}

// update (dt) {},
);

cc._RF.pop();