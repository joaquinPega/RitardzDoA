var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap('map', 'assets/TestPath.json', null, Phaser.Tilemap.TILED_JSON);
  //, null, Phaser.Tilemap.CSV);
  game.load.image('test', 'assets/PathAndObjects.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var map;
var layerFloor;
var layerWater;
var layerObjects;
var layerWalls;

var cursors;
var sprite;

function create() {

  //game.stage.backgroundColor = '#000000';
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');

  map.addTilesetImage('TileSet','test');
  //  Creates a layer from the World1 layer in the map data.
  //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
  //  Create our layer
  layerFloor = map.createLayer('floor');
    //  Resize the world
  layerFloor.resizeWorld();

  layerWater = map.createLayer('water');
    //  Resize the world
  layerWater.resizeWorld();

  layerObjects = map.createLayer('objects');
    //  Resize the world
  layerObjects.resizeWorld();

  layerWalls = map.createLayer('walls');
    //  Resize the world
  layerWalls.resizeWorld();

  // The player and its settings
  sprite = game.add.sprite(32, game.world.height - 150, 'dude');

  game.physics.enable(sprite);

  game.camera.follow(sprite);
  //  Our two animations, walking left and right.
  sprite.animations.add('left', [0, 1, 2, 3], 10, true);
  sprite.animations.add('right', [5, 6, 7, 8], 10, true);
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  //game.physics.arcade.collide(sprite, layerFloor);
  sprite.body.velocity.x = 0;
  sprite.body.velocity.y = 0;
  sprite.body.angularVelocity = 0;
  if (cursors.left.isDown)
  {
      //  Move to the left
      sprite.body.velocity.x = -150;

      sprite.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
    //  Move to the right
    sprite.body.velocity.x = 150;

    sprite.animations.play('right');
  }else{
    //  Stand still
    sprite.animations.stop();

    sprite.frame = 4;
  }
  if (cursors.up.isDown)
  {
      sprite.body.velocity.y = -350;
  }else if (cursors.down.isDown) {
    sprite.body.velocity.y = 350;
  }
}
