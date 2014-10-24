// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    if (this.x >= enemyMaxTileWidth) {
        this.init();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Initialize the enemy object
Enemy.prototype.init = function() {
    this.x = -100;
    this.y = 63 + (Math.floor(Math.random() * 3) * enemyYTileDelta); // 63, 146, 229
    this.speed = allSpeeds[Math.floor(Math.random() * allSpeeds.length)];
}

// Player that tries to avoid all enemies and road the road
var Player = function() {
    this.sprite = allSprites[Math.floor(Math.random() * allSprites.length)];
    this.init();
}

// Update the player's position based on the key pressed 
// by the player
Player.prototype.update = function() {
    if (this.x > originX && this.keyPressed === 'left') {
        this.x -= playerXTileDelta;
    }
    if (this.x < playerMaxTileWidth && this.keyPressed === 'right') {
        this.x += playerXTileDelta;
    }
    if (this.y > originY && this.keyPressed === 'up') {
        this.y -= playerYTileDelta;
    }
    if (this.y < playerMaxTileHeight && this.keyPressed === 'down') {
        this.y += playerYTileDelta;
    }
    if (this.y < 40) {
        this.init();
    }
    this.keyPressed = null;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Store the key pressed by the player
Player.prototype.handleInput = function(keyPressed) {
   this.keyPressed = keyPressed;
}

// Initialize the player object
Player.prototype.init = function() {
    this.x = Math.floor(numCols / 2) * playerXTileDelta;
    this.y = -20 + ((numRows - 1) * playerYTileDelta);
    this.keyPressed = null;
}

// Reset the player back to its original position
Player.prototype.reset = function() {
    this.init();
}

// Stores a list of character sprites, used to select
// select the player image at the start of the game
var allSprites = [
    'images/char-boy.png', 
    'images/char-princess-girl.png',
    'images/char-pink-girl.png', 
    'images/char-horn-girl.png', 
    'images/char-cat-girl.png'
];

// The number of rows and columns
var numRows = 6;
var numCols = 5;
// Origin of the display
var originX = 0, originY = 0;
// Delta used to move the player from one tile to the next
var playerXTileDelta = 101, playerYTileDelta = 80;
// Last x tile position the player can occupy
var playerMaxTileWidth = ((numCols - 1) * playerXTileDelta);
// Last y tile position the player can occupy
var playerMaxTileHeight = -20 + ((numRows - 1) * playerYTileDelta);
// A list of enemy speed
var allSpeeds = [100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350];
// Delta used to move the enemy from one tile to the next
var enemyYTileDelta = 83, enemyXTileDelta = 101;
// Last x position in which the enemy is totally off the game board
var enemyMaxTileWidth = numCols * enemyXTileDelta;

// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy()
];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
