var Player = function () {

    //move
    this.MOVE_SPEED_MAX = new BABYLON.Vector3(1.5, 0,2);
    this.MOVE_SPEED_MIN = new BABYLON.Vector3(-1.5, 0, 1);
    this.MOVE_DECELERATION = new BABYLON.Vector3(0.1, 0.1, 0.1);
    this.MOVE_ACCELERATION = new BABYLON.Vector3(0.2, 0.2, 0.2);
    this.MOVE_IDLE_VALUE = new BABYLON.Vector3(0, 0, this.MOVE_SPEED_MIN.z);

    //rotation
    this.MAX_ROTATION_AMOUNT = new BABYLON.Vector3(_game.tool.degToRad(25), 0, _game.tool.degToRad(10));
    this.MIN_ROTATION_AMOUNT = new BABYLON.Vector3(_game.tool.degToRad(25), 0, _game.tool.degToRad(0));
    this.speed = new BABYLON.Vector3(0, 0, 0);
}

Player.prototype.init = function (skin, pos, scene) {
    this.e = skin;
    this.e.setEnabled(true);
    this.e.renderingGroupId = 1;
    //patch asset
    this.e.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    this.e.rotation = new BABYLON.Vector3(0, _game.tool.degToRad(-90), 0);
    this.MAX_ROTATION_AMOUNT = this.e.rotation.add(this.MAX_ROTATION_AMOUNT);
    this.MIN_ROTATION_AMOUNT = this.e.rotation.add(this.MIN_ROTATION_AMOUNT.negate());
    scene.registerBeforeRender(this.loop.bind(this));
}


Player.prototype.move = function () {
    //Deplacement X 
    var speedX = this.addMovement("x", (this.MOVE_ACCELERATION.x * Key.getAxisX()));
    //Deplacement Z
    var speedZ = this.addMovement("z", (this.MOVE_ACCELERATION.z * Key.getAxisY()));
    this.speed = new BABYLON.Vector3(speedX, 0, speedZ);

    var rotAmoutX = _game.tool.lerp(this.MAX_ROTATION_AMOUNT.x, this.MIN_ROTATION_AMOUNT.x, this.speed.x + (Math.abs(this.MOVE_SPEED_MIN.x - this.MOVE_SPEED_MAX.x)/2) / Math.abs(this.MOVE_SPEED_MIN.x - this.MOVE_SPEED_MAX.x));
    var rotAmoutY = _game.tool.lerp(this.MAX_ROTATION_AMOUNT.z, this.MIN_ROTATION_AMOUNT.z, this.speed.z / Math.abs(this.MOVE_SPEED_MIN.z - this.MOVE_SPEED_MAX.z));

    this.e.rotation = new BABYLON.Vector3(rotAmoutX, this.e.rotation.y, rotAmoutY);
    this.e.position = this.e.position.add(this.speed);
    this.deceleration();
}

Player.prototype.deceleration = function () {
    var axisToDecel = { "x": 0, "y": 0};
    for (var key in axisToDecel) {
        var speedSign = Math.sign(this.speed[key]);
        var decelSign = Math.sign(this.speed[key] - this.MOVE_IDLE_VALUE[key]);
        var decelValue = this.speed[key] < 0 ? this.speed[key] + this.MOVE_DECELERATION[key] : this.speed[key] - this.MOVE_DECELERATION[key];
        if ( Math.sign(decelValue) == decelSign) {
            this.speed[key] = decelValue;
        }
        else {
            this.speed[key] = this.MOVE_IDLE_VALUE[key];
        }
    } 
}

Player.prototype.loop = function () {
    this.move();
}

Player.prototype.addMovement = function (axis, toAdd) {
    var newMove = this.speed[axis] + toAdd;
    if (newMove > this.MOVE_SPEED_MAX[axis]) {
        newMove = this.MOVE_SPEED_MAX[axis];
    }
    if (newMove < this.MOVE_SPEED_MIN[axis]) {
        newMove = this.MOVE_SPEED_MIN[axis];
    }
    return newMove;
}

