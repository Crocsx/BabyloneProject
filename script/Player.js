var Player = function () {

    //move
    this.MOVE_SPEED_MAX = new BABYLON.Vector3(1, 0, 1);
    this.MOVE_SPEED_MIN = new BABYLON.Vector3(-1, 0, 0.1);
    this.MOVE_DECELERATION = new BABYLON.Vector3(0.1, 0.1, 0.1);
    this.MOVE_ACCELERATION = new BABYLON.Vector3(0.2, 0.2, 0.2);
    this.MOVE_IDLE_VALUE = new BABYLON.Vector3(0, 0, this.MOVE_SPEED_MIN.z);

    this.ROTATION_AMOUNT = new BABYLON.Vector3(15, 0, 0);
    this.speed = new BABYLON.Vector3(0, 0, 0);

    //speed
    this.JUMP_MAX_IMPULSION = 1;
    this.JUMP_IMPULSION = 0.2;
    this.JUMP_DECEL = 0.1;
    this.jumpHeight = 0;
}

Player.prototype.init = function (skin, pos, scene) {
    this.e = skin;
    this.e.setEnabled(true);
    //patch asset
    this.e.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);

    scene.registerBeforeRender(this.loop.bind(this));
}

Player.prototype.onRelease = function () {

}
/* Revoir SAUT et MOVE. Ca Pue Ca se ressemble et c est mal fait....
Player.prototype.jump = function () {
    if (!this.jumpSaturation && (Key.isDown(Key.SPACE) || Key.isDown(Key.UP))) {
        this.jumpHeight = this.addMovement(this.jumpHeight, this.JUMP_IMPULSION, this.JUMP_MAX_IMPULSION)
        if (this.jumpHeight == this.JUMP_MAX_IMPULSION) {
            this.jumpSaturation = true;
        }
    }
    this.e.position = this.e.position.add(new BABYLON.Vector3(0, this.jumpHeight, 0));
    if (Math.abs(this.jumpHeight) >= this.JUMP_DECEL) {
        this.jumpHeight += this.speedX < 0 ? this.JUMP_DECEL : -this.JUMP_DECEL;
    }
    else {
        this.jumpHeight = 0;
        this.jumpSaturation = false;
    }
}*/

Player.prototype.move = function () {
    //Deplacement X 

    var actualX = this.addMovement("x", (this.MOVE_ACCELERATION.x * Key.getAxisX()));
    //Deplacement Z
    var actualZ = this.addMovement("z", (this.MOVE_ACCELERATION.z * Key.getAxisY()));

    this.e.position = this.e.position.add(new BABYLON.Vector3(actualX, 0, actualZ));
    
    //this.e.rotate(new BABYLON.Vector3(1, 0, 0), this.ROTATION_AMOUNT.x * Key.getAxisX());
    console.log(this.speed)
    this.deceleration();
    /*if (Math.abs(this.speed) >= this.SPEED_DECEL) {
        this.speed += this.speed < 0 ? this.SPEED_DECEL : -this.SPEED_DECEL;
    }
    else {
        this.speed = 0;
    }*/
}

Player.prototype.deceleration = function () {
    var axisToDecel = { "x": 0, "y": 0, "z": 0 };
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
    this.speed[axis] = newMove;
    return newMove;
}

