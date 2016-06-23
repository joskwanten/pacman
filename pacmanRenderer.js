function pacmanRenderer(context, tileSize) {


    var mouthOpen = 0;
    var mouthOpening = true;
    var lastDirection = "stop";

    var animateElements = function() {
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

    var pacmanSize = tileSize * 2;

    this.render = function (pacman) {

        this.x = pacman.x - tileSize / 2;
        this.y = pacman.y - tileSize / 2;


        /*// Draw pacman eyes
        ctx.beginPath();
        ctx.arc(this.x + (18 / 64) * pacmanSize, this.y + (28 / 64) * pacmanSize, (7 / 64) * pacmanSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + (42 / 64) * pacmanSize, this.y + (28 / 64) * pacmanSize, (7 / 64) * pacmanSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
*/

        var offset = 0;

        if (pacman.direction == "stop") {
            mouthOpen = 0;
            mouthOpening = true;
        }

        if (pacman.direction !=  "stop") {
            lastDirection = pacman.direction;
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

        ctx.arc(
            this.x + pacmanSize / 2,
            this.y  + pacmanSize / 2 ,
            pacmanSize / 2.25,
            (offset + (0.25 - 0.25 * mouthOpen/ 7)) * Math.PI,
                (offset + (1.75 + 0.25 * (mouthOpen/ 7)))  * Math.PI,
            false);

        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

        animateElements();
    }
}