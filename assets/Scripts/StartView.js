var SPEED_MOVE_VIEW = 0.2;
cc.Class({
    extends: cc.Component,

    properties: {
        btn_startGame:cc.Button,
        lb_bestScore:cc.Label,
        GameView:require("GameView")
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.posCenter=cc.v2(0,0);
        this.posRight=cc.v2(cc.winSize.width,0);
        this.posLeft=cc.v2(-cc.winSize.width,0);
    },

    start () {
        this.btn_startGame.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1.0,1.2),cc.scaleTo(1.0,1.0))));
        this.lb_bestScore.string= this.GameView.bestScore;
    },
    moveLeft(){
        this.node.runAction(cc.moveTo(SPEED_MOVE_VIEW,this.posLeft));
    }
    // update (dt) {},
});
