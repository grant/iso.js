import THREE from 'three';
import Scene from './Scene';
import Camera from './Camera';

export default class Renderer {
  static threeRenderer = new THREE.WebGLRenderer({antialias: true});

  static get renderDomElement() {
    return Renderer.threeRenderer.domElement;
  }

  static render(scene:Scene, camera:Camera, container) {
    Renderer.threeRenderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(Renderer.renderDomElement);
    Renderer.threeRenderer.render(scene.threeScene, camera.threeCamera);
  }
}