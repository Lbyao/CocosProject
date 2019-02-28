
var smooth = require('smooth');

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        spriteAtlas:cc.SpriteAtlas,
        particleNumber: 12,
        particleRadius: 30,
        sphereSize: 12
    },

    onDeviceMotionEvent (event) {
        // cc.log(event);
        // debugger
        cc.log("event name:", event.type, " acc x:", event.acc.x, " acc y:", event.acc.y, " acc z:", event.acc.z);
        // cc.log(event.acc.x + "-----------" + event.acc.y+"----------------"+event.acc.z);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onLoad(){
        //开启重力感应  
        // jsb.device.setMotionEnabled(true);
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.setAccelerometerInterval(2);
        //加速度监听
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    touchAnimal(event){
        cc.log("click animal:"+that.particleRadius); 
        
    },

    // use this for initialization
    init: function (index) {
        this.particleRadius = index;
        this.target.getComponent(cc.Sprite).spriteFrame = this.spriteAtlas.getSpriteFrame("img_sticker_"+index);
        var that = this;
        this.target.on('touchend',this.touchAnimal.bind(this));
        //开启重力感应  
        cc.systemEvent.setAccelerometerEnabled(true);
        //加速度监听
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);

        //绘画
        this.ctx = this.getComponent(cc.Graphics);

        this.ctx.lineWidth = 6;
        // cc.hexToColor('#495069');
        // cc.hexToColor('#ffde59');
        this.ctx.strokeColor = cc.color({r: 73, g: 80, b: 105, a: 0});
        this.ctx.fillColor = cc.color({r: 255, g: 222, b: 89, a: 0});

        // let x = this.node.x;
        // let y = this.node.y;

        // let particleNumber = this.particleNumber;
        // let particleRadius = this.particleRadius;
        let sphereSize = this.sphereSize;

        // let particleAngle = (2*Math.PI)/particleNumber;
        // let particleDistance = Math.sin(particleAngle) * particleRadius * Math.sin((Math.PI - particleAngle)/2);
//      保存创建的图片的数组
        let spheres = [];
        spheres.push( this._createSphere(0, 0, sphereSize, this.node) );

        // for (let i=0; i<particleNumber; i++) {
        //     let angle = particleAngle*i;
        //     let posX = particleRadius * Math.cos(angle);
        //     let posY = particleRadius * Math.sin(angle);
        //     let sphere = this._createSphere(posX, posY, sphereSize);
        //     spheres.push( sphere );
            
        //     let joint = sphere.node.addComponent(cc.DistanceJoint);
        //     joint.connectedBody = spheres[0];
        //     joint.distance = particleRadius;
        //     joint.dampingRatio = 0.5;
        //     joint.frequency = 4;

        //     if (i > 0) {
        //         joint = sphere.node.addComponent(cc.DistanceJoint);
        //         joint.connectedBody = spheres[spheres.length - 2];
        //         joint.distance = particleDistance;
        //         joint.dampingRatio = 1;
        //         joint.frequency = 0;
        //     }

        //     if (i === particleNumber - 1) {
        //         joint = spheres[1].node.addComponent(cc.DistanceJoint);
        //         joint.connectedBody = sphere;
        //         joint.distance = particleDistance;
        //         joint.dampingRatio = 1;
        //         joint.frequency = 0;
        //     }

        //     sphere.node.parent = this.node;
        // }

        this.spheres = spheres;
    },

    _createSphere (x, y, r, node) {
        if (!node) {
            node = new cc.Node();
            node.x = x;
            node.y = y;
        }
        //创建刚体
        let body = node.addComponent(cc.RigidBody);
        //创建物理碰撞
        let collider = node.addComponent(cc.PhysicsPolygonCollider);
        collider.density = 1;
        collider.restitution = 0.4;
        collider.friction = 0.5;
        collider.radius = r;

        return body;
    },

    emitTo (target) {
        var x = target.x;
        var y = target.y;

        var selfX = this.node.x;
        var selfY = this.node.y;

        var distance = Math.sqrt((x-selfX)*(x-selfX) + (y-selfY)*(y-selfY));
        var velocity = cc.v2(x-selfX, y-selfY);
        velocity.normalizeSelf();
        velocity.mulSelf(distance*2);

        this.spheres.forEach(function (sphere) {
            sphere.linearVelocity = velocity;
        });
    },

    update (dt) {
        var ctx = this.ctx;
        // 遍历坐标
        // debugger;
        var points = this.spheres.map(sphere => {
            return this.expandPosition( sphere.node.position );
        });

        // points.shift();
//      获取贝塞尔曲线坐标
        var result = smooth( points );
        var firstControlPoints = result[0];
        var secondControlPoints = result[1];

        var pos = points[0];
        //刷新绘制的位置
        ctx.clear();
        ctx.moveTo(pos.x, pos.y);

        for (var i = 1, len = points.length; i < len; i++) {
            var firstControlPoint = firstControlPoints[i - 1],
                secondControlPoint = secondControlPoints[i - 1];
            // cc.log("firstControlPoint:"+firstControlPoint.x+",secondControlPoint:"+secondControlPoint.x);
            ctx.bezierCurveTo(
                firstControlPoint.x, firstControlPoint.y,
                secondControlPoint.x, secondControlPoint.y,
                points[i].x, points[i].y
            );
        }

        ctx.close();
        ctx.fill();
        ctx.stroke();
    },

    expandPosition (pos) {
        //乘1.3
        return pos.mul(1.3);
    }
});
