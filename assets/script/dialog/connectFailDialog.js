import global from "../global";

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
        dialogNode:{
            default:null,
            type:cc.Node
        }
    },

    closeDialog(){
        this.dialogNode.active = false;
    },

    complet(){
        // 重连操作
        global.event.fire("connect");
        this.closeDialog();
    },

    showDialog(){
        this.dialogNode.active = true;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //GameWorld.js
        global.event.on("showDialog",this.showDialog.bind(this));
    },

    // start () {},

    // update (dt) {},
});
