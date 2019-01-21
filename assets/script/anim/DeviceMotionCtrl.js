// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var _acc = cc.v2(0, 0);
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
        target: cc.Node,
        // btn_label: cc.Label,
        _time: 0,
        _range: cc.v2(0, 0),
        // _acc: cc.v2(0, 0)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._enabled = false;
        var screenSize = cc.view.getVisibleSize();
        this._range.x = screenSize.width / 2 - this.target.width / 2;
        this._range.y = screenSize.height / 2 - this.target.height / 2;
        _acc.x = 0;
        _acc.y = 0;
        cc.log(this._range.x + "------onLoad-----" + this._range.y);
        cc.log(_acc.x + "------onLoad-----" + _acc.y);
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this.target);
    },

    onDestroy () {
        cc.systemEvent.setAccelerometerEnabled(false);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this.target);
    },

    onDeviceMotionEvent (event) {
        cc.log(event.acc.x + "-----onDeviceMotionEvent------" + event.acc.y);
        _acc.x =  event.acc.x;
        _acc.y =  event.acc.y;
    },

    // start () {

    // },

    update (dt) {
        var target = this.target, range = this._range;
        this._time += 5;
        target.x += _acc.x * dt * (this.speed + this._time);
        target.x = cc.misc.clampf(target.x, -range.x, range.x);
        target.y += _acc.y * dt * (this.speed + this._time);
        target.y = cc.misc.clampf(target.y, -range.y, range.y);
        cc.log(target.x + "-----update------" + target.y);
        if (target.x <= -range.x || target.x >= range.x ||
            target.y <= -range.y || target.y >= range.y) {
            this._time = 0;
        }
    },
});
