function createSkybox() {
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, _game.scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", _game.scene);
    skyboxMaterial.backFaceCulling = false;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/skybox", _game.scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.renderingGroupId =0;
    return skybox;
}