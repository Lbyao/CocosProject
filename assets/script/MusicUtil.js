import global from "./global";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
//音乐
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
        btClickAudioSource: {
            type: cc.AudioClip,
            default: null
        },
        imgClickAudioSource: {
            type: cc.AudioClip,
            default: null
        },
        successAudioSource: {
            type: cc.AudioClip,
            default: null
        },
        failAudioSource: {
            type: cc.AudioClip,
            default: null
        },
        animalAudioClips:{
            type:cc.AudioClip,
            default:[]
        }
    },

    setMainMusic: function(path){
        // 'resources/audio/music.mp3'
        this.audioSource = cc.url.raw('resources/audio/'+path);
    },

    setLocalMainMusic(path){
        var unzipPath = cc.sys.localStorage.getItem("unzipPath");
        this.path = unzipPath+"/"+path+"/"+"bgm_easy.wav";
        cc.log("setLocalMainMusic:"+this.path);
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsToast","(Ljava/lang/String;)V", "setLocalMainMusic:"+this.path);
    },

    playMain: function () {
        this.main = cc.audioEngine.playMusic(this.audioSource, false);
        // this.audioSource.play();
        return this.main;
    },

    playLocalMain(){
        this.main = cc.audioEngine.playMusic(this.path, false);
        return this.main;
    },

    rewindMain() {
        this.playMain();
    },
    resumeMain: function(){
        cc.audioEngine.resumeMusic()
    },
    pauseMain: function () {
        cc.audioEngine.pauseMusic();
        // this.audioSource.pause();
    },

    stopMain: function(){
        cc.audioEngine.stopAll();
    },

    getCurrentTime (){
        return cc.audioEngine.getCurrentTime(this.main);
    },

    setCurrentTime(pos){
        return cc.audioEngine.setCurrentTime(this.main,pos);
    },

    playB: function () {
        this.bAudio = cc.audioEngine.playEffect(this.bAudioSource,false);
        return this.bAudio;
        // this.bAudioSource.play();
    },
    pauseB: function () {
        cc.audioEngine.stopEffect(this.bAudio);
        // this.bAudioSource.pause();
    },

    playT: function () {
        this.tAudio = cc.audioEngine.playEffect(this.tAudioSource,false);
        // this.tAudioSource.play();
        return this.tAudio;
    },
    pauseT: function () {
        cc.audioEngine.stopEffect(this.tAudio);
        // this.tAudioSource.pause();
    },

    playS: function () {
        this.sAudio = cc.audioEngine.playEffect(this.sAudioSource,false);
        // this.sAudioSource.play();
        return this.sAudio;
    },
    pauseS: function () {
        cc.audioEngine.stopEffect(this.sAudio);
        // this.sAudioSource.pause();
    },

    playTone: function(tone) {
        var id;
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
                // id = this.playMain();
                id = this.playLocalMain();
                break;
            case "success":
                this.playSuccessSound();
                break;
            case "fail":
                this.playFailSound();
                break;
            case "animal":
                this.playAnimalSound();
                break;
            case "bg":
                id = this.playMain();
                break;
            case "stopAnimal":
                this.stopAnimalSound();
                break;
        }
        return id;
    },

    loop(id){
        cc.audioEngine.setLoop(id, true);
    },

    playButtonClick(){
        cc.log("btn click");
        this.buttonClick = cc.audioEngine.playEffect(this.btClickAudioSource,false);
    },

    playImgClick(){
        this.imgClick = cc.audioEngine.playEffect(this.imgClickAudioSource,false);
    },

    
    playSuccessSound(){
        cc.log("play success");
        this.successId = cc.audioEngine.play(this.successAudioSource,false,1);
    },

    playFailSound(){
        cc.log("play fail");
        this.failId = cc.audioEngine.play(this.failAudioSource,false,1);
    }, 
    
    setAnimalPath(path){
        this.animalPath = path;
    },

    playAnimalSound(){
        this.animalId = cc.audioEngine.play(this.animalPath,false,1);
    },

    stopAnimalSound(){
        cc.audioEngine.stop(this.animalId);
    },

    onLoad(){
        //levelCtrl.js
        global.event.on("btnClick",this.playButtonClick.bind(this));

        global.event.on("imgClick",this.playImgClick.bind(this));
        //homeCtrl.js
        global.event.on("stopMain",this.stopMain.bind(this));
        //level.js
        global.event.on("setMainMusic",this.setLocalMainMusic.bind(this));
        global.event.on("playTone",this.playTone.bind(this));
        //successDialog.js
        global.event.on("setAnimalPath",this.setAnimalPath.bind(this));
        // global.event.on("successSound",this.playSuccessSound.bind(this));
        // global.event.on("failSound",this.playFailSound.bind(this));
    },


    start () {

    },

    // update (dt) {},
});
