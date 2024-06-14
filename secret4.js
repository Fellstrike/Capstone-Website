let showVideo = true;
//let myVideo;
let indexButton;
let prevButton;
let nextButton;

let picture;
let picNum;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //uncomment out to create youtube livestream. Change url as needed.
 // myVideo = createDiv('<iframe id="videoFrame" src="https://www.youtube.com/embed/m_PzlrtKM-I?si=4g46CyI0yJ3nXF0N" frameborder="0" allow="accelerometer encrypted-media gyroscope picture-in-picture allow-modals allow-popups-to-escape-sandbox allow-presentation"></iframe>');
  
  // Position and size the video initially
  //resizeVideo();
  picNum = int(random(10));
  picture = loadImage('/gallery/gallery' + picNum + ".jpg");

  indexButton = createButton('Gallery');
  indexButton.style('font-size', 30 + 'px');
  indexButton.size(width*0.1, height*0.07);
  indexButton.position(width * 0.45, height*0.0);
  indexButton.mouseClicked(toMain);
  prevButton = createButton('Previous');
  prevButton.style('font-size', 30 + 'px');
  prevButton.size(width*0.1, height*0.07);
  prevButton.position(width*0.075, height*0.5);
  prevButton.mouseClicked(prevImage);
  nextButton = createButton('Next');
  nextButton.style('font-size', 30 + 'px');
  nextButton.size(width*0.1, height*0.07);
  nextButton.position(width*0.825, height*0.5);
  nextButton.mouseClicked(nextImage);
}

function draw() {
  background(0);
  // Empty draw function to keep the sketch running
  picture.resize(0, min(width, height));
  image(picture, (width-picture.width)/2, (height-picture.height)/2);
}

function toMain() {
  window.location.assign('index.html');
}

function prevImage() {
  picNum--;
  if (picNum < 0) {
    picNum = 9;
  }
  picture = loadImage('/gallery/gallery' + picNum + ".jpg");
  }

function nextImage() {
  picNum++;
  if (picNum > 9) {
    picNum = 0;
  }
  picture = loadImage('/gallery/gallery' + picNum + ".jpg");
  }


/* function mouseClicked() {
  if (showVideo) {
    myVideo.hide(); 
  } else {
    myVideo.show(); 
  }
  
  showVideo = !showVideo;
}

// Function to resize and position the video
function resizeVideo() {
  let videoFrame = select('#videoFrame');
  videoFrame.size(windowWidth * 0.85, windowHeight * 0.85);
  myVideo.position(windowWidth * 0.1, windowHeight * 0.1);
}*/

// Call the resizeVideo function whenever the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  indexButton.size(width*0.1, height*0.07);
  indexButton.position(width * 0.45, height*0.0);

  prevButton.size(width*0.1, height*0.07);
  prevButton.position(width*0.075, height*0.5);

  nextButton.size(width*0.1, height*0.07);
  nextButton.position(width*0.825, height*0.5);

  //resizeVideo();
}