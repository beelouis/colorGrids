let img;
let sizeofguy = 950;
let height = sizeofguy;
let width = sizeofguy;

let yindex = 0;
let xindex = width;

let bool = true;
let col = {r:150, g:200, b:50, a:255};

function setup(){
  pixelDensity(1);
  img = createImage(width, height);
  img.loadPixels();
  createCanvas(width, height);
  background(20);

  initializeCanvasRandomColors();
}

function initializeCanvasRandomColors(){
  for (x = 0; x < width; x ++){
    for (y = 0; y < height; y ++){
      writeColor(img, x, y, random(200), random(100), random(100), random(100));
    }
  }
}

function writeColor(image, x, y, red, green, blue, alpha) {
  let index = (x + y * sizeofguy) * 4;
  image.pixels[index]     = red;
  image.pixels[index + 1] = green;
  image.pixels[index + 2] = blue;
  image.pixels[index + 3] = alpha;
}

function draw(){
  wave();
  img.updatePixels();
  image(img, 0, 0);
}

function wave(){
  for (let x = xindex; x > xindex - 4; x--){
    for (let y = 0; y < height; y++){
      // let cArr = get(x, y);
      // col.r = (cArr[0] + random(-50, 50) % 255);
      // col.g = (cArr[1] + random(-50, 50) % 255);
      // col.b = (cArr[2] + random(-50, 50) % 255);
      // col.a = (cArr[3]);
      writeColor(img, x, y, col.r, col.g, col.b, col.a);
    }
  }
  xindex = (xindex - 4);
  if (xindex <= 0){
    xindex = width;
    col.r = (col.r + random(-10, 10) % 255);
    col.g = (col.g + random(-10, 10) % 255);
    col.b = (col.b + random(-10, 10) % 255);

  }
}
