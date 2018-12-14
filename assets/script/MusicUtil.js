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
    rewindMain: function () {
        if(this.audioSource.isPlaying){
            this.audioSource.rewind();
        }else{
            this.playMain();
        }
    },
    pauseMain: function () {
        this.audioSource.pause();
    },
    getCurrentTime (){
        return this.audioSource.getCurrentTime();
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

    playTone: function(tone) {
        switch(tone){
            case "B":
                this.playB();
                break;
            case "T":
                this.playT();
                break;
            case "S":
                this.playS();
                break;
            case "main":
                this.playMain();
                break;
        }
    },

    start () {

    },

    // update (dt) {},
});
