function Pacman(maze, ghosts) {
    var tileSize = 24;

    this.color = "yellow";

    // speed in frames to travel to the next tile
    this.speed = 8;

    this.pointInMazeV = verticalTiles / 2;
    this.pointInMazeH = horizontalTiles / 2;

    this.livesLeft = 3;

    this.reset =  function reset() {
        this.x = horizontalTiles / 2 * tileSize;
        this.y = 20 * tileSize;
        this.direction = "stop";
    }

    this.reset();

    this.nrOfPelletsEaten = 0;
    this.dieing = 0;
    this.dieingFrames = 60;

    this.specialMessage = "";
    this.specialMessageFrames = 0;
    this.specialMessageLocation;

    this.points = 0;
	
	// A callback an be assigned to this function
	this.pelletEaten = function(){};

    // A callback an be assigned to this function
    this.ghostEaten = function(){};

    // A callback an be assigned to this function
    this.dies = function(){};

    // Number of frames an energizer is active
    this.energizerActive = 0;

    // Points earned after eating ghosts (Reset after eating a new energizer)
    this.ghostPointsPerEnergizer = 0;

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

    this.setNewTileSize = function(newTileSize) {
        this.x = this.pointInMazeH  * newTileSize;
        this.y = this.pointInMazeV * newTileSize;
        tileSize = newTileSize;
    }

    function collisions() {

    }

    this.setMaze = function(newMaze){
        maze = newMaze;
        this.reset();
    }

    this.update = function() {
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
                this.nrOfPelletsEaten += 1;
                this.points += 10;
				this.pelletEaten();
                maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH] = 88;
            }

            if (maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH] == ElementIDs.ENERGIZER  ) {
                this.energizerActive = 5 * 60;
                this.ghostPointsPerEnergizer = 0;
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
				if (ghost.pointInMazeV == _this.pointInMazeV && ghost.pointInMazeH == _this.pointInMazeH) {
                    if (_this.energizerActive > 0) {
                        ghost.kill();
                        _this.ghostEaten();
                        _this.points += 200;
                        _this.ghostPointsPerEnergizer += 200;
                        _this.specialMessage = String(this.ghostPointsPerEnergizer);
                        _this.specialMessageFrames = 120;
                        _this.specialMessageLocation = {V: ghost.pointInMazeV, H: ghost.pointInMazeH};
                    } else {
                        _this.dieing = _this.dieingFrames;

                        // Play some audio here
                        _this.dies();

                        // Freeze ghosts
                        ghosts.forEach(function (ghost) {
                            ghost.freezeGhost();
                        });
                    }
				}
            });
        }

        // If dieing,
        if (this.dieing != 0) {
            this.dieing--;

            if(this.dieing == 0) {
                this.livesLeft--;
                this.reset();
                // reset ghosts (if not game over)
                ghosts.forEach(function (ghost) {
                    ghost.resetGhost();
                });
            }
        }
    }

}