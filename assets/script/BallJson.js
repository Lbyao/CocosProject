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

        // cc.loader.load(cc.url.raw("resources/audio/bgm_easy.wav"),callback());

        // cc.loader.loadRes("json/json_easy",function (err,jsonAssest) {
        //     stringJson(JSON.stringify(jsonAssest))
        // });   
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
                this.state = BallState.MissState;
                break;
            case BallState.SuccessState:
                this.state = BallState.SuccessState;
                break;
            case BallState.RunState:
                
                break;
            default:
                break;
        }

        return state;
    },

    setBallColor(){
        
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
        if(this.node.position.x<-485){
            this.setState(BallState.MissState);
        }
                // console.log("this.time:"+this.time+",this.node.position:"+this.node.position)

        

        switch (this.state) {
            case BallState.RunState:
                
                break;
            case BallState.SuccessState:
                this.node.active = false;
                // this.musicNode.getComponent("MusicUtil").playTone(this.tone);
                break;
            case BallState.MissState:
                break;
            default:
                break;
        }
        //调整小球的位置
        // this.position(dt)
    },

    clickDrum (data){
        // console.log(data+",this.node.position.x:"+this.node.position.x);
        if(this.node.position.x>-485 && this.node.position.x<-420){
            switch(data){
                case "B":
                    // console.log("B");
                    // this.musicNode.getComponent("MusicUtil").playB();
                    this.setState(BallState.SuccessState);
                    break;
                case "T":
                    // console.log("T");
                    // this.musicNode.getComponent("MusicUtil").playT();
                    this.setState(BallState.SuccessState);
                    break;
                case "S":
                    // console.log("S");
                    // this.musicNode.getComponent("MusicUtil").playS();
                    this.setState(BallState.SuccessState);
                    break;
            }
        }
    }
});

function stringJson(stringJson) {
    console.log(stringJson); 
} 

function callback(){
    console.log("返回");
}


