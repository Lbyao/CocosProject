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

    onLoad () {
        var that = this;

        this.bpNode.on(cc.Node.EventType.TOUCH_START,function() {
            this.musicNode.getComponent("MusicUtil").playB();
            this.bpNode.opacity = 255;
        },this);
        this.bpNode.on(cc.Node.EventType.TOUCH_END,function() {
            setTimeout(function() {
                that.bpNode.opacity = 0;
            },100);
            
        },this);

        this.spNode.on(cc.Node.EventType.TOUCH_START,function() {
            this.musicNode.getComponent("MusicUtil").playS();
            this.spNode.opacity = 255;
        },this);
        this.spNode.on(cc.Node.EventType.TOUCH_END,function() {
            setTimeout(function() {
                that.spNode.opacity = 0;
            },100);
            
        },this);

        this.tpNode.on(cc.Node.EventType.TOUCH_START,function() {
            this.musicNode.getComponent("MusicUtil").playT();
            this.tpNode.opacity = 255;
        },this);

        this.tpNode.on(cc.Node.EventType.TOUCH_END,function() {
            setTimeout(function() {
                that.tpNode.opacity = 0;
            },100);
        },this);
    },

    start () {

    },

    // update (dt) {},
});