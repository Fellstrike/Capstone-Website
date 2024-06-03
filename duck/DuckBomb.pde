import processing.sound.*;
SoundFile DuckClick;
SoundFile DuckCount;
SoundFile DuckBoom;
SoundFile DuckPress;
PImage duck;
PImage explode;
float Green = 255;
float Blue = 255;
float Red = 0;
boolean click = false;
float t;
float Size = 300;
float SizeAdd = 1;
int DuckExplode;
boolean Lose = false;
int ShakeX;
int ShakeY;
int ClickNum;
int TextColor = 255;
float middleX;
float middleY;
boolean Check = false;
float CheckMove;
float Speed = 2.3;
float Mode;
boolean flip = false;
int DuckTimer = 5;
int RedText = 150;
void setup(){         //Press Space at the right time
  frameRate(75);
  size(1000,1000);
  duck = loadImage("rubberduck.png");
  explode = loadImage("explosion.png");
  DuckClick = new SoundFile(this, "DuckClick.wav");
  DuckCount = new SoundFile(this, "DuckCount.wav");
  DuckBoom = new SoundFile(this, "DuckBoom.wav");
  DuckPress = new SoundFile(this, "DuckPress.wav");
  DuckClick.play();
  ShakeX = width/2;
  ShakeY = height/2;
  CheckMove = width/2.9;
}

void draw(){
  background(0);
  imageMode(CENTER);
   if (Lose == true) {
      image(explode,width/2,height/2,1000,1000);
      fill(80,40,0);
      text("Game Over", width/5.1,height/1.2);
      fill(255,40,0);
      text("Game Over", width/5.08,height/1.18);
    }
  image(duck,ShakeX,ShakeY,Size,Size);
  tint(255,Green,Blue);
  textSize(150);
  fill(255,150,50);  // Text Color
  text(str(ClickNum), 100, 150);
  fill(255,255,TextColor);
  text(str(ClickNum), 96, 146);
  noFill();
  stroke(150);
  rect(width/2.9,height/1.5,300,50);
  noFill();
  stroke(0,190,30);
  rect(width/2.05,height/1.5,20,50);//Box
  fill(Red,60,10);
  rect(CheckMove,height/1.5,20,50);//Moving Box
  fill(RedText,50,50);
  text(str(DuckTimer), width/2.3,height/3.2);
  if (flip == false){ 
  CheckMove += Speed; // SPEED
  } else {
    CheckMove -= Speed;
  }
    if (CheckMove >= 622 && Lose == false){
     flip = true; 
     DuckTimer -= 1;
     RedText += 20;
     DuckCount.play();
    } else if (CheckMove <= 345 && Lose == false){
     flip = false; 
     DuckTimer -= 1;
     RedText += 20;
     DuckCount.play();
    }
    if (keyPressed && key == ' ' && CheckMove >= 466 && CheckMove <= 516 && click == false && Lose == false && click == false) { //Duck CLICK
   click = true;
   ClickNum += 1;
   DuckPress.play();
   DuckExplode = 0;
   TextColor -= 7;
   Speed += .1;
   DuckTimer += 1;
   RedText -= 20;
    } else if (keyPressed && key == ' ' && !(CheckMove >= 466 && CheckMove <= 516) && Lose == false && click == false) { // DUCK EXPLODE
      DuckExplode = 1;
      DuckBoom.play();
      Lose = true;
      image(explode,width/2,height/2,1000,1000);
      Speed = 0;
      Red = 250;
     }
     if (DuckTimer == 0 && Lose == false) { // DUCK EXPLODE
      DuckExplode = 1;
      DuckBoom.play();
      Lose = true;
      image(explode,width/2,height/2,1000,1000);
      Speed = 0;
      Red = 250;
     }
    
  if (click == true && Lose == false) { // DUCK RED/GROW
    t ++;
    Size += SizeAdd;
    Green -= 85;
    Blue -= 85;
    
    if (t > 28) { // Click Time
      click = false;
      Green = 255;
      Blue = 255;
      t = 0;
      Size = 300;
      ShakeX = width/2;
      ShakeY = height/2;
      
    }
     if (ClickNum > 5) {            // SHAKE 1
       ShakeX += int(random(-2,2));
       ShakeY += int(random(-2,2));
       
    }
    if (ClickNum > 10) {
       ShakeX += int(random(-6,6));// SHAKE 2
       ShakeY += int(random(-6,6));
    }
     if (ClickNum > 15) {
       ShakeX += int(random(-12,12));// SHAKE 3
       ShakeY += int(random(-12,12));
       SizeAdd += .05;
    }
     if (ClickNum > 19) {
       ShakeX += int(random(-16,16));// SHAKE 4
       ShakeY += int(random(-16,16));
      
    }
     if (ClickNum > 24) {
       ShakeX += int(random(-19,19));// SHAKE 5
       ShakeY += int(random(-19,19));
      
    }
    if (ClickNum > 29) {
       ShakeX += int(random(-25,25));// SHAKE 6
       ShakeY += int(random(-25,25));
      
    }
  }
}

void keyPressed(){
   if (key == 'r' || key == 'R') {
     
   }
}
