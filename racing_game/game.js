import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setupPhysics } from './physics.js';
import { initMultiplayer } from './multiplayer.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load assets
const loader = new GLTFLoader();
let playerCar;

loader.load('models/car1.glb', (gltf) => {
    playerCar = gltf.scene;
    scene.add(playerCar);
    setupPhysics(playerCar); // Initialize physics
});

// Controls
const keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Game loop
function animate() {
    requestAnimationFrame(animate);
    if (keys['ArrowUp']) playerCar.position.z -= 0.1;
    renderer.render(scene, camera);
}
animate();

// Multiplayer
initMultiplayer(playerCar);