var PLAY=1;
var END=0;
var gameState=PLAY;
var player;
var ground;
var backgroundTop, backgroundBottom, backgroundLeft, backgroundRight, backgroundCenter;
var pm, pb, pl, pr, pt;
var playerImg;
var mob, mobGroup, mobImage;

function preload(){
  //player_running = loadAnimation("player1.png","player3.png","player4.png");
  //player_collided = loadImage("player_collided.png");
  backgroundBottom = loadImage("background_bottom.png");
backgroundTop = loadImage("background_top.png");
backgroundLeft = loadImage("background_left.png");
backgroundRight = loadImage("background_right.png");
backgroundCenter = loadImage("background_central.png");
  playerImg=loadImage("player.png")

  mobImage=loadImage("mob.png");
}

function setup() {
  createCanvas(400, 400);
  
  //create a player sprite
  player = createSprite(50,180,20,50);
  player.addImage(playerImg);
  
  //adding scale and position to player
  player.scale = 0.03;
  player.x = 200
  
  //Adding room1
  pm = createSprite(100, 50, 300, 300);
  pm.addImage("bc",backgroundCenter);
  pm.scale = 0.5;

  // create mob
  mobsGroup=createGroup();

  //create ground sprite
  ground = createSprite(200,180,400,20);
  
}

function draw() {
  background(220);
  
  if (gameState===PLAY){
    //jumping the player on space key press
  if(keyDown("UP_ARROW")) {
    player.y += -10;
  }
  if(keyDown("RIGHT_ARROW")) {
    player.x += +10;
  }
  if(keyDown("LEFT_ARROW")) {
    player.x += -10;
  }
  if(keyDown("DOWN_ARROW")) {
    player.y += 10;
  }
  spawnMobs();

  if(mobsGroup.isTouching(player)){
    gameState=END;
  }
  else if(gameState=== END){
    mobsGroup.setVelocityXEach(0);
    mobsGroup.setVelocityYEach(0);
  }
  
  }
  
  
  
  
 
 //stop player from falling down 
  player.collide(ground);
  drawSprites();
}

function spawnMobs() {
  //condition to spawn mobs
   if (frameCount % 60 === 0) {
    mob = createSprite(600,100,40,10);
   mob.y = Math.round(random(10,60));
   mob.addImage(mobImage);
   mob.scale = 0.02;
   mob.velocityX = -3;
    
     //assign lifetime to the variable
   mob.lifetime = 134;
    
    //adjust the depth
   mob.depth = player.depth;
    player.depth = player.depth + 1;
    
    //addingmob to the group
  mobsGroup.add(mob);
    }
}