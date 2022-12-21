let img;
let sizeofguy = 800;
let height = sizeofguy;
let width = sizeofguy;

let col;
let ticks = 0;
let colorChange = 10;
let mydelay = 1;
let minTransitionTime = 200;
let transitionThreshold = 0.6;

let xindex, yindex;
let blockWidth = width / 100;
let blockHeight = height / 1;
let jump = blockWidth;

let initBGcolor;

function setup(){
  pixelDensity(1);
  img = createImage(width, height);
  img.loadPixels();
  createCanvas(width, height);
  setRandomBackgroundColor();
  initializeGrid();
}

function setRandomBackgroundColor(){
  initBGcolor = [round(random(100, 255)), round(random(100, 255)), round(random(100, 255))];
  col = {r:initBGcolor[0], g:initBGcolor[1], b:initBGcolor[2], a:255};
  document.body.style.backgroundColor = "rgb("+initBGcolor[0]+","+initBGcolor[1]+","+initBGcolor[2]+")";
  for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){
      writeColor(img, x, y, initBGcolor[0], initBGcolor[1], initBGcolor[2], 255);
    }
  }
  updateMyGuys();
}

function updateBackgroundColor(){
  initBGcolor = [round(random(100, 255)), round(random(100, 255)), round(random(100, 255))];
  col = {r:initBGcolor[0], g:initBGcolor[1], b:initBGcolor[2], a:255};
  document.body.style.backgroundColor = "rgb("+initBGcolor[0]+","+initBGcolor[1]+","+initBGcolor[2]+")";

  let string = document.body.style.backgroundColor;
  let sarr = string.split(",");
  for (let i = 0; i < sarr.length; i++){
    if (i == 0)sarr[i] = sarr[i].slice(4);
    sarr[i] = parseInt(sarr[i]);
  }
  initBGcolor = [
    (sarr[0] + random(-colorChange*5, colorChange*5) % 255),
    (sarr[1] + random(-colorChange*5, colorChange*5) % 255),
    (sarr[2] + random(-colorChange*5, colorChange*5) % 255),
    255
  ];
  document.body.style.backgroundColor = "rgb("+initBGcolor[0]+","+initBGcolor[1]+","+initBGcolor[2]+")";

  col = {r:initBGcolor[0], g:initBGcolor[1], b:initBGcolor[2], a:255};
  for (let x = 0; x < xindex; x++){
    for (let y = 0; y < yindex; y++){
      writeColor(img, x, y, initBGcolor[0], initBGcolor[1], initBGcolor[2], 255);
    }
  }
  updateMyGuys();
}

function writeColor(image, x, y, red, green, blue, alpha) {
  let index = (x + y * sizeofguy) * 4;
  image.pixels[index]     = red;
  image.pixels[index + 1] = green;
  image.pixels[index + 2] = blue;
  image.pixels[index + 3] = alpha;
}

function draw(){
  ticks++;
  if (ticks % mydelay == 0){
    grid();
    updateMyGuys();
  }
  if (ticks % minTransitionTime == 0){
    if (random() > transitionThreshold){
      updateBackgroundColor();
    }
  }
}

function updateMyGuys(){
  img.updatePixels();
  image(img, 0, 0);
}

function initializeGrid(){
  xindex = width;
  yindex = 0;
}

function grid(){
  let cArr = get(xindex, yindex);
  col.r = (cArr[0] + random(-colorChange, colorChange) % 255);
  col.g = (cArr[1] + random(-colorChange, colorChange) % 255);
  col.b = (cArr[2] + random(-colorChange, colorChange) % 255);
  col.a = (cArr[3] + random(-colorChange, colorChange) % 255);

  for (let x = xindex; x > xindex - blockWidth; x--){
    for (let y = yindex; y < yindex + blockHeight; y++){
      writeColor(img, x, y, col.r, col.g, col.b, col.a);
    }
  }
  updateMyGuys();

  xindex -= jump;
  if (xindex <= 0){
      xindex = width;
      yindex += blockHeight;
      if (yindex >= height){
        initializeGrid();
      }
  }
}
