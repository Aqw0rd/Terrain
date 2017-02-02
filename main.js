var level;
var img = {};
var grass;
var tiles = [];
var colors = [];
var saved = false;
var terrain = [];

function preload() {
  tiles = new Terrain(100);
  
  grass = loadImage("pic/0.png");

  //Binary converter and image loader
  for(var i = 0; i < 16; i++){
    var bin = "";
    if(i===0) bin = "0";
    else{
      var dec = i;
      while(dec > 0){
        bin = dec % 2 + bin;
        dec = (dec-(dec % 2))/2;
      }
    }
    img[bin]={
      dirt:  loadImage("pic/dirt/1_" + bin + ".png"),
      water: loadImage("pic/water/2_" + bin + ".png")
    };
  }
  
}

function setup() {
  createCanvas(1600,1600);
  
  print(tiles);
  
  frameRate(30);
}

function draw() {
 updateTiles();
  /*if(!saved){
    saveCanvas('myCanvas', 'png');
    saved = true;
  }*/  
}

function updateTiles(){
  for(var i in tiles){
    for(var j in tiles){
      var sum = tiles[i][j].up + tiles[i][j].down + tiles[i][j].left + tiles[i][j].right;
      
      if(tiles[i][j].type===1)
        image(grass,j*16,i*16);
        
      else if(tiles[i][j].type===0)
        image(img[sum.toString()].dirt,j*16,i*16);

      else if(tiles[i][j].type===2)
        image(img[sum.toString()].water,j*16,i*16);
      
    }
  }
}
