import GameObject from "./GameObject";
import Time from "./Time";
import { width, heigth } from "./setup";

class Board extends GameObject {
  public board;
  public style = "#ffb3b3";
  public gridSize;
  constructor(gridSize, width) {
    super();
    this.gridSize = gridSize;
    this.width = width;
    this.board = [gridSize][gridSize];
  }
  public update() {
    const context = GameObject.context;

    console.log(this.style);
    for (let i = 0; i < this.snake.length; i++) {
      this.board[1][2].style = "#46db25";
    }
  }
  public render() {
    const context = GameObject.context;
    context.clearRect(0, 0, 1440, 778);
    context.beginPath();
    console.log("rendering");
    
      this.xStart = 0;
      this.yStart += this.width + 1;
    }
    this.yStart = 0;
  }
}

export default Board;
