var Camera = function (name, pos, scene) {
    this.e = new BABYLON.FollowCamera("FollowCam", pos, scene);
    this.e.radius = 10; // how far from the object to follow
    this.e.heightOffset = 5; // how high above the object to place the camera
    this.e.rotationOffset =90; // the viewing angle
    this.e.cameraAcceleration = 0.05 // how fast to move
    this.e.maxCameraSpeed = 20 // speed limit
    this.activateCamera(scene);
}

Camera.prototype.setTarget = function(target){
    this.e.target = target;
}

Camera.prototype.activateCamera = function (scene) {
    scene.activeCamera = this.e;
}


//a decommenté pour avoir une free cam
/*
var Camera = function (name, pos, scene) {
    this.e = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, 0), scene);
    scene.registerBeforeRender(this.loop.bind(this));
}

Camera.prototype.setTarget = function (target) {
    this.target = target;
}

Camera.prototype.activateCamera = function (scene) {
    scene.activeCamera = this.e;
}

Camera.prototype.loop = function () {
    this.e.setTarget(this.target.position);
}
*/