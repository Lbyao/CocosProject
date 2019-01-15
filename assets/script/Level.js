// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import global from "./global"
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
        cc.log("click");
        let music = this.musicNode.getComponent("MusicUtil");
        music.rewindMain();
        this.guideNode.getComponent("guide").resetGame(music,this.score,this.path);
    },
    // 开始
    startGame (score) {
        let music = this.musicNode.getComponent("MusicUtil");
        music.setMainMusic('bgm_txxm.wav');
        music.playTone("main");
        console.log(music.getCurrentTime());
        this.path = "json_easy_txxm";
        this.score = score;
        this.guideNode.getComponent("guide").startGame(music,score,path);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
