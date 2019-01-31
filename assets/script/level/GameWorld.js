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
        levelPrefads:{
            default:[],
            type: cc.Prefab
        },
        gradePrefab: {
            default: null,
            type: cc.Prefab
        },
        gameLevelPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("name:"+Global.MusicName);
        this.level = cc.instantiate(this.levelPrefads[0]);
        this.level.parent = this.node;
        this.showGameLevel();
        //BallJson.js
        global.event.on("ball_grade",this.showGrade.bind(this));
        // .js
        global.event.on("start_game",this.startGame.bind(this));

        // addEscEvent = function(node){
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.KEYBOARD,
        //         onKeyPressed:  function(keyCode, event){
        //             cc.game.end();
        //             // cc.hb.uiMgr.openPanel("Hall/alertBox/AlertBox",cc.hb.alertMgr.ANIMATE_CENTENT,"确认退出游戏吗？",function(success){
        //             //         if (success){}
        //             //     }
        //             // );
        //         },
        //         onKeyReleased: function(keyCode, event){
        //             if(keyCode == cc.KEY.back){
        //                 cc.log("")
        //             }
        //         }
        //     }, node);
        // }

    },

    showGameLevel() {
        this.gameLevel = cc.instantiate(this.gameLevelPrefab);
        this.gameLevel.parent = this.node;
        this.gameLevel.position = this.node.position;
        // gameLevel.getComponent("game_level")
    },

    startGame(score) {
        var love = cc.sys.localStorage.getItem("love");
        cc.sys.localStorage.setItem("love",love-1);
        //gameLevel.js
        // global.event.fire("setActive",0);
        //level.js
        global.event.fire("startGame",score);
        // this.level.getComponent("Level").startGame(score);
    },

    showGrade(clickGrade){
        // var hideAction  = cc.hide()
        
        let grade = cc.instantiate(this.gradePrefab);
        grade.parent = this.node;
        grade.position = this.node.position;
        grade.scale = 0;
        grade.getComponent("grade").initView(clickGrade);
        // let scaleTo = ;
        var finished = cc.callFunc((grade)=>{
            grade.runAction(cc.scaleTo(0, 0).easing(cc.easeBounceIn()))
        },this,grade)
        let scaleTo = cc.sequence(cc.scaleTo(1, 1).easing(cc.easeBounceOut()),finished);
        grade.runAction(scaleTo);
    },

    start () {

    },

    onDestroy(){
        // global.event.off("ball_grade",this.showGrade)
    }
    // update (dt) {},
});
