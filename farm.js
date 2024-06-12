let savedData = JSON.parse(localStorage.getItem('thirdThingData')); // Load saved data

let patches = [];
let currentPatch = null;
let rows = 3;
let cols = 3;
let plantButton, waterButton, harvestButton;
let action = "none";
let imgSize;

let seed = savedData.Acorns;
let score = savedData.Score;
let water = savedData.Water;
let tools = savedData.Tools;

let badSoil;
let farmLand;
let harvestImg;
let plantImg;
let seedImg;
let seedlingImg;
let soilImg;
let waterImg;
let wateredSoil;

let textboxX;
let textboxY;
let textboxHeight;
let textboxWidth;
let textContent;
let waterButtonText;
let plantButtonText;
let harvestButtonText;

let harvestSound;
let plantSound;
let waterSound;
let selectSound;

function preload() {
  farmLand = loadImage('farm/FarmLand.png');
  badSoil = loadImage('farm/BadSoil.png');
  harvestImg = createImg('farm/Harvest_Icon.png');
  plantImg = loadImage('farm/Plant.png');
  seedImg = createImg('farm/seed_Icon.png');
  seedlingImg = loadImage('farm/Seedling.png');
  soilImg = loadImage('farm/Soil.png');
  waterImg = createImg('farm/Water_Icon.png');
  wateredSoil = loadImage('farm/WateredSoil.png');
  harvestSound = loadSound('sounds/Harvest.wav');
  plantSound = loadSound('sounds/Plant.wav');
  waterSound = loadSound('sounds/water.wav');
  selectSound = loadSound('sounds/Select.wav');
}

function setup() {
  print(savedData.Patches);
  createCanvas(windowWidth, windowHeight);
  imgSize = min(width*0.6, height);
  image(farmLand, width-imgSize, height-imgSize, imgSize, imgSize);
   // Creating patches of dirt
   let spacingX = imgSize/(rows+1);
   let spacingY = imgSize/(cols+1);
   if (patches.length === 0) {
     for (let i = 0; i < rows; i++) {
       for (let j = 0; j < cols; j++) {
         patches.push(new Patch(j * spacingX+width-imgSize+spacingX, i * spacingY+height-imgSize + spacingY, spacingX, spacingY));
         if (savedData.Patches[i+j]){
           patches[i+j].planted = savedData.Patches[i+j].planted;
           patches[i+j].watered = savedData.Patches[i+j].watered;
           patches[i+j].grown = savedData.Patches[i+j].grown;
           patches[i+j].curSize = savedData.Patches[i+j].curSize;
         }
       }
     }
   }

   textboxX = width*0.05;
   textboxY = height * 0.25;
   textboxWidth = imgSize*0.5;
   textboxHeight = imgSize*0.5;

   
  textContent = 
  'Collect items from other games.\n' +
  'Then come use them here.\n' +
  'Click on a symbol to use them.\n' +
  'The number is how many uses you have.\n' +
  'You can plant seeds, water plots of land,' +
  'and then harvest the plant.\n' +
  'Who knows what effects all this might have.';

  // Creating buttons
  backButton = createButton('Back to Gallery');
  backButton.style('font-size', 30 + 'px');
  backButton.size(250, 50);
  backButton.position(width * 0.1, height * 0.75);
  backButton.mouseClicked(toMain);

  // Create a div for the plant button
  plantButton = createDiv('');
  plantButton.style('display', 'flex');
  plantButton.style('align-items', 'center');
  plantButton.position(width*0.05, height*0.1);
  
  // Add the seed image to the plant button div
  seedImg.size(50, 50); // Adjust size as needed
  seedImg.parent(plantButton);
  
  // Add the plant button text to the plant button div
  plantButtonText = createButton(seed);
  plantButtonText.style('font-size', 30 + 'px');
  plantButtonText.size(50, 50);
  plantButtonText.parent(plantButton);

  waterButton = createDiv('');
  waterButton.style('display', 'flex');
  waterButton.style('align-items', 'center');
  waterButton.position(width*0.15, height*0.1);

  waterImg.size(50, 50);
  waterImg.parent(waterButton);

  waterButtonText = createButton(water);
  waterButtonText.style('font-size', 30 + 'px');
  waterButtonText.size(50, 50);
  waterButtonText.parent(waterButton);
  
  harvestButton = createDiv('');
  harvestButton.style('display', 'flex');
  harvestButton.style('align-items', 'center');
  harvestButton.position(width*0.25, height*0.1);

  harvestImg.size(50,50);
  harvestImg.parent(harvestButton);

  harvestButtonText = createButton(tools);
  harvestButtonText.style('font-size', 29 + 'px');
  harvestButtonText.size(50, 50);
  harvestButtonText.parent(harvestButton);

  if (seed > 0) {
    plantButton.mousePressed(() => {
      action = "plant";
      selectSound.play();
    });
  } else {
    plantButton.mousePressed(() => {
      treeUrl();
    });
  }
  if (tools > 0) {
    harvestButton.mousePressed(() => {
      action = "harvest";
      selectSound.play();
    });
  } else {
    harvestButton.mousePressed(() => {
      swarmUrl();
    });
  }
  if (water > 0) {
    waterButton.mousePressed(() => {
      action = "water";
      selectSound.play();
    });
  } else {
    waterButton.mousePressed(() => {
      duckUrl();
    });
  }
}

function treeUrl() {
  window.location.assign('tree.html');
}

function duckUrl() {
  window.location.assign('button.html');
}

function swarmUrl() {
  window.location.assign('swarm.html');
}

function draw() {
  background(255);
  image(farmLand, width-imgSize, height-imgSize, imgSize, imgSize);
 
  // Textbox with wrapping text
  fill(0); // Set text color to black
  textSize(imgSize / 20); // Set the text size
  textAlign(CENTER, TOP); // Align text to the top left of the textbox
  textLeading(imgSize / 25); // Set the line height

  text(textContent, textboxX, textboxY, textboxWidth, textboxHeight);

  // Displaying patches
  for (let patch of patches) {
    patch.display();
    patch.grow();
    if (patch.curSize == round(patch.maxSize / 2)) {
      patch.watered = false;
      patch.plotColor = color(150, 75, 0);
    }
  }

  // Displaying current patch
  if (currentPatch !== null) {
    currentPatch.highlight();
  }


  fill(0);
  // Displaying action
  switch (action) {
    case 'plant':
      currentAction = 'plant: ' + seed;
      break;
    case 'water':
      currentAction = 'water: ' + water;
      break;
    case 'harvest':
      currentAction = 'harvest: ' + tools;
      break;
    default:
      currentAction = 'None';
  }

  noStroke();
  textSize(width*0.035);
  text(currentAction, width*0.4, height*0.11);

  if (seed == 0 && water == 0 && tools == 0) {
    action = 'None';
  }
}

function saveData()
{
  savedData.Acorns = seed;
  savedData.Water = water;
  savedData.Tools = tools;
  savedData.Score = score;
  let patchStates = patches.map(patch => {
    return {
      planted: patch.planted,
      watered: patch.watered,
      grown: patch.grown,
      curSize: patch.curSize
    };
  });
  savedData.Patches = patchStates;
  localStorage.setItem('thirdThingData', JSON.stringify(savedData));
}

function toMain() {
  saveData();
  window.location.assign('index.html');
}

function mouseClicked() {
  for (let patch of patches) {
    if (patch.contains(mouseX, mouseY)) {
      currentPatch = patch;
      if (action === "plant" && seed > 0) {
        currentPatch.plantSeed();
        plantSound.play();
        if (currentPatch.planted) {
          seed--;
          plantButtonText.html(seed);
        }
      } else if (action === "water" && water > 0) {
        currentPatch.water();
        waterSound.play();
        if (currentPatch.watered) {
          water--;
          waterButtonText.html(water);
        }
      } else if (action === "harvest" && tools > 0) {
        if (currentPatch.grown) {
          harvestSound.play();
          tools--;
          harvestButtonText.html(tools);
          score++;
          currentPatch.harvest();
        }
      }
      saveData();
      return;
    }
  }
  currentPatch = null;
}

function keyPressed() {
  if (key === 'a') {
    seed++;
  } else if (key === 's'){
    water++;
  }
  else if (key === 'c'){
    tools++;
  }
  // Uncomment to prevent any default behavior.
  // return false;
}

class Patch {
  constructor(x, y, sizeX, sizeY) {
    this.x = x;
    this.y = y;
    this.planted = false;
    this.watered = false;
    this.grown = false;
    this.curSize = 0;
    this.plotSizeX = sizeX - 20;
    this.plotSizeY = sizeY - 20;
    this.maxSize = min(this.plotSizeX, this.plotSizeY);
    //this.plotColor = color(150, 75, 0);
  }

  contains(x, y) {
    return (
      x > this.x - this.plotSizeX / 2 &&
      x < this.x + this.plotSizeX / 2 &&
      y > this.y - this.plotSizeY / 2 &&
      y < this.y + this.plotSizeY / 2
    );
  }

  display() {
    stroke(0);
    strokeWeight(1);
    image(soilImg, this.x - this.plotSizeX / 2, this.y - this.plotSizeY / 2, this.plotSizeX, this.plotSizeY);
    if (this.planted) {
      //this.plotColor = color(170, 80, 35);
      image(badSoil, this.x - this.plotSizeX / 2, this.y - this.plotSizeY / 2, this.plotSizeX, this.plotSizeY);
      if (this.watered) {
        //this.plotColor = color(100, 70, 35);
        image(wateredSoil, this.x - this.plotSizeX / 2, this.y - this.plotSizeY / 2, this.plotSizeX, this.plotSizeY);
      }
      if (this.curSize > 0  && !this.grown) {
        //fill(0, 255, 0);
        //ellipse(this.x, this.y - 5, this.curSize, this.curSize);
        image(seedlingImg, this.x - this.plotSizeX / 2, this.y - this.plotSizeY / 2, this.plotSizeX, this.plotSize-this.maxSize+this.curSize);
      }
      else if (this.curSize > this.maxSize/2+1)
        {
          image(plantImg,  this.x - this.plotSizeX / 2, this.y - this.plotSizeY / 2, this.plotSizeX, this.plotSizeY-this.maxSize+this.curSize);
        }
    }
  }

  highlight() {
    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(this.x, this.y, this.plotSizeX, this.plotSizeY);
    pop();
  }

  plantSeed() {
    this.planted = true;
  }

  water() {
    if (this.planted) {
      this.watered = true;
    }
  }

  harvest() {
    if (this.grown) {
      //Add a butterfly image here and let butterfly fly away.
      // Harvesting the crop
      this.planted = false;
      this.watered = false;
      this.grown = false;
      this.curSize = 0;
      //this.plotColor = color(150, 75, 0);
    }
  }

  grow() {
    if (this.planted && this.watered && !this.grown) {
      this.curSize++;
      if (this.curSize > this.maxSize) {
        this.grown = true;
        this.curSize = this.maxSize;
      }
    }
  }
}