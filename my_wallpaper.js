//Parametric Variables
let rect_width  = 20;
let rect_height = 20;

//Set Up Wallpaper
function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); //Set to false when ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 50;
}

//Wallpaper Background
function wallpaper_background() {
  background(240, 255, 240); //Light honeydew green colour
}

//Draw Symbol
function my_symbol() { //Do not rename function
  rect(40 ,40, rect_width, rect_height);
}