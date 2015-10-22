var Bullet = function (scene) {
    this.SPEED = 10;

    this.e = BABYLON.Mesh.CreateSphere("ball", 16, 1, scene);
    this.e.position = _game.player.e.position.add(new BABYLON.Vector3(0,0,5));
    this.e.renderingGroupId = 1;

    this.loopFunc = this.loop.bind(this)
    scene.registerBeforeRender(this.loopFunc);
}


Bullet.prototype.loop = function () {
    this.e.position = this.e.position.add(new BABYLON.Vector3(0, 0, this.SPEED));
    var meteors = _game.scene.getMeshesByTags("meteor");
    var _this = this;
    meteors.forEach(function (m) {
        if (m.intersectMesh(_this)) {
            this.destroy();
            m.explode();
        }
    });
}

Meteor.prototype.destroy = function () {
    _game.scene.unregisterBeforeRender(this.loopFunc);
    this.e.dispose();
}