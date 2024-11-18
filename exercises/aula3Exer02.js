import * as THREE from 'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {
    initRenderer,
    initCamera,
    initDefaultBasicLight,
    setDefaultMaterial,
    InfoBox,
    onWindowResize,
    createGroundPlaneXZ
} from "../libs/util/util.js";
let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);
// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);
//create a spheres
function create_circle() {
    const numSpheres = 20; 
    const radius = 6;     
    for (let i = 0; i < numSpheres; i++) {
        const angle = (i / numSpheres) * 2 * Math.PI; // Ângulo para cada esfera
        // Criando a esfera
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
        const sphere = new THREE.Mesh(sphereGeometry, material);
        // Calculando a posição no círculo
        const x = radius * Math.cos(angle); // Posição x
        const z = radius * Math.sin(angle); // Posição z
        sphere.position.set(x, 1.0, z); // Definindo posição com altura fixa (y = 1.0)
        scene.add(sphere);
    }
}
create_circle();
    
//cube.add(cylinder);
// Use this to show information onscreen
let controls = new InfoBox();
controls.add("Basic Scene");
controls.addParagraph();
controls.add("Use mouse to interact:");
controls.add("* Left button to rotate");
controls.add("* Right button to translate (pan)");
controls.add("* Scroll to zoom in/out.");
controls.show();
render();
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}