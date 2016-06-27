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
        case "CLYDE":
            this.x = horizontalTiles / 2 * tileSize - 2 * tileSize;
            this.y = 17 * tileSize;
            break;
        case "PINKY":
            this.x = horizontalTiles / 2 * tileSize;
            this.y = 17 * tileSize;
            break;
        case "INKY":
            this.x = horizontalTiles / 2 * tileSize + 2 * tileSize;
            this.y = 17 * tileSize;
            break;
        default :
            this.x = horizontalTiles / 2 * tileSize;
            this.y = 14 * tileSize;
            break;
    }

    this.direction = "left";

    var freeze = false;

    this.freezeGhost = function() {
        freeze = true;
    }


    function opposite(direction) {
        switch(direction) {
            case "up":
                return "down";
            case "down":
                return "up";
            case "left":
                return "right";
            case "right":
                return "left";
        }

        return direction;
    }

    function compareVectors(x1, y1, x2, y2) {

        var l1 = x1 * x1 + y1 * y1;
        var l2 = x2 * x2 + y2 * y2;
        return (l1 > l2) ? 1 : (l1 < l2) ? -1 : 0;

    }


    this.chaseAI = function(pacmanH, pacmanV, allowedDirection) {
        var targetX = this.pointInMazeH;
        var targetY = this.pointInMazeV;

        // Inky its target is four positions in front of pacman
        if (this.name == "INKY") {
            switch(this.direction) {
                case "up" :
                    targetY -= 4;
                case "down" :
                    targetY += 4;
                case "left" :
                    targetX -= 4;
                case "down" :
                    targetX += 4;
            }
        }


        var direction = allowedDirection[0];

        if (allowedDirection.length > 1) {
            if (allowedDirection.indexOf(opposite(this.direction)) >= 0) {
                allowedDirection.splice(allowedDirection.indexOf(opposite(this.direction)), 1);
            }
        }

        // Never go back
        direction = allowedDirection[0];

        var distance = 10000;
        var newDistance = 0;

        var _this = this;

        allowedDirection.forEach(function(index) {

            // Simple AI that will reduce horizontal or vertical distance with pacman if possible
            // or else it will select the first allowed option
            switch(index) {
                case "up":
                    newDistance = Math.pow(Math.abs(targetY - 1 - pacmanV), 2) + Math.pow(Math.abs(targetX - pacmanH), 2);
                    if (newDistance < distance) {
                        direction = "up";
                        distance = newDistance;
                    }
                    break;
                case "down":
                    newDistance = Math.pow(Math.abs(targetY + 1 - pacmanV), 2) + Math.pow(Math.abs(targetX - pacmanH), 2);
                    if (newDistance < distance) {
                        direction = "down";
                        distance = newDistance;
                    }
                    break;
                case "left":
                    newDistance = Math.pow(Math.abs(targetY - pacmanV), 2) + Math.pow(Math.abs(targetX - 1 - pacmanH), 2);
                    if (newDistance < distance){
                        direction = "left";
                        distance = newDistance
                    }
                    break;
                case "right":
                    newDistance = Math.pow(Math.abs(targetY - pacmanV), 2) + Math.pow(Math.abs(targetY + 1 - pacmanH), 2);
                    if (newDistance < distance) {
                        direction = "right";
                        distance = newDistance;
                    }
                    break;
            }
        });

        return direction;

    }

    this.update = function (pacmanH, pacmanV) {
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

            if (this.name != "LBLINKY") {
                this.direction = this.chaseAI(pacmanH, pacmanV, allowedDirections)
            } else {
                if (upAllowed && this.direction == 'up' || downAllowed && this.direction == 'down' || leftAllowed && this.direction == 'left' || rightAllowed && this.direction == 'right') {
                    // do nothing
                } else {
                    this.direction = allowedDirections[Math.floor((Math.random() * allowedDirections.length))];
                }
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
