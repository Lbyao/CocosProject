// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import global from "../global"
//关卡控制
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

    backHome(){
        let music = this.musicNode.getComponent("MusicUtil");
        music.stopMain();
        cc.director.loadScene("homePage");
    },

    // 暂停
    pauseGame (){
        let music = this.musicNode.getComponent("MusicUtil");
        music.pauseMain();
        this.guideNode.getComponent("guide").pauseGame();
        //pauseCtrl.js
        global.event.fire("showPause");
    },
    // 继续
    resumeGame () {
        let music = this.musicNode.getComponent("MusicUtil");
        music.resumeMain();
        this.guideNode.getComponent("guide").resumeGame();
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
        cc.log("startGame:"+cc.sys.localStorage.getItem("itemName"));
        this.name = this.getSpelling(cc.sys.localStorage.getItem("itemName"));

        this.score = score;
        var isStart = true;
        this.path = "json_easy_"+this.name;

        //监听播放音乐guide.js
        global.event.on("loadSuccess",this.startMusic.bind(this));
// ,music,score
        this.guideNode.getComponent("guide").loadJson(this.path);
    },
    // LIFE-CYCLE CALLBACKS:

    startMusic(result){
        let music = this.musicNode.getComponent("MusicUtil");
        // music.stopMain();
        music.setMainMusic('bgm_'+this.name+'.wav');
        music.playTone("main");
        console.log(music.getCurrentTime());
        
        this.guideNode.getComponent("guide").startGame(music,this.score);
        
    },

    getSpelling(name){
        var res;
        switch(name){
            case "00":
                res = 'txxm';
                break;
            case "01":
                res = "dcj";
                break;
        }
        return res;
    },

    loadSuccess(isSuccess){
        this.isSuccess = isSuccess;
    },

    nextMusic(){

        cc.log("nextMusic");

        this.name = 'txxm';
        // this.score = score;
        var isStart = true;
        this.path = "json_easy_"+this.name;

        //监听播放音乐
        global.event.on("loadSuccess",this.startMusic.bind(this));
// ,music,score
        this.guideNode.getComponent("guide").resetBallList();
        this.guideNode.getComponent("guide").loadJson(this.path);
        // cc.Codec.unzip()
    },

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
