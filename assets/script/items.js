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
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        loadingNode: {
            default: null,
            type: cc.Node
        },
        loadLabel: {
            default: null,
            type: cc.Label
        },
        itemID: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.log("onload");
        // this.node.on("cc.Node.EventType.TOUCH_END", function () {
        //     cc.log("onload in")
        //     var label = this.node.getComponent(cc.Label);
        //     cc.log(label);
        // }, this)
        var that = this;
        this.node.on('touchend', function () {
            console.log("Item " + that.itemID + ' clicked');
            // var label = this.node.getComponent(cc.Label);
            cc.log(that.label.string);
            Global.MusicName = that.label.string;
            // this.downLoad();
            // cc.log(cc.sys.localStorage.getItem("00")+"-----------getItem")
            var itemsid = that.getDownloadId(that.itemID);
            cc.log(cc.sys.localStorage.getItem(itemsid)+"-----------getItem")
            if(cc.sys.localStorage.getItem(itemsid)==null){
                var fileName = itemsid+".zip";
                var url = "http://www.dadpat.com/app/rhythm/"+fileName;
                that.downFile2Local(url,fileName,function(params) {
                    cc.log(params);
                });
            }
            
            cc.director.loadScene("game", this.onSceneLaunched());
                
        }, this);
        // this.label.string = "123"
    },

    getDownloadId(itemName) {
        var id;
        switch(itemName){
            case "三只小熊":
                id = '00'
                break;
            case "踏雪寻梅":
                id = '01'
                break;
            case "小白船":
                id = '02'
                break;
            case "你好":
                id = '03'
                break;
            default:
                id = '10'
                break;
        }
        return id;
    },

    // 短链接
    downLoad (){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 3000;

        xhr.ontimeout = function (e) {
            // 监听timeout
        }
        
        xhr.open("GET","https://httpbin.org/get?show_env=1",true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        }
    
        xhr.send();

        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                cc.log("\nEvent : " + eventname);
                // eventLabel.string = eventLabelOrigin + "\nEvent : " + eventname;
                if (eventname === 'timeout') {
                    cc.log('(timeout)');
                    // label.string = '(timeout)';
                }
            };
        });

        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)){
                var request = xhr.responseText;
                console.log(request)
            }
        };
    },

    downFile2Local:function(url, fileName, callback){
        // data/data/org.cocos2d.TestProject/file/fileName
        var fullPath = jsb.fileUtils.getWritablePath() + fileName
        var that = this;
        // showModelLoadingDialog();//显示加载中模态框
        this.loadingNode.opacity = 255;
        this.loadLabel.string = "开始！";
        cc.log("fullPath:"+fullPath);
        this.downloader = new jsb.Downloader();
        this.downloader.createDownloadFileTask(url, fullPath,"");//创建下载任务
        this.downloader.setOnFileTaskSuccess(function(){   
            cc.log("下载成功!!");      
            // removeModelLoadingDialog();//删除加载中模态框
            cc.sys.localStorage.setItem(that.getDownloadId(that.itemID),fullPath);
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

    onSceneLaunched: function(){
        // 另外的场景启动
    },

    updateItem: function(name,itemId) {
        cc.log(itemId+"tmplId:"+name)
        this.itemID = itemId;
        this.label.string = name
        // this.label.textKey = ' Item#' + this.itemID;
    },

    init(){
        cc.log("init");
    },

    start () {

    },

    // update (dt) {},
});
