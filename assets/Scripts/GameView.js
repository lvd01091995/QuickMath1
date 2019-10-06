// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var STRING = "%s %d %s = %s";
var STRING2 = "%s %d %s %d %s = %s";
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
       
        prefabGame:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this._timeTotal = 10;
         this._tiemCurrent = this._timeTotal;
         this._hardLevel = 1;
         this._currentLv = 0 ;
         this.arrCaculer = ["+","-"];
         this.num1 = 0;
         this.num2 = 0;
         this.num3 = "";
         this.caculer1 = "+";
         this.caculer2 = "";
         this.is3Num = false;
         this.result = "";
         this.arrIndexHide = [0,1,2,5];
         this.arrIndexHide2 = [0,1,2,3,4,5];
     },

    setInfo(){
        
    },
    getRandomQuesiton(){
        let str = "";
        
        str =  this.num1 + this.caculer1 + this.num2 +  this.caculer2 +  this.num3 
        return str
    },
    generateRandomNumber(min_value, max_value) {
        let random_number = Math.random() * (max_value - min_value) + min_value;
        return Math.floor(random_number);
    },
    getRandomNum(){
        if(this._currentLv < 10){
            return this.generateRandomNumber(1,10);
        }else if(this._currentLv < 15){
            return  this.generateRandomNumber(1,20);
        }else if (this._currentLv < 20){
            return  this.generateRandomNumber(1,40);
        }
        else if (this._currentLv < 30){
            return  this.generateRandomNumber(1,50);
        }else{
            return  this.generateRandomNumber(1,100);
        }

    },
    check3Num(){
        if(this._currentLv < 10) return false;
        let temp = this.getHardLevel();
        if(temp > this.generateRandomNumber(0,10)) return true;
        return false

    },
    getHardLevel(){
        if(this._currentLv < 20 ){
            return 2;
        }else if(this._currentLv < 25){
            return 3;
        }else if(this._currentLv < 30){
            return 4;
        }else if(this._currentLv < 35){
            return 6;
        }else {
            return 8;
        }
    },
    getRandomCaculer(){
        return  this.arrCaculer[this.generateRandomNumber(0,2)];
    },
    onClickTest(){
        console.log("gia tri str la== " + this.getRandomQuesiton());
        this.lbGame.string  = this.getRandomQuesiton();
        
        this._currentLv++;
    },
    checkCaculer(){
        if(this._currentLv > 9 ){
            
        }
    },
    // update (dt) {
    //     console.log("== " + this._tiemCurrent);
    //     this.spProgress.fillRange = this._tiemCurrent/this._timeTotal;
    //     this._tiemCurrent-= dt;

    // },
    updateLever(){
    },
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
    checkReslute(){
        let obj = {};
        obj.num1 = this.getRandomNum();
        obj.num2 = this.getRandomNum();
        obj.caculer1 = this.getRandomCaculer();
        if(this.check3Num()){
            obj.num3 = this.getRandomNum();
            obj.caculer2 = this.getRandomCaculer();
            obj.indexHide =  this.arrIndexHide2[this.generateRandomNumber(0,this.arrIndexHide2.length)];
            
        }else{
            obj.num3 = "";
            obj.caculer2 = "";
            obj.indexHide = this.arrIndexHide[this.generateRandomNumber(0,this.arrIndexHide.length)];
        }

        obj.indexHide =1;
        
        obj.result = eval(obj.num1 + obj.caculer1 + obj.num2 + obj.caculer2 + obj.num3);
        let item = cc.instantiate(this.prefabGame).getComponent("QuickSmath");
        item.setInfo(obj);
        this.node.addChild(item.node);
    }

});
