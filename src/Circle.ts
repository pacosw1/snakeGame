import GameObject from "./GameObject";

class Circle extends GameObject {
  protected size;
  constructor(x, y, size) {
    super();
    this.size = size;
    this.coordX = x;
    this.coordY = y;
  }

  public render() {
    const context = GameObject.context;
    context.ellipse(
      this.coordX,
      this.coordY,
      this.size,
      this.size,
      0,
      0,
      Math.PI * 2
    );
    context.fillStyle = "#0074D9";
    context.fill();
  }
}
export default Circle;
