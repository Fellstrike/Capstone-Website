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

let imgHeight;
let imgWidth;

let isClicked = false;
let resetButton;

let locationNum = 0;

let selectSound;

//need images for swarm, parth, and threshold

function preload()
{
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
}

function setup() 
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
  if (locationNum == 1 || ((winMouseX >= imgWidth*0.225 && winMouseX <= imgWidth*0.32) && (winMouseY >= imgHeight*0.25 && winMouseY <= imgHeight*0.825)))
  {
    treeImg.show();
  }
  else
  {
    treeImg.hide();
  }
  if (locationNum == 3 || ((winMouseX >= imgWidth * 0.73 && winMouseX <= imgWidth * 0.85) && (winMouseY >= imgHeight * 0.19 && winMouseY <= imgHeight * 0.39)))
  {
    farmImg.show();
  }
  else
  {
    farmImg.hide();
  }
  if (locationNum == 2 || ((winMouseX >= imgWidth * 0.485 && winMouseX <= imgWidth * 0.585) && (winMouseY >= imgHeight * 0.25 && winMouseY <= imgHeight * 0.45)))
  {
    waterImg.show();
  }
  else
  {
    waterImg.hide();
  }
  if (locationNum == 4 || ((winMouseX >= imgWidth * 0.645 && winMouseX <= imgWidth * 0.84) && (winMouseY >= imgHeight * 0.51 && winMouseY <= imgHeight * 0.82)))
  {
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
    if (locationNum <= -1)
      {locationNum = 4;}
  } else if (keyCode === RIGHT_ARROW) {
    locationNum++;
    if (locationNum > 4)
      {locationNum = 0;}
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