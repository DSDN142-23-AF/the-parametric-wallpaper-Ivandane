/* NOTE:
The wallpaper may take a few seconds to load due to the time
it requires to render the water pattern in the background. */

// PARAMETRIC VARIABLES
let time = 'day';
let numRipples = 75;

// Refer to this image for flower patterns: https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg
// For best results, do not set the same value for 'waterLilyN' and 'waterLilyD'
let waterLilyN = 7;
let waterLilyD = 4;
let waterLilyX = 100; // Takes 0 to 200
let waterLilyY = 100; // Takes 0 to 200
let waterLilyRotate = 0; // Takes 0 to 360
let waterLilyRadius = 22.5;
let waterLilyColorOne = [170, 0, 255]; // R, G, B
let waterLilyColorTwo = [43, 0, 255]; // R, G, B

let pistilRadius = 7.5;
let pistilColor = [255, 255, 0]; // R, G, B

let glowAmount = 50;

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
  // Run water function
  water();
  //background(255/2);
}

// DRAW SYMBOL FUNCTION
function my_symbol() {
  // Run lily pad function
  lilyPad(100, 100, 75, 45); // x, y, radius, rotation

  // Run glow effect if time is night
  if(time.toLowerCase() == 'night') {
    glow(glowAmount, [200, 200, 200]);
  }

  // Run water lily function
  waterLily(waterLilyX, waterLilyY, waterLilyRadius, waterLilyRotate);

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
      else if(time.toLowerCase() == 'night') {
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

// RADIAL GRADIENT FUNCTION
function radialGradient(
  xStart, yStart, radiusStart,
  xEnd, yEnd, radiusEnd,
  colorStart, colorEnd,
  type) {
  // Declare variable
  let gradient = drawingContext.createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd);

  // Set color gradients
  gradient.addColorStop(0, color(colorStart));
  gradient.addColorStop(1, color(colorEnd));

  // Add gradient
  if(type == 'stroke') {
    drawingContext.strokeStyle = gradient;
  }
  else if(type == 'fill') {
    drawingContext.fillStyle = gradient;
  }
}

// GLOW FUNCTION
function glow(amount, colorArray) {
  // Set shadow blur amount
  drawingContext.shadowBlur = amount;

  // Set shadow color
  drawingContext.shadowColor = color(colorArray);
}

// LILY PAD FUNCTION
function lilyPad(x, y, radius, rotation) {
  // Declare variables
  lilyPadLayer = createGraphics(radius, radius); // Create a graphic layer
  lilyPadLayer.pixelDensity(5); // Set pixel density for sharper image
  lilyPadLayer.translate(radius / 2, radius / 2); // Set new (0, 0) co-ordinate
  lilyPadLayer.angleMode(DEGREES); // Set layer's angle mode to degrees
  lilyPadLayer.rotate(rotation); // Set rotation
  lilyPadLayer.noStroke(); // Set no stroke

  // Create radial gradient (radialGradient() function does not work here because of the graphic layer)
  let gradient = drawingContext.createRadialGradient(0, 0, 0, 0, 0, radius / 2); // Declare variable
  // Set radial gradient for day
  if(time.toLowerCase() == 'day') {
    gradient.addColorStop(0, color(0, 140, 40));
    gradient.addColorStop(1, color(0, 190, 30));
    lilyPadLayer.drawingContext.fillStyle = gradient;
  }
  // Set radial gradient for night
  else if(time.toLowerCase() == 'night') {
    gradient.addColorStop(0, color(0, 190, 30));
    gradient.addColorStop(1, color(0, 140, 40));
    lilyPadLayer.drawingContext.fillStyle = gradient;
  }
  // Set radial gradient for day by default if given an incorrect variable
  else {
    gradient.addColorStop(0, color(0, 140, 40));
    gradient.addColorStop(1, color(0, 190, 30));
    lilyPadLayer.drawingContext.fillStyle = gradient;
  }

  // Lily pad
  lilyPadLayer.ellipse(0, 0, radius); // Draw ellipse

  // Lines
  // Set stroke color for day
  if(time.toLowerCase() == 'day') {
    lilyPadLayer.stroke(20, 120, 20);
  }
  // Set stroke color for night
  else if(time.toLowerCase() == 'night') {
    lilyPadLayer.stroke(40, 180, 60);
  }
  // Set stroke color for day by default if given an incorrect variable
  else {
    lilyPadLayer.stroke(20, 120, 20);
  }
  lilyPadLayer.strokeWeight(0.75); // Set stroke weight
  // Repeat for every angle
  for(let theta = 0; theta < 360; theta += 30) {
    // Declare variables
    let lineEndX = cos(theta) * (radius / 3);
    let lineEndY = sin(theta) * (radius / 3);

    // Draw lines
    lilyPadLayer.line(0, 0, lineEndX, lineEndY);
  }

  // Cut-out
  lilyPadLayer.erase(); // Turn on erase mode
  lilyPadLayer.beginShape();
  lilyPadLayer.vertex(0 - (radius / 8), 0 - (radius / 2));
  lilyPadLayer.vertex(radius / 8, 0 - (radius / 2));
  lilyPadLayer.vertex(0, 0);
  lilyPadLayer.endShape();
  lilyPadLayer.noErase(); // Turn off erase mode
  
  // Print image
  image(lilyPadLayer, x, y);
}

// WATER LILY FUNCTION
function waterLily(x, y, radius, rotation) {
  // PETALS
  // Start new state
  push();

  // Set parameters
  rotate(rotation); // Set rotation
  strokeWeight(0.5); // Set stroke thickness
  radialGradient(x, y, 0, x, y, radius, waterLilyColorTwo, waterLilyColorOne, 'stroke'); // Set stroke color
  radialGradient(x, y, 0, x, y, radius, waterLilyColorOne, waterLilyColorTwo, 'fill'); // Set fill color

  // Draw water lily
  beginShape();
  // Repeat for every angle
  for(let theta = 0; theta < 360; theta += 0.1) {
    // Declare variables
    // Equations from: https://en.wikipedia.org/wiki/Rose_(mathematics)
    let dAngle = theta * Math.max(waterLilyN, waterLilyD);
    let r = cos((waterLilyN / waterLilyD) * dAngle);
    let dx = (radius * r) * cos(dAngle) + x;
    let dy = (radius * r) * sin(dAngle) + y;

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