import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

import { setupPhysics } from './physics.js';
import { initMultiplayer } from './multiplayer.js';

// Scene setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light (important – warna black screen ka common reason)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Load assets
const loader = new GLTFLoader();
let playerCar = null;

loader.load(
    'models/car1.glb',
    (gltf) => {
        playerCar = gltf.scene;
        scene.add(playerCar);
        setupPhysics(playerCar);
    },
    undefined,
    (error) => {
        console.error('Model load error:', error);
    }
);

// Controls
const keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Game loop
function animate() {
    requestAnimationFrame(animate);

    if (playerCar) {
        if (keys['ArrowUp']) playerCar.position.z -= 0.1;
        if (keys['ArrowDown']) playerCar.position.z += 0.1;
        if (keys['ArrowLeft']) playerCar.rotation.y += 0.05;
        if (keys['ArrowRight']) playerCar.rotation.y -= 0.05;
    }

    renderer.render(scene, camera);
}

animate();

// Multiplayer
initMultiplayer(playerCar);
