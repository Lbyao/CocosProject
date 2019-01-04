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
        HIGH: 80, //每一项的高度
        PAGE_NUM: 8, //每一页8个项
        itemTemplate: { //项的资源预制体
            type: cc.Node,
            default: null,
        },
        scrollView: { //获取scrollview组件
            type: cc.ScrollView,
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.spacing = 10;
        this.value_set = new Array("小兔子乖乖","大长今","洋娃娃和小熊跳舞","可爱的蓝精灵",
        "红蜻蜓","小白船","我是一个粉刷匠","小鳄鱼",
        "踏雪寻梅","真善美的小世界","三只小熊","玛丽有只小羊羔",
        "铃儿响叮当","伦敦桥","金鱼姬","亲亲我的宝贝",
        "你好","好运来","海草舞","洗澡歌");
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
    	this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        
        // this.value_set = [];
        // for (var i = 1; i <= 100; i++) {
        //     this.value_set.push(i);
        // }
        // this.content = this.scroll_view.content;
        // this.opt_item_set = [];
        // //每次加载3页
        // for (var i = 0; i < this.PAGE_NUM * 3; i++) {
        //     var item = cc.instantiate(this.item_prefab);
        //     item.getComponent("items").init();
        //     item.on("cc.Node.EventType.TOUCH_START", function () {
        //         cc.log("onload in")
        //         var label = item.getComponent(cc.Label);
        //         cc.log(label);
        //     }, this)
        //     this.content.addChild(item);
        //     this.opt_item_set.push(item);
        // }
        // this.scroll_view.node.on("scroll-ended", this.on_scroll_ended.bind(this), this); //监听scrollview事件
    },

    initialize: function () {
        cc.log(this.value_set[0])
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    	for (let i = 0; i < this.value_set.length; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		item.getComponent('items').updateItem(this.value_set[i], this.value_set[i]);
            this.items.push(item);
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

    // start () {
    //     this.start_y = this.content.y; //初始化起始y坐标
    //     this.start_index = 0; //100项数据里面的起始数据记录索引
    //     this.load_recode(this.start_index);
    // },

    // load_recode (start_index) {
    //     this.start_index = start_index;
    //     for (var i = 0; i < this.PAGE_NUM * 3; i++) {
    //         var label = this.opt_item_set[i].getComponent(cc.Label);
    //         //显示记录
    //         label.string = this.value_set[this.start_index + i];
    //     }
    // },
    // load_scroll_recode: function () {
    //     //向下加载数据
    //     //当开始位置比value_set的长度小则代表没加载完
    //     if (this.start_index + this.PAGE_NUM * 3 < this.value_set.length &&
    //         this.content.y >= this.start_y + this.PAGE_NUM * 2 * this.HIGH) //content超过2个PAGE的高度
    //     {
    //         //_autoScrolling在引擎源码中负责处理scrollview的滚动动作
    //         if (this.scroll_view._autoScrolling) { //等自动滚动结束后再加载防止滚动过快，直接跳到非常后的位置
    //             this.scroll_view.elastic = false; //关闭回弹效果 美观
    //             return;
    //         }
    //         var down_loaded = this.PAGE_NUM;
    //         this.start_index += down_loaded;

    //         if (this.start_index + this.PAGE_NUM * 3 > this.value_set.length) {
    //             //超过数据范围的长度
    //             var out_len = this.start_index + this.PAGE_NUM * 3 - this.value_set.length;
    //             down_loaded -= out_len;
    //             this.start_index -= out_len;
    //         }
    //         this.load_recode(this.start_index);
    //         this.content.y -= down_loaded * this.HIGH;
    //         return;
    //     }
    //     //向上加载
    //     if (this.start_index > 0 && this.content.y <= this.start_y) {
    //         if (this.scroll_view._autoScrolling) {
    //             this.scroll_view.elastic = false;
    //             return;
    //         }
    //         var up_loaded = this.PAGE_NUM;
    //         this.start_index -= up_loaded;
    //         if (this.start_index < 0) {
    //             up_loaded += this.start_index;
    //             this.start_index = 0;
    //         }
    //         this.load_recode(this.start_index);
    //         this.content.y += up_loaded * this.HIGH;
    //     }
    // },
    // on_scroll_ended: function () {
    //     this.load_scroll_recode();
    //     this.scroll_view.elastic = true; //加载结束后自动滚动回弹开启
    // },
    update(dt) {
        // this.load_scroll_recode();
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
                    let item = items[i].getComponent('items');
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(this.value_set[i], this.value_set[itemId]);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent('items');
                    let itemId = item.itemID + items.length;
                    item.updateItem(this.value_set[i], this.value_set[itemId]);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
        // this.lblTotalItems.textKey = "Total Items: " + this.totalCount;
    },
    // update (dt) {},

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
    }
});
