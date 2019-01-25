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
        animal00:{
            default:null,
            type: cc.Animation
        },
        animal01:{
            default:null,
            type: cc.Animation
        },
        animal02:{
            default:null,
            type: cc.Animation
        },
        animal03:{
            default:null,
            type: cc.Animation
        },
        animal10:{
            default:null,
            type: cc.Animation
        },
        animal11:{
            default:null,
            type: cc.Animation
        },
        animal12:{
            default:null,
            type: cc.Animation
        },
        animal13:{
            default:null,
            type: cc.Animation
        },
        animal20:{
            default:null,
            type: cc.Animation
        },
        animal21:{
            default:null,
            type: cc.Animation
        },
        animal22:{
            default:null,
            type: cc.Animation
        },
        animal23:{
            default:null,
            type: cc.Animation
        },
        animal30:{
            default:null,
            type: cc.Animation
        },
        animal31:{
            default:null,
            type: cc.Animation
        },
        animal32:{
            default:null,
            type: cc.Animation
        },
        animal33:{
            default:null,
            type: cc.Animation
        },
        animal40:{
            default:null,
            type: cc.Animation
        },
        animal41:{
            default:null,
            type: cc.Animation
        },
        animal42:{
            default:null,
            type: cc.Animation
        },
        animal43:{
            default:null,
            type: cc.Animation
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // animal1.playOnLoad();
        this.animal00.play("card");
        this.animal10.play("card");
        this.animal20.play("card");
        this.animal30.play("card");
        this.animal40.play("card");
        // this.animal2.play("card2");
        // this.animal3.play("card3");
        // this.animal4.play("card4");

        this.scheduleTime(this.animal01,"card2",0.2);
        this.scheduleTime(this.animal11,"card2",0.2);
        this.scheduleTime(this.animal21,"card2",0.2);
        this.scheduleTime(this.animal31,"card2",0.2);
        this.scheduleTime(this.animal41,"card2",0.2);
        this.scheduleTime(this.animal02,"card3",0.4);
        this.scheduleTime(this.animal12,"card3",0.4);
        this.scheduleTime(this.animal22,"card3",0.4);
        this.scheduleTime(this.animal32,"card3",0.4);
        this.scheduleTime(this.animal42,"card3",0.4);
        this.scheduleTime(this.animal03,"card4",0.6);
        this.scheduleTime(this.animal13,"card4",0.6);
        this.scheduleTime(this.animal23,"card4",0.6);
        this.scheduleTime(this.animal33,"card4",0.6);
        this.scheduleTime(this.animal43,"card4",0.6);
    },

    // timeCallback(dt) {
    //     cc.log("time: " + dt);
    //     // animal.play(name);
    // },

    scheduleTime(animal,name,time){
        var timeCallback = function (dt) {
            cc.log("time: " + dt);
            animal.play(name);
        }
        this.scheduleOnce(timeCallback, time);
    },

    start () {

    },

    // update (dt) {},
});
