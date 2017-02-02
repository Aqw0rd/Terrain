var level;
var img = {};
var grass;
var tiles = [];
var colors = [];
var saved = false;
var terrain = [];

function preload() {
  tiles = new Terrain(30);
  
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
  for(var i = 1; i<=100000; i*=10){
    img[i.toString() + "EL"] = { 
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

        
      var sum2 = tiles[i][j].wall + tiles[i][j].lCorner + tiles[i][j].rCorner + tiles[i][j].lEdge + tiles[i][j].rEdge + tiles[i][j].end;
      sum2 = sum2.toString();
      //Loading of Elevation images
      //TODO : Use better tiles
      for(var a = sum2.length-1; a >= 0; a--){
        var bin = parseInt(sum2[sum2.length-1-a])
        bin =  bin * Math.pow(10,a);
        bin = bin.toString() + "EL";;
        if(sum2[sum2.length-1-a] !== "0"){
          image(img[bin].el,j*16,i*16);
        }
      }
    }
  }
}