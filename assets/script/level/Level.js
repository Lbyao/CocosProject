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
        // global.event.off("setMainMusic");
        // global.event.off("playTone");
        // global.event.off("startGuideGame");
        // global.event.off("loadSuccess");
        // global.event.off("addSorce");
        // global.event.off("loadJson");
        // global.event.off("ballMiss");
        // global.event.off("missSize");
        // global.event.off("startGame");
        // global.event.off("updateLove");
        
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
        this.isStart = false;
        this.isPause = true;
    },

    pauseMB(){
        let music = this.musicNode.getComponent("MusicUtil");
        music.pauseMain();
        this.guideNode.getComponent("guide").pauseGame();
    },

    // 继续
    resumeGame () {
        this.isStart = true;
        let music = this.musicNode.getComponent("MusicUtil");
        music.resumeMain();
        this.guideNode.getComponent("guide").resumeGame();
        this.isPause = false;
    },
    // 重新
    resetGame () {
        this.isStart = true;
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
        var unzipPath = cc.sys.localStorage.getItem("unzipPath");
        global.event.fire("getLove");
        cc.log("itemName:"+this.itemName)
        // this.name = this.getSpelling(this.itemName);
        this.name = this.itemName;
        this.score = score;
        var isStart = true;
        this.path = this.getDifficulty(this.itemName,unzipPath,score);
        // this.path = unzipPath+"/"+ this.itemName;
        //监听播放音乐guide.js
        global.event.on("loadSuccess",this.startMusic.bind(this));
        //guide.js
        global.event.fire("loadJson",this.path);
        // this.guideNode.getComponent("guide").loadJson(this.path);
        this.isStart = true;
    },
    // LIFE-CYCLE CALLBACKS:

    startMusic(){
        //musicUtil.js
        global.event.fire("setMainMusic", this.name);
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
        this.isStart= false;
        this.isPause = false;
        this.keyDown = 0;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        
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
        //监听应用是否在后台
        cc.game.on(cc.game.EVENT_HIDE, event=>{
            return cc.log('emit cc.game.EVENT_HIDE!');
        });
        //监听应用是否从后台显示
        cc.game.on(cc.game.EVENT_SHOW, event=>{
            if(this.isStart==false&&this.isPause==true){
                this.pauseMB();
            }
            return cc.log('emit cc.game.EVENT_SHOW!');
        });
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
            this.isStart = false;
            // global.event.fire("btnClick");
            global.event.fire("playTone","fail");
            // this.failNode.active = true;
            // this.pauseMB();
        }
        
    },

    ballSuccessed(){
        // global.event.fire("btnClick");
        global.event.fire("playTone","success");
        this.isStart = false;
        cc.log("ballSuccessed");
        var timeCallback = function (dt) {
            cc.log("time: " + dt);
            var mscore = this.scoreLabel.string;
            var afterScore = 0;
            if(cc.sys.localStorage.getItem(this.itemName)===null){
                cc.sys.localStorage.setItem(this.itemName,mscore);
            }else{
                var s = cc.sys.localStorage.getItem(this.itemName);
                afterScore = s;
                if(s<mscore){
                    cc.sys.localStorage.setItem(this.itemName,mscore);
                }
            }

            cc.log("unlock:"+this.itemName)
            var infos = cc.sys.localStorage.getItem("level"+this.itemName);
            if(infos==null){
                var levelInfo={
                    score: this.score,
                    simaple:null,
                    common:null,
                    difficulty: null,
                    name: this.itemName
                }
    
                switch(this.score){
                    case 5:
                        levelInfo.simaple = mscore;
                        break;
                    case 8:
                        levelInfo.common = mscore;
                        break;
                    case 12:
                        levelInfo.difficulty = mscore;
                        break;
                }
    
                cc.sys.localStorage.setItem("level"+this.itemName,JSON.stringify(levelInfo));
            }else{
                var ins = JSON.parse(infos);
                switch(this.score){
                    case 5:
                        ins.simaple = mscore;
                        break;
                    case 8:
                        ins.common = mscore;
                        break;
                    case 12:
                        ins.difficulty = mscore;
                        break;
                }
    
                cc.sys.localStorage.setItem("level"+this.itemName,JSON.stringify(ins));
            }

            var success = this.successNode.getComponent("successDialog");
            success.setScore(mscore,afterScore,this.itemName);
            // global.event.fire("successScore",score,afterScore);
            this.successNode.active = true;
            // this.pauseMB();
        }
        this.scheduleOnce(timeCallback, 2);
        
        // global.event.fire("unlock",this.itemName);
    },

    getLevelNum(itemName){
        var first = itemName.substring(0);
        var last = itemName.substring(1);
        first = first-0+1;
        last = last-0+1;
        return first+"-"+last;
    },

    getDifficulty(name,unzippath,score){
        var path;
        switch(score){
            case 5:
                path = unzippath+"/"+name+"/"+"json_easy.json";
                break;
            case 8:
                path = unzippath+"/"+name+"/"+"json_common.json";
                break;
            case 12:
                path = unzippath+"/"+name+"/"+"json_difficulty.json";
                break;
        }
        return path;
    },

    // start () {},

    // update (dt) {},
    onKeyDown: function (event) {
        cc.log(event.keyCode);
        this.keyDown++;
        switch(event.keyCode) {

            case 6:
                cc.log("点击down返回按钮"+this.keyDown);
                if(this.isStart&&this.keyDown==2){
                    this.keyDown = 0;
                    this.pauseGame();
                }else if(this.keyDown==2){
                    this.keyDown = 0;
                    this.backHome();
                }
                break;
        }
    },

    onKeyUp: function (event) {
        cc.log(event.keyCode);
        switch(event.keyCode) {
            case 6:
                cc.log("点击up返回按钮");
                
                break;
        }
    }
});
