var sword,swordimage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fruitsGroup,monstersGroup;
var score;
var fruit1, fruit2, fruit3, fruit4;
var monster1,monster2;
var sword_collided;
var swordsound;
var endsound;

function preload(){
  swordimage =loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  monster1=loadImage("alien1.png");
  monster2=loadImage("alien2.png");
  
  sword_collided=loadImage("gameover.png");
  swordsound=loadSound("knifeSwooshSound.mp3");
  
  endsound=loadSound("gameover.mp3");
}
function setup() {
  createCanvas(400,400);
  sword = createSprite(200,200,20,50);
  sword.addImage("sword",swordimage);
  sword.scale = 0.7;
  sword.addImage("collide",sword_collided);
  
  fruitsGroup = createGroup();
  monstersGroup = createGroup();
  
  score=0;
}
function draw(){
  background("lightblue");
  textSize(20);
  fill("black");
  text("Score: "+ score,300,30);
  
  sword.addImage("sword",swordimage);
  if(gameState===PLAY){
  sword.y = World.mouseY;
  sword.x = World.mouseX;
  }
  if(fruitsGroup.isTouching(sword)){
    swordsound.play();
    fruitsGroup.destroyEach();
    score=score +2;
    }
  if(monstersGroup.isTouching(sword)){
    endsound.play();
    fruitsGroup.destroyEach();
    monstersGroup.destroyEach();
    sword.changeImage("collide",sword_collided);
    sword.x=200;
    sword.y=200;
    score=0;
    gameState=END;
    }
  if(gameState===END){
    fruitsGroup.setVelocityXEach(0);
    monstersGroup.setVelocityXEach(0);
  }
  
  fruits();
  monsters();
  
  
 drawSprites();
}
function fruits(){
  if (frameCount % 40 === 0){
   var fruit = createSprite(450,Math.round(random(0,400)),10,40);
   fruit.velocityX = -(6+(score/4));
  
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              fruit.scale = 0.2;
              break;
      case 2: fruit.addImage(fruit2);
              fruit.scale = 0.2;
              break;
      case 3: fruit.addImage(fruit3);
              fruit.scale = 0.2;
              break;
      case 4: fruit.addImage(fruit4);
              fruit.scale = 0.2;
              break;
      
      default: break;
      
      
    }
  fruit.lifetime = 67;
  fruitsGroup.add(fruit);
  position=Math.round(random(1,2));
    
  if(position==1){
    fruit.x=450;
    fruit.velocityX=-(7+(score/4));
  }
  else{
    if(position==2){
    fruit.x=-50;
    fruit.velocityX=(7+(score/4));
  }
    
  }
  }
}
function monsters(){
if (frameCount % 80 === 0){
   var monster = createSprite(450,Math.round(random(0,400)),10,40);
   monster.velocityX = -(6+(score/10));
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: monster.addImage(monster1);
              monster.scale = 1;
              break;
      case 2: monster.addImage(monster2);
              monster.scale = 1;
              break;
      
      
      default: break;
      
      
    }
  monster.lifetime = 67;
  monstersGroup.add(monster);
  }
  
  
}