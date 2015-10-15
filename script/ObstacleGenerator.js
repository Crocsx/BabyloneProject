var ObstacleGenerator = function () {
    this.obsList = [];

    this.obsTimer = 100; // en milli ssec
    this.elaspedTime = 0;

    this.obsMinDist = new BABYLON.Vector3(-600,0,300);
    this.obsMaxDist = new BABYLON.Vector3(600, 0, 800);

    this.obsMinPosSpawn = new BABYLON.Vector3(_game.player.e.position.x + this.obsMinDist.x, 0, _game.player.e.position.z + this.obsMinDist.z);
    this.obsMaxPosSpawn = new BABYLON.Vector3(_game.player.e.position.x + this.obsMaxDist.x, 0, _game.player.e.position.z + this.obsMaxDist.z);

    this.obsMinScale = 10;
    this.obsMaxScale = 50;
}


ObstacleGenerator.prototype.start = function (scene) {
    scene.registerBeforeRender(this.loop.bind(this));
}

ObstacleGenerator.prototype.loop = function () {
    this.updatePosition();
    this.checkSpawn();
    this.checkMeteor();
}

ObstacleGenerator.prototype.checkSpawn = function () {
    var deltaTime = _game.engine.getDeltaTime();
    
    this.elaspedTime += deltaTime;
    if (this.elaspedTime > this.obsTimer) {
        this.spawnObstacle();
        this.elaspedTime = 0;
    }
}

ObstacleGenerator.prototype.updatePosition = function () {
    this.obsMinPosSpawn = new BABYLON.Vector3(_game.player.e.position.x + this.obsMinDist.x, 0, _game.player.e.position.z + this.obsMinDist.z);
    this.obsMaxPosSpawn = new BABYLON.Vector3(_game.player.e.position.x + this.obsMaxDist.x, 0, _game.player.e.position.z + this.obsMaxDist.z);
}

ObstacleGenerator.prototype.spawnObstacle = function () {
    var pos = new BABYLON.Vector3(
        _game.tool.randomBeetwen(this.obsMinPosSpawn.x,this.obsMaxPosSpawn.x),
        0,
        _game.tool.randomBeetwen(this.obsMinPosSpawn.z,this.obsMaxPosSpawn.z));
    var scale = _game.tool.randomBeetwen(this.obsMinScale,this.obsMaxScale);
    this.obsList.push(new Meteor(pos, scale));
}

ObstacleGenerator.prototype.checkMeteor = function () {
    for (var i = 0; i < this.obsList.length; i++) {
        var meteor = this.obsList[i];
        if (meteor.e.position.z < _game.player.e.position.z - 500) {
            meteor.destroy();
            this.obsList.splice(i, 1);
            i--;
        }
    }
}
ObstacleGenerator.prototype.destroy = function () {
    for (var i = 0; i < this.obsList.length; i++) {
        var meteor = this.obsList[i];
        meteor.destroy();
        this.obsList.splice(i, 1);
        i--;
    }
}
