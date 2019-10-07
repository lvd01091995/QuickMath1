(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LoseView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4554dQjBYJPeYdFi/W121qO', 'LoseView', __filename);
// Scripts/LoseView.js

"use strict";

var SPEED_MOVE_VIEW = 0.2;
cc.Class({
    extends: cc.Component,

    properties: {
        btn_restart: cc.Button,
        GameView: require("GameView"),
        lb_bestScore: cc.Label,
        lb_score: cc.Label,
        lb_result: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.posCenter = cc.v2(0, 0);
        this.posUp = cc.v2(0, cc.winSize.height);
        this.posLeft = cc.v2(-cc.winSize.width, 0);
        this.node.zIndex = 10;
        // this.posLeft=cc.v2(-cc.winSize.width,0);
    },
    start: function start() {
        this.btn_restart.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1.0, 1.2), cc.scaleTo(1.0, 1.0))));
    },
    moveDown: function moveDown() {
        var _this = this;

        cc.log("moveDown");
        this.node.runAction(cc.sequence(cc.moveTo(SPEED_MOVE_VIEW, this.posCenter), cc.callFunc(function () {
            _this.GameView.curQuestionView.node.destroy();
            _this.GameView.curQuestionView = null;
        })));
        this.lb_bestScore.string = this.GameView.bestScore;
        this.lb_score.string = this.GameView.score;
        this.GameView.score = 0;
        this.lb_result.string = this.GameView.result;
    },
    moveLeft: function moveLeft() {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.moveTo(SPEED_MOVE_VIEW, this.posLeft), cc.callFunc(function () {
            _this2.node.position = _this2.posUp;
        })));
    },
    onClickRePlay: function onClickRePlay() {
        this.GameView.checkReslute();
        this.moveLeft();
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
        //# sourceMappingURL=LoseView.js.map
        