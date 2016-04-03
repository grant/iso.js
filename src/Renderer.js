import THREE from 'three';
import Scene from './Scene';
import Camera from './Camera';

export default class Renderer {
  static SHADOWS_ENABLED = false;
  static threeRenderer = new THREE.WebGLRenderer({antialias: true});

  static get renderDomElement() {
    return Renderer.threeRenderer.domElement;
  }

  static render(scene:Scene, camera:Camera, container:HTMLElement) {
    // Setup shadows
    Renderer.threeRenderer.shadowMap.enabled = Renderer.SHADOWS_ENABLED;
    Renderer.threeRenderer.shadowMap.soft = true;
    Renderer.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Update container size
    Renderer.threeRenderer.setSize(container.offsetWidth, container.offsetHeight);

    // Add rendering to container
    container.appendChild(Renderer.renderDomElement);

    // Render
    Renderer.threeRenderer.render(scene.threeScene, camera.threeCamera);
  }
}