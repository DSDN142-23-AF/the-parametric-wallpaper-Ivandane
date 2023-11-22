// PARAMETRIC VARIABLES
// Refer to this image for rose patterns: https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg
// For best results, do not set the same value for 'roseN' and 'roseD'
let roseN = 7;
let roseD = 4;
let roseX = 125; // Takes 0 to 200
let roseY = 75; // Takes 0 to 200
let roseRotate = 0; // Takes 0 to 360
let roseRadius = 30;
let roseColorOne = [280, 100, 100]; // H, S, B
let roseColorTwo = [250, 100, 100]; // H, S, B

let pistilRadius = 10;
let pistilColor = [60, 100, 100]; // H, S, B

let leafLeftScale = 1;
let leafRightScale = 1;
let leafLeftRotate = 15;
let leafRightRotate = 15;

// SET UP WALLPAPER FUNCTION
function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); // Set to false when ready to print

  // Grid Settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 50;
}

// WALLPAPER BACKGROUND FUNCTION
function wallpaper_background() {
  colorMode(HSB, 360, 100, 100, 100); // Set colour mode to HSB
  angleMode(DEGREES); // Set angle mode to degrees
  background(255); //White
}

// DRAW SYMBOL FUNCTION
function my_symbol() {
  // DECLARE VARIABLES
  let stemEndX = 100 - roseX;
  let stemEndY = 150 - roseY;
  let stemCurve = -(roseX - 100);

  // Set new (0, 0) co-ordinate
  translate(roseX, roseY);

  // STEM
  // Start new state
  push();
  // Set Parameters
  noFill(); // Set no fill color
  stroke(120, 100, 100); // Set stroke color (green)
  strokeWeight(1.5); // Set stroke thickness
  // Draw Stem
  bezier(0, 0, 0, 0, stemCurve, 0, stemEndX, stemEndY);
  // Restore previous state
  pop();

  // POLAR ROSE
  // Start new state
  push(); 
  // Set Parameters
  rotate(roseRotate); // Set rotation
  radialGradient(0, 0, 0, 0, 0, 45, roseColorOne, roseColorTwo, 25); // Set fill and stroke color
  strokeWeight(0.5); // Set stroke thickness
  // Draw Rose
  beginShape();
  for(let angle = 0; angle <= 360; angle += 0.1) { // Repeat for every angle
    // Declare variables
    // Equations from: https://en.wikipedia.org/wiki/Rose_(mathematics)
    let dAngle = angle * Math.max(roseN, roseD);
    let r = cos((roseN / roseD) * dAngle);
    let dx = (roseRadius * r) * cos(dAngle);
    let dy = (roseRadius * r) * sin(dAngle);
    // Draw points
    vertex(dx, dy);
  }
  endShape();
  
  // PISTIL
  // Set Parameters
  fill(pistilColor); // Set fill color
  stroke(strokeColor(pistilColor, 25)); // Set stroke color
  strokeWeight(1); // Set stroke thickness
  // Draw Pistil
  ellipse(0, 0, pistilRadius);
  // Restore previous state
  pop();

  // LEFT LEAF
  // Set the new (0, 0) co-ordinate
  translate(stemEndX, stemEndY + 0.5);
  // Set Parameters
  fill(120, 100, 100); // Set fill colour (green)
  noStroke(); // Set no stroke
  // Start new state
  push();
  // Set scale
  scale(leafLeftScale);
  // Set rotation
  rotate(leafLeftRotate);
  // Draw Leaf
  beginShape();
  curveVertex(0, 0);
  curveVertex(-10, 2.75);
  curveVertex(-20, 4);
  curveVertex(-30, 2.75);
  curveVertex(-40, 0);
  curveVertex(-30, -2.75);
  curveVertex(-20, -4);
  curveVertex(-10, -2.75);
  endShape(CLOSE);
  // CENTER LINE
  // Set Parameters
  stroke(strokeColor([120, 100, 100], 50)); // Set stroke color
  strokeWeight(0.5); // Set stroke thickness
  // Draw center line
  curve(0, 5, -10, 0, -30, 0, -40, 5);
  // Restore previous state
  pop();

  // RIGHT LEAF
  // Start new state
  push();
  // Set scale
  scale(leafRightScale);
  // Set rotation
  rotate(-leafRightRotate);
  // Draw Leaf
  beginShape();
  curveVertex(0, 0);
  curveVertex(10, -2.75);
  curveVertex(20, -4);
  curveVertex(30, -2.75);
  curveVertex(40, 0);
  curveVertex(30, 2.75);
  curveVertex(20, 4);
  curveVertex(10, 2.75);
  endShape(CLOSE);
  // CENTER LINE
  // Set Parameters
  rotate(180); // Reset rotation
  stroke(strokeColor([120, 100, 100], 50)); // Set stroke color
  strokeWeight(0.5); // Set stroke thickness
  curve(0, -5, -10, 0, -30, 0, -40, -5); // Draw center line
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