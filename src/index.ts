import GameContext from "./GameContext";
import Engine from "./Engine";

const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");
GameContext.context = context;

const engine = new Engine();
engine.start();

canvas.addEventListener("keypress", engine.eventListener);

// import marioImage from "../assets/06-mario.png";
// context.rect(width / 2.4, heigth / 2.5, 200, 200);
// context.fillStyle = "#808";
// context.fill();

// const drawText = (color, text, x, y) => {
//   context.fillStyle = color;
//   context.textAlign = "center";
//   context.fillText(text, x, y);
//   context.restore();
// };

// let changeColor = ({ key }) => {
//   let hash = { 1: "#e6004c", 2: "#cc99ff", 3: "#0000ff", 4: "#009933" };
//   if (key in hash) {
//     drawText(hash[key], key, 200, 200);
//     context.fillStyle = hash[key];
//     context.fill();
//   }
// };

// let deleteKey = event => {
//   setTimeout(() => {
//     context.clearRect(0, 0, width, heigth);
//   }, 120);
// };
// canvas.addEventListener("keyup", deleteKey);

// canvas.addEventListener("keypress", changeColor);
// let x = 100;
// let y = 100;
// const imagen = new Image();
// imagen.src = marioImage;
// let direction = 1;
// let imageLoaded = () => {
//   context.save();
//   context.scale(-1, 1);

//   context.restore();
// };

// let move = ({ key }) => {
//   console.log(key);
//   if (key == "ArrowLeft") {
//     context.scale(-1, 1);

//     direction = -1;
//     context.clearRect(x - 200, y, 500, 500);
//     x -= 50;
//     console.log("x: " + x * -1);
//     console.log(direction);

//     context.drawImage(imagen, x * -1, y);
//   } else if (key == "ArrowRight") {
//     direction = 1;

//     context.clearRect(0, 0, 1440, 1000);
//     context.scale(1, 1);
//     x += 50;
//     console.log("x: " + x);
//     context.drawImage(imagen, x * direction, y);
//   }
// };

// imagen.addEventListener("load", imageLoaded);
// canvas.addEventListener("keydown", move);
// let volume = 1;

// import audio from "../assets/mlss-world-map.mp3";
// const sound = new Audio(audio);
// let move = ({ key }) => {
//   if (key == "ArrowUp") {
//     if (sound.volume < 1) sound.volume += 0.1;
//   } else if (key == "ArrowDown") {
//     if (sound.volume >= 0.25) sound.volume -= 0.1;
//   } else if (key == "Meta") sound.paused ? sound.play() : sound.pause(); //USE META SPACE NO JALA EN MAC
// };
