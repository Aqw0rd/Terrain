function Terrain(chunk){
  this.chunk = chunk;
  this.terrain = [];
  this.string = "";
  this.yoff = 0;

  for(this.a = 0; this.a< this.chunk; this.a++)
    this.terrain[this.a] = [];

  for(this.i = 0; this.i < this.chunk; this.i++){
    this.xoff=0;
    for(this.j = 0; this.j < this.chunk; this.j++){
      this.string += Math.floor(map(noise(this.xoff,this.yoff),0,1,0,3)) + ",";
      this.xoff += 0.05;
    }
    this.terrain[this.i] = this.string;
    this.string = "";
    this.yoff +=0.05;
  }

  return this.terrain;
}