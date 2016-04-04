import THREE from 'three';
export default class Camera {
  threeCamera = null;
  container = null;

  // TODO add more camera options
  constructor(options, container) {
    this.container = container;
    // Create camera
    const aspect = container.offsetWidth / container.offsetHeight;
    const d = 20;
    this.threeCamera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

    // Setup direction
    this.zoom(options.zoom);
    this.threeCamera.rotation.order = 'YXZ';
    this.threeCamera.position.set(-50, 50, -50);
  }

  /**
   * Zoom the camera to a zoom level
   * @param zoomLevel The zoom level
   * @returns {Camera}
   */
  zoom(zoomLevel:number):Camera {
    this.threeCamera.zoom = zoomLevel;
    this.threeCamera.updateProjectionMatrix();
    return this;
  }

  /**
   * World resize callback
   * @returns {Camera}
   */
  resize():Camera {
    this.threeCamera.aspect = container.offsetWidth / container.offsetHeight;
    this.threeCamera.updateProjectionMatrix();
    return this;
  }
}