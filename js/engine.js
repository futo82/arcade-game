var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 705;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if (checkCollision(enemy)) {
                allLives.pop();
                player.reset();
            }
        });
        allGems.forEach(function(gem) {
            if (checkCollision(gem)) {
                collectedItems.push(new Score(collectedItems.length));
                gem.reset();
            }
        });
    }

    function checkCollision(object) {
        if (player.x >= (object.x - 50) && player.x <= (object.x + 50) &&
            player.y >= (object.y - 20) && player.y <= (object.y + 20)) {
            return true;    
        }
        return false;
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 7,
            row, col;

        // Clear the canvas for redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the background image
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        allLives.forEach(function(life) {
            life.render();
        });
        allGems.forEach(function(gem) {
            gem.render();
        });
        collectedItems.forEach(function(item) {
            item.render();
        });
        player.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-princess-girl.png',
        'images/char-pink-girl.png', 
        'images/char-horn-girl.png', 
        'images/char-cat-girl.png',
        'images/Heart.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
