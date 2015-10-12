function ADD_PLACEHOLDER() {
    _game.player = new Player();
    _game.player.init(_game.loadedAssets["Player"],new BABYLON.Vector3(0, 2, 0), _game.scene);
    _game.camera.setTarget(_game.player.e);

    _game.light = new BABYLON.HemisphericLight("mainLight", new BABYLON.Vector3(0, 5, 0), _game.scene);
    _game.light.parent = _game.player.e;

    _game.obsGenerator = new ObstacleGenerator();
    _game.obsGenerator.start(_game.scene);

    _game.skybox = createSkybox();

    _game.ground = BABYLON.Mesh.CreateGround("Ground", 100, 100, 2, _game.scene);
    _game.ground.position = new BABYLON.Vector3(0, -1, 50);
    _game.map = new Map();
}

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