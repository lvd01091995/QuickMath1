(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/QuickSmath.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '35405RGYx5BVYxduXe/5JDl', 'QuickSmath', __filename);
// Scripts/QuickSmath.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        lb: cc.Label,
        lbButon: [cc.Label],
        spCountDown: cc.Sprite,
        isStart: false
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
        this.current = 8;
        this.totlTime = 8;

        this.isThreeAnswer = true;
    },
    start: function start() {},
    setInfo: function setInfo(obj) {
        this.num1 = obj.num1;
        this.num2 = obj.num2;
        this.num3 = obj.num3;
        this.caculer1 = obj.caculer1;
        this.caculer2 = obj.caculer2;
        this.result = obj.result;
        this.indexHide = obj.indexHide;
        if (this.indexHide == 1 || this.indexHide == 3) this.isThreeAnswer = false;

        switch (this.indexHide) {
            case 0:
                this.lb.string = "?" + this.caculer1 + this.num2 + this.caculer2 + this.num3 + "=" + this.result;
                this.numHide = this.num1;
                break;
            case 1:
                this.lb.string = this.num1 + "?" + this.num2 + this.caculer2 + this.num3 + "=" + this.result;
                this.numHide = this.caculer1;
                console.log("cacule la==1 " + this.numHide);
                break;
            case 2:
                this.lb.string = this.num1 + this.caculer1 + "?" + this.caculer2 + this.num3 + "=" + this.result;
                this.numHide = this.num2;

                break;
            case 3:
                this.lb.string = this.num1 + this.caculer1 + this.num2 + "?" + this.num3 + "=" + this.result;
                this.numHide = this.this.caculer2;
                break;
            case 4:
                this.lb.string = this.num1 + this.caculer1 + this.num2 + this.caculer2 + "?" + "=" + this.result;
                this.numHide = this.num3;
                break;
            case 5:
                this.lb.string = this.num1 + this.caculer1 + this.num2 + this.caculer2 + this.num3 + "=" + "?";
                this.numHide = this.result;
                break;
            default:
                console.log("cacule la== " + this.numHide);
                break;
        }

        // this.isThreeAnswer = true;
        if (!this.isThreeAnswer) this.lbButon[2].node.parent.active = false;
        this.setInfoBtn();
        this.isStart = true;
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
        console.log("dung roi");
    },
    isFail: function isFail() {
        console.log("sai roi");
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
    moveOut: function moveOut() {},
    moveIn: function moveIn() {},
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
        