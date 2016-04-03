import Stats from 'stats.js';

export default class DebugStats {
  stats = new Stats();
  constructor(container:HTMLElement) {
    this.container = container;
    this.stats.setMode(0); // 0: fps, 1: ms
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
  }

  render() {
    this.container.appendChild(this.stats.domElement);

    var update = () => {
      this.stats.begin();
      // monitored code goes here
      this.stats.end();
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
}