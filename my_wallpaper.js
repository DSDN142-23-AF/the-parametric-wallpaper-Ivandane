// PARAMETRIC VARIABLES
// TIME
let time = 'night'; // Accepts either 'day' or 'night'

// LILY PADS
// Lily Pad One
let lilyPadOneX = 50;
let lilyPadOneY = 170;
let lilyPadOneRadius = 30;
let lilyPadOneRotation = 80; // Accepts range from 0 to 359

// Lily Pad Two
let lilyPadTwoX = 35;
let lilyPadTwoY = 35;
let lilyPadTwoRadius = 35;
let lilyPadTwoRotation = 165; // Accepts range from 0 to 359

// Lily Pad Three
let lilyPadThreeX = 155;
let lilyPadThreeY = 35;
let lilyPadThreeRadius = 40;
let lilyPadThreeRotation = 210; // Accepts range from 0 to 359

// WATER LILIES
/* Refer to this image for flower patterns: https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg.
For best results, do not set the same value for 'waterLilyN' and 'waterLilyD'. */
// Water Lily One
let waterLilyOneN = 4;
let waterLilyOneD = 3;
let waterLilyOneX = 70;
let waterLilyOneY = 165;
let waterLilyOneRadius = 15;
let waterLilyOneColorOne = [45, 0, 255];
let waterLilyOneColorTwo = [125, 120, 255];

// Water Lily Two
let waterLilyTwoN = 5;
let waterLilyTwoD = 3;
let waterLilyTwoX = 37;
let waterLilyTwoY = 40;
let waterLilyTwoRadius = 10;
let waterLilyTwoColorOne = [255, 255, 255];
let waterLilyTwoColorTwo = [245, 255, 130];

// Water Lily Three
let waterLilyThreeN = 4;
let waterLilyThreeD = 1;
let waterLilyThreeX = 150;
let waterLilyThreeY = 40;
let waterLilyThreeRadius = 12.5;
let waterLilyThreeColorOne = [255, 0, 120];
let waterLilyThreeColorTwo = [255, 125, 185];

// CATTAILS
// Cattail One
let cattailOneX = 32.5;
let cattailOneY = 90;
let cattailOneScale = 1.25;

// Cattail Two
let cattailTwoX = 165;
let cattailTwoY = 140;
let cattailTwoScale = 1.4;

// ROCK
let rockX = 100;
let rockY = 105;
let rockScale = 2;

// FROG
let frogX = 100;
let frogY = 100;
let frogScale = 1.6;

// SET UP WALLPAPER FUNCTION
function setup_wallpaper(pWallpaper) {
  // Output settings
  pWallpaper.output_mode(GLIDE_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); // Set to false when ready to print

  // Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 100;
}

// WALLPAPER BACKGROUND FUNCTION
function wallpaper_background() {
  // Set mode settings
  angleMode(DEGREES);
  colorMode(RGB);

  // Set background color depending on the time of day
  // If time is day
  if(time.toLowerCase() == 'day') {
    background(0, 150, 210); // Light blue
  }
  // If time is night
  else if(time.toLowerCase() == 'night') {
    background(30, 70, 90); // Blueish green
  }
  // Default if given an incorrect variable
  else {
    background(0, 150, 210);
  }

  // Run water function
  water();

  // Turn off loop
  noLoop();
}

// DRAW SYMBOL FUNCTION
function my_symbol() {
  // Run rock function
  // X, Y, scale
  rock(rockX, rockY, rockScale);

  // Run lily pad function
  // X, Y, radius, rotation
  lilyPad(lilyPadOneX, lilyPadOneY, lilyPadOneRadius, lilyPadOneRotation);
  lilyPad(lilyPadTwoX, lilyPadTwoY, lilyPadTwoRadius, lilyPadTwoRotation);
  lilyPad(lilyPadThreeX, lilyPadThreeY, lilyPadThreeRadius, lilyPadThreeRotation);

  // Run water lily function
  // N, D, X, Y, radius, colorOne, colorTwo, pistilColor
  waterLily(waterLilyOneN, waterLilyOneD, waterLilyOneX, waterLilyOneY, waterLilyOneRadius, waterLilyOneColorOne, waterLilyOneColorTwo);
  waterLily(waterLilyTwoN, waterLilyTwoD, waterLilyTwoX, waterLilyTwoY, waterLilyTwoRadius, waterLilyTwoColorOne, waterLilyTwoColorTwo);
  waterLily(waterLilyThreeN, waterLilyThreeD, waterLilyThreeX, waterLilyThreeY, waterLilyThreeRadius, waterLilyThreeColorOne, waterLilyThreeColorTwo);
    // Run cattails group function
  // X, Y
  cattailGroup(cattailOneX, cattailOneY, cattailOneScale);
  cattailGroup(cattailTwoX, cattailTwoY, cattailTwoScale);

  // Run frog function
  // X, Y, scale
  frog(frogX, frogY, frogScale);

  // If time is night
  if(time.toLowerCase() == 'night') {
    // Run fireflies function
    fireflies();
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
    for(let i = 0; i < colorStart.length; i ++) {
      // Decrease the colorStart value by 40 and add to the strokeColorStart array
      strokeColorStart[i] = colorStart[i] - 40;

      // If the value is less than 0, set to 0
      if(strokeColorStart[i] < 0) {
        strokeColorStart[i] = 0;
      }
    }

    // Repeat for every value in the colorEnd array
    for(let i = 0; i < colorEnd.length; i ++) {
      // Decrease the colorEnd value by 40 and add to the strokeColorEnd array
      strokeColorEnd[i] = colorEnd[i] - 40;
      
      // If the value is less than 0, set to 0
      if(strokeColorEnd[i] < 0) {
        strokeColorEnd[i] = 0;
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

// WATER FUNCTION
function water() {
  // Start new state
  push();

  // Repeat for width and height
  for(let x = 0; x < width; x ++) {
    for(let y = 0; y < height; y ++) {
      // Declare variables
      let nx = x * 0.01;
      let ny = y * 0.01;
      let c = noise(nx, ny) * 150;

      // Set stroke color and transparency
      stroke(c, c, c, 50);

      // Draw points
      point(x, y);
    }
  }

  // Restore previous state
  pop();
}

// LILY PAD FUNCTION
function lilyPad(x, y, radius, rotation) {
  // LILY PAD
  // Declare variables
  lilyPadLayer = createGraphics(radius, radius); // Create a graphic layer
  lilyPadLayer.pixelDensity(5); // Set pixel density for sharper image
  lilyPadLayer.translate(radius / 2, radius / 2); // Set new (0, 0) co-ordinate
  lilyPadLayer.angleMode(DEGREES); // Set layer's angle mode to degrees
  lilyPadLayer.rotate(rotation);
  lilyPadLayer.noStroke();

  // Create radial gradient (radialGradient() function does not work here because of the graphic layer)
  let gradient = drawingContext.createRadialGradient(0, 0, 0, 0, 0, radius / 2);

  // If time is day
  if(time.toLowerCase() == 'day') {
    // Set radial gradient
    gradient.addColorStop(0, color(40, 180, 80));
    gradient.addColorStop(1, color(40, 230, 70));
    lilyPadLayer.drawingContext.fillStyle = gradient;
  }
  // If time is night
  else if(time.toLowerCase() == 'night') {
    // Set radial gradient
    gradient.addColorStop(0, color(0, 190, 30));
    gradient.addColorStop(1, color(0, 140, 40));
    lilyPadLayer.drawingContext.fillStyle = gradient;
  }
  // Default if given an incorrect variable
  else {
    gradient.addColorStop(0, color(40, 180, 80));
    gradient.addColorStop(1, color(40, 230, 70));
    lilyPadLayer.drawingContext.fillStyle = gradient;
  }

  // Draw ellipse
  lilyPadLayer.ellipse(0, 0, radius);

  // LINES
  // If time is day
  if(time.toLowerCase() == 'day') {
    // Set stroke color to dark green
    lilyPadLayer.stroke(20, 120, 20);
  }
  // If time is night
  else if(time.toLowerCase() == 'night') {
    // Set stroke color to light green
    lilyPadLayer.stroke(40, 180, 60);
  }
  // Default if given an incorrect variable
  else {
    // Set stroke color to dark green
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

  // CUT-OUT
  // Turn on erase mode
  lilyPadLayer.erase();

  // Draw shape
  lilyPadLayer.beginShape();
  lilyPadLayer.vertex(0 - (radius / 8), 0 - (radius / 2));
  lilyPadLayer.vertex(radius / 8, 0 - (radius / 2));
  lilyPadLayer.vertex(0, 0);
  lilyPadLayer.endShape();

  // Turn off erase mode
  lilyPadLayer.noErase();
  
  // Print image
  image(lilyPadLayer, x, y);

  // Run ripples function
  ripples(x, y, radius, 3);
}

// WATER LILY FUNCTION
function waterLily(n, d, x, y, radius, colorOne, colorTwo) {
  // PETALS
  // Start new state
  push();

  // If time is night
  if(time.toLowerCase() == 'night') {
    // Run glow function
    glow(50, [200, 200, 200]);
  }

  // Declare variables
  strokeWeight(0.25);
  radialGradient(x, y, 0, x, y, radius, colorTwo, colorOne, 'stroke'); // Set stroke color
  radialGradient(x, y, 0, x, y, radius, colorOne, colorTwo, 'fill'); // Set fill color

  // Draw water lily
  beginShape();

  // Repeat for every angle
  for(let theta = 0; theta < 360; theta += 0.1) {
    // Declare variables
    // Equations from: https://en.wikipedia.org/wiki/Rose_(mathematics)
    let dAngle = theta * max(n, d);
    let r = cos((n / d) * dAngle);
    let dx = (radius * r) * cos(dAngle) + x;
    let dy = (radius * r) * sin(dAngle) + y;

    // Create vertex points
    vertex(dx, dy);
  }
  endShape();
  
  // PISTIL
  // Declare variables'
  noStroke();
  fill(255, 255, 0); // Yellow
  
  // Draw pistil
  beginShape();

  // Repeat for every angle
  for (let a = 0; a < 360; a += 18) {
    // Declare variables
    let dx = cos(a) * (radius / 3) + x;
    let dy = sin(a) * (radius / 3) + y;

    // Create vertex points
    vertex(dx, dy);

    // Declare variables
    dx = cos(a + 9) * (radius / 5) + x;
    dy = sin(a + 9) * (radius / 5) + y;

    // Create vertex points
    vertex(dx, dy);
  }
  endShape();

  // Restore previous state
  pop();
}

// CATTAIL GROUP FUNCTION
function cattailGroup(x, y, size) {
  // Start new state
  push();

  // LEAVES
  // Declare variables
  translate(x, y); // Set new (0, 0) co-ordinate
  scale(size);
  stroke(60, 200, 65); // Green
  strokeWeight(0.75);
  fill(60, 200, 65); // Green

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
  rotate(-50);
  cattail(); // Run cattail function
  pop(); // Restore previous state

  push(); // Start new state
  translate(5, 0); // Set new (0, 0) co-ordinate
  rotate(50);
  cattail(); // Run cattail function
  pop(); // Restore previous state

  push(); // Start new state
  translate(-6, 5); // Set new (0, 0) co-ordinate
  rotate(-115);
  cattail(); // Run cattail function
  pop(); // Restore previous state

  push(); // Start new state
  translate(6, 5); // Set new (0, 0) co-ordinate
  rotate(115);
  cattail(); // Run cattail function
  pop(); // Restore previous state

  // Run ripples function
  ripples(0, 26, 5, 3);

  // STALKS
  // Declare variable
  noFill();

  // Draw line and curves
  line(0, 2, 0, 27);
  curve(-20, 0, -4, 2, 0, 27, -10, 27);
  curve(20, 0, 4, 2, 0, 27, 10, 27);
  curve(-20, 0, -3.5, 5, 0, 27, -10, 27);
  curve(20, 0, 3.5, 5, 0, 27, -0, 27);

  // Restore previous state
  pop();
}

// CATTAILS FUNCTION
function cattail() {
  // FEMALE SEEDS
  // Start new state
  push();

  // Declare variables
  stroke(150, 95, 25); // Brown
  strokeWeight(3.5);
  strokeCap(ROUND);
  
  // Draw line
  line(0, 0, 0, -10);

  // MALE POLLEN
  // Declare variables
  stroke(225, 205, 5); // Yellow
  strokeWeight(0.5);

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
  scale(rockScale);
  noStroke();
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
  stroke(35, 115, 10); // Dark green
  strokeWeight(0.5);
  fill(65, 145, 40); // Green

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
  noStroke();
  fill(210, 220, 140); // Cream
  ellipse(0, 0, 12, 14);
  pop(); // Restore previous state

  // HEAD
  ellipse(0, -8, 20, 14);

  // EYES
  // If time is day
  if(time.toLowerCase() == 'day') {
    // Draw closed eyes
    ellipse(-5, -13, 7);
    ellipse(5, -13, 7);
    noFill();
    curve(-12, -20, -8, -12, -2, -12, -2, -20);
    curve(2, -20, 2, -12, 8, -12, 8, -20);
  }
  // If time is night
  else if(time.toLowerCase() == 'night') {
    // Draw open eyes
    noStroke();
    fill(255); // White
    ellipse(-5, -13, 7);
    ellipse(5, -13, 7);
    fill(0); // Black
    ellipse(-5, -13, 3);
    ellipse(5, -13, 3);
  }
  // Default if given an incorrect variable
  else {
    // Draw closed eyes
    ellipse(-5, -13, 7);
    ellipse(5, -13, 7);
    noFill();
    curve(-12, -20, -8, -12, -2, -12, -2, -20);
    curve(2, -20, 2, -12, 8, -12, 8, -20);
  }

  // MOUTH
  stroke(15, 95, 0); // Dark green
  // If time is day
  if(time.toLowerCase() == 'day') {
    // Draw open mouth
    fill(15, 95, 0); // Dark green
    ellipse(0, -5, 6, 2);
  }
  // If time is night
  else if (time.toLowerCase() == 'night') {
    // Draw smile
    noFill();
    curve(-10, -20, -5, -6, 5, -6, 10, -20);
  }
  // Default if given an incorrect variable
  else {
    // Draw open mouth
    fill(15, 95, 0); // Dark green
    ellipse(0, -5, 6, 2);
  }

  // ZZZs
  // If time is day
  if(time.toLowerCase() == 'day') {
    // Draw ZZZs
    stroke(0); // Black
    fill(255); // White
    textSize(4);
    text('Z', 5, -18);
    textSize(6);
    text('Z', 10, -20);
    textSize(8);
    text('Z', 4, -25);
  }

  // BLUSH
  fill(230, 120, 235); // Pink
  // If time is night
  if(time.toLowerCase() == 'night') {
    // Draw blush
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
  stroke(255, 255, 255, 50); // White with transparency
  strokeWeight(0.2);
  noFill();
  let offset = 0;

  // Repeat for every ripple
  for(let i = 0; i < numRipples; i ++) {
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
function fireflies() {
  // Method borrowed from The Coding Train: https://www.youtube.com/watch?v=XATr_jdh-44

  // Start new state
  push();

  // Run glow function
  glow(5, [255, 255, 0]);

  // Declare variables
  noStroke();
  fill(200, 255, 0); // Yellow
  let overlap = false; // Set boolean to false
  let max = 0;
  
  // Declare array
  let fireflies = [];

  // Populate fireflies array with objects
  // Repeat until there are 15 fireflies
  while(fireflies.length < 15) {
    // Declare object
    let firefly = {
      x: random(20, 180),
      y: random(20, 180),
      d: 5
    };

    // Repeat for all objects in the fireflies array
    for(let i = 0; i < fireflies.length; i ++) {
      // Declare variables
      let newFirefly = fireflies[i];
      let distance = dist(firefly.x, firefly.y, newFirefly.x, newFirefly.y);

      // If fireflies are overlapping
      if(distance < (firefly.d / 2) + (newFirefly.d / 2)) {
        overlap = true; // Set boolean to true
        break; // Break out of for loop
      }
    }

    // If overlap is false
    if(!overlap) {
      // Add object to fireflies array
      fireflies.push(firefly);
    }

    // Increment max variable
    max ++;

    // If 10,000 attempts have been made
    if(max > 10000) {
      // Break out of while loop
      break;
    }
  }

  // Draw fireflies
  // Repeat for every object in the fireflies array
  for(let i = 0; i < fireflies.length; i ++) {
    ellipse(fireflies[i].x, fireflies[i].y, fireflies[i].d);
  }

  // Restore previous state
  pop();
}