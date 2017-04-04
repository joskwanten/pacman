function PacmanRenderer(context) {


    var mouthOpen = 0;
    var mouthOpening = true;
    var lastDirection = "stop";

    var animateElements = function () {
        mouthOpen += mouthOpening ? 1 : -1;

        if (mouthOpen == 7) {
            mouthOpening = false;
        }

        if (mouthOpen == 0) {
            mouthOpening = true;
        }
    }

    if (context != null) {
        context.lineWidth = 1;
    }

    function renderPoints(pacman, tileSize) {
        context.font =  tileSize + "px Arial";
        context.fillStyle = "white";
        context.fillText("1UP", tileSize, tileSize);
        context.fillText(String(pacman.points), tileSize, 2 * tileSize);

        context.fillText("HIGH SCORE", 12 * tileSize, tileSize);
        context.fillText(String(0), 12 * tileSize, 2 * tileSize);

        context.fillText("2UP", 24 * tileSize, tileSize);
        context.fillText(String(pacman.points), 24 * tileSize, 2 * tileSize);
    }

    this.render = function (pacman, tileSize, onlyPacman) {
        if (!onlyPacman) {
            renderPoints(pacman, tileSize);
        }

        var pacmanSize = tileSize * 2;

        this.x = pacman.x - tileSize / 2;
        this.y = pacman.y - tileSize / 2;

        var offset = 0;

        if (pacman.direction == "stop") {
            mouthOpen = 0;
            mouthOpening = true;
        }

        if (pacman.direction !=  "stop") {
            lastDirection = pacman.direction;
        }

        if (pacman.dieing > 0) {
            lastDirection = pacman.dieing == 1 ? "right" : "up";
        }

        if (lastDirection == "up") {
            offset = 1.5;
        }

        if (lastDirection == "left") {
            offset = 1.0;
        }

        if (lastDirection == "down") {
            offset = 0.5;
        }

        ctx.beginPath();
        ctx.moveTo(this.x  + pacmanSize / 2, this.y + pacmanSize /2);

        if (pacman.dieing) {
            ctx.arc(
                this.x + pacmanSize / 2,
                this.y + pacmanSize / 2,
                pacmanSize / 2.25,
                (0.25 - (0.5 * pacman.dieing / 60)) * Math.PI,
                (0.75 + (0.5 * pacman.dieing / 60)) * Math.PI,
                false);
        } else {
            ctx.arc(
                this.x + pacmanSize / 2,
                this.y + pacmanSize / 2,
                pacmanSize / 2.25,
                (offset + (0.25 - 0.25 * mouthOpen / 7)) * Math.PI,
                (offset + (1.75 + 0.25 * (mouthOpen / 7))) * Math.PI,
                false);

            //0.25 * Math.PI, .75 * Math.PI)
        }

        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

        if (!onlyPacman) {
            for (var i = 0; i < pacman.livesLeft; i++) {

                var leftLifeX = tileSize * 2 * i;
                var leftLifeY = tileSize * 34;

                ctx.beginPath();
                ctx.moveTo(leftLifeX + pacmanSize / 2, leftLifeY + pacmanSize / 2);

                ctx.arc(
                    leftLifeX + pacmanSize / 2,
                    leftLifeY + pacmanSize / 2,
                    pacmanSize / 2.25,
                    (1 + (0.25)) * Math.PI,
                    (1 + (1.75)) * Math.PI,
                    false);

                ctx.closePath();
                ctx.fillStyle = 'yellow';
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#003300';
                ctx.stroke();
            }
        }

        animateElements();
    }
    
    
}