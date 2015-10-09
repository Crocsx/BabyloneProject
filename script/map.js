Map = function(){

	this.minZ = _game.camera.e.position.z+500;
    this.maxZ = _game.camera.e.position.z+1500;
    this.minX = _game.camera.e.position.x - 100, this.maxX = _game.camera.e.position.x+100;
    this.minSize = 2, this.maxSize = 10;

    this.randomX, this.randomZ, this.randomSize;

    this.randomX = this.randomNumber(this.minX, this.maxX);
    this.randomZ = this.randomNumber(this.minZ, this.maxZ);
    this.randomSize = this.randomNumber(this.minSize, this.maxSize);

    this.box = BABYLON.Mesh.CreateBox("box",this.randomSize, _game.scene);

    this.box.scaling.x = this.randomNumber(0.5, 1.5);
    this.box.scaling.y = this.randomNumber(4, 8);
    this.box.scaling.z = this.randomNumber(2, 3);

    this.box.position.x = this.randomX;
    this.box.position.y = this.box.scaling.y/2;
    this.box.position.z = this.randomZ;

    // action manager
    this.box.actionManager = new BABYLON.ActionManager(_game.scene);

}
Map.prototype.randomNumber = function (min, max) {
    if (min ==max) {
        return (min);
    }
    var random = Math.random();
    return ((random * (max - min)) + min);
};