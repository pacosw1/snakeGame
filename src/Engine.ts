import GameContext from "./GameContext";
import Snake from "./Snake";

class Engine {
  private readonly framerate: number = 1000 / 10;
  private player: Snake = null;
  directionTable = {
    d: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    a: { x: -1, y: 0 },
    s: { x: 0, y: 1 }
  };

  public start = () => {
    this.init();
    setInterval(this.tick, this.framerate);
  };

  public eventListener = event => {
    let direction = this.directionTable[event.key];
    this.player.setDirection(direction);
  };

  private clearScreen = () => {
    const context = GameContext.context;
    const canvas = context.canvas;
    const width = canvas.width;
    const height = canvas.height;

    context.save();
    context.beginPath();
    context.fillStyle = "green";
    context.strokeStyle = "white";
    context.lineWidth = 5;
    context.strokeRect(10, 10, 100, 100);

    context.fillRect(0, 0, width, height);
    context.closePath();
    context.restore();
  };

  public init = () => {
    this.player = new Snake();
  };

  public tick = () => {
    this.clearScreen();
    this.player.render();
    this.player.update();
  };
}

export default Engine;
