var Player = function () {

    //move
    this.SPEED_MAX = 0.5;
    this.SPEED_MOVE = 0.1;
    this.SPEED_DECEL = 0.05;
    this.speedX = 0;

    //speed
    this.JUMP_MAX_IMPULSION = 1;
    this.JUMP_IMPULSION = 0.2;
    this.JUMP_DECEL = 0.1;
    this.jumpHeight = 0;

    //provi 
    this.jumpSaturation = false;
}

Player.prototype.init = function (pos, scene) {
    this.e = BABYLON.Mesh.CreateSphere("Player", 100, 1, scene);
    scene.registerBeforeRender(this.loop.bind(this));
}

Player.prototype.onRelease = function () {

}
// Revoir SAUT et MOVE. Ca Pue Ca se ressemble et c est mal fait....
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
}

Player.prototype.move = function () {
    this.speedX = this.addMovement(this.speedX, (this.SPEED_MOVE * Key.getAxisX()), this.SPEED_MAX);
    this.e.position = this.e.position.add(new BABYLON.Vector3(this.speedX, 0, 0));
    if (Math.abs(this.speedX) >= this.SPEED_DECEL) {
        this.speedX += this.speedX < 0 ? this.SPEED_DECEL : -this.SPEED_DECEL;
    }
    else {
        this.speedX = 0;
    }
}

Player.prototype.loop = function () {
    this.jump();
    this.move();
}

Player.prototype.addMovement = function (current, toAdd, max) {
    var newMove = current + toAdd;
    if (Math.abs(newMove) > max) {
        newMove = newMove < 0 ? -max : max;
    }
    return newMove;
}