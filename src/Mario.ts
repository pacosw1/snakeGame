import GameObject from "./GameObject";
import { width, heigth } from "./setup";
import marioImage from "../assets/06-mario.png";
import audio from "../assets/mlss-world-map.mp3";

class Mario extends GameObject {
  canvas = document.getElementById("game-area") as HTMLCanvasElement;

  protected size;
  direction;
  xSign;
  speed = 1;
  imagen;
  scaleX;
  scaleY;

  constructor(x, y, size) {
    super();
    this.imagen = new Image();
    this.imagen.src = marioImage;
    this.size = size;
    this.direction = true;
    this.xSign = 1;
    this.scaleX = 1;
    this.scaleY = 1;
    this.coordX = 0;
    this.coordY = y;
  }
  public move = ({ key }) => {
    const context = GameObject.context;

    console.log(key);
    if (key == "a") {
      if (this.scaleX > 0) {
        this.scaleX = -1;
      } else {
        this.coordX += 1 * this.speed;
      }
      this.render();
      if (this.coordX > 0) this.coordX = this.coordX * -1;
    } else if (key == "d") {
      this.coordX = Math.abs(this.coordX);
      if (this.scaleX < 0) this.scaleX = 1;
      else this.coordX += 1 * this.speed;
      this.render();
    } else if (key == "ArrowLeft") {
      this.speed = this.speed - this.speed * 0.25;
    } else if (key == "ArrowRight") {
      this.speed *= 1.25;
    }
    console.log(`scaleX: ${this.scaleX} x: ${this.coordX}`);
  };
  public imageLoaded = () => {
    const context = GameObject.context;
  };

  public render() {
    const context = GameObject.context;

    // if (this.coordX == width - this.size || this.coordX == 0) {
    //   // alert(this.direction);
    //   this.direction = !this.direction;
    //   this.xSign = this.direction ? 1 : -1;
    // }
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvas.addEventListener("keydown", this.move);

    context.scale(this.scaleX, this.scaleY);

    // context.beginPath();

    context.drawImage(this.imagen, this.coordX, this.coordY);

    // context.fillStyle = "#0074D9";

    console.log(this.scaleX);
  }
}

export default Mario;
