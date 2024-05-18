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

let imgHeight;
let imgWidth;

let isClicked = false;
let resetButton;


//need images for swarm, parth, and threshold

function preload()
{
  bgImg = loadImage('floorPlan.png');
  treeImg = createImg('tree2.png');
  farmImg = createImg('farm.jpeg');
  waterImg = createImg('water.jpg');
  swarmImg = createImg('swarm.jpg');
}

function setup() 
{
  imgWidth = windowWidth-windowWidth*0.205;
  imgHeight = imgWidth*0.5;
  createCanvas(imgWidth,imgHeight*1.2);
  image(bgImg, 0, imgWidth/10, imgWidth, imgHeight);
  treeImg.size(imgWidth*0.4, imgHeight*0.8);
  treeImg.position(imgWidth*0.12, imgHeight*0.29);
  treeImg.hide();
  treeImg.mouseClicked(treeUrl);
  farmImg.size(imgWidth*0.25, imgHeight*0.25);
  farmImg.position(imgWidth*0.73, imgHeight*0.25);
  farmImg.mouseClicked(farmUrl);
  farmImg.hide();
  waterImg.size(imgWidth*0.2, imgHeight*0.25);
  waterImg.position(imgWidth*0.46, imgHeight*0.25);
  waterImg.hide();
  waterImg.mouseClicked(buttonUrl);
  swarmImg.size(imgWidth*0.2, imgHeight*0.31);
  swarmImg.position(imgWidth*0.685, imgHeight*0.56);
  swarmImg.hide();
  swarmImg.mouseClicked(swarmUrl);
  textSize(imgWidth*0.025);
  text('Acorns:' + acornNum, imgWidth*0.21, imgHeight*0.2);
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
  if ((winMouseX >= imgWidth*0.25 && winMouseX <= imgWidth*0.4) && (winMouseY >= imgHeight*0.3 && winMouseY <= imgHeight*0.95))
  {
    treeImg.show();
  }
  else
  {
    treeImg.hide();
  }
  if ((winMouseX >= imgWidth * 0.73 && winMouseX <= imgWidth * 0.97) && (winMouseY >= imgHeight * 0.25 && winMouseY <= imgHeight * 0.5))
  {
    farmImg.show();
  }
  else
  {
    farmImg.hide();
  }
  if ((winMouseX >= imgWidth * 0.45 && winMouseX <= imgWidth * 0.65) && (winMouseY >= imgHeight * 0.25 && winMouseY <= imgHeight * 0.5))
  {
    waterImg.show();
  }
  else
  {
    waterImg.hide();
  }
  if ((winMouseX >= imgWidth * 0.71 && winMouseX <= imgWidth * 0.86) && (winMouseY >= imgHeight * 0.6 && winMouseY <= imgHeight * 0.9))
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
  localStorage.setItem('thirdThingData', JSON.stringify(savedData)); //saves data
  background(255);
  image(bgImg, 0, imgWidth/10, imgWidth, imgHeight);
  text('Acorns:' + acornNum, imgWidth*0.21, imgHeight*0.2);
  text('Water:' + water, imgWidth*0.345, imgHeight * 0.2);
  text('Tools:' + tools, imgWidth*0.48, imgHeight*0.2);
  text('Score:' + score, imgWidth*0.615, imgHeight * 0.2);
  resetButton.position(imgWidth*0.79, imgHeight*0.155);
}

function treeUrl()
{
  print("This is where the code to load the url for the tree.");
  window.location.assign('tree.html');
}

function farmUrl()
{
  print("Put the url for the FARM stuff here.");
  window.location.assign('farm.html');
}

function buttonUrl()
{
  print("Ditto for Button stuff");
  window.location.assign('button.html');
}

function swarmUrl()
{
  print("URL for swarm stuff");
  window.location.assign('swarm.html');
}

function windowResized()
{
  imgWidth = windowWidth-windowWidth*0.205;
  imgHeight = imgWidth*0.5;
  createCanvas(imgWidth,imgHeight*1.2);
  image(bgImg, 0, imgWidth/10, imgWidth, imgHeight);
  treeImg.size(imgWidth*0.25, imgHeight*0.5);
  treeImg.position(imgWidth*0.25, imgHeight*0.5);
  farmImg.size(imgWidth*0.2, imgHeight*0.25);
  farmImg.position(imgWidth*0.77, imgHeight*0.3);
  waterImg.size(imgWidth*0.2, imgHeight*0.2);
  waterImg.position(imgWidth*0.2, imgHeight*0.4);
  swarmImg.size(imgWidth*0.15, imgHeight*0.3);
  swarmImg.position(imgWidth*0.71, imgHeight*0.6);
  textSize(imgWidth*0.025);
  text('Acorns:' + acornNum, imgWidth*0.21, imgHeight*0.2);
  text('Water:' + water, imgWidth*0.345, imgHeight * 0.2);
  text('Tools:' + tools, imgWidth*0.48, imgHeight*0.2);
  text('Score:' + score, imgWidth*0.615, imgHeight * 0.2);
  resetButton.style('font-size', imgWidth*0.022 + 'px');
  resetButton.size(imgWidth*0.075, imgHeight*0.05);
  resetButton.position(imgWidth*0.79, imgHeight*0.155);
}
