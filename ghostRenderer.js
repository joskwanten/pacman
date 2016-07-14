function GhostRenderer(context, tileSize) {

    //
    this.underoff = 0;
    this.underoffup = true;

    var toggle = false;
    var framesToToggle = 10;
    var frameCounter = 0;

    if (context != null) {
        context.lineWidth = 1;
    }

    var ghostSize = tileSize * 2;

    this.render = function (ghost, canBeEaten, canBeEatenAlmostEnds) {
        frameCounter++;

        if (frameCounter % framesToToggle == 0) {
            toggle = !toggle;
        }

        var color = canBeEaten ? (canBeEatenAlmostEnds ? (toggle ? "black": "pink"): "pink") : ghost.color;

        this.x = ghost.x - tileSize / 2;
        this.y = ghost.y - tileSize / 2;


        if (color == 'pink') {
            this.fill = ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
            this.fill.addColorStop(0, '#FFD68E');
            this.fill.addColorStop(1, '#B34C84');
        }

        if (color == 'black') {
            this.fill = ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
            this.fill.addColorStop(0, '#FFDDDD');
            this.fill.addColorStop(1, '#444444');
        }

        if (color == 'blue') {
            this.fill = ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
            this.fill.addColorStop(0, '#8ED6FF');
            this.fill.addColorStop(1, '#444CB3');
        }

        if (color == 'red') {
            this.fill = ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
            this.fill.addColorStop(0, '#FFD68E');
            this.fill.addColorStop(1, '#B34C44');
        }

        if (color == 'yellow') {
            this.fill = ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
            this.fill.addColorStop(0, '#FFFF8E');
            this.fill.addColorStop(1, '#B3BC44');
        }

        if (color == 'green') {
            this.fill = ctx.createLinearGradient(this.x, this.y, this.x + ghostSize, this.y + ghostSize);
            this.fill.addColorStop(0, '#8EFF8E');
            this.fill.addColorStop(1, '#44BC44');
        }

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


        if(!ghost.killed || ghost.recoveryFrames > 0 && toggle) {

            ctx.beginPath();
            ctx.moveTo(this.x + 0, this.y + tileSize);
            ctx.bezierCurveTo(this.x + 0, this.y + 0, this.x + ghostSize, this.y + 0, this.x + ghostSize, this.y + tileSize);
            //ctx.lineTo(this.x + 64, this.y + 48);

            ctx.bezierCurveTo(this.x + this.underoff + 1 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0.75 * ghostSize, this.y + ghostSize, this.x + 0.75 * ghostSize, this.y + 0.75 * ghostSize);
            ctx.bezierCurveTo(this.x + this.underoff + 0.75 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0.5 * ghostSize, this.y + ghostSize, this.x + 0.5 * ghostSize, this.y + 0.75 * ghostSize);
            ctx.bezierCurveTo(this.x + this.underoff + 0.5 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0.25 * ghostSize, this.y + ghostSize, this.x + 0.25 * ghostSize, this.y + 0.75 * ghostSize);
            ctx.bezierCurveTo(this.x + this.underoff + 0.25 * ghostSize, this.y + ghostSize, this.x + this.underoff + 0 * ghostSize, this.y + ghostSize, this.x + 0 * ghostSize, this.y + 0.5 * ghostSize);

            ctx.fillStyle = this.fill;
            ctx.fill();
            //ctx.lineTo(this.x + 0, this.y + 32);
            ctx.lineWidth = 1;

            // line color
            ctx.strokeStyle = ghost.color;
            ctx.stroke();
        }
        // Draw ghost eyes
        ctx.beginPath();
        ctx.arc(this.x + (18 / 64) * ghostSize, this.y + (28 / 64) * ghostSize, (7 / 64) * ghostSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + (42 / 64) * ghostSize, this.y + (28 / 64) * ghostSize, (7 / 64) * ghostSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();


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

        ctx.beginPath();
        ctx.arc(this.x + offsetx + (18 / 64) * ghostSize, this.y + offsety + (28 / 64) * ghostSize, pupilSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + offsetx + (42 / 64) * ghostSize, this.y + offsety + (28 / 64) * ghostSize, pupilSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
}