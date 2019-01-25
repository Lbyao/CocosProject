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
        levelNodes:{
            default:[],
            type:cc.Node
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var that = this;
        for(var i=0;i<20;i++){
            this.levelNodes[i].on('touchend', function (event) {
                var name = event.currentTarget.name;
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
                }
                
                cc.director.loadScene("game");
                    
            }, this);
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
        // data/data/org.cocos2d.TestProject/file/fileName
        var fullPath = jsb.fileUtils.getWritablePath() + fileName
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
        
            cc.sys.localStorage.setItem(that.itemsid,fullPath);
            if(callback){
                callback(fullPath);
            }
        });

        this.downloader.setOnTaskProgress(function(task, bytesReceived, totalBytesReceived, totalBytesExpected) {
            cc.log("已下载完成的大小："+bytesReceived);
            cc.log("总大小:"+totalBytesReceived);
            cc.log("预期总大小:"+totalBytesExpected);
        });

        this.downloader.setOnTaskError(function(){  
            cc.log("下载失败!!");   
            // removeModelLoadingDialog();
            // showTips("文件下载失败！！！");
        });
        
    },

    // update (dt) {},
});
