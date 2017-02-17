function MazeRenderer(ctx, tileSize) {

    var drawDoubleTopLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY + tileSize);
        context.quadraticCurveTo(offsetX, offsetY, offsetX + tileSize, offsetY);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleBottomLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        context.quadraticCurveTo(offsetX, offsetY + tileSize, offsetX + tileSize, offsetY + tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleTopRight = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + tileSize, offsetY, offsetX, offsetY);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleBottomRight = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + tileSize, offsetY + tileSize, offsetX + tileSize, offsetY);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX, offsetY + 0.5 * tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX + 0.5 * tileSize, offsetY);
        context.stroke();
    }


    var drawDoubleTopRightToBottomLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleTopLeftToBottomLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleBottomRightToTopLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleBottomLeftToTopLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize, offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleHorizontalTopLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY + 0 * tileSize);
        context.lineTo(offsetX + tileSize, offsetY + 0 * tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX, offsetY + 0.5 * tileSize);
        context.lineTo(offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleHorizontalBottomLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY + 0.5 * tileSize);
        context.lineTo(offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX, offsetY + 1.0 * tileSize);
        context.lineTo(offsetX + tileSize, offsetY + 1.0 * tileSize);
        context.stroke();
    }

    var drawDoubleHorizontalTopLineToVerticalSingleLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY + 0 * tileSize);
        context.lineTo(offsetX + tileSize, offsetY + 0 * tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0. * tileSize, offsetY + 0.5 * tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.stroke();
    }

    var drawDoubleVerticalLineToHorizontalSingleLineBottomLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        context.lineTo(offsetX, offsetY + tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleVerticalLineToHorizontalSingleLineTopLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        context.lineTo(offsetX, offsetY + tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }


    var drawDoubleVerticalLineToHorizontalSingleLineBottomRight = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + tileSize, offsetY);
        context.lineTo(offsetX + tileSize, offsetY + tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleVerticalLineToHorizontalSingleLineTopRight = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + tileSize, offsetY);
        context.lineTo(offsetX + tileSize, offsetY + tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX, offsetY + 0.5 * tileSize);
        context.stroke();
    }


    var drawVerticalSingleLineToDoubleHorizontalTopLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY + 0 * tileSize);
        context.lineTo(offsetX + tileSize, offsetY + 0 * tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawDoubleVerticalLineLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0 * tileSize, offsetY);
        context.lineTo(offsetX + 0 * tileSize, offsetY + tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.lineTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.stroke();
    }

    var drawDoubleVerticalLineRight = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + tileSize, offsetY);
        context.lineTo(offsetX + tileSize, offsetY + tileSize);
        context.stroke();

        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.lineTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.stroke();
    }

    var drawSingleVerticalLineLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.lineTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.stroke();
    }

    var drawSingleHorizontalLine = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX, offsetY + 0.5 * tileSize);
        context.lineTo(offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawSingleTopLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.stroke();
    }

    var drawSingleTopRight = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY + tileSize);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawSingleBottomLeft = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX + tileSize, offsetY + 0.5 * tileSize);
        context.stroke();
    }

    var drawSingleBottomRight = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();
        context.moveTo(offsetX + 0.5 * tileSize, offsetY);
        context.quadraticCurveTo(offsetX + 0.5 * tileSize, offsetY + 0.5 * tileSize,
            offsetX, offsetY + 0.5 * tileSize);
        context.stroke();
    }


    /* Dynamic changing elements, for optimalisation dynamic and static rendering can be split */
    var energizerSize = 1;
    var energizerGrow = true;

    var animateElements = function() {
        energizerSize += energizerGrow ? 1 : -1;

        if (energizerSize == 7) {
            energizerGrow = false;
        }

        if (energizerSize == 0) {
            energizerGrow = true;
        }
    }

    var drawEnergizer = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();

        var radius = tileSize / 3 + (energizerSize / 32) * tileSize;
        context.arc(
            offsetX + tileSize / 2,
            offsetY + tileSize / 2,
            radius, 0, 2 * Math.PI, false);

        context.fillStyle = 'yellow';
        context.fill();
    }


    var prerenderedPointCanvas;
    var m_pointCtx;
    var drawPoint = function (context, tileSize, offsetX, offsetY) {
        if (!prerenderedPointCanvas) {
            prerenderedPointCanvas = document.createElement('canvas');
            prerenderedPointCanvas.width = tileSize;
            prerenderedPointCanvas.height = tileSize;
            var point_context = prerenderedPointCanvas.getContext('2d');
            point_context.beginPath();

            point_context.arc(
                tileSize / 2,
                tileSize / 2,
                tileSize / 8, 0, 2 * Math.PI, false);

            point_context.fillStyle = 'white';
            point_context.fill();
        }

        context.drawImage(prerenderedPointCanvas, offsetX, offsetY);

    }

    var prerenderedMaze;
    var m_ctx;
    var prerenderdTileSize;
    var endOfLevelToggle = false;

    this.renderMaze = function (theMaze,resized, tileSize, endOfLevel) {
        /* Fill canvas with black color */
        //ctx.globalCompositeOperation = "source-over";
        //ctx.fillStyle = "rgba(255,0,0,1)";
        //ctx.fillRect(0, 0, W, H);
        //ctx.lineWidth = tileSize / 8;

        /* Prerender the maze (stays the same every time) */
        if (endOfLevel || !prerenderedMaze || resized || prerenderdTileSize !== tileSize) {

            prerenderedMaze = document.createElement('canvas');
            prerenderedMaze.width = ctx.canvas.width;
            prerenderedMaze.height = ctx.canvas.height;
            prerenderdTileSize = tileSize;

            m_ctx = prerenderedMaze.getContext('2d');

            /* Fill canvas with black color */
            m_ctx.globalCompositeOperation = "source-over";
            m_ctx.fillStyle = "rgba(0,0,0,1)";
            m_ctx.fillRect(0, 0, prerenderedMaze.width, prerenderedMaze.height);

            m_ctx.lineWidth = tileSize / 8;
            if (endOfLevel) {
                m_ctx.strokeStyle = endOfLevelToggle ? "blue" : "yellow";
                endOfLevelToggle = !endOfLevelToggle;
            } else {
                m_ctx.strokeStyle = "blue";
            }

            for (var y = 0; y < verticalTiles; y++) {
                for (var x = 0; x < horizontalTiles; x++) {
                    switch (theMaze[y * horizontalTiles + x]) {
                        case ElementIDs.DTLCORNER:
                            drawDoubleTopLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DTRCORNER:
                            drawDoubleTopRight(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DBLCORNER:
                            drawDoubleBottomLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DBRCORNER:
                            drawDoubleBottomRight(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DHORLINET:
                            drawDoubleHorizontalTopLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DHORLINEB:
                            drawDoubleHorizontalBottomLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DVERTLINEL:
                            drawDoubleVerticalLineLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DVERTLINER:
                            drawDoubleVerticalLineRight(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DHORLINESVERTTL:
                            drawDoubleHorizontalTopLineToVerticalSingleLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DHORLINESVERTTR:
                            drawVerticalSingleLineToDoubleHorizontalTopLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.SVERTLINE:
                            drawSingleVerticalLineLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.SHORLINE:
                            drawSingleHorizontalLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.STLCORNER:
                            drawSingleTopLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.STRCORNER:
                            drawSingleTopRight(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.SBLCORNER:
                            drawSingleBottomLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.SBRCORNER:
                            drawSingleBottomRight(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DTRCORNERBL:
                            drawDoubleTopRightToBottomLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DBRCORNERTL:
                            drawDoubleBottomRightToTopLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DTLCORNERBL:
                            drawDoubleTopLeftToBottomLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DBLCORNERTL:
                            drawDoubleBottomLeftToTopLine(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DVERTTOHORSTL:
                            drawDoubleVerticalLineToHorizontalSingleLineBottomLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DVERTTOHORSBL:
                            drawDoubleVerticalLineToHorizontalSingleLineTopLeft(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DVERTTOHORSTR:
                            drawDoubleVerticalLineToHorizontalSingleLineBottomRight(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                        case ElementIDs.DVERTTOHORSBR:
                            drawDoubleVerticalLineToHorizontalSingleLineTopRight(m_ctx, tileSize, x * tileSize, y * tileSize);
                            break;
                    }
                }
            }
        }

        ctx.drawImage(prerenderedMaze, 0, 0);

        for (var y = 0; y < verticalTiles; y++) {
            for (var x = 0; x < horizontalTiles; x++) {
                switch (theMaze[y * horizontalTiles + x]) {
                    case ElementIDs.ENERGIZER:
                        drawEnergizer(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.PELLET:
                        drawPoint(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                }
            }
        }

        animateElements();
    }
}