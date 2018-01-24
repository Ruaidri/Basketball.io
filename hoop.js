function Hoop() {
  this.top = height/2;
  this.bottom = height/2;
  this.x = width;
  this.w = 150;
  this.speed = 2;
  this.highlight = false;


  this.hits = function(bBall) {
    if (bBall.y < 170) {
      if (bBall.x > this.x && bBall.x < this.x + 50) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
       // Top pipe
       image(hoop, this.x, 50, this.w, this.topHeight-34);
       image(side_rim, this.x, this.topHeight-34);
       image(front_rim, this.x+50, 170, 40, this.topHeight-34);
     }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
        return (this.x < -this.w);
    }
}
