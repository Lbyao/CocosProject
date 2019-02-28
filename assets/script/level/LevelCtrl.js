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
        
    },

    start () {
        this.unLockLevels();
        // global.event.on("unlock",this.unLock.bind(this));
        this.downloadLevels();
    },

    unLockLevels(){
        this.levels = ["00","01","02","03","10","11","12","13","20","21","22","23","30","31","32","33","40","41","42","43"];

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
            }

            this.levelNodes[i].on('touchend', function (event) {

                var love = cc.sys.localStorage.getItem("love");
                if(love>0){
                    var name = event.currentTarget.name;
                    console.log("Item " + name+ ' clicked');
                    name = name.substring(name.length-2,name.length);
                    console.log("Item " + name+ ' clicked');
                    cc.sys.localStorage.setItem("itemName",name);
                    that.itemsid = name;
                    if(name=="00"){
                        this.toastToJava("s:"+name);
                        that.startDownload(name);
                    }else{
                        //获取是否上一关解锁
                        that.toastToJava("upid:"+name);
                        var upid = that.getUpId(name);
                        that.toastToJava("upid:"+upid);
                        // var idd = this.itemsid.substring(0,1)+(this.itemsid.substring(1,2)-1);
                        var isClick = cc.sys.localStorage.getItem("level"+upid);
                        //不为null说明解锁了
                        if(isClick!=null){
                            that.startDownload(name);
                            //homeCtrl.js
                            global.event.fire("pauseBg");
                        }else{
                            that.toastToJava("请先通过上一个关卡<(￣3￣)> ！！");
                        }
                    }
                    

                    //musicUtil.js
                    global.event.fire("btnClick");
                    
                }else{
                    that.toastToJava("爱心不足无法开始游戏！");
                }   
            }, this);
        }
    },

    downloadLevels(){
        this.needDownloads = ["00","01","02","03","10","11","12","13","20","21","22","23","30","31","32","33","40","41","42","43"];
        // var spriteFrame = new cc.SpriteFrame('/storage/emulated/0/Huawei/MagazineUnlock/magazine-unlock-01-2.3.1253-_46A529DBACA459632333408E1C590DA2.jpg');
        // this.testSprit.spriteFrame = spriteFrame;
        this.index =0;
        var downloadLevels = cc.sys.localStorage.getItem("DownloadLevels");
        if(downloadLevels==null){
            this.toastToJava("下载null");
            this.plDownload(this.needDownloads);
        }else{
            this.toastToJava("下载");
            //未测试
            downloadLevels = JSON.parse(downloadLevels);
            cc.log("onLoad downloadLevels:"+downloadLevels);
            for (let index = 0; index < downloadLevels.length; index++) {
                const element = downloadLevels[index];
                //获取元素的位置
                var idx = this.needDownloads.indexOf(element);
                //删除指定位置的长度为1 的值
                this.needDownloads.splice(idx,1);
            }
            cc.log("onLoad needDownloads:"+this.needDownloads);
            this.plDownload(this.needDownloads);
        }
    },

    /**
     * 检测关卡文件是否完整
     * @param {string} id 关卡id
     */
    checkResourceIsComplete(id){
        return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "checkResourceIsComplete","(Ljava/lang/String;)Z",id);
    },

    getUpId(nowId){
        var levelId = "";
        var s = nowId.substring(0,1);
        var g = nowId.substring(1,2);
        if(g==0){
            levelId = s-1+""+3
        }else if(g>0){
            levelId = s+(g-1);
        }
        return levelId;
    },

    startDownload(itemid){
        cc.log("onLoad:"+itemid);
        cc.log(cc.sys.localStorage.getItem(itemid)+"-----------getItem")
        this.toastToJava("s:"+itemid);
        if(cc.sys.localStorage.getItem(itemid)==null){
            var fileName = itemid+".zip";
            var url = "http://www.dadpat.com/app/rhythm/"+fileName;
            this.downFile2Local(url,fileName,this.backParams.bind(this));
        }else{
            if(this.checkResourceIsComplete(itemid)){
                // this.toastToJava("完整");
                //homeCtrl.js
                global.event.fire("pauseBg");
                cc.director.loadScene("game");
            }else{
                var fileName = itemid+".zip";
                var url = "http://www.dadpat.com/app/rhythm/"+fileName;
                this.downFile2Local(url,fileName,this.backParams.bind(this));
            }
            
        }
    },

    toastToJava(msg,isSuccess = false){
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
            // cc.director.loadScene("game");
            var dlevels = cc.sys.localStorage.getItem("DownloadLevels");
            if(dlevels==null){
                var ls = [];
                ls.push(that.itemsid);
                cc.sys.localStorage.setItem("DownloadLevels",JSON.stringify(ls));
            }else{
                dlevels = JSON.parse(dlevels);
                dlevels.push(that.itemsid);
                cc.sys.localStorage.setItem("DownloadLevels",JSON.stringify(dlevels));
            }
            // cc.sys.localStorage.setItem("DownloadLevels",[this.itemsid]);
            // that.progressNode.active = false;
            cc.sys.localStorage.setItem(that.itemsid,fullPath);
            if(callback){
                callback(fullPath);
            }
        });

        this.downloader.setOnTaskProgress(function(task, bytesReceived, totalBytesReceived, totalBytesExpected) {
            // that.progressNode.active = true;
            // cc.log("已下载完成的大小："+bytesReceived);
            // cc.log("总大小:"+totalBytesReceived);
            // cc.log("预期总大小:"+totalBytesExpected);
            // cc.log("下载进度："+totalBytesReceived*1.0/totalBytesExpected);
            // that.progressNode.getComponent(cc.ProgressBar).progress = totalBytesReceived*1.0/totalBytesExpected;
            
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V","关卡下载中...");
        });

        this.downloader.setOnTaskError(function(){  
            cc.log("下载失败!!");   
            // removeModelLoadingDialog();
            // showTips("文件下载失败！！！");
        });
        
    },

    /**
     * 批量下载
     */
    plDownload(lists){
        // var lists = ["10.zip","11.zip","12.zip","13.zip"];
        this.p = [];
        cc.log(lists);
        if(this.index<lists.length){
            this.itemsid = lists[this.index]
            var url = "http://www.dadpat.com/app/rhythm/"+lists[this.index]+".zip";
            this.downFile2Local(url,lists[this.index],this.backParams.bind(this));
        }
        this.index = this.index-0+1;
    },
    /**
     * 下载成功的返回路径path
     * @param {path} params 
     */
    backParams(params){
        cc.log(params);
        this.p.push(params);
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "unzipFile","(Ljava/lang/String;)V",params);
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V","params:"+this.p.toString());
        this.plDownload(this.needDownloads);
    },

    setUnzipPath(savePath){
        cc.log(savePath);
        cc.sys.localStorage.setItem("unzipPath",savePath);
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
