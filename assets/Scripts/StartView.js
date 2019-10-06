
cc.Class({
    extends: cc.Component,

    properties: {
        btn_startGame:cc.Button,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        this.btn_startGame.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1.0,1.2),cc.scaleTo(1.0,1.0))));
    },

    // update (dt) {},
});
