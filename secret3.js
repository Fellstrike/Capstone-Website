  let showVideo = true;
  let myVideo;
  let indexButton;
  let prevButton;
  let nextButton;
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Create the iframe with dynamic width and height
    myVideo = createDiv('<iframe id="videoFrame" src="https://www.youtube.com/embed/m_PzlrtKM-I?si=4g46CyI0yJ3nXF0N" frameborder="0" allow="accelerometer encrypted-media gyroscope picture-in-picture allow-modals allow-popups-to-escape-sandbox allow-presentation"></iframe>');
    
    // Position and size the video initially
    resizeVideo();

    indexButton = createButton('Gallery');
    indexButton.style('font-size', 30 + 'px');
    indexButton.size(110, 50);
    indexButton.position(width * 0.1, height*0.1);
    indexButton.mouseClicked(toMain);
    prevButton = createButton('Previous');
    prevButton.style('font-size', 30 + 'px');
    prevButton.size(110, 50);
    prevButton.position(width * 0.05, height*0.55);
    prevButton.mouseClicked(prevCamera);
    nextButton = createButton('Next');
    nextButton.style('font-size', 30 + 'px');
    nextButton.size(110, 50);
    nextButton.position(width*0.9, height*0.55);
    nextButton.mouseClicked(nextCamera);
  }
  
  function draw() {
    // Empty draw function to keep the sketch running
  }
  
  function toMain() {
  window.location.assign('index.html');
  }

  function prevCamera() {
    window.location.assign('secret2.html');
    }

    function nextCamera() {
      window.location.assign('secret1.html');
      }
  

  function mouseClicked() {
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
  }
  
  // Call the resizeVideo function whenever the window is resized
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    resizeVideo();
  }
  