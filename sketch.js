const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var fruit, rope;
var fruit_com;
var backgroundImage;
var fruitImage;
var cutButton;
var bunny;
var bunnyImage;
var blink;
var sad;
var eat;
var bk_song;
var sadSound;
var cutSound;
var eatSound;
var airSound;


function preload() {

  backgroundImage = loadImage("background.png")
  fruitImage = loadImage("melon.png")
  bunnyImage = loadImage("Rabbit-01.png")

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")


  bk_song = loadSound("sound1.mp3")
  sadSound = loadSound("sad.wav")
  airSound = loadSound("air.wav")
  eatSound = loadSound("eating_sound.mp3")
  cutSound = loadSound("rope_cut.mp3")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(600, 700);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;




  ground = new Ground(300, 690, 600, 20);
  rope = new Rope(7, {
    x: 220,
    y: 30
  })
  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_com = new Link(rope, fruit);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(300, 600, 30, 30);
  bunny.scale = 0.25;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('crying', sad);
  bunny.addAnimation('eating', eat);

  cutButton = createImg("cut_button.png")
  cutButton.position(200, 30)
  cutButton.size(50, 50)
  cutButton.mouseClicked(drop)

  blower = createImg('balloon.png');
  blower.position(10, 250);
  blower.size(150, 100)
  blower.mouseClicked(airBlow)

  muteButton = createImg('mute.png')
  muteButton.position(450, 20)
  muteButton.size(50, 50)
  muteButton.mouseClicked(mute);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)


}

function draw() {
  background(51);
  image(backgroundImage, 0, 0, width, height);

  if (fruit != null) {
    image(fruitImage, fruit.position.x, fruit.position.y, 70, 70)

  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating');
    eatSound.play();
  }

  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sadSound.play();
    fruit = null;
  }


  drawSprites();
}

function drop() {
  rope.break()
  fruit_com.detach()
  fruit_com = null
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d <= 80) {
      World.remove(engine.world, fruit)
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}
  function airBlow() {
    Matter.body.applyForce(fruit, {
      x: 0,
      y: 0
    }, {
      x: 0.01,
      y: 0
    });
    air.play();
  }

  function mute() {
    if (bk_song.isPlaying()) {
      bk_song.stop()
    } else {
      bk_song.play()
    }
  }