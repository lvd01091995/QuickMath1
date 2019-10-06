"use strict";
cc._RF.push(module, '7dc47wXRr1EGL3R9wc9aPUV', 'QuestionView');
// Scripts/QuestionView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    getRanNum: function getRanNum(min_value, max_value) {
        var random_number = Math.random() * (max_value - min_value) + min_value;
        return Math.floor(random_number);
    }
}
// update (dt) {},
);

cc._RF.pop();