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
        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        listdialog: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        spacing: 0, // space between each item
        bufferZone: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
        // this.names = [];
        this.success = 3;
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down

        global.event.on("SelectBT",this.closeDialog.bind(this));
    },

    closeDialog(){
        this.listdialog.active = false;
    },

    setBTList(names,addresss){
        
        this.names = [];
        this.names = names;
        this.addresss = [];
        this.addresss = addresss;
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "toast","(Ljava/lang/String;)V",this.names[0]);
        this.listdialog.active = true;
        if(this.success==3){
            this.initialize();
        }
    },

    destroyNode(){
        if(this.items!=null&&this.items!=undefined){
            // this.items = []; // array to store spawned items
            for(let i=0;i<this.items.length;i++){
                this.items[i].active=false;
                this.items[i].destroy();
            }
        }
    },

    initialize: function () {
        this.items = [];
        this.content.height = this.names.length * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    	for (let i = 0; i < this.names.length; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		item.getComponent('Item').updateItem(this.names[i],this.addresss[i], i);
            this.items.push(item);
        }
        
    },

    // start () {},

    update (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(this.names[i], itemId);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID + items.length;
                    item.updateItem(this.names[i], itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    },

    scrollEvent: function(sender, event) {
        switch(event) {
            case 0: 
               break;
            case 1: 
               break;
            case 2: 
               break;
            case 3: 
               break;
            case 4: 
               break;
            case 5: 
               break;
            case 6: 
               break;
            case 7: 
               break;
            case 8: 
               break;
            case 9: 
               break;
        }
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    scrollToFixedPosition: function () {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
    },
});
