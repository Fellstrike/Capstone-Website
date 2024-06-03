let savedData = JSON.parse(localStorage.getItem('thirdThingData'));   //load saved data

let acornNum = savedData.Acorns;
let difficulty = savedData.PlotsMade;

let player;
let acorns = [];
let obstacles = [];
let score = 0;
let maxAcorns = 10;
let timer = 0;
let maxTime = 20;
let dataToSave = false;

let backButton;
let restartButton;

let acornPic;
let basket;
let tvPic;
let clockPic;
let treebg;

function setup() {
  createCanvas(windowWidth-100, windowHeight-50);
  treebg = loadImage('tree/TreeBackground.png');
  image(treebg, width*0.01, 0, width*0.99, height);
  player = new Player();
  backButton = createButton('Gallery');
  backButton.style('font-size', 30 + 'px');
  backButton.size(110, 50);
  backButton.position(width * 0.3, height*0.7);
  backButton.hide();
  backButton.mouseClicked(toMain);
  restartButton = createButton('Restart');
  restartButton.style('font-size', 30 + 'px');
  restartButton.size(110, 50);
  restartButton.position(width * 0.55, height*0.7);
  restartButton.hide();
  restartButton.mouseClicked(resetGame);

  acornPic = loadImage('tree/acorn.png');
  basket = loadImage('tree/Basket.png');
  tvPic = loadImage('tree/Tv.png');
  clockPic = loadImage('tree/Clock.png');
}

function draw() {
  image(treebg, width*0.01, 0, width*0.99, height);
  // Display score and time
  textSize(32);
  fill(0);
  image(acornPic, width*0.05, height*0.01, width*0.04, width*0.04);
  text("x " + score, width*0.09, height*0.065);
  image(clockPic, width*0.45, height*0.01, width*0.04, width*0.04);
  text(": " + round(maxTime - timer, 2), width*0.49, height*0.065);

  timer += 0.01;
  if (timer >= maxTime || score >= maxAcorns)
    {
      gameOver();
      timer = maxTime;
      return;
    }
  // Create new acorns randomly
  if (random(1) < 0.03) {
    acorns.push(new Acorn());
  }
  
  // Create new obstacles randomly
  if (random(1) < 0.005) {
    obstacles.push(new Obstacle());
  }
  
  // Update and display acorns
  for (let i = acorns.length - 1; i >= 0; i--) {
    acorns[i].update();
    acorns[i].show();
    
    // Check if acorn is caught
    if (acorns[i].hits(player)) {
      score++;
      acorns.splice(i, 1);
    } else if (acorns[i].offscreen()) {
      acorns.splice(i, 1);
    }
    else {
      // Check if acorn hits any obstacles
      for (let h = obstacles.length - 1; h >= 0; h--) {
        if (acorns[i] && acorns[i].hits(obstacles[h])) {
          acorns.splice(i, 1);
          break;
        }
      }
    }
  }
  
  // Update and display obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    
    // Check if obstacle hits player
    if (obstacles[i].hits(player)) {
      score = 0; // Reset score if hit
      obstacles.splice(i, 1);
    } else if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }
  
  // Update and display player
  player.show();
  player.update();
}

function gameOver()
{
  textSize(width/20);
  if(score >= maxAcorns)
  {
    text("You got some seed!", width*0.28, height/2);
    saveData();
  }
  else
  {
    text("You didn't get enough acorns.", width*0.1, height/3);
    text("Try Again", width*0.35, height/2);
  }
  restartButton.show();
  backButton.show();
}
function saveData()
{
  if (!dataToSave)
    {
      acornNum++;
      //print(acornNum);
      savedData.Acorns = acornNum;
      localStorage.setItem('thirdThingData', JSON.stringify(savedData));
      dataToSave  = true;
    }
}
function resetGame()
{
  timer = 0;
  score = 0;
  dataToSave = false;
  backButton.hide();
  restartButton.hide();
}

function toMain()
{
  window.location.assign('index.html');
}

class Player {
  constructor() {
    this.width = width*0.05;
    this.height = height*0.03;
    this.x = width / 2 - this.width / 2;
    this.y = height*0.94;
    this.xspeed = 0;
    this.speed = 8;
    this.isPlayer = true;
  }
  
  update() {
    this.x += this.xspeed;
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  show() {
    fill(50, 150, 255);
    image(basket, this.x, this.y, this.width, this.height);
  }
  
  move(dir) {
    this.xspeed = this.speed * dir;
  }
  
  stop() {
    this.xspeed = 0;
  }
}

class Acorn {
  constructor() {
    this.x = random(width);
    this.r = random(width*0.015, width*0.02);
    this.y = -this.r;
    this.speed = random(2, 5);
    this.isPlayer = false;
  }
  
  update() {
    this.y += this.speed;
  }
  
  show() {/*
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2 + this.r*0.2);
    fill(200, 100, 50);
    ellipse(this.x, this.y - this.r * 0.5, this.r *2, this.r);*/
    image(acornPic, this.x, this.y, this.r*2, this.r*2);
  }
  
  offscreen() {
    return (this.y >= height);
  }
  
  hits(object) {
    return (
      object.x <= this.x + this.r*2 &&
      object.x + object.width >= this.x &&
      object.y  <= this.y + this.r*1.6 &&
      object.y + object.height >= this.y
    );
  }
}

class Obstacle {
  constructor() {
    this.width = random(width*0.03, width*0.2);
    this.height = this.width;
    this.speed = random(3, 7);
    this.x = random(width*0.9);
    this.y = -this.height;
    this.isPlayer = false;
  }
  
  update() {
    this.y += this.speed;
  }
  
  show() {
    /*fill(150);
    rect(this.x, this.y, this.width, this.width);
    fill(0);
    rect(this.x + this.width*0.15, this.y + this.width*0.15, this.width*0.7, this.width*0.7);*/
    image(tvPic, this.x, this.y, this.width, this.height);
  }
  
  offscreen() {
    return (this.y > height-this.r);
  }
  
  hits(player) {
    return (
      player.x < this.x + this.width &&
      player.x > this.x &&
      player.y < this.y + this.height &&
      player.y > this.y
    );
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.stop();
  }
}


