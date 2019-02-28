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
        animalDialog:{
            default:null,
            type: cc.Node
        },
        animalContent:{
            default:null,
            type: cc.Label
        },
        animalId: "00",
        animalSprite: cc.Sprite,
        animalAtlas:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    playAnimalSound(){
        global.event.fire("btnClick");
        var unzipPath = cc.sys.localStorage.getItem("unzipPath");
        var path = unzipPath+"/"+this.animalId+"/"+"animal_voice.mp3";
        global.event.fire("setAnimalPath",path);
        global.event.fire("playTone","animal");
    },

    closeDialog(){
        global.event.fire("btnClick");
        global.event.fire("playTone","stopAnimal");
        this.animalDialog.active = false;
    },

    showDialog(){
        this.animalDialog.active = true;
    },

    start () {
        //blob.js
        global.event.on("showDialog",this.showDialog.bind(this));
        global.event.on("setAnimalID",this.setAnimalID.bind(this));
    },

    setAnimalID(animalId){
        this.animalId = animalId;
        this.animalContent.string = Global.animalContent[this.getIndex(this.animalId)];
        this.animalSprite.spriteFrame = this.animalAtlas.getSpriteFrame("img_card_"+this.animalId);
        this.showDialog();
    },

    getIndex(itemid){
        var first = itemid.substring(0,1);
        var last = itemid.substring(1,2);
        var num1 = new Number(first);
        var num2 = new Number(last);
        return num1*4+num2;
    },

    // update (dt) {},
});
