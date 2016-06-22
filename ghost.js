function Ghost() {							
	this.x = 0;
	this.y = 0;
	this.sx = 0;
	this.sy = 0;
	this.canvas = null;
	this.ctx = null;
	this.imageToggle = false;
	this.underoff = 0;
	this.underoffup = true;
	
	this.width = 64;
	this.height = 64;
	
	this.fill = null;
	this.color = null;
	this.aidirection = 0; // 1 = up, 2 = right, 3 = down, 4 = left
	this.updateCounter = 0;
	
	this.setCanvasAndContect = function(canvas, ctx, color) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.color = color;							
	}
	
	this.findPath = function(level) {
		this.updateCounter++;
		
		if (this.aidirection == 0)
			this.aidirection = Math.floor((Math.random()*4)+1);
	
		var aincrement = 4
		var axnew = this.x;
		var aynew = this.y;
								
		if (this.aidirection == 1) // Up
			aynew = aynew - aincrement;
		
		if (this.aidirection == 3) // Down
			aynew = aynew + aincrement;
							
		if (this.aidirection == 4) // Left
			axnew = axnew - aincrement;
		
		if (this.aidirection == 2) // Right
			axnew = axnew + aincrement;
		
		axnew = axnew < 0 ? 0 : axnew;
		axnew = axnew > this.canvas.width ? this.canvas.width : axnew;
	
		aynew = aynew < 0 ? 0 : aynew;
		aynew = aynew > this.canvas.height ? this.canvas.height : aynew;
		
		// Check if move is allowed in the maze
		var row = Math.floor(axnew / 64);
		var col = Math.floor(aynew / 64);
		var row2 = Math.ceil(axnew / 64);
		var col2 = Math.ceil(aynew / 64);
	
		if (level[col][row] != wall && level[col2][row2] != wall & level[col][row2] != wall && level[col2][row] != wall) {																								
			this.setPosition(axnew, aynew);
		
			if (this.updateCounter > 250)
			{
				this.updateCounter = 0;
				this.aidirection = Math.floor((Math.random()*4)+1);
			}
		}				
		else {
			this.aidirection = Math.floor((Math.random()*4)+1);
		}
	}
	
	this.setPosition = function(x1, y1) {
		// clipping
		x1 = x1 > (this.canvas.width - this.width) ? (this.canvas.width - this.width): (x1 < 0 ? 0 : x1);
		y1 = y1 > (this.canvas.height - this.height) ? (this.canvas.height - this.height) : (y1 < 0 ? 0 : y1);
		
		// Direction vector
		this.sx = x1 - this.x;
		this.sy = y1 - this.y;
		
		// Update position
		this.x = x1;
		this.y = y1;
	}
	
	this.draw = function() {
		if (this.color == 'blue') {
			this.fill = ctx.createLinearGradient(this.x, this.y, this.x + 64, this.y + 64);							
			this.fill.addColorStop(0, '#8ED6FF');   
			this.fill.addColorStop(1, '#444CB3');						
		}
		
		if (this.color == 'red') {
			this.fill = ctx.createLinearGradient(this.x, this.y, this.x + 64, this.y + 64);
			this.fill.addColorStop(0, '#FFD68E');   
			this.fill.addColorStop(1, '#B34C44');						
		}
		
		if (this.color == 'yellow') {
			this.fill = ctx.createLinearGradient(this.x, this.y, this.x + 64, this.y + 64);
			this.fill.addColorStop(0, '#FFFF8E');   
			this.fill.addColorStop(1, '#B3BC44');						
		}
		
		if (this.color == 'green') {
			this.fill = ctx.createLinearGradient(this.x, this.y, this.x + 64, this.y + 64);
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
							
		ctx.beginPath();
		ctx.moveTo(this.x + 0, this.y + 32);
		ctx.bezierCurveTo(this.x + 0, this.y + 0, this.x + 64, this.y + 0, this.x + 64, this.y + 32);
		//ctx.lineTo(this.x + 64, this.y + 48);
		
		ctx.bezierCurveTo(this.x+ this.underoff 				 + 64, this.y + 64, this.x + this.underoff + 48, this.y + 64, this.x + 48, this.y + 48);
		ctx.bezierCurveTo(this.x + this.underoff + 48, this.y + 64, this.x + this.underoff + 32, this.y + 64, this.x + 32, this.y + 48);
		ctx.bezierCurveTo(this.x + this.underoff + 32, this.y + 64, this.x + this.underoff + 16, this.y + 64, this.x + 16, this.y + 48);
		ctx.bezierCurveTo(this.x + this.underoff + 16, this.y + 64, this.x + this.underoff +  0, this.y + 64, this.x +  0, this.y + 32);
		
		ctx.fillStyle = this.fill;
		ctx.fill();
		//ctx.lineTo(this.x + 0, this.y + 32);
		ctx.lineWidth = 1;
	
		// line color
		ctx.strokeStyle = this.color;
		ctx.stroke();
		
		// Draw ghost eyes
		ctx.beginPath();
		ctx.arc(this.x + 18, this.y + 28, 7, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
		ctx.stroke();
	
		ctx.beginPath();
		ctx.arc(this.x + 42, this.y + 28, 7, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
		ctx.stroke();				
	
		// Draw ghost pupils
		var offsetx = this.sx > 0 ? 2 : (this.sx < 0 ? -2 : 0);
		var offsety = this.sy > 0 ? 2 : (this.sy < 0 ? -2 : 0);
		
		ctx.beginPath();
		ctx.arc(this.x + offsetx + 18, this.y + offsety + 28, 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
		ctx.stroke();								
		
		ctx.beginPath();
		ctx.arc(this.x + offsetx + 42, this.y + offsety + 28, 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
		ctx.stroke();				
	}									
};