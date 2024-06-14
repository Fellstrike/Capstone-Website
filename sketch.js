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
let artEasel; 
let pic01;
let pic02;
let pic03;
let pic04;
let picRand1;
let picRand2;

let thirdThing;

let imgHeight;
let imgWidth;

let isClicked = false;
let resetButton;

let locationNum = 0;

let selectSound;
let prevLocation;

let chatbot;

//need images for swarm, parth, and threshold

function preload() {
  let picRand1 = int(random(10));
  let picRand2 = int(random(10));
  bgImg = loadImage('Paragon.png');
  treeImg = createImg('tree/MainTreeIcon.png');
  farmImg = createImg('FarmIcon.png');
  waterImg = createImg('duck/DuckIcon.png');
 // swarmImg = createImg('swarmIcon.png');
  treeMap = loadImage('tree/DrainTreeIcon.png');
  farmMap = loadImage('grayfarmicon.png');
  waterMap = loadImage('duck/WaterIcon.png');
 // swarmMap = loadImage('oldSwarmIcon.png');
  selectSound = loadSound('sounds/select.wav');
  logoImg = createImg('OldFashionedLogoColor.png');
  eggLogo = loadImage('easterEggLogo.png');
  artEasel = loadImage('arteasel.png');
  chatbot = createImg('chatbotImg.png');
  pic01 = createImg('/gallery/gallery' + picRand1 + '.jpg');
  pic02 = createImg('/gallery/livestream.jpg');
  pic03 = createImg('/gallery/picture' + picRand2 + '.jpg');
  pic04 = createImg('destruction.png');
  thirdThing = createImg('TheThirdThing.png');
  birdLogo = createImg('Bird/BirdGameIcon.png');
  oldBird = loadImage('Bird/oldBirdIcon.png');
}

function setup() 
{
  prevLocation = 0;
  createCanvas(windowWidth, windowHeight);
  imgWidth = width*1;
  imgHeight = height*1;

  image(bgImg, 0, height*0.095, imgWidth, imgHeight);

  //The Easels can be where we display cameras of pictures and clicking there will bring up the feeds.
  image(artEasel, imgWidth*0.17, imgHeight*0.55, imgWidth*0.07, imgHeight*0.07);
  pic01.position(imgWidth*0.1968, imgHeight*0.5685);
  pic01.size(imgWidth*0.0187, imgHeight*0.0215);
  pic01.mouseClicked(secret1);
  pic01.mouseOver(zoom1);
  image(artEasel, imgWidth*0.592, imgHeight*0.62, imgWidth*0.07, imgHeight*0.07);
  pic03.position(imgWidth*0.6186, imgHeight*0.6384);
  pic03.size(imgWidth*0.01875, imgHeight*0.0216);
  pic03.mouseClicked(secret3);
  pic03.mouseOver(zoom3);
  image(artEasel, imgWidth*0.432, imgHeight*0.35, imgWidth*0.07, imgHeight*0.07);
  pic02.position(imgWidth*0.458, imgHeight*0.369); 
  pic02.size(imgWidth*0.01875, imgHeight*0.0216);
  pic02.mouseClicked(secret2);
  pic02.mouseOver(zoom2);
  image(artEasel, imgWidth*0.72, imgHeight*0.31, imgWidth*0.07, imgHeight*0.07);
  pic04.position(imgWidth*0.747, imgHeight*0.3285); 
  pic04.size(imgWidth*0.0187, imgHeight*0.0215);
  pic04.mouseOver(zoom4);
  pic04.mouseClicked(secret4);
  //End Easel Placement
  image(treeMap, imgWidth*0.15, imgHeight*0.31, imgWidth*0.23, imgHeight*0.57);
  image(farmMap, imgWidth*0.75, imgHeight*0.26, imgWidth*0.1, imgWidth*0.1);
  image(waterMap, imgWidth*0.485, imgHeight*0.305, imgWidth*0.1, imgHeight*0.2);
  image(oldBird, imgWidth*0.645, imgHeight*0.56, imgWidth*0.15, imgHeight*0.2);

  thirdThing.position(width*0.15, -imgHeight*0.0065); 
  thirdThing.size(imgWidth*0.7, imgHeight*0.29);
  thirdThing.mouseClicked(poster);
  image(eggLogo, imgWidth*0.595, imgHeight*0.28, imgWidth*0.025, imgWidth*0.025);
  logoImg.size(imgWidth*0.025, imgWidth*0.025);
  logoImg.position(imgWidth*0.595, imgHeight*0.28);
  logoImg.hide();
  logoImg.mouseClicked(story1);
  treeImg.size(imgWidth*0.23, imgHeight*0.57);
  treeImg.position(imgWidth*0.15, imgHeight*0.31);
  treeImg.hide();
  treeImg.mouseClicked(treeUrl);
  farmImg.size(imgWidth*0.1, imgWidth*0.1);
  farmImg.position(imgWidth*0.75, imgHeight*0.26);
  farmImg.mouseClicked(farmUrl);
  farmImg.hide();
  waterImg.size(imgWidth*0.09, imgHeight*0.18);
  waterImg.position(imgWidth*0.49, imgHeight*0.305);
  waterImg.hide();
  waterImg.mouseClicked(duckUrl);
  birdLogo.size(imgWidth*0.15, imgHeight*0.2);
  birdLogo.position(imgWidth*0.645, imgHeight*0.56);
  birdLogo.hide();
  birdLogo.mouseClicked(swarmUrl);

  fill(125);
  rect(imgWidth*0.01, imgHeight*0.334, imgWidth*0.11, imgHeight*0.5);
  fill(0);
  textSize(imgWidth*0.02);
  text('Move your mouse or use the left and right arrow keys to navigate the gallery.', imgWidth*0.164, imgHeight*0.98);
  text('Seeds:' + acornNum, imgWidth*0.03, imgHeight*0.4);
  text('Water:' + water, imgWidth*0.03, imgHeight * 0.5);
  text('Tools:' + tools, imgWidth*0.03, imgHeight*0.6);
  text('Score:' + score, imgWidth*0.03, imgHeight * 0.7);
  resetButton = createButton('Reset');
  resetButton.style('font-size', imgWidth*0.022 + 'px');
  resetButton.size(imgWidth*0.09, imgHeight*0.06);
  resetButton.position(imgWidth*0.02, imgHeight*0.74);
  resetButton.mouseClicked(resetScores);

  chatbot.size(imgWidth*0.05, imgWidth*0.05);
  chatbot.position(imgWidth*0.79, imgHeight*0.75);
  chatbot.mouseClicked(goToChat);
}

function draw() 
{
  if (locationNum == 5 || ((winMouseX >= imgWidth*0.595 && winMouseX <= imgWidth*0.62) && (winMouseY >= imgHeight*0.28 && winMouseY <= imgHeight*0.33))){
    locationNum = 5;
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      prevLocation = locationNum;
      selectSound.play();
    }
    logoImg.show();
  }
  else {
    logoImg.hide();
  }
  if (locationNum == 1 || ((winMouseX >= imgWidth*0.225 && winMouseX <= imgWidth*0.32) && (winMouseY >= imgHeight*0.31 && winMouseY <= imgHeight*0.885)))
  {
    locationNum = 1;
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      prevLocation = locationNum;
      selectSound.play();
    }
    treeImg.show();
  }
  else
  {
    treeImg.hide();
  }
  if (locationNum == 3 || ((winMouseX >= imgWidth * 0.77 && winMouseX <= imgWidth * 0.83) && (winMouseY >= imgHeight * 0.295 && winMouseY <= imgHeight * 0.425)))
  {
    locationNum = 3;
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      prevLocation = locationNum;
      selectSound.play();
    }
    farmImg.show();
  }
  else
  {
    farmImg.hide();
  }
  if (locationNum == 2 || ((winMouseX >= imgWidth * 0.485 && winMouseX <= imgWidth * 0.585) && (winMouseY >= imgHeight * 0.305 && winMouseY <= imgHeight * 0.505)))
  {
    locationNum = 2;
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      prevLocation = locationNum;
      selectSound.play();
    }
    waterImg.show();
  }
  else
  {
    waterImg.hide();
  }
  if (locationNum == 4 || ((winMouseX >= imgWidth * 0.645 && winMouseX <= imgWidth * 0.845) && (winMouseY >= imgHeight * 0.56 && winMouseY <= imgHeight * 0.76)))
  {
    locationNum = 4;
    if (!selectSound.isPlaying() && prevLocation != locationNum) {
      prevLocation = locationNum;
      selectSound.play();
    }
    birdLogo.show();
  }
  else
  {
    birdLogo.hide();
  }
}

function goToChat()
{
  window.location.assign('https://character.ai/chat/KvdIyElMwSSnXfoyhfqVAR5mteDhT5jI3zLRY7jZsbo');
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
  prevLocation = 0;
  createCanvas(windowWidth, windowHeight);
  imgWidth = width*1;
  imgHeight = height*1;

  image(bgImg, 0, height*0.095, imgWidth, imgHeight);
  image(artEasel, imgWidth*0.17, imgHeight*0.55, imgWidth*0.07, imgHeight*0.07);
  pic01.position(imgWidth*0.1968, imgHeight*0.5685);
  pic01.size(imgWidth*0.0187, imgHeight*0.0215);
  pic01.mouseClicked(secret1);
  pic01.mouseOver(zoom1);
  image(artEasel, imgWidth*0.592, imgHeight*0.62, imgWidth*0.07, imgHeight*0.07);
  pic03.position(imgWidth*0.6186, imgHeight*0.6384);
  pic03.size(imgWidth*0.01875, imgHeight*0.0216);
  pic03.mouseClicked(secret3);
  pic03.mouseOver(zoom3);
  image(artEasel, imgWidth*0.432, imgHeight*0.35, imgWidth*0.07, imgHeight*0.07);
  pic02.position(imgWidth*0.458, imgHeight*0.369); 
  pic02.size(imgWidth*0.01875, imgHeight*0.0216);
  pic02.mouseClicked(secret2);
  pic02.mouseOver(zoom2);
  image(artEasel, imgWidth*0.72, imgHeight*0.31, imgWidth*0.07, imgHeight*0.07);
  pic04.position(imgWidth*0.747, imgHeight*0.3285); 
  pic04.size(imgWidth*0.0187, imgHeight*0.0215);
  image(treeMap, imgWidth*0.15, imgHeight*0.31, imgWidth*0.23, imgHeight*0.57);
  image(farmMap, imgWidth*0.75, imgHeight*0.26, imgWidth*0.1, imgWidth*0.1);
  image(waterMap, imgWidth*0.485, imgHeight*0.305, imgWidth*0.1, imgHeight*0.2);
  image(oldBird, imgWidth*0.645, imgHeight*0.56, imgWidth*0.15, imgHeight*0.2);
  thirdThing.position(width*0.15, -imgHeight*0.0065); 
  thirdThing.size(imgWidth*0.7, imgHeight*0.29);
  image(eggLogo, imgWidth*0.595, imgHeight*0.28, imgWidth*0.025, imgWidth*0.025);
  logoImg.size(imgWidth*0.025, imgWidth*0.025);
  logoImg.position(imgWidth*0.595, imgHeight*0.28);
  logoImg.hide();
  treeImg.size(imgWidth*0.23, imgHeight*0.57);
  treeImg.position(imgWidth*0.15, imgHeight*0.31);
  treeImg.hide();
  farmImg.size(imgWidth*0.1, imgWidth*0.1);
  farmImg.position(imgWidth*0.75, imgHeight*0.26);
  farmImg.hide();
  waterImg.size(imgWidth*0.09, imgHeight*0.18);
  waterImg.position(imgWidth*0.49, imgHeight*0.305);
  waterImg.hide();
  birdLogo.size(imgWidth*0.15, imgHeight*0.2);
  birdLogo.position(imgWidth*0.645, imgHeight*0.56);
  birdLogo.hide();

  fill(125);
  rect(imgWidth*0.01, imgHeight*0.334, imgWidth*0.11, imgHeight*0.5);
  fill(0);
  textSize(imgWidth*0.02);
  text('Move your mouse or use the left and right arrow keys to navigate the gallery.', imgWidth*0.164, imgHeight*0.98);
  text('Seeds:' + acornNum, imgWidth*0.03, imgHeight*0.4);
  text('Water:' + water, imgWidth*0.03, imgHeight * 0.5);
  text('Tools:' + tools, imgWidth*0.03, imgHeight*0.6);
  text('Score:' + score, imgWidth*0.03, imgHeight * 0.7);

  resetButton.style('font-size', imgWidth*0.022 + 'px');
  resetButton.size(imgWidth*0.09, imgHeight*0.06);
  resetButton.position(imgWidth*0.02, imgHeight*0.74);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    locationNum--;
    if (locationNum < 1)
      {
        locationNum = 6;
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
        duckUrl();
        break;
      case 3:
        farmUrl();
        break;
      case 4:
        swarmUrl();
        break;
      case 5:
        secret1();
        break;
      case 6:
        story1();
        break;
      default:
        break;
    }
  }
}

function poster() {
  window.location.assign('poster.html');
}

function treeUrl()
{
  //print("This is where the code to load the url for the tree.");
  window.location.assign('tree.html');
}

function secret1()
{
  window.location.assign('secret4.html');
}

function secret2()
{
  window.location.assign('secret2.html');
}

function secret3()
{
  window.location.assign('secret3.html');
}

function secret4()
{
  window.location.assign('secret1.html');
}

function story1()
{
  window.location.assign('story1/index.html');
}

function story2()
{
  window.location.assign('story1/index.html');
}

function story3()
{
  window.location.assign('story1/index.html');
}

function farmUrl()
{
 // print("Put the url for the FARM stuff here.");
  window.location.assign('farm.html');
}

function duckUrl()
{
 // print("Ditto for Button stuff");
  window.location.assign('duck.html');
}

function swarmUrl()
{
  //print("URL for swarm stuff");
  window.location.assign('swarm.html');
}

function zoom1() {
  pic01.size(imgWidth*0.24, imgHeight*0.35);
  pic01.mouseOut(picReset);
}

function zoom2() {
  pic02.size(imgWidth*0.24, imgHeight*0.35);
  pic02.mouseOut(picReset);
}

function zoom3() {
  pic03.size(imgWidth*0.24, imgHeight*0.35);
  pic03.mouseOut(picReset);
}

function zoom4() {
  pic04.size(imgWidth*0.24, imgHeight*0.35);
  pic04.mouseOut(picReset);
}

function picReset() {
  pic01.size(imgWidth*0.01875, imgHeight*0.0216);
  pic02.size(imgWidth*0.01875, imgHeight*0.0216);
  pic03.size(imgWidth*0.01875, imgHeight*0.0216);
  pic04.size(imgWidth*0.01875, imgHeight*0.0216);
}

function windowResized()
{
  prevLocation = 0;
  createCanvas(windowWidth, windowHeight);
  imgWidth = width*1;
  imgHeight = height*1;

  image(bgImg, 0, height*0.095, imgWidth, imgHeight);
  image(artEasel, imgWidth*0.17, imgHeight*0.55, imgWidth*0.07, imgHeight*0.07);
  pic01.position(imgWidth*0.1968, imgHeight*0.5685);
  pic01.size(imgWidth*0.0187, imgHeight*0.0215);
  pic01.mouseClicked(secret1);
  pic01.mouseOver(zoom1);
  image(artEasel, imgWidth*0.592, imgHeight*0.62, imgWidth*0.07, imgHeight*0.07);
  pic03.position(imgWidth*0.6186, imgHeight*0.6384);
  pic03.size(imgWidth*0.01875, imgHeight*0.0216);
  pic03.mouseClicked(secret3);
  pic03.mouseOver(zoom3);
  image(artEasel, imgWidth*0.432, imgHeight*0.35, imgWidth*0.07, imgHeight*0.07);
  pic02.position(imgWidth*0.458, imgHeight*0.369); 
  pic02.size(imgWidth*0.01875, imgHeight*0.0216);
  pic02.mouseClicked(secret2);
  pic02.mouseOver(zoom2);
  image(artEasel, imgWidth*0.72, imgHeight*0.31, imgWidth*0.07, imgHeight*0.07);
  pic04.position(imgWidth*0.747, imgHeight*0.3285); 
  pic04.size(imgWidth*0.0187, imgHeight*0.0215);
  image(treeMap, imgWidth*0.15, imgHeight*0.31, imgWidth*0.23, imgHeight*0.57);
  image(farmMap, imgWidth*0.75, imgHeight*0.26, imgWidth*0.1, imgWidth*0.1);
  image(waterMap, imgWidth*0.485, imgHeight*0.305, imgWidth*0.1, imgHeight*0.2);
  image(oldBird, imgWidth*0.645, imgHeight*0.56, imgWidth*0.15, imgHeight*0.2);
  thirdThing.position(width*0.15, -imgHeight*0.0065); 
  thirdThing.size(imgWidth*0.7, imgHeight*0.29);
  image(eggLogo, imgWidth*0.595, imgHeight*0.28, imgWidth*0.025, imgWidth*0.025);
  logoImg.size(imgWidth*0.025, imgWidth*0.025);
  logoImg.position(imgWidth*0.595, imgHeight*0.28);
  logoImg.hide();
  treeImg.size(imgWidth*0.23, imgHeight*0.57);
  treeImg.position(imgWidth*0.15, imgHeight*0.31);
  treeImg.hide();
  farmImg.size(imgWidth*0.1, imgWidth*0.1);
  farmImg.position(imgWidth*0.75, imgHeight*0.26);
  farmImg.hide();
  waterImg.size(imgWidth*0.09, imgHeight*0.18);
  waterImg.position(imgWidth*0.49, imgHeight*0.305);
  waterImg.hide();
  birdLogo.size(imgWidth*0.15, imgHeight*0.2);
  birdLogo.position(imgWidth*0.645, imgHeight*0.56);
  birdLogo.hide();

  fill(125);
  rect(imgWidth*0.01, imgHeight*0.334, imgWidth*0.11, imgHeight*0.5);
  fill(0);
  textSize(imgWidth*0.02);
  text('Move your mouse or use the left and right arrow keys to navigate the gallery.', imgWidth*0.164, imgHeight*0.98);
  text('Seeds:' + acornNum, imgWidth*0.03, imgHeight*0.4);
  text('Water:' + water, imgWidth*0.03, imgHeight * 0.5);
  text('Tools:' + tools, imgWidth*0.03, imgHeight*0.6);
  text('Score:' + score, imgWidth*0.03, imgHeight * 0.7);

  resetButton.style('font-size', imgWidth*0.022 + 'px');
  resetButton.size(imgWidth*0.09, imgHeight*0.06);
  resetButton.position(imgWidth*0.02, imgHeight*0.74);
}