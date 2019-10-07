"use strict";
cc._RF.push(module, '5a4d3nMhj1MVafrXpAH/L45', 'GameView');
// Scripts/GameView.js

"use strict";

var STRING = "%s %d %s = %s";
var STRING2 = "%s %d %s %d %s = %s";
var SPEED_MOVE_VIEW = 0.2;
var GameView = cc.Class({
    extends: cc.Component,

    properties: {
        prefabGame: cc.Prefab,
        startView: cc.Node,
        loseView: cc.Node,
        lb_Score: cc.Label,
        btn_quitGame: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._timeTotal = 10;
        this._tiemCurrent = this._timeTotal;
        this._hardLevel = 1;
        this._currentLv = 0;
        this.arrCaculer = ["+", "-"];
        this.num1 = 0;
        this.num2 = 0;
        this.num3 = "";
        this.caculer1 = "+";
        this.caculer2 = "";
        this.is3Num = false;
        this.result = "";
        this.arrIndexHide = [0, 1, 2, 5];
        this.arrIndexHide2 = [0, 1, 2, 3, 4, 5];
        this.posCenter = cc.v2(0, 0);
        this.posRight = cc.v2(cc.winSize.width, 0);
        this.posLeft = cc.v2(-cc.winSize.width, 0);
        this.score = 0;
        this.curQuestionView = null;
    },
    start: function start() {
        this.bestScore = cc.sys.localStorage.getItem("bestscore");
        if (this.bestScore == null || typeof this.bestScore === "undefined") this.bestScore = 0;
    },
    setInfo: function setInfo() {},
    getRandomQuesiton: function getRandomQuesiton() {
        var str = "";
        str = this.num1 + this.caculer1 + this.num2 + this.caculer2 + this.num3;
        return str;
    },
    generateRandomNumber: function generateRandomNumber(min_value, max_value) {
        var random_number = Math.random() * (max_value - min_value) + min_value;
        return Math.floor(random_number);
    },
    getRandomNum: function getRandomNum() {
        if (this._currentLv < 10) {
            return this.generateRandomNumber(1, 10);
        } else if (this._currentLv < 15) {
            return this.generateRandomNumber(1, 20);
        } else if (this._currentLv < 20) {
            return this.generateRandomNumber(1, 40);
        } else if (this._currentLv < 30) {
            return this.generateRandomNumber(1, 50);
        } else {
            return this.generateRandomNumber(1, 100);
        }
    },
    check3Num: function check3Num() {
        if (this._currentLv < 10) return false;
        var temp = this.getHardLevel();
        if (temp > this.generateRandomNumber(0, 10)) return true;
        return false;
    },
    getHardLevel: function getHardLevel() {
        if (this._currentLv < 20) {
            return 2;
        } else if (this._currentLv < 25) {
            return 3;
        } else if (this._currentLv < 30) {
            return 4;
        } else if (this._currentLv < 35) {
            return 6;
        } else {
            return 8;
        }
    },
    getRandomCaculer: function getRandomCaculer() {
        return this.arrCaculer[this.generateRandomNumber(0, 2)];
    },
    onClickTest: function onClickTest() {
        console.log("gia tri str la== " + this.getRandomQuesiton());
        this.lbGame.string = this.getRandomQuesiton();
        this._currentLv++;
    },
    checkCaculer: function checkCaculer() {
        if (this._currentLv > 9) {}
    },

    // update (dt) {
    //     console.log("== " + this._tiemCurrent);
    //     this.spProgress.fillRange = this._tiemCurrent/this._timeTotal;
    //     this._tiemCurrent-= dt;

    // },
    updateLever: function updateLever() {},

    // onClickTest(event , data){
    //     switch (data){
    //         case "0":

    //         break;
    //         case "1":
    //         break;
    //         case "2":
    //         break;
    //         case "3":
    //         break;
    //     }
    // },
    checkReslute: function checkReslute() {
        var obj = {};
        obj.num1 = this.getRandomNum();
        obj.num2 = this.getRandomNum();
        obj.caculer1 = this.getRandomCaculer();
        if (this.check3Num()) {
            obj.num3 = this.getRandomNum();
            obj.caculer2 = this.getRandomCaculer();
            obj.indexHide = this.arrIndexHide2[this.generateRandomNumber(0, this.arrIndexHide2.length)];
        } else {
            obj.num3 = "";
            obj.caculer2 = "";
            obj.indexHide = this.arrIndexHide[this.generateRandomNumber(0, this.arrIndexHide.length)];
        }
        obj.indexHide = 1;
        obj.result = eval(obj.num1 + obj.caculer1 + obj.num2 + obj.caculer2 + obj.num3);
        this.result = obj.num1 + obj.caculer1 + obj.num2 + obj.caculer2 + obj.num3 + " = " + obj.result;
        var item = cc.instantiate(this.prefabGame).getComponent("QuickSmath");
        item.setInfo(obj);
        this.node.addChild(item.node);
        this.curQuestionView = item;
        this.startView.getComponent("StartView").moveLeft();
    },
    onLose: function onLose() {
        this.loseView.getComponent("LoseView").moveDown();
    },
    onClickQuitGame: function onClickQuitGame() {
        cc.game.end();
    }
});
module.exports = GameView;

cc._RF.pop();