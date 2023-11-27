/* NOTE:
The wallpaper may take a few seconds to load due to the time
it requires to render the water pattern in the background. */

// PARAMETRIC VARIABLES
let time = 'night';
let numWaves = 50;

// Refer to this image for flower patterns: https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg
// For best results, do not set the same value for 'waterLilyN' and 'waterLilyD'
let waterLilyN = 7;
let waterLilyD = 3;
let waterLilyX = 100; // Takes 0 to 200
let waterLilyY = 100; // Takes 0 to 200
let waterLilyRotate = 0; // Takes 0 to 360
let waterLilyRadius = 22.5;
let waterLilyColorOne = [255, 0, 120]; // R, G, B
let waterLilyColorTwo = [255, 175, 210]; // R, G, B

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
  pWallpaper.grid_settings.row_offset  = 50;
}

// WALLPAPER BACKGROUND FUNCTION
function wallpaper_background() {
  angleMode(DEGREES); // Set angle mode to degrees
  pixelDensity(1); // Set pixel density to 1
  noLoop(); // Turn off loop

  // Run water function
  water();
  //background(0, 150, 210);
  //background(32, 55, 68);
}

// DRAW SYMBOL FUNCTION
function my_symbol() {
  // Run lily pad function
  lilyPad(100, 100, 75, 45); // x, y, radius, rotation
  lilyPad(30, 30, 30, 280); // x, y, radius, rotation
  lilyPad(25, 130, 20, 45); // x, y, radius, rotation
  lilyPad(168, 168, 38, 180); // x, y, radius, rotation

  // Run water lily function
  waterLily(waterLilyX, waterLilyY, waterLilyRadius, waterLilyRotate);
  waterLily(40, 35, 10, 0);
  waterLily(165, 160, 8, 0);

  // Run cattails function
  cattailGroup(165, 30);

  // Run rock function
  rock(60, 175);

  // Run frog function
  frog(60, 172, 0.9);
}

// WATER FUNCTION
function water() {
  // Declare arrays
  let vectors = [];
  let distances = [];

  // Repeat for the number of ripples
  for(let currentVector = 0; currentVector <= numWaves; currentVector ++) {
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
        pixels[currentPixel] = waterColor(noise, 9.4, 0, 2); // Red
        pixels[currentPixel + 1] = waterColor(noise, 14.65, 150, 2); // Green
        pixels[currentPixel + 2] = waterColor(noise, 22.4, 210, 2); // Blue
        pixels[currentPixel + 3] = 255; // Alpha
      }
      // Set time to night
      else if(time.toLowerCase() == 'night') {
        // Set color to all RGBA pixels
        pixels[currentPixel] = waterColor(-(noise, 44, 32, 2)); // Red
        pixels[currentPixel + 1] = waterColor(noise, 20.2, 55, 2); // Green
        pixels[currentPixel + 2] = waterColor(noise, 16.5, 68, 2); // Blue
        pixels[currentPixel + 3] = 255; // Alpha
      }
      // Set time to day by default if given an incorrect variable
      else {
        // Set color to all RGBA pixels
        pixels[currentPixel] = waterColor(noise, 8, 0, 2); // Red
        pixels[currentPixel + 1] = waterColor(noise, 12.4, 150, 2); // Green
        pixels[currentPixel + 2] = waterColor(noise, 19, 210, 2); // Blue
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

// GLOW FUNCTION
function glow(amount, colorArray) {
  // Set shadow blur amount
  drawingContext.shadowBlur = amount;

  // Set shadow color
  drawingContext.shadowColor = color(colorArray);
}

// RADIAL GRADIENT FUNCTION
function radialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd, colorStart, colorEnd, type) {
  // Declare variable
  let gradient = drawingContext.createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd);

  // If type is stroke
  if(type == 'stroke') {
    // Declare arrays
    let strokeColorStart = [];
    let strokeColorEnd = [];

    // Repeat for every value in the colorStart array
    for(let currentColor = 0; currentColor < colorStart.length; currentColor ++) {
      // Decrease the colorStart value by 40 and add to the strokeColorStart array
      strokeColorStart[currentColor] = colorStart[currentColor] - 40;

      // If the value is less than 0, set to 0
      if(strokeColorStart[currentColor] < 0) {
        strokeColorStart[currentColor] = 0;
      }
    }

    // Repeat for every value in the colorEnd array
    for(let currentColor = 0; currentColor < colorEnd.length; currentColor ++) {
      // Decrease the colorEnd value by 40 and add to the strokeColorEnd array
      strokeColorEnd[currentColor] = colorEnd[currentColor] - 40;
      
      // If the value is less than 0, set to 0
      if(strokeColorEnd[currentColor] < 0) {
        strokeColorEnd[currentColor] = 0;
      }
    }

    // Set color gradients
    gradient.addColorStop(0, color(strokeColorStart));
    gradient.addColorStop(1, color(strokeColorEnd));

    // Add gradient
    drawingContext.strokeStyle = gradient;
  }

  // If type is fill
  else if(type == 'fill') {
    // Set color gradients
    gradient.addColorStop(0, color(colorStart));
    gradient.addColorStop(1, color(colorEnd));

    // Add gradient
    drawingContext.fillStyle = gradient;
  }
}

// LILY PAD FUNCTION
function lilyPad(x, y, radius, rotation) {
  // LILY PAD
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

  // Draw ellipse
  lilyPadLayer.ellipse(0, 0, radius);

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
  lilyPadLayer.strokeWeight(radius / 100); // Set stroke weight
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

  // Run ripples function
  ripples(x, y, radius, 3);
}

// WATER LILY FUNCTION
function waterLily(x, y, radius, rotation) {
  // PETALS
  // Start new state
  push();

  // Run glow effect if time is night
  if(time.toLowerCase() == 'night') {
    glow(glowAmount, [200, 200, 200]);
  }

  // Set parameters
  rotate(rotation); // Set rotation
  strokeWeight(0.25); // Set stroke thickness
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

    // Create vertex points
    vertex(dx, dy);
  }
  endShape();
  
  // PISTIL
  // Set parameters
  fill(pistilColor); // Set fill color
  noStroke(); // Set no stroke
  // Draw Pistil
  ellipse(x, y, radius / 3);

  // Run fireflies function if time is night
  if(time.toLowerCase() == 'night') {
    fireflies(x, y, 5);
  }

  // Restore previous state
  pop();
}

// CATTAIL GROUP FUNCTION
function cattailGroup(x, y) {
  // Start new state
  push();

  // Run glow effect if time is night
  if(time.toLowerCase() == 'night') {
    glow(glowAmount, [200, 200, 200]);
  }

  // LEAVES
  // Declare variables
  translate(x, y); // Set new (0, 0) co-ordinate
  stroke(20, 160, 25); // Set stroke color to green
  strokeWeight(0.75); // Set stroke weight
  fill(20, 160, 25); // Set fill color to green

  // Draw leaves
  beginShape();
  curveVertex(0, 27);
  curveVertex(-5, 0);
  curveVertex(-15, 5);
  curveVertex(-6, 2);
  endShape(CLOSE);

  beginShape();
  curveVertex(0, 27);
  curveVertex(5, 0);
  curveVertex(15, 5);
  curveVertex(6, 2);
  endShape(CLOSE);

  beginShape();
  curveVertex(0, 27);
  curveVertex(-5, 13);
  curveVertex(-10, 22);
  curveVertex(-5, 15);
  endShape(CLOSE);

  beginShape();
  curveVertex(0, 27);
  curveVertex(5, 13);
  curveVertex(10, 22);
  curveVertex(5, 15);
  endShape(CLOSE);

  // CATTAILS
  cattail(); // Run cattail function

  push(); // Start new state
  translate(-5, 0); // Set new (0, 0) co-ordinate
  rotate(-50); // Set rotation
  cattail(); // Run cattail function
  pop(); // Restore previous state

  push(); // Start new state
  translate(5, 0); // Set new (0, 0) co-ordinate
  rotate(50); // Set rotation
  cattail(); // Run cattail function
  pop(); // Restore previous state

  push(); // Start new state
  translate(-6, 5); // Set new (0, 0) co-ordinate
  rotate(-115); // Set rotation
  cattail(); // Run cattail function
  pop(); // Restore previous state

  push(); // Start new state
  translate(6, 5); // Set new (0, 0) co-ordinate
  rotate(115); // Set rotation
  cattail(); // Run cattail function
  pop(); // Restore previous state

  // Run ripples function
  ripples(0, 26, 5, 3);

  // STALKS
  // Set no fill color
  noFill();

  // Draw line and curves
  line(0, 2, 0, 27);
  curve(-20, 0, -4, 2, 0, 27, -10, 27);
  curve(20, 0, 4, 2, 0, 27, 10, 27);
  curve(-20, 0, -3.5, 5, 0, 27, -10, 27);
  curve(20, 0, 3.5, 5, 0, 27, -0, 27);

  // Restore previous state
  pop();

  // Run fireflies function if time is night
  if(time.toLowerCase() == 'night') {
    fireflies(x, y, 5);
  }
}

// CATTAILS FUNCTION
function cattail() {
  // FEMALE SEEDS
  // Start new state
  push();

  // Declare variables
  stroke(130, 75, 5); // Set stroke color to brown
  strokeWeight(3.5); // Set stroke weight
  strokeCap(ROUND); // Set line endings to round
  
  // Draw line
  line(0, 0, 0, -10);

  // MALE POLLEN
  // Declare variables
  stroke(225, 205, 5); // Set stroke color to yellow
  strokeWeight(0.5); // Set stroke weight

  // Draw line
  line(0, -12, 0, -14);
  
  // Restore new state
  pop();
}

// ROCK FUNCTION
function rock(x, y, size) {
  // Start new state
  push();

  // Declare variables
  translate(x, y); // Set new (0, 0) co-ordinate
  scale(1.5); // Set scale
  noStroke(); // Set no stroke
  radialGradient(-5, -5, 0, 0, 0, 15, [150, 150, 150], [110, 110, 110], 'fill'); // Set fill color

  // Draw rock
  beginShape();
  curveVertex(-10, -10);
  curveVertex(-15, -4);
  curveVertex(-14, 4);
  curveVertex(-4, 12);
  curveVertex(6, 12);
  curveVertex(14, 4);
  curveVertex(15, -4);
  curveVertex(8, -10);
  curveVertex(4, -12);
  curveVertex(-4, -15);
  endShape(CLOSE);

  // Restore previous state
  pop();
}

// FROG FUNCTION
function frog(x, y, size) {
  // Start new state
  push();

  // Declare variables
  translate(x, y); // Set new (0, 0) co-ordinate
  scale(size);
  stroke(35, 115, 10); // Set stroke color to dark green
  strokeWeight(0.5); // Set stroke weight
  fill(45, 125, 20); // Set fill color to green

  // BACK LEGS
  ellipse(-9, 3, 6, 8);
  ellipse(9, 3, 6, 8);
  ellipse(-12, 6.5, 3.5);
  ellipse(-10, 7, 3.5);
  ellipse(-8, 7.5, 3.5);
  ellipse(12, 6.5, 3.5);
  ellipse(10, 7, 3.5);
  ellipse(8, 7.5, 3.5);

  // BODY
  ellipse(0, 0, 18, 20);

  // FRONT LEGS
  ellipse(-6, 9, 3);
  ellipse(-4, 9.5, 3);
  ellipse(-2, 9.75, 3);
  ellipse(6, 9, 3);
  ellipse(4, 9.5, 3);
  ellipse(2, 9.75, 3);

  // STOMACH
  push(); // Start new state
  noStroke(); // Set no stroke
  fill(210, 220, 140); // Set fill color to cream
  ellipse(0, 0, 12, 14);
  pop(); // Restore previous state

  // HEAD
  ellipse(0, -8, 20, 14);

  // EYES
  // Draw eyes if time is day
  if(time.toLowerCase() == 'day') {
    ellipse(-5, -13, 7);
    ellipse(5, -13, 7);
    noFill(); // Set no fill color
    curve(-12, -20, -8, -12, -2, -12, -2, -20);
    curve(2, -20, 2, -12, 8, -12, 8, -20);
  }
  // Draw eyes if time is night
  else if(time.toLowerCase() == 'night') {
    noStroke(); // Set no stroke
    fill(255); // Set fill color to white
    ellipse(-5, -13, 7);
    ellipse(5, -13, 7);
    fill(0); // Set fill color to black
    ellipse(-5, -13, 3);
    ellipse(5, -13, 3);
  }
  // Draw eyes if time is day by default if given an incorrect variable
  else {
    ellipse(-5, -13, 7);
    ellipse(5, -13, 7);
    noFill(); // Set no fill color
    curve(-12, -20, -8, -12, -2, -12, -2, -20);
    curve(2, -20, 2, -12, 8, -12, 8, -20);
  }

  // MOUTH
  stroke(15, 95, 0); // Set stroke color to dark green
  // Draw mouth if time is day
  if(time.toLowerCase() == 'day') {
    fill(15, 95, 0); // Set fill color to dark green
    ellipse(0, -5, 6, 2);
  }
  // Draw mouth if time is night
  else if (time.toLowerCase() == 'night') {
    noFill(); // Set no fill color
    curve(-10, -20, -5, -6, 5, -6, 10, -20);
  }
  // Draw mouth if time is day by default if given an incorrect variable
  else {
    ellipse(0, -5, 6, 2);
  }

  // ZZZs
  // Draw ZZZs if time is night
  if(time.toLowerCase() == 'day') {
    stroke(0);
    fill(255);
    textSize(4);
    text('Z', 5, -18);
    textSize(6);
    text('Z', 10, -20);
    textSize(8);
    text('Z', 4, -25);
  }

  // BLUSH
  fill(230, 120, 235); // Set fill color to pink
  // Draw blush if time is night
  if(time.toLowerCase() == 'night') {
    ellipse(-7, -7, 4);
    ellipse(7, -7, 4);
  }

  // Restore previous state
  pop();
}

// RIPPLES FUNCTION
function ripples(x, y, radius, numRipples) {
  // Start new state
  push();

  // Declare variables
  stroke(255, 255, 255, 50); // Set stroke color to white
  strokeWeight(0.2); // Set stroke weight
  noFill(); // Set no fill color
  let offset = 0; // Declare offset variable

  // Repeat for every ripple
  for(let currentRipple = 0; currentRipple < numRipples; currentRipple ++) {
    // Draw ripples
    beginShape();
    // Repeat for every angle
    for(let theta = 0; theta < 360; theta += 12) {
      // Declare variables
      // Equations borrowed from The Coding Train (https://editor.p5js.org/codingtrain/sketches/mOm2Is7ba)
      let r = (radius / 1.75) + sin(theta * 10) * (radius / 150) + offset;
      let dx = r * cos(theta) + x;
      let dy = r * sin(theta) + y;
      
      // Create curved vertex points
      curveVertex(dx, dy);
    }
    endShape(CLOSE);

    // Increment offset variable
    offset += radius / 10;
  }
  
  // Restore previous state
  pop();
}

// FIREFLIES FUNCTION
function fireflies(x, y, numFirefly) {
  // Start new state
  push();

  // Run glow function
  glow(5, [255, 255, 0]);
  
  // Declare variables
  noStroke(); // Set no stroke
  fill(200, 255, 0); // Set fill color to yellow

  // Repeat for every firefly
  for(let currentFirefly = 0; currentFirefly < numFirefly; currentFirefly ++) {
    ellipse(random(x - 30, x + 30), random(y - 30, y + 30), 2.5);
  }

  // Restore previous state
  pop();
}