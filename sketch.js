let game;
let music;
let click;
let over;
let meteor;
let collector;
let heart;

function preload() {
  meteor = loadImage("meteor.gif");
  collector = loadImage("pipe.png");
  heart=loadImage("heart.png");
  music = loadSound("music.mp3");
  click =loadSound("pop.mp3");
  over= loadSound("gameover.mp3");
 
  
  bg= loadImage("bg.png");
  

}

function setup() {
  createCanvas(400, 410);
  
  let difficulty = 'easy'; // Change this to 'medium' or 'hard' for different difficulty levels
  game = new Game(difficulty);
  music.loop();
  music.play()
  noStroke();
  
  
  
  
}

function draw() {
  
  
  game.update();
  game.display();
  

  
}

