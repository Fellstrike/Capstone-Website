/*Make a map of the space, include pictures of the
exhibit that link to their own page.
*/

// Initialize save data if it doesn't exist.
if (!localStorage.getItem('thirdThingData')) {
  localStorage.setItem('thirdThingData', JSON.stringify({
    Score: 0,
    Acorns: 0,
    Water: 0,
    Tools: 0,
    PlotsMade: 0,
    Patches: []
}));
}

let savedData = JSON.parse(localStorage.getItem('thirdThingData'));   //load saved data
//assign local variables to save data
let acornNum = savedData.Acorns;
let score = savedData.Score;
let water = savedData.Water;
let tools = savedData.Tools;

let bgImg;
let treeImg;
let farmImg;
let waterImg;
let swarmImg;
let treeMap;
let farmMap;
let waterMap;
let swarmMap;
let logoImg;
let eggLogo;
let stream1;
let stream2;
let stream3;
let picture1;
let picture2;
let picture3;
let picture4;
let picture5;
let picture6;
let picture7;
let picture8;
let pictureBlank;
let streamBlank;

let imgHeight;
let imgWidth;

let isClicked = false;
let resetButton;

let locationNum = 0;

let selectSound;
let prevLocation;

//need images for swarm, parth, and threshold

function preload() {
  bgImg = loadImage('Paragon.png');
  treeImg = createImg('tree/MainTreeIcon.png');
  farmImg = createImg('FarmIcon.png');
  waterImg = createImg('duck/fountain_icon.png');
  swarmImg = createImg('swarmIcon.png');
  treeMap = loadImage('tree/DrainTreeIcon.png');
  farmMap = loadImage('grayfarmicon.png');
  waterMap = loadImage('duck/oldfountain_icon.png');
  swarmMap = loadImage('oldSwarmIcon.png');
  selectSound = loadSound('sounds/select.wav');
  logoImg = createImg('OldFashionedLogoColor.png');
  eggLogo = loadImage('easterEggLogo.png');
}

function setup() 
{
  prevLocation = 0;
  selectSound.play();
  imgWidth = windowWidth*1.1;
  imgHeight = windowHeight*1.1;
  createCanvas(windowWidth, windowHeight);
  image(bgImg, 0, 35, imgWidth, imgHeight);
  image(treeMap, imgWidth*0.15, imgHeight*0.25, imgWidth*0.23, imgHeight*0.57);
  image(farmMap, imgWidth*0.684, imgHeight*0.19, width*0.2, width*0.2);
  image(waterMap, imgWidth*0.485, imgHeight*0.255, imgWidth*0.1, imgHeight*0.2);
  image(swarmMap, imgWidth*0.645, imgHeight*0.51, imgWidth*0.2, imgHeight*0.31);
  image(eggLogo, imgWidth*0.595, imgHeight*0.22, imgWidth*0.025, imgWidth*0.025);
  logoImg.size(imgWidth*0.025, imgWidth*0.025);
  logoImg.position(imgWidth*0.595, imgHeight*0.22);
  logoImg.mouseClicked(secret1);
  logoImg.hide();
  treeImg.size(imgWidth*0.23, imgHeight*0.57);
  treeImg.position(imgWidth*0.15, imgHeight*0.25);
  treeImg.hide();
  treeImg.mouseClicked(treeUrl);
  farmImg.size(width*0.2, width*0.2);
  farmImg.position(imgWidth*0.684, imgHeight*0.19);
  farmImg.mouseClicked(farmUrl);
  farmImg.hide();
  waterImg.size(imgWidth*0.09, imgHeight*0.18);
  waterImg.position(imgWidth*0.49, imgHeight*0.265);
  waterImg.hide();
  waterImg.mouseClicked(buttonUrl);
  swarmImg.size(imgWidth*0.2, imgHeight*0.31);
  swarmImg.position(imgWidth*0.645, imgHeight*0.51);
  swarmImg.hide();
  swarmImg.mouseClicked(swarmUrl);

  textSize(imgWidth*0.02);
  text('Move your mouse or use the left and right arrow keys to navigate the gallery.', imgWidth*0.16, imgHeight*0.1);
  text('Seeds:' + acornNum, imgWidth*0.21, imgHeight*0.2);
  text('Water:' + water, imgWidth*0.345, imgHeight * 0.2);
  text('Tools:' + tools, imgWidth*0.48, imgHeight*0.2);
  text('Score:' + score, imgWidth*0.615, imgHeight * 0.2);
  resetButton = createButton('Reset');
  resetButton.style('font-size', imgWidth*0.022 + 'px');
  resetButton.size(imgWidth*0.075, imgHeight*0.05);
  resetButton.position(imgWidth*0.79, imgHeight*0.155);
  resetButton.mouseClicked(resetScores);
}

function draw() 
{
  if (locationNum == 5 || ((winMouseX >= imgWidth*0.595 && winMouseX <= imgWidth*0.62) && (winMouseY >= imgHeight*0.22 && winMouseY <= imgHeight*0.27))){
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      locationNum = 5;
      prevLocation = locationNum;
      selectSound.play();
    }
    logoImg.show();
  }
  else {
    logoImg.hide();
  }
  if (locationNum == 1 || ((winMouseX >= imgWidth*0.225 && winMouseX <= imgWidth*0.32) && (winMouseY >= imgHeight*0.25 && winMouseY <= imgHeight*0.825)))
  {
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      locationNum = 1;
      prevLocation = locationNum;
      selectSound.play();
    }
    treeImg.show();
  }
  else
  {
    treeImg.hide();
  }
  if (locationNum == 3 || ((winMouseX >= imgWidth * 0.72 && winMouseX <= imgWidth * 0.83) && (winMouseY >= imgHeight * 0.26 && winMouseY <= imgHeight * 0.49)))
  {
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      locationNum = 3;
      prevLocation = locationNum;
      selectSound.play();
    }
    farmImg.show();
  }
  else
  {
    farmImg.hide();
  }
  if (locationNum == 2 || ((winMouseX >= imgWidth * 0.485 && winMouseX <= imgWidth * 0.585) && (winMouseY >= imgHeight * 0.25 && winMouseY <= imgHeight * 0.45)))
  {
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      locationNum = 2;
      prevLocation = locationNum;
      selectSound.play();
    }
    waterImg.show();
  }
  else
  {
    waterImg.hide();
  }
  if (locationNum == 4 || ((winMouseX >= imgWidth * 0.645 && winMouseX <= imgWidth * 0.84) && (winMouseY >= imgHeight * 0.51 && winMouseY <= imgHeight * 0.82)))
  {
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      locationNum = 4;
      prevLocation = locationNum;
      selectSound.play();
    }
    swarmImg.show();
  }
  else
  {
    swarmImg.hide();
  }
}

function resetScores()
{
  //print('reset scores');
  acornNum = 0;
  score = 0;
  water = 0;
  tools = 0;
  savedData.Acorns = acornNum;
  savedData.Water = water;
  savedData.Tools = tools;
  savedData.PlotsMade = 0;
  savedData.Patches = [];
  savedData.Score = score;
  localStorage.setItem('thirdThingData', JSON.stringify(savedData)); //saves data
  imgWidth = windowWidth*1.1;
  imgHeight = windowHeight*1.1;
  createCanvas(windowWidth, windowHeight);
  image(bgImg, 0, 35, imgWidth, imgHeight);
  image(treeMap, imgWidth*0.15, imgHeight*0.25, imgWidth*0.23, imgHeight*0.57);
  image(farmMap, imgWidth*0.684, imgHeight*0.19, width*0.2, width*0.2);
  image(waterMap, imgWidth*0.485, imgHeight*0.255, imgWidth*0.1, imgHeight*0.2);
  image(swarmMap, imgWidth*0.645, imgHeight*0.51, imgWidth*0.2, imgHeight*0.31);
  treeImg.size(imgWidth*0.23, imgHeight*0.57);
  treeImg.position(imgWidth*0.15, imgHeight*0.25);
  treeImg.hide();
  farmImg.size(width*0.2, width*0.2);
  farmImg.position(imgWidth*0.684, imgHeight*0.19);
  farmImg.hide();
  waterImg.size(imgWidth*0.09, imgHeight*0.18);
  waterImg.position(imgWidth*0.49, imgHeight*0.265);
  waterImg.hide();
  swarmImg.size(imgWidth*0.2, imgHeight*0.31);
  swarmImg.position(imgWidth*0.645, imgHeight*0.51);
  swarmImg.hide();

  textSize(imgWidth*0.02);
  text('Move your mouse or use the left and right arrow keys to navigate the gallery.', imgWidth*0.16, imgHeight*0.1);
  text('Seeds:' + acornNum, imgWidth*0.21, imgHeight*0.2);
  text('Water:' + water, imgWidth*0.345, imgHeight * 0.2);
  text('Tools:' + tools, imgWidth*0.48, imgHeight*0.2);
  text('Score:' + score, imgWidth*0.615, imgHeight * 0.2);
  resetButton.size(imgWidth*0.075, imgHeight*0.05);
  resetButton.position(imgWidth*0.79, imgHeight*0.155);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    locationNum--;
    if (locationNum < 1)
      {
        locationNum = 5;
      }
  } else if (keyCode === RIGHT_ARROW) {
    locationNum++;
    if (locationNum > 5)
      {
        locationNum = 0;
        prevLocation = locationNum;
      }
    //console.log("location #:" + locationNum);
  }
  else if (key === 'r')
  {
    resetScores();
  }
  //print(locationNum);
  if (keyCode === ENTER){
    //print("test");
    switch(locationNum)
    {
      case 1:
        treeUrl();
        break;
      case 2:
        buttonUrl();
        break;
      case 3:
        farmUrl();
        break;
      case 4:
        swarmUrl();
        break;
      default:
        break;
    }
  }
}

function treeUrl()
{
  //print("This is where the code to load the url for the tree.");
  window.location.assign('tree.html');
}

function secret1()
{
  window.location.assign('secret1.html');
}

function farmUrl()
{
 // print("Put the url for the FARM stuff here.");
  window.location.assign('farm.html');
}

function buttonUrl()
{
 // print("Ditto for Button stuff");
  window.location.assign('button.html');
}

function swarmUrl()
{
  //print("URL for swarm stuff");
  window.location.assign('swarm.html');
}

function windowResized()
{
  imgWidth = windowWidth*1.1;
  imgHeight = windowHeight*1.1;
  createCanvas(windowWidth, windowHeight);
  image(bgImg, 0, 35, imgWidth, imgHeight);
  image(treeMap, imgWidth*0.15, imgHeight*0.25, imgWidth*0.23, imgHeight*0.57);
  image(farmMap, imgWidth*0.684, imgHeight*0.19, width*0.2, width*0.2);
  image(waterMap, imgWidth*0.485, imgHeight*0.255, imgWidth*0.1, imgHeight*0.2);
  image(swarmMap, imgWidth*0.645, imgHeight*0.51, imgWidth*0.2, imgHeight*0.31);
  treeImg.size(imgWidth*0.23, imgHeight*0.57);
  treeImg.position(imgWidth*0.15, imgHeight*0.25);
  treeImg.hide();
  farmImg.size(width*0.2, width*0.2);
  farmImg.position(imgWidth*0.684, imgHeight*0.19);
  farmImg.hide();
  waterImg.size(imgWidth*0.09, imgHeight*0.18);
  waterImg.position(imgWidth*0.49, imgHeight*0.265);
  waterImg.hide();
  swarmImg.size(imgWidth*0.2, imgHeight*0.31);
  swarmImg.position(imgWidth*0.645, imgHeight*0.51);
  swarmImg.hide();

  textSize(imgWidth*0.02);
  text('Move your mouse or use the left and right arrow keys to navigate the gallery.', imgWidth*0.16, imgHeight*0.1);
  text('Seeds:' + acornNum, imgWidth*0.21, imgHeight*0.2);
  text('Water:' + water, imgWidth*0.345, imgHeight * 0.2);
  text('Tools:' + tools, imgWidth*0.48, imgHeight*0.2);
  text('Score:' + score, imgWidth*0.615, imgHeight * 0.2);
  resetButton.size(imgWidth*0.075, imgHeight*0.05);
  resetButton.position(imgWidth*0.79, imgHeight*0.155);
}