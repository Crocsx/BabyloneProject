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

    Game.prototype.preInit = function () {
        console.log("Game => PreInit");
        this.canvas = document.getElementById("renderCanvas");
        this.canvas.width = window.innerWidth - 16;
        this.canvas.height = window.innerHeight - 16;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new Camera("mainCamera", new BABYLON.Vector3(10, 10, 0), this.scene);
        this.preload();
    }

    Game.prototype.init = function () {
        console.log("Game => Init");
        if (this.debug) {
            this.scene.debugLayer.show();
            ADD_PLACEHOLDER();
        }
    }

    Game.prototype.start = function () {
        console.log("Game => Start");
        var _this = this;
        this.engine.runRenderLoop(function () {
            _this.scene.render();
        });
    }

    Game.prototype.preload = function () {
        console.log("Game => Preload");
        var loader = new BABYLON.AssetsManager(_game.scene);
        var meshTask = loader.addMeshTask("asset", "", "./assets/", "Player.babylon");
        meshTask.onSuccess = function (task) {
            _game.loadedAssets = {};
            for (var i = 0; i < task.loadedMeshes.length; i++) {
                var mesh = task.loadedMeshes[i];
                _game.loadedAssets[mesh.name] = mesh;
                _game.loadedAssets[mesh.name].setEnabled(false);
            }
        };
        loader.onFinish = function (tasks) {
            _game.init();
            _game.start();
        };
        loader.load();
    }

    document.addEventListener("DOMContentLoaded", function () {
        _game = new Game();
        _game.preInit();
    }, false);
})();