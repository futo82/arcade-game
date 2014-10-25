// Enemies our player must avoid
var Enemy = function() {
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

// Update the player's position based on the key pressed by the player.
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
// Parameter: keyPressed, one of the arrow keys pressed by the player
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

// A life of the player
// Parameter: x, the x position to render the image
// Parameter: y, the y position to render the image
var Life = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
}

// Draw the player's life on the screen, required method for game
Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// A gem for the player to collect
var Gem = function() {
    this.allRows = [1, 2, 3];
    this.init();
}

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Initialize the gem object
Gem.prototype.init = function() {
    this.sprite = allCollectibles[Math.floor(Math.random() * allCollectibles.length)];
    this.x = Math.floor(Math.random() * numCols) * gemXTileDelta;
    this.y = -20 + (this.allRows[Math.floor(Math.random() * this.allRows.length)] * gemYTileDelta);
}

// Reset the gem so its placed at a different location
Gem.prototype.reset = function() {
    this.init();
}

// A score for the player
// Parameter: num, the score number (1, 2, 3, 4, ...)
var Score = function(num) {
    this.sprite = 'images/Star.png';
    this.x = scoreXStartPos - ((num - 1) * scoreXTileDelta);
    this.y = 0;
}

// Draw the score on the screen, required method for game
Score.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// A list available player character images
var allSprites = [
    'images/char-boy.png', 
    'images/char-princess-girl.png',
    'images/char-pink-girl.png', 
    'images/char-horn-girl.png', 
    'images/char-cat-girl.png'
];

// A list of collectible gem images
var allCollectibles = [
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png'
];

// The number of rows and columns
var numRows = 6, numCols = 7;
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
var enemyXTileDelta = 101, enemyYTileDelta = 83;
// Last x position in which the enemy is totally off the canvas
var enemyMaxTileWidth = numCols * enemyXTileDelta
// Delta used to randomly place the gem on a road tile
var gemXTileDelta = 101, gemYTileDelta = 80;
// The start x position of the first score image
var scoreXStartPos = 680;
// Delta used to place the score image at the next position
var scoreXTileDelta = 30;
// The score the player needs to reach to win
var endGameScore = 5;

// A list of enemy objects
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy()
];

// The player object
var player = new Player();

// A list of gem objects
var allGems = [new Gem()];

// A list of lives object for the player
var allLives = [
    new Life(0, 0),
    new Life(30, 0),
    new Life(60, 0),
    new Life(90, 0),
    new Life(120, 0)];

// The score of the player, represents the number of
// gems the player has collected
var playerScore = [];

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
