function pacmanRenderer(context, tileSize) {


    this.mouthOpen = 0;
    this.mouthOpening = true;

    var animateElements = function() {
        mouthOpen += mouthOpening ? 1 : -1;

        if (mouthOpen == 7) {
            mouthOpening = false;
        }

        if (mouthOpen == 0) {
            mouthOpening
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

        if (pacman.direction == "up") {

        }

        ctx.beginPath();
        ctx.moveTo(this.x  + pacmanSize / 2, this.y + pacmanSize /2);
        ctx.arc(this.x + pacmanSize / 2, this.y  + pacmanSize / 2 , pacmanSize / 2, 0.25 * Math.PI, 1.75 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

    }
}