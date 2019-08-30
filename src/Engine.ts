import GameObject from "./GameObject";
import Time from "./Time";

class Engine {
  protected gameObjects;
  constructor(objects) {
    this.gameObjects = [...objects];
  }

  public tick = () => {
    // Time.update();

    for (let i = 0; i < this.gameObjects.length; i++) {
      requestAnimationFrame(this.tick);
    }
  };
  public start() {
    requestAnimationFrame(this.tick);
  }
  public kill() {}
}

export default Engine;
