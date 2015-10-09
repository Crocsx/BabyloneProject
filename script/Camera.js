var Camera = function (name, pos, scene) {
    this.e = new BABYLON.FollowCamera("FollowCam", pos, scene);
    this.e.radius = 20; // how far from the object to follow
    this.e.heightOffset = 15; // how high above the object to place the camera
    this.e.rotationOffset = 180; // the viewing angle
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
