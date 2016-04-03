import THREE from 'three';
export default class Camera {
  threeCamera = null;

  // TODO add more camera options
  constructor(options, container) {
    // Create camera
    const aspect = container.offsetWidth / container.offsetHeight;
    const d = 20;
    this.threeCamera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

    // Setup direction
    this.threeCamera.rotation.order = 'YXZ';
    this.threeCamera.position.set(20, 20, 20);
  }
}