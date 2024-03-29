
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
        btn_quitGame:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
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
        this.bestScore= cc.sys.localStorage.getItem("bestscore");
        if(this.bestScore==null || typeof this.bestScore ==="undefined") this.bestScore=0;
    },
  
    setInfo() {

    },
    getRandomQuesiton() {
        let str = "";
        str = this.num1 + this.caculer1 + this.num2 + this.caculer2 + this.num3;
        return str
    },
    generateRandomNumber(min_value, max_value) {
        let random_number = Math.random() * (max_value - min_value) + min_value;
        return Math.floor(random_number);
    },
    getRandomNum() {
        if (this._currentLv < 10) {
            return this.generateRandomNumber(1, 10);
        } else if (this._currentLv < 15) {
            return this.generateRandomNumber(1, 20);
        } else if (this._currentLv < 20) {
            return this.generateRandomNumber(1, 40);
        }
        else if (this._currentLv < 30) {
            return this.generateRandomNumber(1, 50);
        } else {
            return this.generateRandomNumber(1, 100);
        }

    },
    check3Num() {
        if (this._currentLv < 6) return false;
        let temp = this.getHardLevel();
        if (temp > this.generateRandomNumber(0, 10)) return true;
        return false

    },
    getHardLevel() {
        if (this._currentLv < 15) {
            return 2;
        } else if (this._currentLv < 20) {
            return 3;
        } else if (this._currentLv < 25) {
            return 4;
        } else if (this._currentLv < 30) {
            return 6;
        } else {
            return 8;
        }
    },
    getRandomCaculer() {
        return this.arrCaculer[this.generateRandomNumber(0, 2)];
    },
    onClickTest() {
        this.lbGame.string = this.getRandomQuesiton();
        this._currentLv++;
    },
   
    // update (dt) {
    //     console.log("== " + this._tiemCurrent);
    //     this.spProgress.fillRange = this._tiemCurrent/this._timeTotal;
    //     this._tiemCurrent-= dt;

    // },
    updateLever() {
    },
    getIndexHide(){
        let index = 0;
        if(this._currentLv < 8) 
        return 5;
        if(this.is3Num){
            index =  this.arrIndexHide2[this.generateRandomNumber(0,this.arrIndexHide2.length)];
        }else{
            index =  this.arrIndexHide[this.generateRandomNumber(0,this.arrIndexHide.length)];
        }
        return index
    },
   
    checkReslute() {
        let obj = {};
        obj.num1 = this.getRandomNum();
        obj.num2 = this.getRandomNum();
        obj.caculer1 = this.getRandomCaculer();
        if (this.check3Num()) {
            obj.num3 = this.getRandomNum();
            obj.caculer2 = this.getRandomCaculer();
            this.is3Num = true;
        }else{
            obj.num3 = "";
            obj.caculer2 = "";
            this.is3Num = false;
        }

        obj.indexHide = this.getIndexHide();
            console.log("index hide la== " + obj.indexHide);

        obj.result = eval(obj.num1 + obj.caculer1 + obj.num2 + obj.caculer2 + obj.num3);
        this.result=obj.num1 + obj.caculer1 + obj.num2 + obj.caculer2 + obj.num3+" = "+ obj.result;
        let item = cc.instantiate(this.prefabGame).getComponent("QuickSmath");
        item.setInfo(obj);
        item.GameView = this;
        this.node.addChild(item.node);
        this.curQuestionView = item;
        this.startView.getComponent("StartView").moveLeft();
    },
    onLose() {
        this.loseView.getComponent("LoseView").moveDown();
    },
    onClickQuitGame(){
        cc.game.end();
    }

});
module.exports = GameView