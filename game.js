'use strict'

/* Width and Height */
var baseW = 224, baseH = 288;
var W = 896, H = 1152, tileSize = 24, horizontalTiles = 28, verticalTiles = 36;

const fps = 60;
const gameOverFrames = fps * 5;
var gameOverFramesLeft = 0;

/* List of ids that can be used in the tiles */
var ElementIDs = {
    BLANK: 0, /* Blank tile */
    DTLCORNER: 1, /* Double lined top-left corner */
    DTRCORNER: 2, /* Double lined top-right corner */
    DBLCORNER: 3, /* Double lined bottom-left corner */
    DBRCORNER: 4, /* Double lined bottom-right corner */
    DHORLINET: 5, /* Double line horizontal top*/
    DHORLINEB: 6, /* Double line horizontal bottom*/
    DVERTLINEL: 7, /* Double line vertical left */
    DVERTLINER: 8, /* Double line vertical rigth */
    STLCORNER: 9, /* Single lined top-left corner */
    STRCORNER: 10, /* Single lined top-right corner */
    SBLCORNER: 11, /* Single lined bottom-left corner */
    SBRCORNER: 12, /* Single lined bottom-right corner */
    SVERTLINE: 13, /* Single vertical line */
    SHORLINE: 14, /* Single horizontal line */
    BLINKY: 17, /* Blinky the red ghost */
    PINKY: 18, /* Pinky the pink ghost */
    INKY: 19, /* Inky the blue ghost */
    CLYDE: 20, /* Clyde the slow ghost */
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
    DVERTTOHORSBR: 32,
    ENERGIZER: 64,
    PELLET: 65
}


var ghosts = [];
ghosts.push(new Ghost(ElementIDs.BLINKY, "BLINKY", "red", "SHADOW", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.PINKY, "PINKY", "pink", "SPEEDY", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.INKY, "INKY", "blue", "BASHFUL", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.CLYDE, "CLYDE", "yellow", "POKEY", maze, tileSize));

var pacman = new Pacman(maze, ghosts, tileSize);

// create web audio api context
var audioCtx = new window.AudioContext();

var sound = new Sound(audioCtx);

setTimeout(function() { sound.playSlowWow(); }, 4000);

pacman.pelletEaten = function() {
	sound.eatPellet();
}

pacman.ghostEaten = function() {
    sound.playGhostEaten();
}

pacman.dies = function() {
    sound.playPacmanDies();
}


function Game(mazeData, renderFunction) {
    this.originMaze = mazeData.slice();
    this.maze = mazeData;
    this.endOfLevel = false;
    this.endOfLevelFrames = 0;

    this.newMaze = function () {
        this.maze = this.originMaze.concat();
        pacman.setMaze(this.maze);

        var _this = this;
        ghosts.forEach(function (ghost) {
            ghost.setMaze(_this.maze);
        });
    }

    this.update = function () {
        this.endOfLevelFrames = this.endOfLevel ? this.endOfLevelFrames - 1 : 0;

        if (this.endOfLevelFrames == 0 && this.endOfLevel) {
            this.endOfLevel = false;
            this.newMaze();
        }

        ghosts.forEach(function (ghost) {
            ghost.update(pacman.pointInMazeH,
                pacman.pointInMazeV,
                pacman.direction,
                pacman.nrOfPelletsEaten,
                tileSize,
                pacman.energizerActive > 0
            );
        });

        pacman.update(tileSize);

        // Check level finished
        if (!this.endOfLevel && !this.maze.find(function(item) { return item === ElementIDs.PELLET})) {
            // End of the level
            this.endOfLevel = true;
            this.endOfLevelFrames = 120;
        }
    }

    this.render = function () {
        renderFunction(this.maze, this.endOfLevel);
    }
}

/* get the canvas context */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var resized = false;

function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    console.log("Height " + height);

    var scale = Math.floor(height / 288);

    tileSize = scale * 8;
    width = scale * baseW;
    height = scale * baseH;

    console.log("Height " + height);

    resized = true;
    canvas.width = width;
    canvas.height = height;
    W = width;
    H = height;

    ghosts.forEach(function(g) {g.setNewTileSize(tileSize)});
    pacman.setNewTileSize(tileSize);
}

// Set initial values
resize();

// Set pacman's initial position
pacman.reset();
ghosts.forEach(function(g) {g.initialPosition(); });

// register the resize event handler to handle resizing
window.addEventListener("resize", resize);

/* Create the render-engine */
var mazeRenderer = new MazeRenderer(ctx, tileSize);
var startScreenRenderer = new StartScreenRenderer(ctx, tileSize);
var gameoverRendered = new GameoverRenderer(ctx)

// The ghost renderer has some state, so we create a renderer per ghost
var ghostRenderers = [];
ghosts.forEach(function() {
    ghostRenderers.push(new GhostRenderer(ctx));
});

// Create a pacman renderer for rendering pacman and its lives left
var pacmanRenderer = new PacmanRenderer(ctx);


/* Create a new Game */
var started = false;

var myGame = new Game(maze, function (myMaze, endOfLevel) {
    if (started) {
        mazeRenderer.renderMaze(myMaze, resized, tileSize, endOfLevel);
        resized = false;

        ghosts.forEach(function (ghost, index) {
            ghostRenderers[index].render(ghost, pacman.energizerActive > 0, pacman.energizerActive < 2 * 60, tileSize)
        });

        pacmanRenderer.render(pacman, tileSize, false);

        if (gameOverFramesLeft > 0) {
            gameoverRendered.renderScreen(tileSize);
        }
    } else {
        startScreenRenderer.renderScreen(tileSize);
        ghosts.forEach(function (ghost, index) {
            ghost.x = 6 * tileSize;
            ghost.y = (15 + (2 * index)) * tileSize;
            ghostRenderers[index].render(ghost, pacman.energizerActive > 0, pacman.energizerActive < 2 * 60, tileSize)
            ghostRenderers[index].renderInfo(ghost, tileSize)
        });

        pacmanRenderer.render(pacman, tileSize, true);

        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            if (e.keyCode === 32) {

                // Reset ghost positions
                ghosts.forEach(function(ghost) { ghost.resetGhost(); });

                if (!started ){
                    playTune(audioCtx);
                }

                started = true;
            }
        }, false);
    }
});

//playTune(audioCtx);

pacman.noLivesLeft = function() {
    gameOverFramesLeft = gameOverFrames;
}


setInterval(function () {
    if (started && gameOverFramesLeft === 0) {
        myGame.update();
    }
    if (gameOverFramesLeft > 0) {
        if (gameOverFramesLeft === 1) {
            started = false;
            pacman.initForNewGame();
            myGame.newMaze();
        }

        gameOverFramesLeft--;
    }
    window.requestAnimationFrame(function () {
        myGame.render();
    });
}, 1000 / fps);

