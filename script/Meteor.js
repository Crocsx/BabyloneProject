var Meteor = function (startPos, scale) {
    this.e = BABYLON.Mesh.CreateSphere("sphere", 5, scale, _game.scene);
    this.e.meteor = this;
    this.e.position = startPos;
    BABYLON.Tags.AddTagsTo(this.e, "meteor");
    this.rotation = new BABYLON.Vector3(_game.tool.randomBeetwen(1, 5), _game.tool.randomBeetwen(1, 5), _game.tool.randomBeetwen(1, 5));
    this.rotation = this.rotation.scale(0.001);
    this.speed = new BABYLON.Vector3(_game.tool.randomBeetwen(200, 400), 0, 0);
    this.e.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: scale, friction: 0.5, restitution: 0.5 });
    this.e.actionManager = new BABYLON.ActionManager(_game.scene);
    this.e.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: _game.player.e },
        this.onCollision.bind(this)
      ));
    this.e.renderingGroupId = 1;

    this.EXPLOSION_RANGE = 10000;
    this.EXPLOSIONG_FORCE = new BABYLON.Vector3(1, 0, 1);

    this.loopFunc = this.loop.bind(this)
    _game.scene.registerBeforeRender(this.loopFunc);
}


Meteor.prototype.loop = function () {
    this.rotate();
    this.move();
}

Meteor.prototype.onCollision = function () {
    _game.manager.changeState("Menu");
}

Meteor.prototype.rotate = function () {
    this.e.rotation= this.e.rotation.add(this.rotation);
   
}
Meteor.prototype.move = function () {
    this.e.position.add(this.speed);
}

Meteor.prototype.explode = function () {
    this.e.dispose();
    var meteors = _game.scene.getMeshesByTags("meteor");
    var _this = this;
    var mToExplode = {};
    var i = 0;
    meteors.forEach(function (m) {
        var dist = BABYLON.Vector3.DistanceSquared(m.position, _this.e.position);
        if (dist < _this.EXPLOSION_RANGE) {
            var dir = _this.e.position.subtract(m.position).normalize();
            mToExplode["m" + i] = { "e": m, "dist": dist, "dir": dir};
            i++;
        }
    });

    for (var key in mToExplode) {
        var meteor = mToExplode[key];
        meteor.dist = (meteor.dist / 1000);
        var force = this.EXPLOSIONG_FORCE.multiply(meteor.dir).multiplyByFloats(meteor.dist, meteor.dist, meteor.dist);
        force.normalize();
        force.scaleInPlace(-200);
        meteor.e.applyImpulse(force,this.e.position);
    }
    this.destroy();
}

Meteor.prototype.destroy = function () {
    _game.scene.unregisterBeforeRender(this.loopFunc);
    this.e.dispose();
}