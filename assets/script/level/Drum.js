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

        bnNode: {
            default: null,
            type: cc.Node
        },

        tnNode: {
            default: null,
            type: cc.Node
        },

        snNode: {
            default: null,
            type: cc.Node
        },

        bpNode: {
            default: null,
            type: cc.Node
        },

        tpNode: {
            default: null,
            type: cc.Node
        },

        spNode: {
            default: null,
            type: cc.Node
        },

        musicNode: {
            default: null,
            type: cc.Node
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var that = this;

        this.bpNode.on(cc.Node.EventType.TOUCH_START, function () {
            global.event.fire("click_drum", "B");
            this.musicNode.getComponent("MusicUtil").playB();
            this.fadeIn(this.bpNode);
        }, this);
        this.bpNode.on(cc.Node.EventType.TOUCH_END, function () {
            this.fadeOut(this.bpNode);
        }, this);

        this.spNode.on(cc.Node.EventType.TOUCH_START, function () {
            global.event.fire("click_drum", "S");
            this.musicNode.getComponent("MusicUtil").playS();
            this.fadeIn(this.spNode);
        }, this);
        this.spNode.on(cc.Node.EventType.TOUCH_END, function () {
            this.fadeOut(this.spNode);
        }, this);

        this.tpNode.on(cc.Node.EventType.TOUCH_START, function () {
            global.event.fire("click_drum", "T");
            this.musicNode.getComponent("MusicUtil").playT();
            this.fadeIn(this.tpNode);
        }, this);

        this.tpNode.on(cc.Node.EventType.TOUCH_END, function () {
            this.fadeOut(this.tpNode)
        }, this);

        global.event.on("ball_in", this.ballIn.bind(this));
    },

    ballIn(tone) {
        switch (tone) {
            case "B":
                this.fadeIn(this.bnNode);
                break;
            case "T":
                this.fadeIn(this.tnNode);
                break;
            case "S":
                this.fadeIn(this.snNode);
                break;
            case "miss":
                this.fadeOut(this.bnNode)
                this.fadeOut(this.tnNode)
                this.fadeOut(this.snNode)
                break;
            case "success":
                this.fadeOut(this.bnNode)
                this.fadeOut(this.tnNode)
                this.fadeOut(this.snNode)
                break;
            default:
                break;
        }
    },
    /**
     * 渐进的动画
     * @param {cc.Node} node 节点
     */
    fadeIn(node){
        var action = cc.fadeIn(0.1);
        var sequence = cc.sequence(action, cc.callFunc(() => {
            node.opacity = 255;
        }));
        node.runAction(sequence);
    },
    /**
     * 渐出的动画
     * @param {cc.Node} node 节点 
     */
    fadeOut(node){
        var action = cc.fadeOut(0.1);
        var sequence = cc.sequence(action, cc.callFunc(() => {
            node.opacity = 0;
        }));
        node.runAction(sequence);
    },

    start() {

    },

    // update (dt) {},
});