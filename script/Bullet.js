var Bullet = function (scene) {
    this.SPEED = 10;

    this.e = BABYLON.Mesh.CreateSphere("ball", 16, 1, scene);
    this.e.position = _game.player.e.position.add(new BABYLON.Vector3(0,0,5));
    this.e.renderingGroupId = 1;
    this.e.actionManager = new BABYLON.ActionManager(_game.scene);
    this.e.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger },
        this.onCollision.bind(this)
      ));
    scene.registerBeforeRender(this.loop.bind(this));
}


Bullet.prototype.loop = function () {
    this.e.position = this.e.position.add(new BABYLON.Vector3(0, 0, this.SPEED));
}


Bullet.prototype.onCollision = function () {
    console.log("olo");
}