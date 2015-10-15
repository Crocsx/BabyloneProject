var Ground = function (scene) {
    this.e = BABYLON.Mesh.CreateGround("Ground", 100, 100, 2, scene);
    this.e.position = new BABYLON.Vector3(0, -1, 50);
    this.e.material = new BABYLON.StandardMaterial("texture1", scene);
    this.e.material.diffuseTexture = new BABYLON.Texture("./assets/img/landingramp.jpg", scene);
    this.e.renderingGroupId = 1;
    scene.registerBeforeRender(this.loop.bind(this));
}


Ground.prototype.loop = function (target) {
    if (this.e.position.z + 500 < _game.player.e.position.z) {
        this.e.dispose();
    }
}
