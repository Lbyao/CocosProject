import global from "../../global";

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
        itemID: 0,
        btname: "",
        address: "",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchend', function () {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V",this.btname+"address:"+this.address);
            console.log("Item " + this.itemID + ' clicked');
            // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "connectDrum","(Ljava/lang/String;)V",this.address);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "connectBluetooth","(Ljava/lang/String;)V",this.address);
            // GameWorld.js
            // global.event.fire("BTAddress",this.address);
            cc.sys.localStorage.setItem("BTAddress",this.address);
            // ListViewCtrl.js
            global.event.fire("SelectBT");
        }, this);
    },

    updateItem: function(name,address, itemId) {
        this.itemID = itemId;
        this.btname = name;
        this.address = address;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V",this.btname+"address:"+this.address);
        this.label.string = name;
    },

    // start () {},

    // update (dt) {},
});
