var player, playerImg
var burger, burgerImg
var background, backgroundImg
var gameover, gameoverImg
var paddlegroup, burgergroup
var HungerLevel
var muteButton, muteButtonImg

function preload(){
  playerImg = loadImage("PrisonInmate.png")
  burgerImg = loadImage("Burger.png")
  backgroundImg = loadImage("Stone.avif")
  backgroundMusic = loadSound("ScaryMusic.mp3")
  muteButtonImg = loadImage("muteButton.webp")
}

function setup(){
  createCanvas(400,600);
  backgroundMusic.loop();
  backgroundImg.velocityY = 1;

  //background = createSprite(400,600);
  //background.addImage("background", backgroundImg);
  //background.scale = 2.9;

  player = createSprite(190,560)
  player.addImage("PrisonInmate", playerImg);
  player.scale = 0.08;

  invisibleGround = createSprite(200,580,600,2)

  paddlegroup = new Group()
  burgergroup = new Group()

  mute_btn = createImg("muteButton.webp");
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);



}

function draw(){
  background(backgroundImg)
  spawnPaddle()
  spawnBurger()
  drawSprites()

  if(keyDown("right")){
    player.x = player.x + 2
  }

  if(keyDown("left")){
    player.x = player.x - 2
  }

  if(keyDown("space")){
    player.velocityY = - 3
  }
  player.velocityY += 0.8;

  player.collide(invisibleGround)
  //player.collide(paddle1)
  
  if(player.isTouching(paddlegroup)){
    player.velocityY = 0;
  }

  image(burgerImg, width / 2 - 130, height - player.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 350, player.fuel, 20);

  if(player.isTouching(burgergroup)){
    burgergroup.destroyEach()
  }
}

function spawnPaddle(){
  if(frameCount%100==0){
    paddle1 = createSprite(random(50,350),0,100,5)
    paddle1.shapeColor = "white"
    paddle1.velocityY = 2;

    paddle1.lifetime = 300;
    paddlegroup.add(paddle1)
  }
}

function spawnBurger(){
  if(frameCount%180==0){
    burger = createSprite(random(50,350),0,100,5)
    burger.addImage(burgerImg)
    burger.velocityY = 1;
    burger.scale= 0.05

    burger.lifetime = 600;
    burgergroup.add(burger)
  }
}

function mute(){
  if(BackgroundMusic.isPlaying()){
    BackgroundMusic.stop()
  }
  else{
 BackgroundMusic.play()
  }
}
