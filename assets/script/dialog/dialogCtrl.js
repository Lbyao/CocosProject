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
        this.tipsNode.active = false;
    },

    showGoldCoin(){
        this.goldCoinNode.active = true;
    },

    closeGoldCoin(){
        this.goldCoinNode.active = false;
    },

    shareGetCoin(){
        cc.log("分享得金币");
    },

    uploadGetCoin(){
        cc.log("上传得金币");
    },

    showLove(){
        this.loveNode.active = true;
    },

    colseLove(){
        this.loveNode.active = false;
    },

    getLove(event,data){
        // debugger
        cc.log(event+"data:"+data)
        var coin = cc.sys.localStorage.getItem("goldCoin");
        var love = cc.sys.localStorage.getItem("love");
        switch(data){
            case "60":
                cc.sys.localStorage.setItem("goldCoin",coin-60);
                cc.sys.localStorage.setItem("love",love+3);
                break;
            case "90":
                cc.sys.localStorage.setItem("goldCoin",coin-90);
                cc.sys.localStorage.setItem("love",love+5);
                break;
            case "140":
                cc.sys.localStorage.setItem("goldCoin",coin-140);
                cc.sys.localStorage.setItem("love",love+8);
                break;
        }
    },

    start () {

    },

    // update (dt) {},
});
