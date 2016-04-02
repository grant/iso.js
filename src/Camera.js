import THREE from 'three';
export default class Camera {
  threeCamera = null;
  constructor() {
    // TODO set better camera viewport
    // Create camera
    const aspect = window.innerWidth / window.innerHeight;
    const d = 20;
    this.threeCamera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

    // Setup direction
    this.threeCamera.rotation.order = 'YXZ';

    this.threeCamera.position.set(20, 20, 20);
    this.threeCamera.rotation.y = -Math.PI / 4;
    this.threeCamera.rotation.x = Math.atan(-1 / Math.sqrt(2));
  }
}