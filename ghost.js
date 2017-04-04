function Ghost(id, name, color, character, maze, tileSize) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.character = character;
    // speed in frames to travel to the next tile
    this.baseSpeed = 8;
    this.speed = this.baseSpeed;

    this.blinkyH = 0;
    this.blinkyv = 0;

    // Default in the middle of the screen.
    this.pointInMazeV = verticalTiles / 2;
    this.pointInMazeH = horizontalTiles / 2;

    // We start in scatter mode
    this.mode = "scatter";

    // If ghost has died and is has reached the ghosthous
    // the recovery frame counter is set to recover for n frames of time
    this.recoveryFrames = 0;


    ghostHouseH = horizontalTiles / 2;
    ghostHouseV = verticalTiles / 2 - 1;

    // Counts the amount of frames (we assume a framerate of 60fps) and use this
    // counter for timed behaviour (Scatter vs. Chase mode)
    var frameCounter = 0;

    this.killed = false;
    this.killedX = 0;
    this.killedY = 0;
    this.killedSeq = 0;

    this.initialPosition = function initialPosition() {
        // Reset the speed
        this.speed = this.baseSpeed;

        switch (this.name) {
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
    }

    this.initialPosition();

    this.direction = "left";

    var freeze = false;

    this.freezeGhost = function() {
        freeze = true;
    }

    this.resetGhost = function() {
        frameCounter = 0;
        freeze = false;
        this.killed = false;
        this.initialPosition();
    }

    this.setMaze = function(newMaze){
        maze = newMaze;
        this.resetGhost();
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

    this.setNewTileSize = function(newTileSize) {
        tileSize = newTileSize;
        this.x = this.pointInMazeH * tileSize;
        this.y = this.pointInMazeV * tileSize;
    }

    this.kill = function(seq) {
        this.killed = true;
        this.speed = this.baseSpeed / 2;
        this.killedX = this.x;
        this.killedY = this.y;
        this.killedSeq = seq;
        this.x -= this.x % tileSize;
        this.y -= this.y % tileSize;
    };

    this.chaseAI = function(pacmanH, pacmanV, pacmanDirection, allowedDirection) {
        var targetH = pacmanH;
        var targetV = pacmanV;

        // Pinky its target is four positions in front of pacman
        if (this.name == "PINKY") {
            switch(pacmanDirection) {
                case "up" :
                    targetV -= 4;
                case "down" :
                    targetV += 4;
                case "left" :
                    targetH -= 4;
                case "down" :
                    targetH += 4;
            }
        };

        // Inky its target is four positions in front of pacman
        if (this.name == "INKY") {

            switch(pacmanDirection) {
                case "up" :
                    targetV -= 2;
                case "down" :
                    targetV += 2;
                case "left" :
                    targetH -= 2;
                case "down" :
                    targetH += 2;
            }

            targetH = targetH + 2 * (targetH - this.blinkyH);
            targetV = targetV + 2 * (targetV - this.blinkyH);
        }

        if (this.mode == 'scatter' && this.name == 'BLINKY') {
            targetH = 26;
            targetV = 7;
        }

        if (this.mode == 'scatter' && this.name == 'INKY') {
            targetH = 27;
            targetV = 31;
        }
        if (this.mode == 'scatter' && this.name == 'PINKY') {
            targetH = 3;
            targetV = 7;
        }
        if (this.mode == 'scatter' && this.name == 'CLYDE') {
            targetH = 7;
            targetV = 31;
        }

        if (this.mode == 'frightened') {
            targetH = Math.floor(28 * Math.random());
            targetV = Math.floor(36 * Math.random());
        }

        if (this.killed == true) {
            targetH = ghostHouseH;
            targetV = ghostHouseV;
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
                    newDistance = Math.pow(Math.abs(_this.pointInMazeV - 1 - targetV), 2) + Math.pow(Math.abs(_this.pointInMazeH - targetH), 2);
                    if (newDistance < distance) {
                        direction = "up";
                        distance = newDistance;
                    }
                    break;
                case "down":
                    newDistance = Math.pow(Math.abs(_this.pointInMazeV + 1 - targetV), 2) + Math.pow(Math.abs(_this.pointInMazeH - targetH), 2);
                    if (newDistance < distance) {
                        direction = "down";
                        distance = newDistance;
                    }
                    break;
                case "left":
                    var l = _this.pointInMazeH === 0 ? horizontalTiles - 1 : _this.pointInMazeH - 1;
                    newDistance = Math.pow(Math.abs(_this.pointInMazeV - targetV), 2) + Math.pow(Math.abs(l - targetH), 2);
                    if (newDistance < distance){
                        direction = "left";
                        distance = newDistance
                    }
                    break;
                case "right":
                    var r = _this.pointInMazeH === horizontalTiles - 1 ? 0 : _this.pointInMazeH  + 1;
                    newDistance = Math.pow(Math.abs(_this.pointInMazeV - targetV), 2) + Math.pow(Math.abs(r - targetH), 2);
                    if (newDistance < distance) {
                        direction = "right";
                        distance = newDistance;
                    }
                    break;
            }
        });

        return direction;

    }

    this.update = function (pacmanH, pacmanV, pacmanDirection, nrOfPelletsEaten, tileSize, energizerActive) {
        frameCounter++;

        // In  case the ghost is recovering in the ghosthouse, decrement te framecoutner
        if (this.recoveryFrames > 0) {
            this.recoveryFrames--;
        }

        // We enter chase mode after 7 seconds for 20 seconds until 27 seconds etc.
        // we end in chase mode
        var modesPerTime = [
                            {time: 0, mode: 'scatter'},
                            {time: 7, mode: 'chase'},
                            {time: 20, mode: 'scatter'},
                            {time: 27, mode: 'chase'},
                            {time: 47, mode: 'scatter'},
                            {time: 52, mode: 'chase'},
                            {time: 72, mode: 'scatter'},
                            {time: 78, mode: 'chase'}
                            ];

        var _this = this;
        modesPerTime.forEach(function(timemode) {
            if (frameCounter /60 > timemode.time) {
                _this.mode = timemode.mode;
            }
        });

        // No updates when frozen.
        if (freeze) {
            return;
        }

        if (energizerActive && !this.killed) {
            this.mode = 'frightened';
        } else if(!this.killed) {
            // Restore speed
            this.speed = this.baseSpeed;
        }

        if (this.x % tileSize == 0 && this.y % tileSize == 0) {
            this.pointInMazeH = this.x / tileSize;

            if (this.pointInMazeH < 0) {
                this.pointInMazeH = horizontalTiles -1;
                this.x = this.pointInMazeH  * tileSize
            }

            if (this.pointInMazeH >= horizontalTiles) {
                this.pointInMazeH = 0;
                this.x = this.pointInMazeH  * tileSize
            }

            this.pointInMazeV = this.y / tileSize;

            if (this.killed && this.pointInMazeH == ghostHouseH && this.pointInMazeV == ghostHouseV) {
                // Ghost has reached ghosthouse. Now it can come back to life
                this.killed = false;
                this.recoveryFrames = 5 * 60;

                this.x -= this.x % tileSize;
                this.y -= this.y % tileSize;
            }

            // Store BLINKY its actual position (INKY needs it for its position)
            if (this.name == 'BLINKY') {
                this.blinkyH = this.pointInMazeH;
                this.blinkyV = this.pointInMazeV;
            }

            var upAllowed = this.pointInMazeV > 0 ? maze[(this.pointInMazeV - 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            var downAllowed = this.pointInMazeV < verticalTiles - 1 ? maze[(this.pointInMazeV + 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            //var leftAllowed = this.pointInMazeH > 0 ? maze[this.pointInMazeV * horizontalTiles + (this.pointInMazeH - 1)] > 63 : false;
            //var rightAllowed = this.pointInMazeH < horizontalTiles - 1 ? maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH + 1] > 63 : false;

            var leftAllowed = this.pointInMazeH == 0 || maze[this.pointInMazeV * horizontalTiles + (this.pointInMazeH - 1)] > 63;
            var rightAllowed = this.pointInMazeH == horizontalTiles - 1 || maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH + 1] > 63;

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

            // INKY leaves the ghosthouse after eating 30 pellets
            if (this.name == "INKY" && nrOfPelletsEaten < 30 && allowedDirections.indexOf("up") >= 0) {
                allowedDirections.splice(allowedDirections.indexOf("up"), 1);
            }

            // CLYDE leaves the ghosthouse after eating 75 pellets (about 30%)
            if (this.name == "CLYDE" && nrOfPelletsEaten < 75 && allowedDirections.indexOf("up") >= 0) {
                allowedDirections.splice(allowedDirections.indexOf("up"), 1);
            }

            // PINKY is allowed to go out of the ghosthost (if no recovery is active))
            if (this.recoveryFrames > 0 && allowedDirections.indexOf("up") >= 0) {
                allowedDirections.splice(allowedDirections.indexOf("up"), 1);
            }

            if (this.name != "LBLINKY") {
                this.direction = this.chaseAI(pacmanH, pacmanV, pacmanDirection, allowedDirections)
            } else {
                if (upAllowed && this.direction == 'up' || downAllowed && this.direction == 'down' || leftAllowed && this.direction == 'left' || rightAllowed && this.direction == 'right') {
                    // do nothing
                } else {
                    this.direction = allowedDirections[Math.floor((Math.random() * allowedDirections.length))];
                }
            }
        }

        if (this.mode !== 'frightened' || frameCounter % 3 !== 0) {
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
}
