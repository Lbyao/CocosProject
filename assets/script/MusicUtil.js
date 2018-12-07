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
        audioSource: {
            type: cc.AudioSource,
            default: null
        },

        bAudioSource: {
            type: cc.AudioSource,
            default: null
        },
        tAudioSource: {
            type: cc.AudioSource,
            default: null
        },
        sAudioSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    playMain: function () {
        this.audioSource.play();
    },
    pauseMain: function () {
        this.audioSource.pause();
    },

    playB: function () {
        this.bAudioSource.play();
    },
    pauseB: function () {
        this.bAudioSource.pause();
    },

    playT: function () {
        this.tAudioSource.play();
    },
    pauseT: function () {
        this.tAudioSource.pause();
    },

    playS: function () {
        this.sAudioSource.play();
    },
    pauseS: function () {
        this.sAudioSource.pause();
    },

    start () {

    },

    // update (dt) {},
});