function ADD_PLACEHOLDER() {
    _game.player = new Player();
    _game.player.init(new BABYLON.Vector3(0, 2, 0), _game.scene);
    _game.camera.setTarget(_game.player.e)
    var light = new BABYLON.HemisphericLight("mainLight", new BABYLON.Vector3(0, 5, 0), _game.scene);
    _game.ground = BABYLON.Mesh.CreateGround("Ground", 100, 50, 2, _game.scene);
    _game.ground.position = new BABYLON.Vector3(0, 0, 0);
    _game.map = new Map();
}