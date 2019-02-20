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
        tipsNode: {
            default: null,
            type: cc.Node
        },
        goldCoinNode: {
            default: null,
            type: cc.Node
        },
        loveNode: {
            default: null,
            type: cc.Node
        },
        goldCoinLabel:{
            default:null,
            type: cc.Label
        },
        loveLabel:{
            default:null,
            type: cc.Label
        },
        imgSp:{
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //HomeCtrl.js
        global.event.on("showTips",this.showTips.bind(this));
        global.event.on("showGoldCoin",this.showGoldCoin.bind(this))
        global.event.on("showLove",this.showLove.bind(this));
    },

    showTips(){
        this.tipsNode.active = true;
    },

    closeTips(){
        //musicUtil.js
        global.event.fire("btnClick");
        this.tipsNode.active = false;
    },

    showGoldCoin(){
        this.goldCoinNode.active = true;
    },

    closeGoldCoin(){
        //musicUtil.js
        global.event.fire("btnClick");
        this.goldCoinNode.active = false;
    },

    shareGetCoin(){
        global.event.fire("btnClick");
        var coin = cc.sys.localStorage.getItem("goldCoin");
        cc.sys.localStorage.setItem("goldCoin",coin-0+10);
        this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
        cc.log("分享得金币");
    },

    uploadGetCoin(){
        global.event.fire("btnClick");
        var coin = cc.sys.localStorage.getItem("goldCoin");
        cc.sys.localStorage.setItem("goldCoin",coin-0+30);
        this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
        cc.log("上传得金币");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "selectImg","()V");
    },

    showLove(){
        this.loveNode.active = true;
    },

    colseLove(){
        global.event.fire("btnClick");
        this.loveNode.active = false;
    },

    getLove(event,data){
        global.event.fire("btnClick");
        // debugger
        cc.log(event+"data:"+data)
        var coin = cc.sys.localStorage.getItem("goldCoin");
        var love = cc.sys.localStorage.getItem("love");
        switch(data){
            case "60":
                cc.sys.localStorage.setItem("goldCoin",coin-60);
                cc.sys.localStorage.setItem("love",love-0+3);
                this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
                this.loveLabel.string = "x"+cc.sys.localStorage.getItem("love");
                break;
            case "90":
                cc.sys.localStorage.setItem("goldCoin",coin-90);
                cc.sys.localStorage.setItem("love",love-0+5);
                this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
                this.loveLabel.string = "x"+cc.sys.localStorage.getItem("love");
                break;
            case "140":
                cc.sys.localStorage.setItem("goldCoin",coin-140);
                cc.sys.localStorage.setItem("love",love-0+8);
                this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
                this.loveLabel.string = "x"+cc.sys.localStorage.getItem("love");
                break;
        }
    },

    setImgPath(filepath){
        var size = 0;
        var data = jsb.fileUtils.getDataFromFile(filepath);
        var spriteFrame = new cc.SpriteFrame(filepath);
        this.imgSp.spriteFrame = spriteFrame;
        cc.log("file size:" + size);
        var xhr = new XMLHttpRequest(); 
        //var xhr = new XMLHttpRequest();     public static final String SAVE_IMG = "http://www.dadpat.com/game/rhythm/img/save.do";
        xhr.open('POST', "http://www.dadpat.com/game/rhythm/img/save.do");
        xhr.setRequestHeader("Authorization", "9aaf11e89ac6d56758d0c2a12439c4edeyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzY4MTgwMzksInVzZXJJZCI6IjlhYWYxMWU4OWFjNmQ1Njc1OGQwYzJhMTI0MzljNGVkIiwibG9naW5OYW1lIjoiMTMyNTM1ODc2NjcifQ._Yv1jJSLY6S-LkV58He2PLflVjJBLYvNr8DVhciM_6M");
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.send(data);
        
        xhr.onreadystatechange = function () {  
            if (xhr.readyState == 4) {  
                if (xhr.status == 200) {  
                    var m = xhr.responseText;  
                    var response = xhr.responseText.substring(0, 100) + "...";  
                    cc.log (m);  
                }
            }  
        }
    },

    start () {

    },

    // update (dt) {},
});
