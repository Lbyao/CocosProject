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
cc.Class({
    extends: cc.Component,

    properties: {
        levelPrefads:{
            default:[],
            type: cc.Prefab
        },
        gradePrefab: {
            default: null,
            type: cc.Prefab
        },
        gameLevelPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.log("name:"+Global.MusicName);
        //BallJson.js
        global.event.on("ball_grade",this.showGrade.bind(this));
        // game_level.js
        global.event.on("start_game",this.startGame.bind(this));      
        //connectFailDialog.js
        global.event.on("connect",this.connectDrum.bind(this));  
    },

    start () {
        var mode = cc.sys.localStorage.getItem("mode");
        this.level = cc.instantiate(this.levelPrefads[0]);
            this.level.parent = this.node;
        if(mode == 0){
            this.showGameLevel();
        }else{
            this.connectDrum();
        }
    },
    showGameLevel() {
        this.gameLevel = cc.instantiate(this.gameLevelPrefab);
        this.gameLevel.parent = this.node;
        this.gameLevel.position = this.node.position;
        // gameLevel.getComponent("game_level")
    },

    startGame(score) {
        var love = cc.sys.localStorage.getItem("love");
        cc.sys.localStorage.setItem("love",love-1);
        //gameLevel.js
        // global.event.fire("setActive",0);
        //level.js
        global.event.fire("startGame",score);
        // this.level.getComponent("Level").startGame(score);
    },

    showGrade(clickGrade){
        // var hideAction  = cc.hide()
        
        let grade = cc.instantiate(this.gradePrefab);
        grade.parent = this.node;
        grade.position = this.node.position;
        grade.scale = 0;
        grade.getComponent("grade").initView(clickGrade);
        // let scaleTo = ;
        var finished = cc.callFunc((grade)=>{
            grade.runAction(cc.scaleTo(0, 0).easing(cc.easeBounceIn()))
        },this,grade)
        let scaleTo = cc.sequence(cc.scaleTo(1, 1).easing(cc.easeBounceOut()),finished);
        grade.runAction(scaleTo);
    },

    /**
     * 连接鼓
     */
    connectDrum(){
        //缺少加载动画
        var address =  cc.sys.localStorage.getItem("BTAddress");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "connectDrum","(Ljava/lang/String;)V", address);
    },

    /**
     * 接收原生返回的socket消息
     * @param {string} msg stringjson消息
     */
    setMsg(msg){
        var result = JSON.parse(msg);
        var action = result.action;
        var resultCode = result.body.result_code;

        if (resultCode!=-1) {
            //isSuccess没声明
            if (action=="ryth_game" && isSuccess) {
                // 接收的打击的节拍
                var tone = result.body.tone;
                //Drum.js
                global.event.fire("drumClick",tone);
            }else{
                isSuccess = true;
                // 连接鼓的socket成功了
                this.showGameLevel();
            }
        }else{
            // 连接失败
        }
    },

    showFailDialog(){
        //connectFailDialog.js
        global.event.fire("showDialog");
    },

    onDestroy(){
        // global.event.off("ball_grade",this.showGrade)
        
        // cc.Game.EVENT_HIDE
    }
    // update (dt) {},
});
