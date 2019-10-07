
var SPEED_MOVE_VIEW=0.2;
cc.Class({
    extends: cc.Component,

    properties: {
     btn_restart:cc.Button,
     GameView:require("GameView"),
     lb_bestScore:cc.Label,
     lb_score:cc.Label,
     lb_result:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.posCenter=cc.v2(0,0);
        this.posUp=cc.v2(0,cc.winSize.height);
        this.posLeft=cc.v2(-cc.winSize.width,0);
        this.node.zIndex=10;
       // this.posLeft=cc.v2(-cc.winSize.width,0);
    },

    start () {
        this.btn_restart.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1.0,1.2),cc.scaleTo(1.0,1.0))));
    },
    moveDown(){
        cc.log("moveDown");
        this.node.runAction(cc.sequence(cc.moveTo(SPEED_MOVE_VIEW,this.posCenter),cc.callFunc(()=>{
            this.GameView.curQuestionView.node.destroy();
            this.GameView.curQuestionView=null;
        })));
        this.lb_bestScore.string= this.GameView.bestScore;
        this.lb_score.string=  this.GameView.score;
        this.GameView.score=0;
        this.lb_result.string=this.GameView.result;
    },
    moveLeft(){
        this.node.runAction(cc.sequence(cc.moveTo(SPEED_MOVE_VIEW,this.posLeft),cc.callFunc(()=>{
            this.node.position=this.posUp;
        })));
    },
    onClickRePlay(){
        this.GameView.checkReslute();
        this.moveLeft();
    }
    // update (dt) {},
});
