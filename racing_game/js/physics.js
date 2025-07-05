import * as CANNON from 'cannon-es';

export function setupPhysics(carModel) {
    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    const carBody = new CANNON.Body({ mass: 500 });
    
    // Sync 3D model with physics
    function update() {
        carModel.position.copy(carBody.position);
        carModel.quaternion.copy(carBody.quaternion);
    }
    
    world.addEventListener('postStep', update);
    return world;
}