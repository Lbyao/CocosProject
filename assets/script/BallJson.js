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
const BallState = {
    Invalid: -1,
    MissState : 0,
    SuccessState: 1,
    RunState : 2
}
cc.Class({
    extends: cc.Component,
    
    properties: {

        spriteAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        musicNode: {
            default: null,
            type: cc.Node
        }
        
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = BallState.Invalid;
        this.runTime = 0;
        this.cha = 0;
        global.event.on("click_drum",this.clickDrum.bind(this));
        this.ballNodeList = [];

        
    },
    
    start () {

    },

    initData(data){
        // this.runTime = 0;
        this.time = data.position;
        this.tone = data.ballColor;
        this.interval = data.interval;
        // console.log(this.interval)
    
        switch(data.ballColor){
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
        this.setState(BallState.RunState)
        this.ballNodeList.push(this.node);
    },

    setState (state) {
        if (this.state == state) {
            return;
        }

        switch(state){
            case BallState.Invalid:
                break;
            case BallState.MissState:
                console.log("miss")
                global.event.fire("ball_grade","miss");
                this.state = BallState.MissState;
                break;
            case BallState.SuccessState:
                global.event.fire("ball_grade","perfect");
                this.state = BallState.SuccessState;
                this.node.active = false;
                break;
            case BallState.RunState:
                
                break;
            default:
                break;
        }

        return state;
    },
    // update中的方法每一帧都会执行
    update (dt) {
        this.runTime += dt;
        // console.log(dt+"this.s:"+this.s)
        // console.log("this.node.position.x:"+this.node.position.x)
        // this.node.position.x = this.node.position.x ;
        if(this.node.position.x<-635){
            this.node.active = false;
        }
        if(this.node.position.x>635){
            this.node.opacity = 0;
        }else{
            this.node.opacity = 255;
        }
        this.node.setPosition(this.node.position.x- dt*1000*0.48,this.node.position.y);
        if(this.node.position.x<-485&&this.state!=BallState.MissState){
            this.setState(BallState.MissState);
        }
        //调整小球的位置
        // this.position(dt)
    },

    clickDrum (data){
        if(this.node.position.x>-485 && this.node.position.x<-420){
            switch(data){
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
    },

    onDestroy (){
        for (let i = 0; i< this.ballNodeList.length; i++) {          
            this.ballNodeList[i].active = false
        }
    }
});


