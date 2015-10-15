var GameManager = function (scene) {
    this.status = {
        Menu: 0,
        Game: 0,
        Pause: 0
    }

    this.score = 0;

    this.menuDivs = {};
    this.overlayDivs = {};
    scene.registerBeforeRender(this.loop.bind(this));
}

GameManager.prototype.loop = function () {
    if(this.status["Menu"]== 1){

    }
    if(this.status["Game"] == 1){
        this.score++;
        this.overlayDivs.score.innerText = "" + this.score;
        this.overlayDivs.ammo.innerText = "ammo : " + _game.player.ammo;
        if (this.score % 2000 == 0) {
            _game.obsGenerator.obsTimer -= 10;
        }
    }
    if (this.status["Pause"] == 1) {

    }
}

GameManager.prototype.changeState = function (value) {
    if (this.status[value] == undefined) {
        return;
    }
    for (var key in this.status) {
        if (this.status[key] == 1) {
            this["onLeave" + key]();
            this.status[key] = 0;
        }
    }
    this.status[value] = 1;
    this["onEnter"+value]();
}

GameManager.prototype.onEnterMenu = function () {
    this.menuDivs.container = document.getElementById("menu");
    this.menuDivs.container.style.display = "block";
    var _this = this;
    this.menuDivs.playbutton = document.getElementById("play_button").onclick = function () {
        _this.changeState("Game");
    }
}

GameManager.prototype.onLeaveMenu = function () {
    this.menuDivs.container.style.display = "none";
}

GameManager.prototype.onEnterGame = function () {
    this.score = 0;
    this.overlayDivs.container = document.getElementById("overlay");
    this.overlayDivs.container.style.display = "block";
    this.overlayDivs.score = document.getElementById("score");
    this.overlayDivs.ammo = document.getElementById("ammo");

    _game.player = new Player();
    _game.player.init(_game.loadedAssets["Player"], new BABYLON.Vector3(0, 2, 0), _game.scene);
    _game.camera.setTarget(_game.player.e);

    _game.light = new BABYLON.HemisphericLight("mainLight", new BABYLON.Vector3(0, 5, 0), _game.scene);
    _game.light.parent = _game.player.e;

    _game.obsGenerator = new ObstacleGenerator();
    _game.obsGenerator.start(_game.scene);

    _game.scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    _game.scene.fogDensity = 0.01;

    _game.skybox = createSkybox();

    _game.ground = new Ground(_game.scene);
}
GameManager.prototype.onLeaveGame = function () {
    _game.obsGenerator.destroy();
    _game.player.destroy();

    this.overlayDivs.container.style.display = "none";
}

GameManager.prototype.onEnterPause = function () {

}

