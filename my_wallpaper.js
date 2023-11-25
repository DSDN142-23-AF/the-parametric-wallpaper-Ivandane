/* NOTE:
The wallpaper may take a few seconds to load due to the time
it requires to render the water pattern in the background. */

// PARAMETRIC VARIABLES
let time = 'night';
let numRipples = 75;

// Refer to this image for rose patterns: https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg
// For best results, do not set the same value for 'roseN' and 'roseD'
let roseN = 7;
let roseD = 4;
let roseX = 100; // Takes 0 to 200
let roseY = 100; // Takes 0 to 200
let roseRotate = 0; // Takes 0 to 360
let roseRadius = 25;
let roseColorOne = [170, 0, 255]; // R, G, B
let roseColorTwo = [43, 0, 255]; // R, G, B

let pistilRadius = 10;
let pistilColor = [255, 255, 0]; // R, G, B

// SET UP WALLPAPER FUNCTION
function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  //pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); // Set to false when ready to print

  // Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 0;
}

// WALLPAPER BACKGROUND FUNCTION
function wallpaper_background() {
  angleMode(DEGREES); // Set angle mode to degrees
  pixelDensity(1); // Set pixel density to 1
  noLoop(); // Turn off loop
  background(255/2);
  // Run water function
  //water();
}

// DRAW SYMBOL FUNCTION
function my_symbol() {
  // Run lily pad function
  lilyPad(100, 100, 100);

  // Run glow effect if time is night
  if(time == 'night') {
    glow(150, [255, 255, 255]);
  }

  // Run polar rose function
  polarRose(roseX, roseY, roseRotate);

  // Run granulate function
  //granulate(15);
}

// WATER FUNCTION
function water() {
  // Declare arrays
  let vectors = [];
  let distances = [];

  // Repeat for the number of ripples
  for(let currentVector = 0; currentVector <= numRipples; currentVector ++) {
    // Create random vectors in the vectors array
    vectors[currentVector] = createVector(random(width), random(height));
  }

  // Load pixels
  loadPixels();

  // Repeat for all pixels
  for(let x = 0; x < width; x ++) {
    for(let y = 0; y < height; y ++) {
      // Repeat for all values in the vectors array
      for(let currentDistance = 0; currentDistance < vectors.length; currentDistance ++) {
        // Calculate the distance between the vectors and add them to the distances array
        distances[currentDistance] = dist(x, y, vectors[currentDistance].x, vectors[currentDistance].y);
      }

      // Declare distances sorted array
      let sorted = sort(distances);

      // Declare noise by the first value in the sorted array
      let noise = sorted[0];

      // Declare current pixel
      let currentPixel = (x + y * width) * 4;

      // Set time to day
      if(time.toLowerCase() == 'day') {
        // Set color to all RGBA pixels
        pixels[currentPixel] = waterColor(noise, 14.5, 44, 2.5); // Red
        pixels[currentPixel + 1] = waterColor(noise, 21, 169, 2.5); // Green
        pixels[currentPixel + 2] = waterColor(noise, 40, 225, 3); // Blue
        pixels[currentPixel + 3] = 255; // Alpha
      }

      // Set time to night
      if(time.toLowerCase() == 'night') {
        // Set color to all RGBA pixels
        pixels[currentPixel] = waterColor(noise, 40, 32, 2.2); // Red
        pixels[currentPixel + 1] = waterColor(noise, 30, 55, 3.34); // Green
        pixels[currentPixel + 2] = waterColor(noise, 30, 68, 3.55); // Blue
        pixels[currentPixel + 3] = 255; // Alpha
      }

      // Set time to day by default if given an incorrect variable
      else {
        // Set color to all RGBA pixels
        pixels[currentPixel] = waterColor(noise, 14.5, 44, 2.5); // Red
        pixels[currentPixel + 1] = waterColor(noise, 21, 169, 2.5); // Green
        pixels[currentPixel + 2] = waterColor(noise, 40, 225, 3); // Blue
        pixels[currentPixel + 3] = 255; // Alpha
      }
    }
  }

  // Update Pixels
  updatePixels();

  // Start new state
  push();

  // Set no stroke
  noStroke();

  // Draw vertex points
  beginShape(POINTS);
  // Repeat for all values in the vectors array
  for(let currentVertex = 0; currentVertex < vectors.length; currentVertex ++) {
    // Create a vertex point from the co-ordinates in the vectors array
    vertex(vectors[currentVertex].x, vectors[currentVertex].y);
  }
  endShape();

  // Restore previous state
  pop();
}

// WATER COLOR FUNCTION
function waterColor(x, division, addition, exponent) {
  if(x < 0) {
    return addition;
  }
  else {
    return pow(x / division, exponent) + addition;
  }
}

// LILY PAD FUNCTION
function lilyPad(x, y, radius) {
  // Declare variables
  lilyPadLayer = createGraphics(radius * 2, radius * 2); // Create a graphic layer
  lilyPadLayer.noStroke(); // Set no stroke
  lilyPadLayer.fill(0, 140, 20); // Set fill color

  // Draw lily pad
  lilyPadLayer.ellipse(x, y, radius); // Draw ellipse
  //lilyPadLayer.erase(); // Turn on erase mode
  lilyPadLayer.fill(0, 0, 0);
  beginShape();
  vertex();
  endShape();
  //lilyPadLayer.noErase(); // Turn off erase mode
  image(lilyPadLayer, x, y);
}

// POLAR ROSE FUNCTION
function polarRose(x, y, rotation) {
  // PETALS
  // Start new state
  push();

  // Set parameters
  rotate(rotation); // Set rotation
  strokeWeight(0.5); // Set stroke thickness
  radialGradient(0, 0, 0, 0, 0, 45, roseColorOne, roseColorTwo, 25); // Set fill and stroke color

  // Draw rose
  beginShape();
  // Repeat for every angle
  for(let theta = 0; theta < 360; theta += 0.1) {
    // Declare variables
    // Equations from: https://en.wikipedia.org/wiki/Rose_(mathematics)
    let dAngle = theta * Math.max(roseN, roseD);
    let r = cos((roseN / roseD) * dAngle);
    let dx = (roseRadius * r) * cos(dAngle) + x;
    let dy = (roseRadius * r) * sin(dAngle) + y;

    // Draw vertex points
    vertex(dx, dy);
  }
  endShape();
  
  // PISTIL
  // Set parameters
  fill(pistilColor); // Set fill color
  stroke(strokeColor(pistilColor, 25)); // Set stroke color
  strokeWeight(1); // Set stroke thickness
  // Draw Pistil
  ellipse(x, y, pistilRadius);

  // Restore previous state
  pop();
}

// STROKE COLOR FUNCTION
function strokeColor(array, percent) {
  // Reduce brightness by the percentage
  array[2] = array[2] - percent;

  // Return new array
  return array;
}

// RADIAL GRADIENT FUNCTION
function radialGradient(
  xStart, yStart, radiusStart,
  xEnd, yEnd, radiusEnd,
  colorStart, colorEnd,
  percent) {
  // Declare variables
  let gradientFill = drawingContext.createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd);
  let gradientStroke = drawingContext.createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd);
  
  // Declare arrays
  let strokeColorStart = [colorStart[0], 100, 100];
  let strokeColorEnd = [colorEnd[0], 100, 100];

  // Decrease brightness by percentage
  strokeColorStart[2] = strokeColorStart[2] - percent;
  strokeColorEnd[2] = strokeColorEnd[2] - percent;

  // Set color gradients
  gradientFill.addColorStop(0, color(colorStart));
  gradientFill.addColorStop(1, color(colorEnd));
  gradientStroke.addColorStop(0, color(strokeColorEnd));
  gradientStroke.addColorStop(1, color(strokeColorStart));

  // Add gradients
  drawingContext.fillStyle = gradientFill;
  drawingContext.strokeStyle = gradientStroke;
}

// GLOW FUNCTION
function glow(amount, colorArray) {
  // Set shadow blur amount
  drawingContext.shadowBlur = amount;

  // Set shadow color
  drawingContext.shadowColor = color(colorArray);
}

// GRANULATE FUNCTION
function granulate(amount) {
  // Load pixels
  loadPixels();

  // Declare variables
  const density = pixelDensity();
  const pixelsCount = 4 * (width * density) * (height * density);

  // Repeat for all RGBA pixels
  for(let currentPixel = 0; currentPixel < pixelsCount; currentPixel += 4) {
    // Randomise grain amount
    const grainAmount = random(-amount, amount);

    // Add grain to all RGBA pixels
    pixels[currentPixel] = pixels[currentPixel] + grainAmount; // Red
    pixels[currentPixel + 1] = pixels[currentPixel + 1] + grainAmount; // Green
    pixels[currentPixel + 2] = pixels[currentPixel + 2] + grainAmount; // Blue
    pixels[currentPixel + 3] = pixels[currentPixel + 3] + grainAmount; // Alpha
  }

  // Update pixels
  updatePixels();
}