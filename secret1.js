  let showVideo = true;
  let myVideo;
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Create the iframe with dynamic width and height
    myVideo = createDiv('<iframe id="videoFrame" src="https://www.youtube.com/embed/m_PzlrtKM-I?si=4g46CyI0yJ3nXF0N" frameborder="0" allow="accelerometer encrypted-media gyroscope picture-in-picture allow-modals allow-popups-to-escape-sandbox allow-presentation"></iframe>');
    
    // Position and size the video initially
    resizeVideo();
  }
  
  function draw() {
    // Empty draw function to keep the sketch running
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
  