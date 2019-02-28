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
        bgSprites:{
            default:null,
            type:cc.Sprite
        },
        animalSprites:{
            default:[],
            type:cc.SpriteFrame
        }
    },

    setScore(score,afterScore,itemName){
        this.score = score;
        this.afterScore = afterScore;
        this.itemName = itemName;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V", "successDialog:"+this.getAnimalNum(this.itemName));
        

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
    /**
     * 获取关卡对应的号码
     * @param {string} itemName 关卡id
     */
    getAnimalNum(itemName){
        var first = itemName.substring(0,1);
        var last = itemName.substring(1,2);
        var num1 = new Number(first);
        var num2 = new Number(last);
        return num1*4+num2;
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
        var unzipPath = cc.sys.localStorage.getItem("unzipPath");
        var path = unzipPath+"/"+this.itemName+"/"+"animal_voice.mp3"
        global.event.fire("setAnimalPath",path);
        global.event.fire("playTone","animal");

        // global.event.fire("playTone","success");
    },

    start () {
        this.bgSprites.spriteFrame = this.animalSprites[this.getAnimalNum(this.itemName)]

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
    },

    // update (dt) {},
});
