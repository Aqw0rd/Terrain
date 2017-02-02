function Terrain(chunk){
  this.chunk = chunk;
  this.terrain = [];
  this.elevation = [];
  this.yoff = 0;

  //Creating a 2D array
  for(this.a = 0; this.a< this.chunk; this.a++){
    this.terrain[this.a] = [];
    this.elevation[this.a] = [];
  }
    
  /**
   * Using Perlin noise to generate random numbers
   * from 0-1, then mapping that value between 0-3 or 0-5
   * and finally rounding it to an integer
   */
  for(this.i = 0; this.i < this.chunk; this.i++){
    this.xoff=0;
    for(this.j = 0; this.j < this.chunk; this.j++){
      this.terrain[this.i][this.j]  = Math.floor(map(noise(this.xoff,this.yoff),0,1,0,3));
      this.elevation[this.i][this.j]  = Math.floor(map(noise(this.xoff,this.yoff-0.02),0,1,0,5));
      this.xoff += 0.05;
    }
    this.yoff +=0.05;
  }

  //Creating an array of objects
  for(this.x = 0; this.x < this.chunk; this.x++){
    for(this.y = 0; this.y < this.chunk; this.y++){

      //The properties will be true/false except type and elevation
      this.terrain[this.x][this.y] = {
          type:       this.terrain[this.x][this.y],
          up :        this.x === 0                    ||  (this.terrain[this.x][this.y] === this.terrain[this.x-1][this.y].type),
          down:       this.x === this.chunk-1         ||  (this.terrain[this.x][this.y] === this.terrain[this.x+1][this.y]),
          left:       this.y === 0                    ||  (this.terrain[this.x][this.y] === this.terrain[this.x][this.y-1].type),
          right:      this.y === this.chunk-1         ||  (this.terrain[this.x][this.y] === this.terrain[this.x][this.y+1]),
          elevation:  this.elevation[this.x][this.y],
          wall:       this.x !== this.chunk-1         &&  (this.elevation[this.x][this.y] > this.elevation[this.x+1][this.y]),
          lCorner:    this.y !== 0                    &&  (this.elevation[this.x][this.y] > this.elevation[this.x][this.y-1]) && this.terrain[this.x][this.y].wall,
          rCorner:    this.y !== this.chunk-1         &&  (this.elevation[this.x][this.y] > this.elevation[this.x][this.y+1]) && this.terrain[this.x][this.y].wall,
          lEdge:      this.y !== 0                    &&  (this.elevation[this.x][this.y] > this.elevation[this.x][this.y-1]) && !(this.terrain[this.x][this.y].wall),
          rEdge:      this.y !== this.chunk-1         &&  (this.elevation[this.x][this.y] > this.elevation[this.x][this.y+1]) && !(this.terrain[this.x][this.y].wall),
          end:        this.x !== 0                    &&  (this.elevation[this.x][this.y] > this.elevation[this.x-1][this.y]) && !(this.terrain[this.x][this.y].wall)              
      };

      //Here we convert true or false statements to "binary", 1,10,100,1000
      if(this.terrain[this.x][this.y].up) this.terrain[this.x][this.y].up = 1;
      else this.terrain[this.x][this.y].up = 0;

      if(this.terrain[this.x][this.y].down) this.terrain[this.x][this.y].down = 10;
      else this.terrain[this.x][this.y].down = 0;

      if(this.terrain[this.x][this.y].left) this.terrain[this.x][this.y].left = 100;
      else this.terrain[this.x][this.y].left = 0;

      if(this.terrain[this.x][this.y].right) this.terrain[this.x][this.y].right = 1000;
      else this.terrain[this.x][this.y].right = 0;

      //The same, for elevation
      if(this.terrain[this.x][this.y].wall) this.terrain[this.x][this.y].wall = 100000;
      else this.terrain[this.x][this.y].wall= 0;

      if(this.terrain[this.x][this.y].lCorner) this.terrain[this.x][this.y].lCorner = 10000;
      else this.terrain[this.x][this.y].lCorner = 0;

      if(this.terrain[this.x][this.y].rCorner) this.terrain[this.x][this.y].rCorner = 1000;
      else this.terrain[this.x][this.y].rCorner = 0;

      if(this.terrain[this.x][this.y].lEdge) this.terrain[this.x][this.y].lEdge = 100;
      else this.terrain[this.x][this.y].lEdge = 0;

      if(this.terrain[this.x][this.y].rEdge) this.terrain[this.x][this.y].rEdge = 10;
      else this.terrain[this.x][this.y].rEdge = 0;

      if(this.terrain[this.x][this.y].end) this.terrain[this.x][this.y].end = 1;
      else this.terrain[this.x][this.y].end = 0;
    }
  }
  //saveStrings(this.elevation,"elevation.txt");
  return this.terrain;
}