var x = 150;

var y = 150;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var ctx,ctx1;
var c,c1;
var paddlex;
var paddleh;
var paddlew;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var ballr = 10;
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var paddlecolor = "red";
var ballcolor = "#FFFFFF";
var backcolor = "#000000";
var intervalValid,ival;
var score=0;
var fnt=10;
var audioElement = document.createElement('audio');


function PlayAudio(filename)
{
    audioElement.setAttribute('src', filename);
	audioElement.load();
	audioElement.play();

}

/*function PauseAudio()
{
	audioElement.pause();
}*/




function initbricks() {
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;

  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

function init_paddle() {
  paddlex = WIDTH / 3;
  paddleh = 12;
  paddlew = 90;
}

function init() {
 c=document.getElementById("mycanvas");
 ctx=c.getContext("2d");
  WIDTH = ctx.canvas.width;
  HEIGHT = ctx.canvas.height;
  set_draw();
  }

 function set_draw()
 {
  intervalValid = setInterval(draw, 13);
 
  return intervalValid;
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle="red";
  ctx.fill();
}

function rect(x,y,w,h,clr) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fillStyle= clr ;
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

function nscore()
{
 ctx.font = '20pt Arial';
 ctx.fillStyle="blue";
 if(score==2500)
{
clearInterval(intervalValid);
clear();	  
ctx.fillText('You Win!', WIDTH/4+9, HEIGHT/2);
PlayAudio('win.ogg');
score=0;
}
else
ctx.fillText('Score:'+score, WIDTH/4+4, HEIGHT/2);
  }
  
 function draw_bricks()
 {
 for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT,rowcolors[i]);
      }
    }
  }
  }
  
  function draw() {
    clear();
	rect(0,0,WIDTH,HEIGHT,"#7FFFFF");
   circle(x, y, ballr);
  
  if (rightDown && paddlex+paddlew<300) paddlex += 5;
  else if (leftDown && paddlex-2>0) paddlex -= 5;
   
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh,"black");
  
  draw_bricks();
  
  nscore();
   //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
     PlayAudio('brickhit.ogg');
    dy = -dy;
    bricks[row][col] = 0;
	score=score+100;
	
  }
 
  
   
	
  if (x + dx+ ballr > WIDTH || x + dx < 0)
  {
    dx = -dx;
	PlayAudio('ballhit.ogg');
	}
  if ( y + dy + ballr < 0)
  {
    dy = -dy;
	PlayAudio('ballhit.ogg');
	}
	else if (y + dy + ballr > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
	{
	dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
      dy = -dy;
	  }
    else
	{
	  clearInterval(intervalValid);
      clear();	  
	   over();
	  }
     }
  x += dx;
  y += dy;
   


}

function over()
{
 PlayAudio('gameover.ogg');
 ival = setInterval(gmovr, 70);
}
function gmovr()
{
if(fnt<=30)
{
ctx.font = fnt+ 'pt Arial';
ctx.fillStyle="black";
 ctx.fillText('GAME OVER!', 10, 170);
 fnt+=5;
 

 }
else
{
clearInterval(ival);
 x = 150;
 y = 150;
 dx = 2;
 dy = 4;
 score=0;
 fnt=10;
 NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;

}
}

function game()
{

  
rightDown = false;
leftDown = false;

//set rightDown or leftDown if the right or left keys are down
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

init();
init_paddle();
initbricks();
}

function restart()
{
 x = 150;
 y = 150;
 dx = 2;
 dy = 4;
 score=0;
 fnt=10;
 clearInterval(intervalValid);
 set_draw();
init_paddle();
initbricks();
}




