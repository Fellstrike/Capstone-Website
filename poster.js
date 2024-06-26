let posterImg;
let galleryButton;
let easterEgg;
let eggColor;
let eggHighlighted = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    posterImg = loadImage('TheThirdThingFlyer.png');
    galleryButton = createButton('Gallery');
    galleryButton.size(110, 50);
    galleryButton.position(width*0.1, height/2);
    galleryButton.mouseClicked(mainMenu);

    easterEgg = createImg('OldFashionedLogoColor.png');
    easterEgg.position(width*0.48, height*0.77);
    easterEgg.size(100, 100);
    easterEgg.mouseClicked(clickEgg);
    easterEgg.hide();
    easterEgg.mouseOut(unhighlightEgg);
    eggColor = createImg('easterEggLogo.png');
    eggColor.size(100,100);
    eggColor.position(width*0.48, height*0.77);
    eggColor.mouseOver(highlightEgg);
}

function draw() {
    background(100);
    image(posterImg, width/4, 0, height*0.75, height);
}

function mainMenu() {
    window.location.assign('/index.html');
}

function highlightEgg() {
   easterEgg.show();
   eggColor.hide();
}

function unhighlightEgg() {
    easterEgg.hide();
    eggColor.show();
}

function clickEgg() {
    window.location.assign('story1/index.html');
}
