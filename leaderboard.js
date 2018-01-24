function setup() {
    createCanvas(400, 600);
    frameRate(60);
    noLoop();
}

function draw() {
  background(0);
      textSize(60);
        fill(255, 255, 35);
        text("Top Scores", 50,60);
        socket.on('gameOver',function(data){
            text('Player ' +data[i].number+ ' score: ' +data[i].score, 100,data[i].yPos)
          });
}
