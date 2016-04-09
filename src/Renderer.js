import THREE from 'three';
import Scene from './Scene';
import Camera from './Camera';

export default class Renderer {
  static SHADOWS_ENABLED = false;
  static threeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  static setup(container:HTMLElement) {
    // Setup shadows
    Renderer.threeRenderer.shadowMap.enabled = Renderer.SHADOWS_ENABLED;
    Renderer.threeRenderer.shadowMap.soft = true;
    Renderer.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Update container size
    Renderer.threeRenderer.setSize(container.offsetWidth, container.offsetHeight);
    Renderer.threeRenderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

    // Add rendering to container
    container.appendChild(Renderer.renderDomElement);
  }

  static get renderDomElement() {
    return Renderer.threeRenderer.domElement;
  }

  /**
   * Renders the scene to the container
   * @param scene The scene to render
   */
  static render(scene:Scene) {
    let camera = scene.camera;

    // Render
    Renderer.threeRenderer.render(scene.threeScene, camera.threeCamera);
  }

  /**
   * World resize callback.
   * @param container
   */
  static resize(container:HTMLElement) {
    Renderer.threeRenderer.setSize(container.offsetWidth, container.offsetHeight);
  }
}