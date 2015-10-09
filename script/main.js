// ---- Debug
var _game;
//
(function () {
    //release
    //var _game;
    //


    var Game = function () {
        this.debug = 1;
    }

    Game.prototype.init = function () {
        this.canvas = document.getElementById("renderCanvas");
        this.canvas.width = window.innerWidth - 16;
        this.canvas.height = window.innerHeight - 16;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new Camera("mainCamera", new BABYLON.Vector3(10, 10, 0), this.scene)
        if (this.debug) {
            this.scene.debugLayer.show();
            ADD_PLACEHOLDER();
        }
        var _this = this;
    }

    Game.prototype.start = function () {
        var _this = this;
        this.engine.runRenderLoop(function () {
            _this.scene.render();
        });
    }



    document.addEventListener("DOMContentLoaded", function () {
        _game = new Game()
        _game.init();
        _game.start();

    }, false);
})();