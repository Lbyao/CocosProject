// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import global from "./global"
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let level = cc.instantiate(this.levelPrefads[0]);
        level.parent = this.node;
        level.getComponent("Level").startGame();

        
        global.event.on("ball_grade",this.showGrade.bind(this));
    },

    showGrade(grades){
        var hideAction  = cc.hide()
        
        let grade = cc.instantiate(this.gradePrefab);
        grade.parent = this.node;
        grade.position = this.node.position;
        grade.scale = 0;
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
