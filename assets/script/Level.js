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
        
        var success = this.guideNode.getComponent("guide").loadJson(this.path);
        cc.log("resetGame-----"+success);
        this.guideNode.getComponent("guide").resetGame(music,this.score);
    },
    // 开始
    startGame (score) {
        this.score = score;
        var isStart = true;
        this.path = "json_easy_txxm";
        
        

        // while (isStart) {
        // //     var success = this.guideNode.getComponent("guide").getLoadSuccess();
        // //     cc.log("startGame-------"+success+",this.num:");
        //     global.event.on("loadSuccess",this,loadSuccess.bind(this));
        //     if(this.isSuccess){
        //         isStart = false;
        //     }
        // }
        global.event.on("loadSuccess",this.startMusic.bind(this));
// ,music,score
        this.guideNode.getComponent("guide").loadJson(this.path);
    },
    // LIFE-CYCLE CALLBACKS:

    startMusic(result){
        let music = this.musicNode.getComponent("MusicUtil");
        music.setMainMusic('bgm_txxm.wav');
        music.playTone("main");
        console.log(music.getCurrentTime());
        
        this.guideNode.getComponent("guide").startGame(music,this.score);
        
    },

    loadSuccess(isSuccess){
        this.isSuccess = isSuccess;
    },

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
