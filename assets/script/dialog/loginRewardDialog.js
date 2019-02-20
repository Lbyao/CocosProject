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

cc.Class({
    extends: cc.Component,

    properties: {
        loginRewardDialog:{
            default:null,
            type:cc.Node
        },
        rewardsSprite:{
            default:[],
            type:cc.Sprite
        },
        spriteFrames: {
            default: [],
            type: cc.SpriteFrame
        },
        loginDay: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.param = "";
        this.CheckInDisplay();
    },

    getReward(){
        cc.sys.localStorage.setItem("checkin",JSON.stringify(this.param));
        this.loginRewardDialog.active = false;
        if(this.loginDay==6){
            for (let index = 0; index < 7; index++) {
                this.param.days[index].day = false;
                break;
            }
        }
        switch(this.loginDay){
            case 0:
                var coin = cc.sys.localStorage.getItem("goldCoin");
                cc.sys.localStorage.setItem("goldCoin",coin-0+5);
                break;
            case 1:
                var coin = cc.sys.localStorage.getItem("goldCoin");
                cc.sys.localStorage.setItem("goldCoin",coin-0+15);
                break;
            case 2:
                var love = cc.sys.localStorage.getItem("love");
                cc.sys.localStorage("love",love-0+1);
                break;
            case 3:
                var coin = cc.sys.localStorage.getItem("goldCoin");
                cc.sys.localStorage.setItem("goldCoin",coin-0+35);
                break;
            case 4:
                var coin = cc.sys.localStorage.getItem("goldCoin");
                cc.sys.localStorage.setItem("goldCoin",coin-0+60);
                break;
            case 5:
                var love = cc.sys.localStorage.getItem("love");
                cc.sys.localStorage("love",love-0+3);
                break;
            case 6:
                var love = cc.sys.localStorage.getItem("love");
                cc.sys.localStorage("love",love-0+3);
                var coin = cc.sys.localStorage.getItem("goldCoin");
                cc.sys.localStorage.setItem("goldCoin",coin-0+100);
                break;
        }

        global.event.fire("updateUI");
    },

    // start () {},

    CheckInDisplay(){
        cc.log(",date:");
        var mydate = new Date();
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V","date");
        var checkin = cc.sys.localStorage.getItem("checkin");
        if(checkin!=null){
            this.param = JSON.parse(checkin);
            if(this.param.isCheck !== this.getyyyyMMdd(mydate)){
                for (let index = 0; index < 7; index++) {
                    if(this.param.days[index].day){
                        this.param.days[index].day = true;
                        this.param.isCheck = this.getyyyyMMdd(mydate);
                        this.loginDay = index;
                        this.rewardsSprite[index].spriteFrame = this.spriteFrames[index];
                        break;
                    }
                }
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V","未签到");
                this.loginRewardDialog.active = true;
                
            }else{
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V","签到过了");
            }
        }else{
            var CheckInParam = {
                'days':[{'day':false},{'day':false},{'day':false},{'day':false},{'day':false},{'day':false},{'day':false}],
                'isCheck': "null"
            };
            CheckInParam.days[0].day = true;
            CheckInParam.isCheck = this.getyyyyMMdd(mydate);
            this.param = CheckInParam;
            this.loginRewardDialog.active = true;
            // cc.sys.localStorage.setItem("checkin",JSON.stringify(CheckInParam));
            // cc.log(CheckInParam.isCheck+"+"+CheckInParam.days[0].day+",date:"+mydate);
        }

    },
    /**
     * 格式化时间-->yyyyMMdd
     * @param {Date} d 
     */
    getyyyyMMdd(d){
        // var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; 
        var curr_year = d.getFullYear();
        String(curr_month).length < 2 ? (curr_month = "0" + curr_month): curr_month;
        String(curr_date).length < 2 ? (curr_date = "0" + curr_date): curr_date;
        var yyyyMMdd = curr_year + "" + curr_month +""+ curr_date;
        return yyyyMMdd;
    }

    // update (dt) {},
});
