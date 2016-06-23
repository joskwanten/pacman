function Pacman(maze, tileSize) {

    this.color = "yellow";
    this.maze = maze;

    // speed in frames to travel to the next tile
    this.speed = 8;

    this.pointInMazeV = verticalTiles / 2;
    this.pointInMazeH = horizontalTiles / 2;

    this.x = 320;
    this.y = 320;

    this.direction = "left";

    var keyStates = [];

    document.addEventListener('keydown', function(e) {
        keyStates.push( e.keyCode );
    }, false);

    document.addEventListener('keyup', function(e) {
        while( (pos = keyStates.indexOf( e.keyCode )) > -1 )
            keyStates.splice( pos, 1 );
    }, false);


    this.update = function () {
        if (this.x % tileSize == 0 && this.y % tileSize == 0) {
            this.pointInMazeH = this.x / tileSize;
            this.pointInMazeV = this.y / tileSize;

            var upAllowed = this.pointInMazeV > 0 ? maze[(this.pointInMazeV - 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            var downAllowed = this.pointInMazeV < verticalTiles - 1 ? maze[(this.pointInMazeV + 1) * horizontalTiles + this.pointInMazeH] > 63 : false;
            var leftAllowed = this.pointInMazeH > 0 ? maze[this.pointInMazeV * horizontalTiles + (this.pointInMazeH - 1)] > 63 : false;
            var rightAllowed = this.pointInMazeH < horizontalTiles - 1 ? maze[this.pointInMazeV * horizontalTiles + this.pointInMazeH + 1] > 63 : false;


            if (keyStates.indexOf(38) >= 0 && upAllowed) // Up
                this.direction = "up";
            else if (keyStates.indexOf(40) >= 0 && downAllowed) // Down
                this.direction = "down";
            else if (keyStates.indexOf(37) >= 0 && leftAllowed) // Left
                this.direction = "left";
            else if (keyStates.indexOf(39) >= 0 && rightAllowed) // Right
                this.direction = "right";
            else {
                // Stop if it cannot move any futher....
                if (this.direction === "up" && !upAllowed ||
                        this.direction === "down" && !downAllowed ||
                        this.direction === "left" && !leftAllowed ||
                        this.direction === "right" && !rightAllowed) {

                    this.direction = "stop";
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