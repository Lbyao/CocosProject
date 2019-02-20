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
        successSource: {
            type: cc.AudioClip,
            default: null
        },

        failSource: {
            type: cc.AudioClip,
            default: null
        },
        audioSSource: {
            type: cc.AudioSource,
            default: null
        },
        audioFSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    playEffectSuccess(){
        cc.audioEngine.playEffect(this.successSource,false);
    },

    playEffectFail(){
        cc.audioEngine.playEffect(this.failSource,false);
    },

    playSuccess(){
        // cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
		//     var audioID = cc.audioEngine.play(clip, false, 0.5);
		// });
        cc.audioEngine.play(this.successSource,false,0.5);
    },

    playFail(){
        cc.audioEngine.play(this.failSource,false,0.5);
    },

    playSSource(){
        this.audioSSource.play();
    },

    playFSource(){
        this.audioFSource.play();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
