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
        simpleNode:{
            default: null,
            type: cc.Node
        },
        commonNode: {
            default: null,
            type: cc.Node
        },
        hardNode: {
            default: null,
            type: cc.Node
        },
        simplePNode:{
            default: null,
            type: cc.Node
        },
        commonPNode: {
            default: null,
            type: cc.Node
        },
        hardPNode: {
            default: null,
            type: cc.Node
        },
        startNode: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var score=0;
        var that = this;
        this.simpleNode.on(cc.Node.EventType.TOUCH_START,function() {
            global.event.fire("btnClick");
            that.simpleNode.opacity = 0;
            that.simplePNode.opacity = 255;
            that.commonNode.opacity = 255;
            that.commonPNode.opacity = 0;
            that.hardNode.opacity = 255;
            that.hardPNode.opacity = 0;
            score = 5;
        },this);
        this.commonNode.on(cc.Node.EventType.TOUCH_START,function() {
            global.event.fire("btnClick");
            that.simpleNode.opacity = 255;
            that.simplePNode.opacity = 0;
            that.commonNode.opacity = 0;
            that.commonPNode.opacity = 255;
            that.hardNode.opacity = 255;
            that.hardPNode.opacity = 0;
            score = 8;
        },this);
        this.hardNode.on(cc.Node.EventType.TOUCH_START,function() {
            global.event.fire("btnClick");
            that.simpleNode.opacity = 255;
            that.simplePNode.opacity = 0;
            that.commonNode.opacity = 255;
            that.commonPNode.opacity = 0;
            that.hardNode.opacity = 0;
            that.hardPNode.opacity = 255;
            score = 12;
        },this);
        this.startNode.on(cc.Node.EventType.TOUCH_START,function() {
            global.event.fire("btnClick");
            cc.log(score)
            if(score>0){
                //GameWorld.js
                global.event.fire("start_game",score);
                that.node.active = false;
            }
        },this);

        global.event.on("setActive",this.setActive.bind(this));
    },

    setActive(result){
        this.node.active = result;
    },

    start () {

    },

    // update (dt) {},
});
