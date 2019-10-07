(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/StartView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd07b9yPNn5E+YAypEgyraZQ', 'StartView', __filename);
// Scripts/StartView.js

"use strict";

var SPEED_MOVE_VIEW = 0.2;
cc.Class({
    extends: cc.Component,

    properties: {
        btn_startGame: cc.Button,
        lb_bestScore: cc.Label,
        GameView: require("GameView")
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.posCenter = cc.v2(0, 0);
        this.posRight = cc.v2(cc.winSize.width, 0);
        this.posLeft = cc.v2(-cc.winSize.width, 0);
    },
    start: function start() {
        this.btn_startGame.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1.0, 1.2), cc.scaleTo(1.0, 1.0))));
        this.lb_bestScore.string = this.GameView.bestScore;
    },
    moveLeft: function moveLeft() {
        this.node.runAction(cc.moveTo(SPEED_MOVE_VIEW, this.posLeft));
    }
    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=StartView.js.map
        