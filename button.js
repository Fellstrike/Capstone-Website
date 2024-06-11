/*
NEEDS INSTRUCTIONS ON MAIN PAGE!!
*/


let savedData = JSON.parse(localStorage.getItem('thirdThingData'));   //load saved data

let waterNum =  savedData.Water;

let DuckClick;
let DuckCount;
let DuckBoom;
let DuckPress;
let duck;
let explode;
let Green = 255;
let Blue = 255;
let Red = 150;
let click = false;
let t = 0;
let Size = 300;
let SizeAdd = 1;
let DuckExplode = 0;
let Lose = false;
let ShakeX;
let ShakeY;
let ClickNum = 0;
let TextColor = 255;
let middleX;
let middleY;
let Check = false;
let CheckMove;
let Speed = 5;
let flip = false;
let DuckTimer = 5;
let RedText = 70;
let rotationAngle = 0;
let rotationSpeed = 0.1;

let backButton;
let restartButton;

let mouseIsClicked = false;

function preload() {
  duck = loadImage("duck/TntDuck.png");
  explode = loadImage("duck/explosion.png");
  DuckClick = loadSound("duck/DuckClick.wav");
  DuckCount = loadSound("duck/DuckCount.wav");
  DuckBoom = loadSound("duck/DuckBoom.wav");
  DuckPress = loadSound("duck/DuckPress.wav");
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  DuckClick.play();
  ShakeX = width / 2;
  ShakeY = height / 2;
  CheckMove = width / 2.9;
  backButton = createButton('Gallery');
  backButton.style('font-size', 30 + 'px');
  backButton.size(110, 50);
  backButton.position(width * 0.3, height*0.85);
  backButton.hide();
  backButton.mouseClicked(toMain);
  restartButton = createButton('Restart');
  restartButton.style('font-size', 30 + 'px');
  restartButton.size(110, 50);
  restartButton.position(width * 0.55, height*0.85);
  restartButton.hide();
  restartButton.mouseClicked(resetGame);
  speed = width*0.004;
}

function draw() {
  background(0, 0, 255);
  imageMode(CENTER);

  if (Lose && ClickNum < 5) {
    image(explode, width / 2, height / 2, 1000, 1000);
    fill(80, 40, 0);
    text("Game Over", width * 0.19, height / 1.2);
    fill(255, 40, 0);
    text("Game Over", width * 0.191, height / 1.18);
    backButton.show();
    restartButton.show();
  }

  push();
  translate(ShakeX, ShakeY);
  if (t > 0 && t <= 14) {
    rotationAngle -= rotationSpeed;
  }
  else if (t > 14) {
    rotationAngle += rotationSpeed;
  }
  rotate(rotationAngle);
  image(duck, 0, 0, Size, Size);
  pop();

  tint(255, Green, Blue);
  textSize(width*0.1);
  fill(255, 150, 50);
  text(ClickNum, width*0.1, 150);
  fill(255, 255, TextColor);
  text(ClickNum, width*0.097, 146);
  noFill();
  stroke(150);
  rect(width / 2.9, height / 1.5, width*0.285, 50);
  noFill();
  stroke(0, 190, 30);
  rect(width / 2.05, height / 1.5, 20, 50); // Box
  fill(Red, 10, 10);
  rect(CheckMove, height / 1.5, 20, 50); // Moving Box
  fill(RedText, 50, 50);
  text(DuckTimer, width / 2.3, height / 3.2);
  push();
  textSize(width*0.025);
  fill(255);
  text("Click or Press space when the bar hits the center to help the duck drink!", width*0.1, height/1.25);
  pop();

  if (!flip) {
    CheckMove += Speed; // SPEED
  } else {
    CheckMove -= Speed;
  }

  if (CheckMove >= width*0.62 && !Lose) {
    flip = true;
    DuckTimer -= 1;
    RedText += 20;
    DuckCount.play();
  } else if (CheckMove <= width*0.345 && !Lose) {
    flip = false;
    DuckTimer -= 1;
    RedText += 20;
    DuckCount.play();
  
  }

  if (((keyIsPressed && key === ' ') || mouseIsPressed)&& CheckMove >= width*0.47 && CheckMove <= width*0.51 && !click && !Lose) { // Duck CLICK
    click = true;
    ClickNum += 1;
    DuckPress.play();
    DuckExplode = 0;
    TextColor -= 7;
    Speed += width*0.0002;
    DuckTimer += 1;
    RedText -= 20;
    mouseIsClicked = false;
  } 
  else if (((keyIsPressed && key === ' ') || mouseIsPressed) && !(CheckMove >= width*0.47 && CheckMove <= width*0.51) && !Lose && !click) { // DUCK EXPLODE
    DuckExplode = 1;
    DuckBoom.play();
    Lose = true;
    image(explode, width / 2, height / 2, 1000, 1000);
    Speed = 0;
    Red = 250;
  }

  if (Lose) {
    
  }
  else if (click && !Lose) { // DUCK ROTATE/GROW
    t++;
    Size += SizeAdd;
    if (ClickNum >= 5)
      {
        gameWon();
        Speed = 0;
      }

    if (t > 28 && !Lose) { // Click Time
      click = false;
      rotationAngle = 0;
      t = 0;
      Size = 300;
      ShakeX = width / 2;
      ShakeY = height / 2;
    }
  }
}

function mouseClicked() {
  mouseIsClicked = true;
}

function gameWon()
{
  waterNum++;
  savedData.Water = waterNum;
  localStorage.setItem('thirdThingData', JSON.stringify(savedData));
  Lose = true;
  DuckTimer = "Won";
  restartButton.show();
  backButton.show();
}

function toMain()
{
  window.location.assign('index.html');
}

function resetGame()
{
  ClickNum = 0;
  ShakeX = width / 2;
  ShakeY = height / 2;
  CheckMove = width * 0.6;
  Speed = width*0.004;
  DuckExplode = 0;
  Lose = false;
  DuckTimer = 5;
  let rotationAngle = 0;
  let rotationSpeed = 0.05;
  restartButton.hide();
  backButton.hide();
  DuckBoom.stop();
}
