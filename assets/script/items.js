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
        label: {
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
        this.node.on('touchend', function () {
            console.log("Item " + this.itemID + ' clicked');
            // var label = this.node.getComponent(cc.Label);
            cc.log(this.label.string);
            Global.MusicName = this.label.string;
            this.downLoad();
            cc.director.loadScene("game", this.onSceneLaunched());
            
        }, this);
        this.label.string = "123"
    },

    downLoad (){
        var xhr = new XMLHttpRequest();
        xhr.timeout = 3000;

        xhr.ontimeout = function (e) {
            // 监听timeout
        }
        
    
        xhr.open("GET","http://www.wanandroid.com/article/list/0/json",true);
        xhr.withCredentials = true;
        // xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        xhr.setRequestHeader("Access-Control-Allow-Origin","*");
        // xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me")
        // xhr.setRequestHeader("Origin","*");
        
    
        cc.log(xhr.getResponseHeader("Access-Control-Allow-Origin"));
        xhr.send();

        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)){
                var request = xhr.responseText;
                console.log(request)
            }
        };
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
