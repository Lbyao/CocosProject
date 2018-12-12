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
        spriteAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    initView(grade) {
        var sprite = this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteAtlas.getSpriteFrame(grade);
    },

    start () {

    },

    // update (dt) {},
});
