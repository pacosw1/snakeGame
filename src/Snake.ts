import GameContext from "./GameContext";

class Snake {
  private position = [1, 0];
  private direction = [1, 0];
  private color = "cyan";
  private length = 4;
  // private direccion = ;
  private path = [
    { x: 2, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 0 }
  ];

  public setPosition(x, y) {
    this.position[0] = x;
    this.position[1] = y;
  }

  public addTail() {
    this.path.push({ x: 0, y: 0 });
  }
  public getPosition() {
    return { x: this.position[0], y: this.position[1] };
  }

  public setDirection(directionObject) {
    if (directionObject.x == 0) this.direction[0] = directionObject.x;
    if (directionObject.y == 0) this.direction[1] = directionObject.y;
  }

  public update = () => {
    const { context, scale } = GameContext;
    let { position, path, direction } = this;
    const { height, width } = context.canvas;

    if (position[0] > width + -scale) {
      position[0] = 0;
    } else if (position[0] < 0) {
      position[0] = width - scale;
    } else if (position[1] < 0) {
      position[1] = height - scale;
    } else if (position[1] > height) {
      position[1] = 0;
    } else {
      position[0] += direction[0] * scale;
      position[1] += direction[1] * scale;
    }

    for (let i = 0; i < path.length; i++) {
      if (i + 1 < path.length) path[i] = path[i + 1];
      if (i == path.length - 1) {
        path[i] = { x: position[0], y: position[1] };
      }

      if (path[i + 1]) path[i] = path[i + 1];
    }
  };
  public render = () => {
    const context = GameContext.context;
    const scale = GameContext.scale;
    const [x, y] = this.position;
    context.save();
    context.beginPath();
    context.fillStyle = this.color;

    context.fillRect(x, y, scale, scale);
    for (let i = 0; i < this.path.length; i++) {
      // if (this.path[i + 1]) this.path[i] = this.path[i + 1];
      context.fillRect(this.path[i].x, this.path[i].y, scale, scale);
    }
    context.closePath();
    context.restore();
  };
}

export default Snake;
