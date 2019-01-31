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
cc.Class({
    extends: cc.Component,

    properties: {
        modeNode:{
            default:null,
            type:cc.Sprite
        },
        sprites:{
            default:[],
            type:cc.SpriteFrame
        },
        starLabel:{
            default:null,
            type:cc.Label
        },
        goldCoinLabel:{
            default:null,
            type:cc.Label
        },
        loveLabel:{
            default:null,
            type:cc.Label
        },
        musicNode:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    playBg(){
        
        this.music.setMainMusic('main_bgm.mp3');
        var id = this.music.playTone("main");
        this.music.loop(id);
    },

    pauseBg(){
        // let music = this.musicNode.getComponent("MusicUtil");
        // cc.log("this.music:"+this.music);
        // this.music.stopMain();
        //musicUtil.js
        global.event.fire("stopMain");
    },

    onLoad () {
        this.music = this.musicNode.getComponent("MusicUtil");
        //levelCtrl.js
        global.event.on("pauseBg",this.pauseBg.bind(this));
        this.playBg();
        var goldCoin = cc.sys.localStorage.getItem("goldCoin");
        var love = cc.sys.localStorage.getItem("love");
        var mode = cc.sys.localStorage.getItem("mode");
        var star = cc.sys.localStorage.getItem("star");
        if(goldCoin===null){
            cc.sys.localStorage.setItem("goldCoin",6666);
        }
        if(love === null){
            cc.sys.localStorage.setItem("love",1000);
        }
        if(star===null){
            cc.sys.localStorage.setItem("star",0);
        }
        if(mode===null){
            cc.sys.localStorage.setItem("mode",0);
        }

        this.starLabel.string = "x"+cc.sys.localStorage.getItem("star");
        this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
        this.loveLabel.string = "x"+cc.sys.localStorage.getItem("love");
    },

    start () {

    },

    changeMode(){
        global.event.fire("btnClick");
        var mode = cc.sys.localStorage.getItem("mode")
        switch(mode){
            case "0":
                this.modeNode.spriteFrame = this.sprites[1];
                cc.sys.localStorage.setItem("mode",1);
                break;
            case "1":
                cc.sys.localStorage.setItem("mode",0);
                this.modeNode.spriteFrame = this.sprites[0]
                break;
        }
    },

    showTipsDialog(){
        //dialogCtrl.js
        global.event.fire("btnClick");
        global.event.fire("showTips");
    },

    showGoldCoinDialog(){
        //dialogCtrl.js
        global.event.fire("btnClick");
        global.event.fire("showGoldCoin");
    },

    showLoveDialog(){
        global.event.fire("btnClick");
        global.event.fire("showLove");
    },

    // update (dt) {},


});
