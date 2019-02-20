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
        levelNodes:{
            default:[],
            type:cc.Node
        },
        spriteAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        sprites:{
            default:[],
            type:cc.SpriteFrame
        },
        progressNode:{
            default:null,
            type:cc.Node
        },
        testSprit:{
            default:null,
            type:cc.Sprite
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.levels = ["00","01","02","03","10","11","12","13","20","21","22","23","30","31","32","33","40","41","42","43"];
        // global.event.on("unlock",this.unLock.bind(this));

        // var spriteFrame = new cc.SpriteFrame('/storage/emulated/0/Huawei/MagazineUnlock/magazine-unlock-01-2.3.1253-_46A529DBACA459632333408E1C590DA2.jpg');
        // this.testSprit.spriteFrame = spriteFrame;

        var that = this;
        for(var i=0;i<20;i++){

            var result = cc.sys.localStorage.getItem("level"+this.levels[i]);
            cc.log("lock--"+result);
            if(result!=null){
                var info = JSON.parse(result);
                cc.log("lock--"+this.levels[i]+"score:"+info.score);
                this.levelNodes[i].getComponent(cc.Sprite).spriteFrame =  this.spriteAtlas.getSpriteFrame("img_main_"+this.levels[i]);

                if(info.simaple!=null){
                    this.levelNodes[i].getChildByName("lock_star_n_left").getComponent(cc.Sprite).spriteFrame = this.sprites[0];
                }
                if(info.common!=null){
                    this.levelNodes[i].getChildByName("lock_star_n_middle").getComponent(cc.Sprite).spriteFrame = this.sprites[1];
                }
                if(info.difficulty!=null){
                    this.levelNodes[i].getChildByName("lock_star_n_right").getComponent(cc.Sprite).spriteFrame = this.sprites[2];
                }
                // switch(JSON.parse(result).score){
                //     case 5:
                //         this.levelNodes[i].getChildByName("lock_star_n_left").getComponent(cc.Sprite).spriteFrame = this.sprites[0];
                //         break;
                //     case 8:
                //         this.levelNodes[i].getChildByName("lock_star_n_middle").getComponent(cc.Sprite).spriteFrame = this.sprites[1];
                //         break;
                //     case 12:
                //         this.levelNodes[i].getChildByName("lock_star_n_right").getComponent(cc.Sprite).spriteFrame = this.sprites[2];
                //         break;
                // }
            }

            this.levelNodes[i].on('touchend', function (event) {

                var love = cc.sys.localStorage.getItem("love");
                if(love>0){
                    var name = event.currentTarget.name;
                    console.log("Item " + name+ ' clicked');
                    name = name.substring(name.length-2,name.length);
                    console.log("Item " + name+ ' clicked');
                    cc.sys.localStorage.setItem("itemName",name);
                    
                    // var label = this.node.getComponent(cc.Label);
                    // cc.log(that.label.string); 
                    // Global.MusicName = that.label.string;
                    // this.downLoad(); 
                    // cc.log(cc.sys.localStorage.getItem("00")+"-----------getItem")
                    that.itemsid = that.getDownloadId(name);
                    cc.log("onLoad:"+that.itemsid);
                    cc.log(cc.sys.localStorage.getItem(that.itemsid)+"-----------getItem")
                    if(cc.sys.localStorage.getItem(that.itemsid)==null){
                        var fileName = that.itemsid+".zip";
                        var url = "http://www.dadpat.com/app/rhythm/"+fileName;
                        that.downFile2Local(url,fileName,function(params) {
                            cc.log(params);
                        });
                    }else{
                        cc.director.loadScene("game");
                    }
                    //homeCtrl.js
                    global.event.fire("pauseBg");
                    //musicUtil.js
                    global.event.fire("btnClick");
                    
                }else{
                    that.toastToJava("爱心不足无法开始游戏！");
                }   
            }, this);
        }
    },

    toastToJava:function(msg,isSuccess = false){
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            //js调用android原生方法 path:build/jsb-link/frameworks/runtime-src/proj.android-studio/app/src/org/cocos2dx/javascript/
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V", msg);
        }else if(cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("NativeJSForOC", "jsToast:isSuccess:", msg,isSuccess);
        }
    },

    getDownloadId(itemName) {
        var id;
        switch(itemName){
            case "0":
                id = '00'
                break;
            case "1":
                id = '01'
                break;
            case "2":
                id = '02'
                break;
            case "3":
                id = '03'
                break;
            default:
                id = '10'
                break;
        }
        return id;
    },

    start () {

    },

    downFile2Local:function(url, fileName, callback){
        // data/data/org.cocos2d.TestProject/file/fileName jsb.fileUtils.getWritablePath() + fileName
        var fullPath = "/storage/emulated/0/benbaba/节奏游戏/data/"+fileName;
        var that = this;
        // showModelLoadingDialog();//显示加载中模态框
        // this.loadingNode.opacity = 255;
        // this.loadLabel.string = "开始！";
        cc.log("fullPath:"+fullPath);
        this.downloader = new jsb.Downloader();
        this.downloader.createDownloadFileTask(url, fullPath,"");//创建下载任务
        this.downloader.setOnFileTaskSuccess(function(){   
            cc.log("下载成功!!"+"that.getDownloadId(that.itemID)"+that.itemsid+",itemid:"+that.itemsid);      
            // removeModelLoadingDialog();//删除加载中模态框
            cc.director.loadScene("game");
            that.progressNode.active = false;
            cc.sys.localStorage.setItem(that.itemsid,fullPath);
            if(callback){
                callback(fullPath);
            }
        });

        this.downloader.setOnTaskProgress(function(task, bytesReceived, totalBytesReceived, totalBytesExpected) {
            that.progressNode.active = true;
            cc.log("已下载完成的大小："+bytesReceived);
            cc.log("总大小:"+totalBytesReceived);
            cc.log("预期总大小:"+totalBytesExpected);
            cc.log("下载进度："+totalBytesReceived*1.0/totalBytesExpected);
            that.progressNode.getComponent(cc.ProgressBar).progress = totalBytesReceived*1.0/totalBytesExpected;
        });

        this.downloader.setOnTaskError(function(){  
            cc.log("下载失败!!");   
            // removeModelLoadingDialog();
            // showTips("文件下载失败！！！");
        });
        
    },


    // unLock(itemName){
    //     cc.log("unlock==="+itemName);
    //     var value = parseInt(itemName.substring(0))*4+parseInt(itemName.substring(1));
    //     cc.log("unlock value==="+value);
    //     // this.levelNodes[value].getComponent(cc.Sprite).spriteFrame =  this.spriteAtlas.getSpriteFrame("img_main_"+itemName);
    //     cc.log("unlock==="+itemName);
    //     cc.log("lock--"+"level"+itemName);
    //     cc.sys.localStorage.setItem("level"+itemName,"lock");
    // },
    // update (dt) {},
});
