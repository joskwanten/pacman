'use strict'

/* Width and Height */
var W = 896, H = 1152, tileSize = 32, horizontalTiles = 28, verticalTiles = 36;

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
ghosts.push(new Ghost(ElementIDs.PINKY, "PINKY", "yellow", "SPEEDY", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.INKY, "INKY", "blue", "BASHFUL", maze, tileSize));
ghosts.push(new Ghost(ElementIDs.CLYDE, "CLYDE", "green", "POKEY", maze, tileSize));

var pacman = new Pacman(maze, tileSize, ghosts);

function Game(mazeData, renderFunction) {
    this.maze = mazeData;

    this.update = function () {
        ghosts.forEach(function (ghost) {
            ghost.update();
        })

        pacman.update();
    }

    this.render = function () {
        renderFunction(this.maze);
    }
}

/* get the canvas context */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

/* Create the render-engine */
var mazeRenderer = new MazeRenderer(ctx, tileSize);


// The ghost renderer has some state, so we create a renderer per ghost
var ghostRenderers = [];
ghosts.forEach(function() {
    ghostRenderers.push(new GhostRenderer(ctx, tileSize));
});

// Create a pacman renderer for rendering pacman and its lives left
var pacmanRenderer = new PacmanRenderer(ctx, tileSize);


/* Create a new Game */
var myGame = new Game(maze, function (myMaze) {
    
    mazeRenderer.renderMaze(myMaze);

    ghosts.forEach(function(ghost, index) {
        ghostRenderers[index].render(ghost, pacman.energizerActive > 0, pacman.energizerActive < 2 * 60)
    });

    pacmanRenderer.render(pacman)
});

var fps = 60;
setInterval(function () {
    myGame.update();
    window.requestAnimationFrame(function () {
        myGame.render();
    });
}, 1000 / fps);

