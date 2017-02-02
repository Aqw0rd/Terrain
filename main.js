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
  //MAKE THIS MORE LOGICAL
  for(var i = 3; i<=18; i+=3){
    var bin = "";
    bin = i;
    img[bin] = { 
      el: loadImage("pic/elevation/EL_" + i + ".png")
    };
  }
  print(img);
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

      /**
       * Not to self:
       * I elevation så kan ikke en blokk være
       * i mer enn én "tilstand". Fiks det
       */
      if(tiles[i][j].wall)
        image(img["3"].el,j*16,i*16);

      if(tiles[i][j].lCorner)
        image(img["6"].el,(j-1)*16,i*16);

      if(tiles[i][j].rCorner)
        image(img["12"].el,(j+1)*16,i*16);
        
      else if(tiles[i][j].lEdge)
        image(img["9"].el,(j-1)*16,i*16);

      else if(tiles[i][j].rEdge){
        image(img["15"].el,(j+1)*16,i*16);
        
      }
      else if(tiles[i][j].end)
        image(img["18"].el,j*16,i*16);
      
    }
  }
}