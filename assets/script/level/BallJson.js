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
const BallState = {
    Invalid: -1,
    MissState: 0,
    SuccessState: 1,
    RunState: 2,
    DeadState: 3,
    PauseState: 4
}
cc.Class({
    extends: cc.Component,

    properties: {

        spriteAtlas: {
            default: null,
            type: cc.SpriteAtlas
        }

    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.state = BallState.Invalid;
        this.runTime = 0;
        this.cha = 0;
        //Drum.js
        global.event.on("click_drum", this.clickDrum.bind(this));
        global.event.on("state", this.setState.bind(this));
    },

    initData(data) {
        // this.runTime = 0;
        this.time = data.position;
        this.tone = data.ballColor;
        this.interval = data.interval;
        // console.log(this.interval)

        switch (data.ballColor) {
            case "B":
                this.color = "game_pic_ball_pink";
                break;
            case "T":
                this.color = "game_pic_ball_yellow";
                break;
            case "S":
                this.color = "game_pic_ball_blue";
                break;
        }
        var sprite = this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteAtlas.getSpriteFrame(this.color);
        // let spriteFrame = this.spriteAtlas.getSpriteFrame(this.color);
        // this.node.spriteFrame  = spriteFrame;
        this.setState(BallState.PauseState)
    },

    setState(state) {
        var that = this;
        if (this.state == state) {
            return;
        }

        switch (state) {
            case BallState.Invalid:
                this.state = BallState.Invalid;
                break;
            case BallState.MissState:
                console.log("miss")
                // setTimeout(function () {
                //     cc.log("destroy")
                //     that.node.destroy();
                //   }.bind(this), 1000);
                global.event.fire("ball_grade", "miss");
                this.state = BallState.MissState;
                global.event.fire("ball_in", "miss");
                break;
            case BallState.SuccessState: 
                //level.js
                global.event.fire("addSorce");
                // GameWorld.js
                global.event.fire("ball_grade", "perfect");
                //Drum.js
                global.event.fire("ball_in", "success");
                this.state = BallState.SuccessState;
                var action = cc.fadeOut(0.2);
                var sequence = cc.sequence(action, cc.callFunc(() => {
                    that.node.active = false;
                }));
                this.node.runAction(sequence);
                // this.node.active = false;
                // setTimeout(function () {
                //     that.node.destroy();
                //   }.bind(this), 1000);
                break;
            case BallState.RunState:
                this.state = BallState.RunState;
                break;
            case BallState.DeadState:
                this.state = BallState.DeadState;
                that.node.active = false;
                break;
            case BallState.PauseState:
                this.state = BallState.PauseState;
            default:
                break;
        }
        return state;
    },
    // update中的方法每一帧都会执行
    update(dt) {
        this.runTime += dt;

        if (this.node.position.x < -635) {
            this.node.active = false;
        }
        if (this.node.position.x > 635) {
            this.node.opacity = 0;
        } else {
            this.node.opacity = 255;
        }
        if (this.state !== BallState.PauseState) {
            this.node.setPosition(this.node.position.x - dt * 1000 * 0.42, this.node.position.y);
        }

        if (this.node.position.x < -500 && this.state === BallState.RunState) {
            this.setState(BallState.MissState);
        }

        if (this.node.position.x > -485 && this.node.position.x < -420 && this.state === BallState.RunState) {
            global.event.fire("ball_in", this.tone);
        }
        //调整小球的位置
        // this.position(dt)
    },

    clickDrum(data) {
        if (this.state === BallState.RunState) {
            if (this.tone === data && this.node.position.x > -485 && this.node.position.x < -420) {
                switch (data) {
                    case "B":
                        this.setState(BallState.SuccessState);
                        break;
                    case "T":
                        this.setState(BallState.SuccessState);
                        break;
                    case "S":
                        this.setState(BallState.SuccessState);
                        break;
                }
            }
        }

    },
    setDead() {
        cc.log("setDead")
        if (this.state != BallState.DeadState) {
            this.setState(BallState.DeadState);
        }
    }
});