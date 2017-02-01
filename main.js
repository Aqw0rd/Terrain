var level;
var img = {};
var grass;
var tiles = [];
var colors = [];
var saved = false;
var terrain;
function preload() {
 terrain = new Terrain(100);

  readLevel(terrain);
  
  grass = loadImage("pic/0.png");
  img["0"]={
    dirt:  loadImage("pic/dirt/1_0000.png"),
    water: loadImage("pic/water/2_0000.png")
  }
  img["1"]={
    dirt:  loadImage("pic/dirt/1_0001.png"),
    water: loadImage("pic/water/2_0001.png")
  }
  img["10"]={
    dirt:  loadImage("pic/dirt/1_0010.png"),
    water: loadImage("pic/water/2_0010.png")
  }
  img["11"]={
    dirt:  loadImage("pic/dirt/1_0011.png"),
    water: loadImage("pic/water/2_0011.png")
  }
  img["100"]={
    dirt:  loadImage("pic/dirt/1_0100.png"),
    water: loadImage("pic/water/2_0100.png")
  }
  img["101"]={
    dirt:  loadImage("pic/dirt/1_0101.png"),
    water: loadImage("pic/water/2_0101.png")
  }
  img["110"]={
    dirt:  loadImage("pic/dirt/1_0110.png"),
    water: loadImage("pic/water/2_0110.png")
  }
  img["111"]={
    dirt:  loadImage("pic/dirt/1_0111.png"),
    water: loadImage("pic/water/2_0111.png")
  }
  img["1000"]={
    dirt:  loadImage("pic/dirt/1_1000.png"),
    water: loadImage("pic/water/2_1000.png")
  }
  img["1001"]={
    dirt:  loadImage("pic/dirt/1_1001.png"),
    water: loadImage("pic/water/2_1001.png")
  }
  img["1010"]={
    dirt:  loadImage("pic/dirt/1_1010.png"),
    water: loadImage("pic/water/2_1010.png")
  }
  img["1011"]={
    dirt:  loadImage("pic/dirt/1_1011.png"),
    water: loadImage("pic/water/2_1011.png")
  }
  img["1100"]={
    dirt:  loadImage("pic/dirt/1_1100.png"),
    water: loadImage("pic/water/2_1100.png")
  }
  img["1101"]={
    dirt:  loadImage("pic/dirt/1_1101.png"),
    water: loadImage("pic/water/2_1101.png")
  }
  img["1110"]={
    dirt:  loadImage("pic/dirt/1_1110.png"),
    water: loadImage("pic/water/2_1110.png")
  }
  img["1111"]={
    dirt:  loadImage("pic/dirt/1_1111.png"),
    water: loadImage("pic/water/2_1111.png")
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

function generateMatrix(){
  var h = terrain.length;
  var w = h;
  
  for(var a = 0; a< h; a++)
    tiles[a] = [];
    
  temp = 0;
  for(var i in terrain){
    var row = terrain[i];
    var temp = 0;
    var num = 0;
    var ar = [];
    for(var j in row){
      
      if(row[j]!=','){
        num = 0;
        ar.push(parseInt(row[j]));
        for(var b in ar)
          num += ar[b]*(Math.pow(10,ar.length-1-b));
      }
      else{
        temp++;
        tiles[i][j-temp-(ar.length-1)] = num;
        temp+=ar.length-1;
        ar = [];
      }
    }
    temp=0;
    
  }
}

function readLevel(level){
  generateMatrix();
  for(var i = 0; i < level.length;i++){
    for (var j = 0; j < level.length;j++){
      tiles[i][j] = {
          type: tiles[i][j],
          up : i!==0 && tiles[i][j]===tiles[i-1][j].type,
          down: i!==level.length-1 && tiles[i][j]===tiles[i+1][j],
          left: j!==0 && tiles[i][j]===tiles[i][j-1].type,
          right: j!==level.length-1 && tiles[i][j]===tiles[i][j+1]
        };
      if(tiles[i][j].up) tiles[i][j].up = 1;
      else tiles[i][j].up = 0;
      if(tiles[i][j].down) tiles[i][j].down = 10;
      else tiles[i][j].down = 0;
      if(tiles[i][j].left) tiles[i][j].left = 100;
      else tiles[i][j].left = 0;
      if(tiles[i][j].right) tiles[i][j].right = 1000;
      else tiles[i][j].right = 0;
    }
  }

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
