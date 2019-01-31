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
        },
        coinLabel:{
            default: null,
            type: cc.Label
        },
        loveLabel:{
            default: null,
            type: cc.Label
        },
        scoreLabel:{
            default: null,
            type: cc.Label
        },
        sumScoreLabel:{
            default: null,
            type: cc.Label
        },
        levelNumLabel:{
            default: null,
            type: cc.Label
        },
        missNumLabel:{
            default: null,
            type: cc.Label
        },
        failNode:{
            default:null,
            type:cc.Node
        },
        successNode:{
            default:null,
            type:cc.Node
        },
    },

    backHome(){
        //todo 添加off方法
        global.event.off("setMainMusic");
        global.event.off("playTone");
        global.event.off("startGuideGame");
        global.event.off("loadSuccess");
        global.event.off("addSorce");
        global.event.off("loadJson");
        global.event.off("ballMiss");
        global.event.off("missSize");
        global.event.off("startGame");
        global.event.off("updateLove");

        global.event.fire("btnClick");
        let music = this.musicNode.getComponent("MusicUtil");
        music.stopMain();
        cc.director.loadScene("homePage");
    },

    // 暂停
    pauseGame (){
        global.event.fire("btnClick");

        this.pauseMB();
        // let music = this.musicNode.getComponent("MusicUtil");
        // music.pauseMain();
        // this.guideNode.getComponent("guide").pauseGame();
        //pauseCtrl.js
        global.event.fire("showPause");
    },

    pauseMB(){
        let music = this.musicNode.getComponent("MusicUtil");
        music.pauseMain();
        this.guideNode.getComponent("guide").pauseGame();
    },

    // 继续
    resumeGame () {
        let music = this.musicNode.getComponent("MusicUtil");
        music.resumeMain();
        this.guideNode.getComponent("guide").resumeGame();
    },
    // 重新
    resetGame () {
        global.event.fire("btnClick");
        cc.log("click");
        let music = this.musicNode.getComponent("MusicUtil");
        music.rewindMain();
        
        var success = this.guideNode.getComponent("guide").loadJson(this.path);
        cc.log("resetGame-----"+success);
        this.guideNode.getComponent("guide").resetGame(this.score);
    },
    // 开始
    startGame (score) {
        // this.scoreLabel.string = "0";
        this.itemName = cc.sys.localStorage.getItem("itemName");
        global.event.fire("getLove");
        cc.log("itemName:"+this.itemName)
        this.name = this.getSpelling(this.itemName);
        this.score = score;
        var isStart = true;
        this.path = this.getDifficulty(score);
        //监听播放音乐guide.js
        global.event.on("loadSuccess",this.startMusic.bind(this));
        //guide.js
        global.event.fire("loadJson",this.path);
        // this.guideNode.getComponent("guide").loadJson(this.path);
    },
    // LIFE-CYCLE CALLBACKS:

    startMusic(){
        //musicUtil.js
        global.event.fire("setMainMusic", 'bgm_'+this.name+'.wav');
        global.event.fire("playTone", "main");

        // let music = this.musicNode.getComponent("MusicUtil");
        // // music.stopMain();
        // music.setMainMusic('bgm_'+this.name+'.wav');
        // music.playTone("main");
        // console.log(music.getCurrentTime());
        //guide.js
        global.event.fire("startGuideGame",this.score);

        // this.guideNode.getComponent("guide").startGame(this.score);
        
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
        
        // global.event.fire("resetBallList");
        // global.event.fire("loadJson",this.path);
        this.guideNode.getComponent("guide").resetBallList();
        this.guideNode.getComponent("guide").loadJson(this.path);
        // cc.Codec.unzip()
    },

    getNextName(){

    },

    onLoad () {
        
        this.itemName = cc.sys.localStorage.getItem("itemName");
        this.levelNumLabel.string = "关卡"+this.getLevelNum(this.itemName);
        var goldCoin = cc.sys.localStorage.getItem("goldCoin");
        var love = cc.sys.localStorage.getItem("love");
        this.coinLabel.string = "x"+goldCoin;
        this.loveLabel.string = "x"+love;
        this.scoreLabel.string = 0;
        //BallJson.js
        global.event.on("addSorce",this.addSorce.bind(this));
        //BallJson.js
        global.event.on("ballMiss",this.ballMiss.bind(this));
        //guide.js
        global.event.on("missSize",this.missSize.bind(this));
        //GameWorld.js
        global.event.on("startGame",this.startGame.bind(this));

        global.event.on("updateLove",this.getLove.bind(this));
        //guide.js
        global.event.on("ballSuccessed",this.ballSuccessed.bind(this));
        //successDialog.js
        global.event.on("nextMusic",this.nextMusic.bind(this));
        global.event.on("resetGame",this.resetGame.bind(this));
    },

    getLove(){
        var love = cc.sys.localStorage.getItem("love");
        this.loveLabel.string = "x"+love;
    },

    addSorce(){
        this.scoreLabel.string = this.scoreLabel.string-0+this.score;
    },

    missSize(size){
        this.missSize = size;
        this.missNumLabel.string = "允许漏击"+this.missSize+"个";
        cc.log("missSize:"+size);
    },

    ballMiss(){
        //允许漏击次数
        this.missSize--;
        if(this.missSize>=0){
            this.missNumLabel.string = "允许漏击"+this.missSize+"个";
        }else{
            // this.failNode.active = true;
            // this.pauseMB();
        }
        
    },

    ballSuccessed(){
        cc.log("ballSuccessed");
        var timeCallback = function (dt) {
            cc.log("time: " + dt);
            var score = this.scoreLabel.string;
            var afterScore = 0;
            if(cc.sys.localStorage.getItem(this.itemName)===null){
                cc.sys.localStorage.setItem(this.itemName,score);
            }else{
                var s = cc.sys.localStorage.getItem(this.itemName);
                afterScore = s;
                if(s<score){
                    cc.sys.localStorage.setItem(this.itemName,score);
                }
            }
            var success = this.successNode.getComponent("successDialog");
            success.setScore(score,afterScore);
            // global.event.fire("successScore",score,afterScore);
            this.successNode.active = true;
            this.pauseMB();
        }
        this.scheduleOnce(timeCallback, 2);

        global.event.fire("unlock",this.itemName);
    },

    getLevelNum(itemName){
        var first = itemName.substring(0);
        var last = itemName.substring(1);
        first = first-0+1;
        last = last-0+1;
        return first+"-"+last;
    },

    getDifficulty(score){
        var path;
        switch(score){
            case 5:
                path = "json_easy_"+this.name;
                break;
            case 8:
                path = "json_common_"+this.name;
                break;
            case 12:
                path = "json_difficulty_"+this.name;
                break;
        }
        return path;
    },

    // start () {},

    // update (dt) {},
});
