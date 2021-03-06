import {
    BlinnPhongMaterial,
    Camera,
    MeshRenderer,
    PrimitiveMesh,
    WebGPUEngine,
    Vector3,
} from "arche-engine";

const engine = new WebGPUEngine("canvas");
engine.canvas.resizeByClientSize();
engine.init().then(() => {
    const scene = engine.sceneManager.activeScene;
    const rootEntity = scene.createRootEntity();

    // init camera
    const cameraEntity = rootEntity.createChild("camera");
    cameraEntity.addComponent(Camera);
    const pos = cameraEntity.transform.position;
    pos.setValue(10, 10, 10);
    cameraEntity.transform.position = pos;
    cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

    // init light
    scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
    scene.ambientLight.diffuseIntensity = 1.2;

    // init cube
    const cubeEntity = rootEntity.createChild("cube");
    const renderer = cubeEntity.addComponent(MeshRenderer);
    const mtl = new BlinnPhongMaterial(engine);
    const color = mtl.baseColor;
    color.setValue(0.0, 0.8, 0.5, 1.0);
    mtl.baseColor = color;
    renderer.mesh = PrimitiveMesh.createCuboid(engine);
    renderer.setMaterial(mtl);

    engine.run();
});
