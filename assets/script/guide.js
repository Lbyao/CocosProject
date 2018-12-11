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
        ballPrefab: {
            default: null,
            type: cc.Prefab
        },
        topNode: {
            default:null,
            type : cc.Node
        },
        midNode: {
            default:null,
            type : cc.Node
        },
        bottomNode: {
            default:null,
            type : cc.Node
        },
        endNode: {
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
    //    this.play();
    //    console.log("in newBall"+ballInfo)
    //    this.newBall(ballInfo,speed);
    },

    startGame(){
        var ballInfo;
        var speed;
        var that = this;
        this.position = 0;
        // this.musicNode.getComponent("MusicUtil").playMain();
        cc.loader.loadRes("json/json_difficulty",function (err,jsonAssest) {
            if (err) {
                console.log(err);
                return;
            }
            ballInfo = jsonAssest.json.data;
            speed = jsonAssest.json.speed;
            console.log("ballinfo="+ballInfo+",speed:"+speed)
            that.newBall(ballInfo,speed); 
       });
    },

    resetGame () {
        this.startGame();
    },

    newBall(ballInfo,speed) {
        let ball;
        var length = this.getJsonLength(ballInfo);
        console.log(length);
        var i=0;
        var that = this;
        this.position = this.endNode.position.x;
        // console.log("endNode:" + position)
        for(let i=0;i<length;i++){
            let datas = {
                "position":  this.position,
                "ballColor": ballInfo[i].tone,
                "interval": this.topNode.position.x - this.endNode.position.x
            };
           
            // console.log("position:"+position);
            switch(ballInfo[i].tone){
                case "B":
                    ball = cc.instantiate(that.ballPrefab);
                    ball.setPosition(this.position,this.bottomNode.position.y);
                    ball.parent = that.node;
                    ball.getComponent("BallJson").initData(datas);
                    break;
                case "T":
                    ball = cc.instantiate(that.ballPrefab);
                    ball.setPosition(this.position,that.midNode.position.y);
                    ball.parent = that.node;
                    ball.getComponent("BallJson").initData(datas);
                    break;
                case "S":
                    ball = cc.instantiate(that.ballPrefab);
                    ball.setPosition(this.position,that.topNode.position.y);
                    ball.parent = that.node;
                    ball.getComponent("BallJson").initData(datas);
                    break;
            }
            this.position = (1000*60.0*0.48)/(speed*ballInfo[i].note*ballInfo[i].power*ballInfo[i].special)+this.position;
        }
    },

    getJsonLength(ballInfo){
        var length = 0;
        for(var item in ballInfo){
            length++;
        }

        return length;
    },

    showToast(){
        
    },

    start () {

    },

    // update (dt) {},
});
