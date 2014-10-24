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

Enemy.prototype.init = function() {
    this.x = -100;
    this.y = 63 + (Math.floor(Math.random() * 3) * enemyYTileDelta); // 63, 146, 229
    this.speed = allSpeeds[Math.floor(Math.random() * allSpeeds.length)];
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = allSprites[Math.floor(Math.random() * allSprites.length)];
    this.init();
}

Player.prototype.update = function() {
    if (this.x > OriginX && this.keyPressed === 'left') {
        this.x -= playerXTileDelta;
    }
    if (this.x < playerMaxTileWidth && this.keyPressed === 'right') {
        this.x += playerXTileDelta;
    }
    if (this.y > OriginY && this.keyPressed === 'up') {
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

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPressed) {
   this.keyPressed = keyPressed;
}

Player.prototype.init = function() {
    this.x = Math.floor(numCols / 2) * playerXTileDelta;
    this.y = -20 + ((numRows - 1) * playerYTileDelta);
    this.keyPressed = null;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allSprites = [
    'images/char-boy.png', 
    'images/char-princess-girl.png',
    'images/char-pink-girl.png', 
    'images/char-horn-girl.png', 
    'images/char-cat-girl.png'
];

var numRows = 6;
var numCols = 5;
var OriginX = 0, OriginY = 0;
var playerXTileDelta = 101, playerYTileDelta = 80;
var playerMaxTileWidth = ((numCols - 1) * playerXTileDelta);
var playerMaxTileHeight = -20 + ((numRows - 1) * playerYTileDelta);

var allSpeeds = [100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350];
var enemyYTileDelta = 83, enemyXTileDelta = 101;
var enemyMaxTileWidth = numCols * enemyXTileDelta;

var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy()
];

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
