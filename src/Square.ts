import GameObject from "./GameObject";
import Time from "./Time";
import { width, heigth } from "./setup";

class Square extends GameObject {
  //Personaje
  protected size;
  direction;
  xSign;
  speed = 5000;
  color;
  colors;
  colorSign;
  colorDir;
  constructor(x, y, size) {
    super();
    this.size = size;
    this.xSign = 1;
    this.coordX = 10;
    this.color = 1;
    this.colorDir = true;
    this.colorSign = 2;
    this.coordY = y;
    this.colors = {
      1: "#ffe6e6",
      2: "#ffcccc",
      3: "#ffb3b3",
      4: "#ff9999",
      5: "#ff8080",
      6: "#ff4d4d",
      7: "ff3333"
    };
  }
  public update() {
    if (this.coordX >= width - this.size) {
      this.xSign = -1;
    } else if (this.coordX <= 0) {
      this.xSign = 1;
    }
    if (this.color == 5 || this.color == 1) this.colorDir = !this.colorDir;

    if (Time.deltaTime >= 0.015) this.color += this.colorDir ? -1 : 1;

    this.coordX += this.speed * Time.deltaTime * this.xSign;
    console.log(this.color);
  }
  public render() {
    const context = GameObject.context;
    context.clearRect(0, 0, 1440, 778);
    context.beginPath();
    context.rect(this.coordX, this.coordY, this.size, this.size);
    context.fillStyle = this.colors[this.color];
    context.fill();
  }
}

export default Square;
