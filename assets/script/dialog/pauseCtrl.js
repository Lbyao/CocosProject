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
        levelNode:{
            default:null,
            type: cc.Node
        },
        pauseNode:{
            default:null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.event.on("showPause",this.pause.bind(this));
    },

    pause(){
        this.pauseNode.active = true;
    },

    back(){
        this.levelNode.getComponent("Level").backHome();
        this.pauseNode.active = false;
    },

    restart(){
        this.levelNode.getComponent("Level").resetGame();
        this.pauseNode.active = false;
    },

    resume(){
        this.levelNode.getComponent("Level").resumeGame();
        this.pauseNode.active = false;
    },

    // start () {},

    // update (dt) {},
});
