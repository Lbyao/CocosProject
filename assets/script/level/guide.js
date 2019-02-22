import global from "../global";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
//球的管理
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
        //Level.js
        global.event.on("loadJson",this.loadJson.bind(this));
        global.event.on("startGuideGame",this.startGame.bind(this));
        global.event.on("resetBallList",this.resetBallList.bind(this));
        //balljson.js
        global.event.on("GuideBallOver",this.ballOver.bind(this));
        this.ballNodeList = [];
    },

    startGame(score){
        var ballInfo;
        var speed;
        var that = this;
        this.position = 0;
        // this.music = music;
        cc.log(score);
        // this.musicNode.getComponent("MusicUtil").playMain();
        
    },

    loadJson(path){
        var ballInfo;
        var speed;
        // this.ballSize = 0;
        // this.missSize = 0;
        var that = this;
        this.success = false;
        global.event.on("ballOver",this.ballOver.bind(this));
        
            cc.loader.load(path,function (err,jsonAssest) {
                if (err) {
                    console.log(err);
                    return;
                }
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V",JSON.stringify(jsonAssest));
                that.loadSuccess();
                // that.startGame(music,score);
                that.success = true;
                cc.log("success="+that.success);
                //Level.js
                global.event.fire("loadSuccess",true);
                // JSON.stringify(jsonAssest)
                ballInfo = jsonAssest.data;
                speed = jsonAssest.speed;

                that.getMissBallSize(ballInfo);

                cc.log("ballinfo="+ballInfo.length+",speed:"+speed)
                that.newBall(ballInfo,speed); 
                
            });
        
    },

    getMissBallSize(ballInfo){
        this.ballSize = 0;
        for(let i=0;i<ballInfo.length;i++){
            if(ballInfo[i].tone !== "-"){
                this.ballSize++;
            }
        }
        //显示有点慢
        this.missSize = Math.round((this.ballSize*7)/20);
        //Level.js
        global.event.fire("missSize",this.missSize);
    },

    loadSuccess(){
        cc.log("加载完成！！！！！！！！！！");
    },

    resetGame (score) {
        this.resetBallList();
        this.startGame(score);
    },

    pauseGame (){
        for(let i=0;i<this.ballNodeList.length;i++){
            var ballNode = this.ballNodeList[i];
            if(cc.isValid(ballNode)){
                ballNode.getComponent("BallJson").setState(4);
            }
        }
    },

    resumeGame(){
        for(let i=0;i<this.ballNodeList.length;i++){
            var ballNode = this.ballNodeList[i];
            if(cc.isValid(ballNode)){
                ballNode.getComponent("BallJson").setState(2);
            }
        }
    },

    resetBallList() {
        for(let i=0;i<this.ballNodeList.length;i++){
            var ballNode = this.ballNodeList[i];
            if(cc.isValid(ballNode)){
                ballNode.getComponent("BallJson").setDead();
            }
        }
        this.ballNodeList.splice(0,this.ballNodeList.length-1);
    },

    newBall(ballInfo,speed) {
        
        var length = ballInfo.length;
        console.log(length);
        var i=0;
        var that = this;
        
        this.position = this.endNode.position.x+119;
        console.log("endNode:" + this.position)
        for(let i=0;i<length;i++){
            
            let datas = {
                "position":  this.position,
                "ballColor": ballInfo[i].tone,
                "interval": this.topNode.position.x - this.endNode.position.x
            };
            let ball;
            // console.log("position:"+position);
            switch(ballInfo[i].tone){
                case "B":
                    ball = cc.instantiate(that.ballPrefab);
                    ball.setPosition(this.position,this.bottomNode.position.y);
                    ball.parent = that.node;
                    ball.getComponent("BallJson").initData(datas);
                    this.ballNodeList.push(ball);
                    break;
                case "T":
                    ball = cc.instantiate(that.ballPrefab);
                    ball.setPosition(this.position,that.midNode.position.y);
                    ball.parent = that.node;
                    ball.getComponent("BallJson").initData(datas);
                    this.ballNodeList.push(ball);
                    break;
                case "S":
                    ball = cc.instantiate(that.ballPrefab);
                    ball.setPosition(this.position,that.topNode.position.y);
                    ball.parent = that.node;
                    ball.getComponent("BallJson").initData(datas);
                    this.ballNodeList.push(ball);
                    break;
            }
            this.position = (1000*60.0*0.42)/(speed*ballInfo[i].note*ballInfo[i].power*ballInfo[i].special)+this.position;
        }

        // while(true){
        //     console.log("current:"+this.music.getCurrentTime());
        //     if(this.music.getCurrentTime()>0){
        //         this.music.setCurrentTime(0);
        //         break;
        //     }
        // }
        
        global.event.fire("state",2);
    },

    getJsonLength(ballInfo){
        var length = 0;
        for(var item in ballInfo){
            length++;
        }

        return length;
    },

    ballOver(){
        this.ballSize--;
        cc.log(this.ballSize+"s:"+(this.ballSize=='0'));
        if(this.ballSize=='0'){
            //level.js
            global.event.fire("ballSuccessed");
        }
    },

    start () {

    },

    // update (dt) {},
});
