abstract class GameObject {
  public static context: CanvasRenderingContext2D;
  protected coordX: number;
  protected coordY: number;
  public abstract render();
  public abstract update();

  public static getCanvasWidth() {
    return GameObject.context.canvas.width;
  }
  public static getCanvasHeight() {
    return GameObject.context.canvas.height;
  }
}

export default GameObject;
