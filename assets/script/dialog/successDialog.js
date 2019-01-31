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
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        afterScoreLabel:{
            default:null,
            type:cc.Label
        },
        leftStart:{
            default:null,
            type:cc.Sprite
        },
        centerStart:{
            default:null,
            type:cc.Sprite
        },
        rightStart:{
            default:null,
            type:cc.Sprite
        },
    },

    setScore(score,afterScore){
        this.score = score;
        this.afterScore = afterScore;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scoreLabel.string = this.score;
        this.afterScoreLabel.string = this.afterScore;
    },

    nextLevel(){
        this.node.active = false;
        global.event.fire("btnClick");
        //Level.js
        global.event.fire("nextMusic");
    },

    restartGame(){
        this.node.active = false;
        global.event.fire("btnClick");
        //Level.js
        global.event.fire("resetGame");
    },

    animalSound(){
        global.event.fire("btnClick");
    },

    start () {

    },

    // update (dt) {},
});
