let img;
let sizeofguy = 800;
let height = sizeofguy;
let width = sizeofguy;

let col;
let ticks = 0;
let colorChange = 10;
let mydelay = 1;
let minTransitionTime = 100;
let transitionThreshold = 0.6;

let xindex, yindex;
let blockWidth = width / 50;
let blockHeight = height / 1;
let jump = blockWidth;

let xarr = [];

function setup(){
  pixelDensity(1);
  img = createImage(width, height);
  img.loadPixels();
  createCanvas(width, height);
  setRandomBackgroundColor();
  reinitxarr();
  pickNextX();
}

function setRandomBackgroundColor(){
  let initBGcolor = [round(random(100, 255)), round(random(100, 255)), round(random(100, 255))];
  document.body.style.backgroundColor = "rgb("+initBGcolor[0]+","+initBGcolor[1]+","+initBGcolor[2]+")";
  for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){
      writeColor(img, x, y, initBGcolor[0], initBGcolor[1], initBGcolor[2], 255);
    }
  }
  updateMyGuys();
  col = {r:initBGcolor[0], g:initBGcolor[1], b:initBGcolor[2], a:255};
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
      setRandomBackgroundColor();
    }
  }
}

function updateMyGuys(){
  img.updatePixels();
  image(img, 0, 0);
}

function pickNextX(){
  let ran = round(random(xarr.length-1));
  console.log(xarr);
  console.log("Attempting to set xindex to value in index: " + ran);
  console.log("Which is: " + xarr[ran]);
  xindex = xarr[ran];
  xarr.splice(ran, 1);
  yindex = 0;
}

function reinitxarr(){
  for (let i = width-1; i > 0; i -= jump){
    xarr.push(i);
  }
}

function grid(){
  console.log(xindex);
  let cArr = get(xindex, yindex);
  col.r = (cArr[0] + random(-colorChange, colorChange) % 255);
  col.g = (cArr[1] + random(-colorChange, colorChange) % 255);
  col.b = (cArr[2] + random(-colorChange, colorChange) % 255);
  col.a = (cArr[3] + random(-colorChange, colorChange) % 255);

  for (let y = 0; y < blockHeight; y++){
    if (y % round(random(100)) == 0){
      let cArr = get(xindex, yindex);
      col.r = (cArr[0] + random(-colorChange, colorChange) % 255);
      col.g = (cArr[1] + random(-colorChange, colorChange) % 255);
      col.b = (cArr[2] + random(-colorChange, colorChange) % 255);
      col.a = (cArr[3] + random(-colorChange, colorChange) % 255);
    }
    for (let x = xindex; x > xindex - blockWidth; x--){
      writeColor(img, x, y, col.r, col.g, col.b, col.a);
    }
  }
  pickNextX();
  if (xarr.length == 0){
    reinitxarr();
  }
}
