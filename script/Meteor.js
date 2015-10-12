var Meteor = function (startPos, scale) {
    this.e = this.box = BABYLON.Mesh.CreateBox("box", scale, _game.scene);
    this.e.position = startPos;
    this.rotation = new BABYLON.Vector3(_game.tool.randomBeetwen(1, 5), _game.tool.randomBeetwen(1, 5), _game.tool.randomBeetwen(1, 5));
    this.rotation = this.rotation.scale(0.001);
    this.speed = new BABYLON.Vector3(_game.tool.randomBeetwen(0, 100), 0, 0);

    this.e.actionManager = new BABYLON.ActionManager(_game.scene);
    this.e.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: _game.player.e },
        this.onCollision.bind(this)
      ));
    this.e.renderingGroupId = 1;
    _game.scene.registerBeforeRender(this.loop.bind(this));
}


Meteor.prototype.start = function (scene) {

}

Meteor.prototype.loop = function () {
    this.rotate();
    this.move();
}

Meteor.prototype.onCollision = function () {
    alert("BOOM");
}

Meteor.prototype.rotate = function () {
    this.e.rotation= this.e.rotation.add(this.rotation);
   
}
Meteor.prototype.move = function () {
    this.e.position.add(this.speed);
}

Meteor.prototype.destroy = function () {
    this.e.dispose();
}