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
        modeNode:{
            default:null,
            type:cc.Sprite
        },
        sprites:{
            default:[],
            type:cc.SpriteFrame
        },
        starLabel:{
            default:null,
            type:cc.Label
        },
        goldCoinLabel:{
            default:null,
            type:cc.Label
        },
        loveLabel:{
            default:null,
            type:cc.Label
        },
        musicNode:{
            default:null,
            type:cc.Node
        },
        btdialogNode:{
            default:null,
            type:cc.Node
        },
        btNode:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    playBg(){
        
        this.music.setMainMusic('main_bgm.mp3');
        var id = this.music.playTone("main");
        this.music.loop(id);
    },

    pauseBg(){
        // let music = this.musicNode.getComponent("MusicUtil");
        // cc.log("this.music:"+this.music);
        // this.music.stopMain();
        //musicUtil.js
        global.event.fire("stopMain");
    },

    onLoad () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        //loginRewardDialog.js
        global.event.on("updateUI",this.updateCoinAndLove.bind(this));
        
        this.music = this.musicNode.getComponent("MusicUtil");
        //levelCtrl.js
        global.event.on("pauseBg",this.pauseBg.bind(this));
        this.playBg();
        var goldCoin = cc.sys.localStorage.getItem("goldCoin");
        var love = cc.sys.localStorage.getItem("love");
        var mode = cc.sys.localStorage.getItem("mode");
        var star = cc.sys.localStorage.getItem("star");
        if(goldCoin===null){
            cc.sys.localStorage.setItem("goldCoin",6666);
        }
        if(love === null){
            cc.sys.localStorage.setItem("love",1000);
        }
        if(star===null){
            cc.sys.localStorage.setItem("star",0);
        }
        if(mode===null){
            cc.sys.localStorage.setItem("mode",0);
        }

        this.starLabel.string = "x"+cc.sys.localStorage.getItem("star");
        this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
        this.loveLabel.string = "x"+cc.sys.localStorage.getItem("love");
    },

    updateCoinAndLove(){
        this.goldCoinLabel.string = "x"+cc.sys.localStorage.getItem("goldCoin");
        this.loveLabel.string = "x"+cc.sys.localStorage.getItem("love");
    },

    start () {

    },

    changeMode(){
        global.event.fire("btnClick");
        var mode = cc.sys.localStorage.getItem("mode")
        cc.log("mode:"+mode);
        switch(mode){
            case "0":
                this.modeNode.spriteFrame = this.sprites[1];
                cc.sys.localStorage.setItem("mode",1);
                cc.log("mode:opentooth");
                this.openBluetooth();
                this.btNode.active = true;
                break;
            case "1":
                cc.sys.localStorage.setItem("mode",0);
                this.modeNode.spriteFrame = this.sprites[0]
                this.btNode.active = false;
                break;
        }
    },
    /**
     * 打开蓝牙
     */
    openBluetooth(){
        cc.log("mode:opentooth in");
        this.names=[];
        this.addresss=[];
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openBluetooth","()V");
    },

    getBTList(){
        this.names=[];
        this.addresss=[];
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "searchBT","()V");
    },

    /**
     * 接收返回的蓝牙名称和地址
     * @param {String} btName 蓝牙名
     * @param {String} btAddress 蓝牙地址
     */
    setBluetoothList(btName,btAddress){
        // this.btName+=bts;
        
        this.names.push(btName);
        this.addresss.push(btAddress);
        if(btName=="Lmr"){
            this.address = btAddress;
        }
        // this.stringLabel.string = this.names.length;
        this.btdialogNode.getComponent('ListViewCtrl').destroyNode();
        this.btdialogNode.getComponent('ListViewCtrl').setBTList(this.names,this.addresss);
        this.btdialogNode.active = true;
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
            }else{
                isSuccess = true;
                // 连接鼓的socket成功了
            }
        }else{
            // 连接失败
        }
    },

    showTipsDialog(){
        //dialogCtrl.js
        global.event.fire("btnClick");
        global.event.fire("showTips");
    },

    showGoldCoinDialog(){
        //dialogCtrl.js
        global.event.fire("btnClick");
        global.event.fire("showGoldCoin");
    },

    showLoveDialog(){
        global.event.fire("btnClick");
        global.event.fire("showLove");
    },

    // update (dt) {},
    onKeyDown: function (event) {
        cc.log(event.keyCode);
        switch(event.keyCode) {

            case 6:
                // cc.game.restart();
                // cc.game.end();
                cc.log("点击返回按钮");
                break;
            case cc.macro.KEY.a:
                console.log('Press a key');
                break;
        }
    },

    onKeyUp: function (event) {
        cc.log(event.keyCode);
        switch(event.keyCode) {
            case 6:
                cc.log("点击返回按钮");
                break;
            case cc.macro.KEY.a:
                console.log('release a key');
                break;
        }
    }

});
