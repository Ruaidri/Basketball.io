function Ball() {
  this.w = 64;
  this.h = 64;
  this.y = height/2;
  this.x = width/3;

  this.gravity = 1.5;
  this.lift = -45;
  this.velocity = 0;

  this.show = function() {
     image(ball, this.x, this.y);
  }

  this.up = function() {
    this.velocity += this.lift;
    this.velocity = constrain(this.velocity, this.lift, 0);
  }

  this.update = function(){
    if(start != true){
      this.velocity =0;
      this.gravity =0;
    }
    else{
      this.gravity = 0.6;
    }

    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;



    if (this.y > height-300) {
      start = false;
      this.y = height/2;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
