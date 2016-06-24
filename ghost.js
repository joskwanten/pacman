function Ghost(id, name, color, character, maze, tileSize) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.character = character;
    this.maze = maze;
    // speed in frames to travel to the next tile
    this.speed = 8;


    this.pointInMazeV = verticalTiles / 2;
    this.pointInMazeH = horizontalTiles / 2;

    switch (name) {
        case "BINKY":
            this.x = horizontalTiles / 2 * tileSize - 2;
            this.y = 17 * tileSize;
            break;
        case "PINKY":
            this.x = horizontalTiles / 2 * tileSize;
            this.y = 17 * tileSize;
            break;
        case "INKY":
            this.x = horizontalTiles / 2 * tileSize + 2;
            this.y = 17 * tileSize;
            break;
        default :
            this.x = horizontalTiles / 2 * tileSize;
            this.y = 15 * tileSize;
            break;
    }

    this.direction = "left";

    var freeze = false;

    this.freezeGhost = function() {
        freeze = true;
    }

    this.update = function () {
        // No updates when frozen.
        if (freeze) {
            return;
        }

        if (this.x % tileSize == 0 && this.y % tileSize == 0) {
            this.pointInMazeH = this.x / tileSize;
            this.pointInMazeV = this.y / tileSize;

            var upAllowed = this.pointInMazeV > 0 ? maze[(this.pointInMazeV - 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            var downAllowed = this.pointInMazeV < verticalTiles - 1 ? maze[(this.pointInMazeV + 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            var leftAllowed = this.pointInMazeH > 0 ? maze[this.pointInMazeV * horizontalTiles + (this.pointInMazeH - 1)] > 63 : false;
            var rightAllowed = this.pointInMazeH < horizontalTiles - 1 ? maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH + 1] > 63 : false;

            if (upAllowed && this.direction == 'up' || downAllowed && this.direction == 'down' || leftAllowed && this.direction == 'left' || rightAllowed && this.direction == 'right') {
                // do nothing
            } else {
                var allowedDirections = [];

                if (upAllowed) {
                    allowedDirections.push("up");
                }

                if (downAllowed) {
                    allowedDirections.push("down");
                }

                if (leftAllowed) {
                    allowedDirections.push("left");
                }

                if (rightAllowed) {
                    allowedDirections.push("right");
                }

                this.direction = allowedDirections[Math.floor((Math.random() * allowedDirections.length))];
            }
        }

        switch (this.direction) {
            case "right":
                this.x += tileSize / this.speed;
                break;
            case "left":
                this.x -= tileSize / this.speed;
                break;
            case "up":
                this.y -= tileSize / this.speed;
                break;
            case "down":
                this.y += tileSize / this.speed;
                break;
        }
    }
}
