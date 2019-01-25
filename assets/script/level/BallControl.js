// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var ballInfo = [];

var speed = 0;

var gameInfoList = [];

var index = 0;

cc.Class({
    extends: cc.Component,

    properties: {

            ballPrefab: {
                default: null,
                type: cc.Prefab
            }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes("json/json_easy",function (err,jsonAssest) {
             ballInfo = jsonAssest.json.data;
             speed = jsonAssest.json.speed;
            //  console.log("ballinfo="+ballInfo[0].note+",speed:"+speed)
        });
    },

    addOneBall(dt){
        this.balltime += dt;
        // let balldata = this["json/json_easy"];
        // // let ballkeys = Object.keys(balldata);
        // let data = balldata.data;
        // let speed = balldata.speed;
        //  console.log("ballinfo="+ballInfo[index].note+",speed:"+speed)
        // console.log(ballInfo)
        if(ballInfo.length>0){
            let note = ballInfo[0].note;
            // console.log("ballinfo="+note+",speed:"+speed)
            let power = ballInfo[0].power;
            let special = ballInfo[0].special;
            let tone = ballInfo[0].tone;
            let time = speed*60/(note*power*special)
            let ballColor = "game_pic_ball_blue";
            switch (tone) {
                case "B":
                    ballColor = "game_pic_ball_blue";
                    break;
                case "T":
                    ballColor = "game_pic_ball_pink";
                    break;
                case "S":
                    ballColor = "game_pic_ball_yellow";
                    break;
                default:
                    break;
            }
            let datas = {
                "position": time,
                "ballColor": ballColor,
            };
            if (this.balltime>=time&&index<ballInfo.length-1) {
                this.balltime = 0;
                index += 1;
                this.addBallNode(datas);
            }
        }
    
    },

    addBallNode(data){
        let ballNode = cc.instantiate(this.ballPrefab);
        ballNode.parent = this.node;
        ballNode.getComponent("BallJson").initData(data);
    },

    start () {
        
    },

    update (dt) {
        this.addOneBall(dt)
        // gameInfoList.forEach(e => {
        //     console.log(e.time)
        // }) ;         
    },
   
});
