var bBall;
var hoops = [];
var start =false;
var location_interval;
var isDown = false;
var start_location;
var end_location;
var score=0;


function preload() {
    ball = loadImage( 'assets/images/ball.png');
    hoop = loadImage( 'assets/images/hoop.png');
    side_rim = loadImage( 'assets/images/side_rim.png');
    front_rim = loadImage( 'assets/images/front_rim.png');
}

function setup() {
    createCanvas(400, 600);
    frameRate(60);
    hoops.push(new Hoop());
    bBall = new Ball();
    noLoop();
}

function draw() {
  background(0);
  for (var i = hoops.length-1; i >= 0; i--) {
    hoops[i].update();
    hoops[i].show();

    if (hoops[i].hits(bBall)) {
      console.log("HIT");
      score++;
      textSize(60);
        fill(255, 255, 35);
        text(score, width-100,height - 60);
    }
    if (hoops[i].offscreen()) {
      hoops.splice(i, 1);
    }
  }
  bBall.update();
  bBall.show();

  if (frameCount % 100 == 0) {
    hoops.push(new Hoop());
  }

  socket.on('gameOver',function(data){  // call gameOver function
      ctx.clearRect(0,0,500,500);     // once the countdown timer has ended
      gameOver();
    });

}



function keyPressed() {
  if (key === ' ' ) {
      if (start === false) {
          start = true;
          loop();
      }
      bBall.up();
  }
}

function gameOver(){
  noLoop(); // stop game loop, time up
 setTimeout(() => {
   // redirect user to scores page
   window.location.replace("http://localhost:3000/leaderboard.html");
 }, 2000);
}
