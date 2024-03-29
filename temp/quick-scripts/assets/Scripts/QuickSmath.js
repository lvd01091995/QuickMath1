(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/QuickSmath.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '35405RGYx5BVYxduXe/5JDl', 'QuickSmath', __filename);
// Scripts/QuickSmath.js

"use strict";

var SPEED_MOVE_VIEW = 0.2;
cc.Class({
    extends: cc.Component,

    properties: {
        lb: cc.Label,
        lbButon: [cc.Label],
        spCountDown: cc.Sprite,
        isStart: false,
        list_Bkg: [cc.SpriteFrame],
        bkg: cc.Sprite,
        lb_Score: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.num1 = "";
        this.num2 = "";
        this.num3 = "";
        this.caculer1 = "";
        this.caculer2 = "";
        this.result = "";
        this.indexHide = 0;
        this.current = 6;
        this.totlTime = 6;
        this.node.position = cc.v2(cc.winSize.width, 0);
        this.posCenter = cc.v2(0, 0);
        this.posRight = cc.v2(cc.winSize.width, 0);
        this.posLeft = cc.v2(-cc.winSize.width, 0);
        this.setRandomBkg();
        this.lb_Score.string = this.GameView.score;
    },
    start: function start() {
        this.moveIn();
    },
    setInfo: function setInfo(obj) {
        this.num1 = obj.num1;
        this.num2 = obj.num2;
        this.num3 = obj.num3;
        this.caculer1 = obj.caculer1;
        this.caculer2 = obj.caculer2;
        this.result = obj.result;
        this.indexHide = obj.indexHide;
        this.isThreeAnswer = true;
        if (this.indexHide == 1 || this.indexHide == 3) this.isThreeAnswer = false;

        switch (this.indexHide) {
            case 0:
                this.lb.string = "?" + " " + this.caculer1 + " " + this.num2 + " " + this.caculer2 + " " + this.num3 + " = " + this.result;
                this.numHide = this.num1;
                break;
            case 1:
                this.lb.string = this.num1 + " " + "?" + " " + this.num2 + " " + this.caculer2 + " " + this.num3 + "=" + " " + this.result;
                this.numHide = this.caculer1;
                console.log("cacule la==1 " + this.numHide);
                break;
            case 2:
                this.lb.string = this.num1 + " " + this.caculer1 + " " + "?" + " " + this.caculer2 + " " + this.num3 + " = " + this.result;
                this.numHide = this.num2;

                break;
            case 3:
                this.lb.string = this.num1 + " " + this.caculer1 + " " + this.num2 + " " + "?" + " " + this.num3 + " = " + this.result;
                this.numHide = this.this.caculer2;
                break;
            case 4:
                this.lb.string = this.num1 + " " + this.caculer1 + " " + this.num2 + " " + this.caculer2 + " " + "?" + " = " + this.result;
                this.numHide = this.num3;
                break;
            case 5:
                this.lb.string = this.num1 + " " + this.caculer1 + " " + this.num2 + " " + this.caculer2 + " " + this.num3 + " = " + " ?";
                this.numHide = this.result;
                break;
            default:
                console.log("cacule la== " + this.numHide);
                break;
        }

        // this.isThreeAnswer = true;
        if (!this.isThreeAnswer) this.lbButon[2].node.parent.active = false;
        this.setInfoBtn();
    },
    getResult: function getResult(str) {
        eval(str);
    },
    onClick: function onClick(event, data) {
        switch (data) {
            case "0":
                console.log(" ========" + this.numHide);
                if (this.lbButon[0].string == this.numHide) {
                    this.isFinish();
                    return;
                }
                break;
            case "1":
                console.log(" ==1 ==" + this.numHide);
                if (this.lbButon[1].string == this.numHide) {
                    this.isFinish();
                    return;
                }
                break;
            case "2":
                if (this.lbButon[2].string == this.numHide) {
                    this.isFinish();
                    return;
                }
                break;
        }

        this.isFail();
    },
    isFinish: function isFinish() {
        this.moveOut();
        this.GameView.score++;
        this.GameView._currentLv++;
        this.GameView.checkReslute();
    },
    isFail: function isFail() {
        if (this.GameView.score > this.GameView.bestScore) {
            this.GameView.bestScore = this.GameView.score;
            cc.sys.localStorage.setItem("bestscore", this.GameView.bestScore);
        }
        this.GameView._currentLv = 0;
        this.GameView.onLose();
    },
    update: function update(dt) {

        if (this.isStart) {

            this.spCountDown.fillRange = this.current / this.totlTime;
            this.current -= dt;

            if (this.current <= 0) {
                this.isFail();
                this.isStart = false;
            }
        }
    },
    moveOut: function moveOut() {
        var _this = this;

        this.node.runAction(cc.sequence(cc.moveTo(SPEED_MOVE_VIEW, this.posLeft), cc.callFunc(function () {
            _this.node.destroy();
        })));
    },
    moveIn: function moveIn() {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.moveTo(SPEED_MOVE_VIEW, this.posCenter), cc.callFunc(function () {
            _this2.isStart = true;
        })));
    },
    setInfoBtn: function setInfoBtn() {
        if (!this.isThreeAnswer) {
            var rdTemp = this.generateRandomNumber(0, 2);

            if (rdTemp == 0) {
                this.lbButon[0].string = "+";
                this.lbButon[1].string = "-";
            } else {
                this.lbButon[0].string = "-";
                this.lbButon[1].string = "+";
            }

            return;
        }
        var rd = this.generateRandomNumber(0, 3);
        this.lbButon[rd].string = this.numHide;

        for (var i = 0; i < this.lbButon.length; i++) {
            if (i != rd) {
                this.lbButon[i].string = this.getRandomAnswer(this.numHide);
            }
        }
    },
    generateRandomNumber: function generateRandomNumber(min_value, max_value) {
        var random_number = Math.random() * (max_value - min_value) + min_value;
        return Math.floor(random_number);
    },
    getRandomAnswer: function getRandomAnswer(n1) {
        console.log("== chay vao getRandomAnswer");
        var item = "";
        item = this.generateRandomNumber(n1 - 5, n1 + 5);
        for (var i = 0; i < this.lbButon.length; i++) {
            if (item == this.lbButon[i].string) {
                item = this.getRandomAnswer(n1);
            }
        }
        return item;
    },
    setRandomBkg: function setRandomBkg() {
        var index = this.generateRandomNumber(0, 5);
        this.bkg.spriteFrame = this.list_Bkg[index];
    }
    // i = 0;

    //da = 0; 


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
        //# sourceMappingURL=QuickSmath.js.map
        