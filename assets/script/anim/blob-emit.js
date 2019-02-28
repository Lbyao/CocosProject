var Blob = require('blob');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        blob: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        // physicsManager.enabledDrawBoundingBox = true;
        // this.debugDrawFlags = physicsManager.debugDrawFlags;
        // cc.director.getPhysicsManager().debugDrawFlags = 
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        //     ;
        
        this.levels = ["00","01","02","03","10","11","12","13","20","21","22","23","30","31","32","33","40","41","42","43"];
        // cc.PhysicsCollider.getAABB();
        // var colliderList = cc.director.getPhysicsManager().testAABB(cc.Rect());
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);

        var position = cc.v2(1920,1080);
        var that = this;
        cc.log(position.x+",y:"+position.y);
        for (let index = 0; index < 20; index++) {
            (function(e) {
                setTimeout(function() {
                    var result = cc.sys.localStorage.getItem("level"+that.levels[e]);
                    cc.log("lock--"+result);
                    if(result!=null){
                        var node = cc.instantiate(that.blob);
                        var blob = node.getComponent(Blob);
                        blob.init(that.levels[e]);
                        blob.emitTo(position);
                
                        node.active = true;
                        node.parent = cc.director.getScene();
                        cc.log("position:"+e)
                    }
                    // if(position.x>1920){
                    //     cc.log("x")
                    //     position.x = 0;
                    //     position.y= position.y+e*250;
                    // }else{
                    //     cc.log("y")
                    //     position.x = position.x+e*250;
                    // }
                }, e*2000);
            })(index); 
        }
    },

    onTouchBegan: function (event) {
        var touchLoc = event.touch.getLocation();
        cc.log(touchLoc.x+":"+touchLoc.y);
        // debugger;
        var node = cc.instantiate(this.blob);
        var blob = node.getComponent(Blob);
        blob.init();
        blob.emitTo(touchLoc);

        node.active = true;
        node.parent = cc.director.getScene();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
