import THREE from 'three';
import Scene from './Scene';
import Camera from './Camera';

export default class Renderer {
  static threeRenderer = new THREE.WebGLRenderer({antialias: true});

  static render(scene:Scene, camera:Camera, container) {
    console.log('render');

    // TODO set better render size
    Renderer.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(Renderer.threeRenderer.domElement);
    Renderer.threeRenderer.render(scene.threeScene, camera.threeCamera);
  }
}