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
            type: cc.AudioClip,
            default: null
        },

        bAudioSource: {
            type: cc.AudioClip,
            default: null
        },
        tAudioSource: {
            type: cc.AudioClip,
            default: null
        },
        sAudioSource: {
            type: cc.AudioClip,
            default: null
        },
    },

    setMainMusic: function(path){
        // 'resources/audio/music.mp3'
        this.audioSource = cc.url.raw('resources/audio/'+path);
    },

    playMain: function () {
        this.main = cc.audioEngine.playMusic(this.audioSource, false);
        // this.audioSource.play();
    },
    rewindMain: function () {
        if(cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.resumeMusic()
            // this.audioSource.rewind();
        }else{
            this.playMain();
        }
    },
    pauseMain: function () {
        cc.audioEngine.pauseMusic();
        // this.audioSource.pause();
    },
    getCurrentTime (){
        return cc.audioEngine.getCurrentTime(this.main);
    },

    setCurrentTime(pos){
        return cc.audioEngine.setCurrentTime(this.main,pos);
    },

    playB: function () {
        this.bAudio = cc.audioEngine.playEffect(this.bAudioSource,false);
        // this.bAudioSource.play();
    },
    pauseB: function () {
        cc.audioEngine.stopEffect(this.bAudio);
        // this.bAudioSource.pause();
    },

    playT: function () {
        this.tAudio = cc.audioEngine.playEffect(this.tAudioSource,false);
        // this.tAudioSource.play();
    },
    pauseT: function () {
        cc.audioEngine.stopEffect(this.tAudio);
        // this.tAudioSource.pause();
    },

    playS: function () {
        this.sAudio = cc.audioEngine.playEffect(this.sAudioSource,false);
        // this.sAudioSource.play();
    },
    pauseS: function () {
        cc.audioEngine.stopEffect(this.sAudio);
        // this.sAudioSource.pause();
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
