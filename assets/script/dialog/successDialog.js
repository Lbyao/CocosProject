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
        sprites:{
            default:[],
            type:cc.SpriteFrame
        },
    },

    setScore(score,afterScore,itemName){
        this.score = score;
        this.afterScore = afterScore;
        this.itemName = itemName;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scoreLabel.string = this.score;
        this.afterScoreLabel.string = this.afterScore;
        cc.log(this.itemName);
        var result = cc.sys.localStorage.getItem("level"+this.itemName);
        cc.log(result);
        var levelInfo = JSON.parse(result);

        if(levelInfo.simaple!=null){
            this.leftStart.spriteFrame = this.sprites[0];
        }
        if(levelInfo.common!=null){
            this.centerStart.spriteFrame = this.sprites[1];
        }
        if(levelInfo.difficulty!=null){
            this.rightStart.spriteFrame = this.sprites[2];
        }

        // switch(levelInfo.score){
        //     case 5:
        //         leftStart.getComponent(cc.Sprite).spriteFrame = this.sprites[0];
        //         break;
        //     case 8:
        //         centerStart.getComponent(cc.Sprite).spriteFrame = this.sprites[1];
        //         break;
        //     case 12:
        //         rightStart.getComponent(cc.Sprite).spriteFrame = this.sprites[2];
        //         break;
        // }
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


        // global.event.fire("setMainMusic","game_success.wav");
        // global.event.fire("playTone","main");

        global.event.fire("playTone","success");
    },

    start () {

    },

    // update (dt) {},
});
