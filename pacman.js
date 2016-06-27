function Pacman(maze, tileSize, ghosts) {

    this.color = "yellow";
    this.maze = maze;

    // speed in frames to travel to the next tile
    this.speed = 8;

    this.pointInMazeV = verticalTiles / 2;
    this.pointInMazeH = horizontalTiles / 2;

    this.livesLeft = 3;

    this.x = horizontalTiles / 2 * tileSize;
    this.y = 20 * tileSize;
    this.pillsEaten = 0;
    this.dieing = 0;
    this.dieingFrames = 120;
	
	// A callback an be assigned to this function
	this.pelletEaten = function(){};

    // Number of frames an energizer is active
    this.energizerActive = 0;

    this.direction = "stop";

    var keyStates = [];

    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        keyStates.push( e.keyCode );
    }, false);

    document.addEventListener('keyup', function(e) {
        e.preventDefault();
        while( (pos = keyStates.indexOf( e.keyCode )) > -1 )
            keyStates.splice( pos, 1 );
    }, false);


    this.update = function () {
        if (this.energizerActive > 0) {
            this.energizerActive--;
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

            if (maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH] == ElementIDs.PELLET  ) {				
                this.pillsEaten += 1;
				this.pelletEaten();
                maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH] = 88;
            }

            if (maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH] == ElementIDs.ENERGIZER  ) {
                this.energizerActive = 5 * 60;
                maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH] = 88;
            }

            var upAllowed = this.pointInMazeV > 0 ? maze[(this.pointInMazeV - 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            var downAllowed = this.pointInMazeV < verticalTiles - 1 ? maze[(this.pointInMazeV + 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            var leftAllowed = this.pointInMazeH == 0 || maze[this.pointInMazeV * horizontalTiles + (this.pointInMazeH - 1)] > 63;
            var rightAllowed = this.pointInMazeH == horizontalTiles -1 || maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH + 1] > 63;


            if (keyStates.indexOf(38) >= 0 && upAllowed) // Up
                this.direction = "up";
            else if (keyStates.indexOf(40) >= 0 && downAllowed) // Down
                this.direction = "down";
            else if (keyStates.indexOf(37) >= 0 && leftAllowed) // Left
                this.direction = "left";
            else if (keyStates.indexOf(39) >= 0 && rightAllowed) // Right
                this.direction = "right";
            else {
                // Stop if it cannot move any further....
                if (this.direction === "up" && !upAllowed ||
                        this.direction === "down" && !downAllowed ||
                        this.direction === "left" && !leftAllowed ||
                        this.direction === "right" && !rightAllowed) {
                    this.direction = "stop";
                }
            }
        }

         // Check for a collision with another ghost if not dieing
        if(this.dieing == 0) {

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

            var _this = this;
            ghosts.forEach(function (ghost) {
				/*
                // Ghost and Pacman are both 2 * tileSize
                var gx1 = ghost.x - tileSize / 2; var gx2 = gx1 + 1.5 * tileSize;
                var gy1 = ghost.y - tileSize / 2; var gy2 = gy1 + 1.5 * tileSize;
                var px1 = pacman.x - tileSize / 2; var px2 = px1 + 1.5 * tileSize;
                var py1 = pacman.y - tileSize / 2; var py2 = py1 + 1.5 * tileSize;

                if (((gx1 <= px1 &&  px1 <= gx2) || (gx1 <= px2 && px2 <= gx2)) &&
                    ((gy1 <= py1 &&  py1 <= gy2) || (gy1 <= py2 && py2 <= gy2))) {

                    _this.dieing = _this.dieingFrames;

                    // Freeze ghosts
                    ghosts.forEach(function(ghost) {
                        ghost.freezeGhost();
                    });
                }*/
				if (ghost.pointInMazeV == _this.pointInMazeV && ghost.pointInMazeH == _this.pointInMazeH) {
					_this.dieing = _this.dieingFrames;

                    // Freeze ghosts
                    ghosts.forEach(function(ghost) {
                        ghost.freezeGhost();
					});
				}
            });
        }

        // If dieing,
        if (this.dieing != 0) {

            if(this.dieing == 1) {
                this.livesLeft--;
            }

            this.dieing--;
        }
    }

}