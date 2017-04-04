function GhostRenderer(context) {

    //
    this.underoff = 0;
    this.underoffup = true;

    var toggle = false;
    var framesToToggle = 10;
    var frameCounter = 0;

    if (context != null) {
        context.lineWidth = 1;
    }

    var prerenderCanvases = [];
    var prerenderedTileSize;

    this.renderInfo = function (ghost, tileSize) {
        ctx.font= 2 * tileSize + "px Arial";
        // Create gradient

        ctx.fillStyle = ghost.color;

        ctx.fillText("/ " + ghost.name,ghost.x + 12 * tileSize, ghost.y + 1.3 * tileSize);
        ctx.fillText(ghost.character,ghost.x + 2 * tileSize, ghost.y + 1.3 * tileSize);


    }

    this.render = function (ghost, canBeEaten, canBeEatenAlmostEnds, tileSize) {
        var ghostSize = tileSize * 2;

        frameCounter++;

        canBeEaten = canBeEaten ? true : false;
        canBeEatenAlmostEnds  = canBeEatenAlmostEnds ? true : false;

        if (prerenderedTileSize !== tileSize) {
            prerenderedTileSize = tileSize;
            prerenderCanvases = [];
        }

        if (frameCounter % framesToToggle == 0) {
            toggle = !toggle;
        }

        var color = canBeEaten ? (canBeEatenAlmostEnds ? (toggle ? "black": "darkblue"): "darkblue") : ghost.color;

        this.x = tileSize / 2;
        this.y = tileSize / 2;

        if (this.underoffup) {
            this.underoff += 2;

            if (this.underoff > 8)
                this.underoffup = false;
        }
        else {
            this.underoff -= 2;

            if (this.underoff < -8)
                this.underoffup = true;
        }

        var _this = this;
        var found  = prerenderCanvases.find(function(c) {
            return ghost.color === ghost.color &&
                c.ghost.direction === ghost.direction &&
                c.underoff === _this.underoff &&
                    c.canBeEaten === canBeEaten &&
                    c.canBeEatenAlmostEnds === canBeEatenAlmostEnds &&
                    c.ghost.killed === ghost.killed /*&&
                    c.ghost.recovering === ghost.recoveryFrames > 0,
                    c.ghost.toggle === toggle;*/
        });

        if (!found) {
            var canvas = document.createElement('canvas');
            canvas.width = 2 * ghostSize;
            canvas.height = 2 * ghostSize;
            var m_ctx = canvas.getContext('2d');

            prerenderCanvases.push({
                underoff: this.underoff,
                ghost: {
                    color: ghost.color,
                    direction: ghost.direction,
                    killed: ghost.killed,
                    recovering: ghost.recoveryFrames > 0,
                    toggle: toggle
                },
                canBeEaten: canBeEaten,
                canBeEatenAlmostEnds: canBeEatenAlmostEnds,
                canvas: canvas
            });

            found = prerenderCanvases[prerenderCanvases.length - 1];

            // if (color == 'pink') {
            //     this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
            //     this.fill.addColorStop(0, '#FFD68E');
            //     this.fill.addColorStop(1, '#B34C84');
            // }

            if (color == 'black') {
                this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
                this.fill.addColorStop(0, '#FFDDDD');
                this.fill.addColorStop(1, '#444444');
            }

            if (color == 'blue') {
                this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
                this.fill.addColorStop(0, '#8ED6FF');
                this.fill.addColorStop(1, '#444CB3');
            }

            if (color == 'darkblue') {
                this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
                this.fill.addColorStop(0, '#3E26FF');
                this.fill.addColorStop(1, '#3E26FF');
            }

            if (color == 'red') {
                this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
                this.fill.addColorStop(0, '#FFD68E');
                this.fill.addColorStop(1, '#FF2C24');
            }

            if (color == 'yellow') {
                this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
                this.fill.addColorStop(0, '#FFFF8E');
                this.fill.addColorStop(1, '#B3BC44');
            }

            if (color == 'pink') {
                 this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
                 this.fill.addColorStop(0, '#FFFF8E');
                 this.fill.addColorStop(1, '#FF69B4');
            }

            if (color == 'green') {
                this.fill = m_ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
                this.fill.addColorStop(0, '#8EFF8E');
                this.fill.addColorStop(1, '#44BC44');
            }

            if (!ghost.killed || ghost.recoveryFrames > 0 && toggle) {

                m_ctx.beginPath();
                m_ctx.moveTo(this.x + 0, this.y + tileSize);
                m_ctx.bezierCurveTo(this.x + 0, this.y + 0, this.x + ghostSize, this.y + 0, this.x + ghostSize, this.y + tileSize);
                //ctx.lineTo(this.x + 64, this.y + 48);

                m_ctx.bezierCurveTo(this.x + this.underoff + 1 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0.75 * ghostSize, this.y + ghostSize, this.x + 0.75 * ghostSize, this.y + 0.75 * ghostSize);
                m_ctx.bezierCurveTo(this.x + this.underoff + 0.75 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0.5 * ghostSize, this.y + ghostSize, this.x + 0.5 * ghostSize, this.y + 0.75 * ghostSize);
                m_ctx.bezierCurveTo(this.x + this.underoff + 0.5 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0.25 * ghostSize, this.y + ghostSize, this.x + 0.25 * ghostSize, this.y + 0.75 * ghostSize);
                m_ctx.bezierCurveTo(this.x + this.underoff + 0.25 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0 * ghostSize, this.y + ghostSize, this.x + 0 * ghostSize, this.y + 0.5 * ghostSize);

                m_ctx.fillStyle = this.fill;
                m_ctx.fill();
                //ctx.lineTo(this.x + 0, this.y + 32);
                m_ctx.lineWidth = 1;

                // line color
                m_ctx.strokeStyle = color;
                m_ctx.stroke();
            }
            // Draw ghost eyes
            m_ctx.beginPath();
            m_ctx.arc(this.x + (18 / 64) * ghostSize, this.y + (28 / 64) * ghostSize, (7 / 64) * ghostSize, 0, 2 * Math.PI, false);
            m_ctx.fillStyle = 'white';
            m_ctx.fill();
            m_ctx.lineWidth = 1;
            m_ctx.strokeStyle = '#003300';
            m_ctx.stroke();

            m_ctx.beginPath();
            m_ctx.arc(this.x + (42 / 64) * ghostSize, this.y + (28 / 64) * ghostSize, (7 / 64) * ghostSize, 0, 2 * Math.PI, false);
            m_ctx.fillStyle = 'white';
            m_ctx.fill();
            m_ctx.lineWidth = 1;
            m_ctx.strokeStyle = '#003300';
            m_ctx.stroke();

            // Draw ghost pupils
            var offsetx = 0;
            var offsety = 0;

            switch (ghost.direction) {
                case "up":
                    offsety = -2
                    break;
                case "down":
                    offsety = 2;
                    break;
                case "left":
                    offsetx = -2;
                    break;
                case "right":
                    offsetx = 2;
                    break;

            }

            var pupilSize = (3 / 64) * ghostSize;
            pupilSize = pupilSize < 1 ? 1 : pupilSize;

            m_ctx.beginPath();
            m_ctx.arc(this.x + offsetx + (18 / 64) * ghostSize, this.y + offsety + (28 / 64) * ghostSize, pupilSize, 0, 2 * Math.PI, false);
            m_ctx.fillStyle = 'black';
            m_ctx.fill();
            m_ctx.lineWidth = 1;
            m_ctx.strokeStyle = '#003300';
            m_ctx.stroke();

            m_ctx.beginPath();
            m_ctx.arc(this.x + offsetx + (42 / 64) * ghostSize, this.y + offsety + (28 / 64) * ghostSize, pupilSize, 0, 2 * Math.PI, false);
            m_ctx.fillStyle = 'black';
            m_ctx.fill();
            m_ctx.lineWidth = 1;
            m_ctx.strokeStyle = '#003300';
            m_ctx.stroke();
        }

        this.x = ghost.x - tileSize;
        this.y = ghost.y - tileSize;
        ctx.drawImage(found.canvas, this.x, this.y);

        if (ghost.killed) {
            ctx.fillStyle = 'white';
            ctx.font = tileSize + "px Arial";
            var points = (200 * ghost.killedSeq).toString();
            ctx.fillText(points, ghost.killedX, ghost.killedY);
        }

    }
}