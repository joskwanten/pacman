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

    var drawPoint = function (context, tileSize, offsetX, offsetY) {
        context.beginPath();

        context.arc(
            offsetX + tileSize / 2,
            offsetY + tileSize / 2,
            tileSize / 8, 0, 2 * Math.PI, false);

        context.fillStyle = 'white';
        context.fill();
    }

    this.renderMaze = function (theMaze) {
        /* Fill canvas with black color */
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, W, H);

        ctx.lineWidth = tileSize / 8;
        ctx.strokeStyle = "blue";

        for (var y = 0; y < verticalTiles; y++) {
            for (var x = 0; x < horizontalTiles; x++) {
                switch (theMaze[y * horizontalTiles + x]) {
                    case ElementIDs.DTLCORNER:
                        drawDoubleTopLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DTRCORNER:
                        drawDoubleTopRight(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DBLCORNER:
                        drawDoubleBottomLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DBRCORNER:
                        drawDoubleBottomRight(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DHORLINET:
                        drawDoubleHorizontalTopLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DHORLINEB:
                        drawDoubleHorizontalBottomLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DVERTLINEL:
                        drawDoubleVerticalLineLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DVERTLINER:
                        drawDoubleVerticalLineRight(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DHORLINESVERTTL:
                        drawDoubleHorizontalTopLineToVerticalSingleLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DHORLINESVERTTR:
                        drawVerticalSingleLineToDoubleHorizontalTopLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.SVERTLINE:
                        drawSingleVerticalLineLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.SHORLINE:
                        drawSingleHorizontalLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.STLCORNER:
                        drawSingleTopLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.STRCORNER:
                        drawSingleTopRight(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.SBLCORNER:
                        drawSingleBottomLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.SBRCORNER:
                        drawSingleBottomRight(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DTRCORNERBL:
                        drawDoubleTopRightToBottomLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DBRCORNERTL:
                        drawDoubleBottomRightToTopLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DTLCORNERBL:
                        drawDoubleTopLeftToBottomLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DBLCORNERTL:
                        drawDoubleBottomLeftToTopLine(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DVERTTOHORSTL:
                        drawDoubleVerticalLineToHorizontalSingleLineBottomLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DVERTTOHORSBL:
                        drawDoubleVerticalLineToHorizontalSingleLineTopLeft(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DVERTTOHORSTR:
                        drawDoubleVerticalLineToHorizontalSingleLineBottomRight(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
                    case ElementIDs.DVERTTOHORSBR:
                        drawDoubleVerticalLineToHorizontalSingleLineTopRight(ctx, tileSize, x * tileSize, y * tileSize);
                        break;
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