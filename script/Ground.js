var Ground = function (scene) {
    this.e = BABYLON.Mesh.CreateGround("Ground", 1000, 100, 2, scene);
    this.e.position = new BABYLON.Vector3(0, 0, 0);
}


Ground.prototype.followMovement = function (target) {
    scene.registerBeforeRender(function () {
        this.e.position = target.position;
    });
}
