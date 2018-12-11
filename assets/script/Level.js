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
        musicNode: {
            default: null,
            type: cc.Node
        },
        guideNode: {
            default: null,
            type: cc.Node
        }
    },
    // 暂停
    pauseGame (){

    },
    // 继续
    resumeGame () {

    },
    // 重新
    resetGame () {
        this.guideNode.getComponent("guide").resetGame();
    },
    // 开始
    startGame () {
        this.musicNode.getComponent("MusicUtil").playMain();
        this.guideNode.getComponent("guide").startGame();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
