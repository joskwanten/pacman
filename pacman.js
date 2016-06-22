/* Width and Height */
var W=896, H=1152, tileSize =32, horizontalTiles = 28, verticalTiles = 36;

/* List of ids that can be used in the tiles */
var ElementIDs = { 
	BLANK:  		0, /* Blank tile */
	DTLCORNER:  1, /* Double lined top-left corner */
  DTRCORNER:  2, /* Double lined top-right corner */
  DBLCORNER:  3, /* Double lined bottom-left corner */
  DBRCORNER:  4, /* Double lined bottom-right corner */
  DHORLINET:  5, /* Double line horizontal top*/
  DHORLINEB:  6, /* Double line horizontal bottom*/
  DVERTLINEL: 7, /* Double line vertical left */
  DVERTLINER: 8, /* Double line vertical rigth */
  STLCORNER:  9, /* Single lined top-left corner */
  STRCORNER: 10, /* Single lined top-right corner */
  SBLCORNER: 11, /* Single lined bottom-left corner */
  SBRCORNER: 12, /* Single lined bottom-right corner */
  SVERTLINE: 13, /* Single vertical line */
  SHORLINE:  14, /* Single horizontal line */
  PELLET:    15, /* Pellet to eat by pacman */
  ENERGIZER: 16, /* Energizer pellet after eating pacman can defeat ghosts */
  BLINKY:    17, /* Blinky the red ghost */
  PINKY:     18, /* Pinky the pink ghost */
  INKY:      19, /* Inky the blue ghost */
  CLYDE:     20,  /* Clyde the slow ghost */    
  DHORLINESVERTTL: 21, 
  DHORLINESVERTTR: 22, 
  DHORLINESVERTBL: 23, 
  DHORLINESVERTBR: 24,
  DTRCORNERBL: 25,
  DBRCORNERTL: 26,
  DTLCORNERBL: 27,
  DBLCORNERTL: 28,
  DVERTTOHORSTL: 29,
  DVERTTOHORSBL: 30,
  DVERTTOHORSTR: 31,
  DVERTTOHORSBR: 32
}

function Ghost(id, name, color, character, maze, tileSize) {
	this.id = id;
	this.name = name;
	this.color = color;
	this.character = character;
	this.maze = maze;
	// speed in frames to travel to the next tile
	this.speed = 10;
	
	
	this.pointInMazeV = verticalTiles / 2;
	this.pointInMazeH = horizontalTiles / 2;
	
	this.x = 320;
	this.y = 320;
	
	this.direction = "left";
	
	
	this.update = function() {
		if (this.x % tileSize == 0 && this.y % tileSize == 0) {
			this.pointInMazeH = this.x / tileSize;
			this.pointInMazeV = this.y / tileSize;
			
			var upAllowed    = this.pointInMazeV > 0                   ? maze[(this.pointInMazeV - 1) * horizontalTiles + this.pointInMazeH] == 0 : false;
			var downAllowed  = this.pointInMazeV < verticalTiles - 1   ? maze[(this.pointInMazeV + 1) * horizontalTiles + this.pointInMazeH] == 0 : false;
			var leftAllowed  = this.pointInMazeH > 0                   ? maze[this.pointInMazeV  * horizontalTiles + (this.pointInMazeH - 1)] == 0 : false;
			var rightAllowed = this.pointInMazeH < horizontalTiles - 1 ? maze[this.pointInMazeV  * horizontalTiles + this.pointInMazeH + 1] == 0 : false;
			
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
			
				this.direction = allowedDirections[Math.floor((Math.random()*allowedDirections.length))];
			}
		}
				
		switch(this.direction) {
			case "right":
				this.x += tileSize / 8;
				break;
			case "left":
				this.x -= tileSize / 8;
				break;
			case "up":
				this.y -= tileSize / 8;
				break;
			case "down": 
				this.y += tileSize / 8;
				break;
		}				
	}
	
	
}

var ghosts = [];
ghosts.push(new Ghost(ElementIDs.BLINKY, "BLINKY", "red", "SHADOW", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.PINKY, "PINKY", "yellow", "SPEEDY", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.INKY, "INKY", "blue", "BASHFUL", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.CLYDE, "CLYDE", "green", "POKEY", maze, tileSize));


function Game(mazeData, renderFunction) {
	this.renderFunction = renderFunction;
    this.maze = mazeData;          
    
    this.update = function() {
		ghosts.forEach(function(ghost) {
			ghost.update();
		})
    }
    
    this.render = function() {		
			renderFunction(this.maze);      
    }
}

/* get the canvas context */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

/* Create the render-engine */
var mazeRenderer = new mazeRenderer(ctx, tileSize);
var ghostRenderer1 = new ghostRenderer(ctx, tileSize);
var ghostRenderer2 = new ghostRenderer(ctx, tileSize);
var ghostRenderer3 = new ghostRenderer(ctx, tileSize);
var ghostRenderer4 = new ghostRenderer(ctx, tileSize);

/* Create a new Game */
var myGame = new Game(maze, function(myMaze){ 
	mazeRenderer.renderMaze(myMaze);
	ghostRenderer1.render(this.ghosts[0]);
	ghostRenderer2.render(this.ghosts[1]);
	ghostRenderer3.render(this.ghosts[2]);
	ghostRenderer4.render(this.ghosts[3]);
});

var fps = 60;
setInterval(function() {
		myGame.update();
		window.requestAnimationFrame(function() {
			myGame.render();  	
		});        
}, 1000 / fps);

