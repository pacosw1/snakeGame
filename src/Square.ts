import GameObject from "./GameObject";
import { width, heigth } from "./setup";

class Square extends GameObject {
  protected size;
  direction;
  xSign;
  speed = 10;
  constructor(x, y, size) {
    super();
    this.size = size;
    this.direction = true;
    this.xSign = 1;
    this.coordX = 0;
    this.coordY = y;
  }
  public render() {
    this.coordX += 10 * this.xSign;
    const context = GameObject.context;
    context.clearRect(0, 0, 1440, 778);
    context.beginPath();
    if (this.coordX == width - this.size || this.coordX == 0) {
      // alert(this.direction);
      this.direction = !this.direction;
      this.xSign = this.direction ? 1 : -1;
    }

    context.rect(this.coordX, this.coordY, this.size, this.size);
    context.fillStyle = "#0074D9";
    context.fill();
  }
}

export default Square;
