
function Platform(x1,x2,y1)
{
	this.left = x1;
	this.right = x2;
	this.top = y1;
	this.type = "flat";
}


Platform.prototype.PlatformDetect = function(bugsby)
{
	if(bugsby.X < this.left - 10 || bugsby.X > this.right + 10)
	{
		return false;
	}
	
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.top && bugsby.Y + bugsby.bottomBound <= this.top)
	{
		return true;
	}
	
	return false;
}

Platform.prototype.SetHeight = function(bugsby)
{
	bugsby.Y = this.top - bugsby.bottomBound;
}

Platform.prototype.DebugDraw = function(context)
{
	context.strokeStyle = "#00FF00";
	context.lineWidth = 2;
	
	context.beginPath();
	context.moveTo(backgroundScrollX + this.left, backgroundScrollY + this.top);
	context.lineTo(backgroundScrollX + this.right, backgroundScrollY + this.top);
	context.stroke();
}

function SlantedPlatform(x1,y1,x2,y2)
{
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.left = x1 + 2;
	this.right = x2 - 2;
	this.type = "slanted";
}


SlantedPlatform.prototype.PlatformDetect = function(bugsby)
{
	//console.log("checking " + bugsby.Y);
	if(bugsby.X <= this.x1 || bugsby.X >= this.x2)
	{
		return false;
		//console.log("not on this one");
	}

	target = this.y1 + (bugsby.X - this.x1)/(this.x2 - this.x1) * (this.y2 - this.y1);
	
	//console.log(target);
	//console.log(bugsby.Y + bugsby.bottomBound);
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= target && bugsby.Y + bugsby.bottomBound <= target)
	{
		return true;
	}

	return false;
}

SlantedPlatform.prototype.SetHeight = function(bugsby)
{
	if(bugsby.X > this.x1 && bugsby.X < this.x2)
	{
		bugsby.Y = this.y1 + (bugsby.X - this.x1)/(this.x2 - this.x1) * (this.y2 - this.y1) - bugsby.bottomBound;
	}
}


SlantedPlatform.prototype.DebugDraw = function(context)
{
	context.strokeStyle = "#00FF00";
	context.lineWidth = 2;
	
	context.beginPath();
	context.moveTo(backgroundScrollX + this.x1, backgroundScrollY + this.y1);
	context.lineTo(backgroundScrollX + this.x2, backgroundScrollY + this.y2);
	context.stroke();
}



function MovingPlatform(x1,x2,y1)
{
	this.left = x1;
	this.right = x2;
	this.top = y1;
	this.type = "moving";
	this.direction = 1;
	
	this.hoverMin = this.top - 150;
	this.hoverMax = this.top + 100;
	
	this.top = this.hoverMin + Math.floor(Math.random() * (this.hoverMax - this.hoverMin));
	
	this.speed = 2 + Math.floor(Math.random() * 3);
}

MovingPlatform.prototype.PlatformDetect = function(bugsby)
{
	if(bugsby.X < this.left - 10 || bugsby.X > this.right + 10)
	{
		return false;
	}
	
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.top && bugsby.Y + bugsby.bottomBound <= this.top)
	{
		return true;
	}
	
	//need extra checks to account for directional change, since this platform will update,
	//and to be nice, we need to do both, since the direction might just have changed
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.top + 1 && bugsby.Y + bugsby.bottomBound <= this.top + 1)
	{
		return true;
	}
	
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.top - 1 && bugsby.Y + bugsby.bottomBound <= this.top - 1)
	{
		return true;
	}
	
	return false;
}

MovingPlatform.prototype.SetHeight = function(bugsby)
{
	bugsby.Y = this.top - bugsby.bottomBound;
}

MovingPlatformSprite = new Image();
MovingPlatformSprite.src = "MovingPlatform.png";

MovingPlatform.prototype.DebugDraw = function(context)
{
	this.Draw(context);
	
	context.strokeStyle = "#00FF00";
	context.lineWidth = 2;
	
	context.beginPath();
	context.moveTo(backgroundScrollX + this.left, backgroundScrollY + this.top);
	context.lineTo(backgroundScrollX + this.right, backgroundScrollY + this.top);
	context.stroke();
}

MovingPlatform.prototype.Draw = function(context)
{
	context.drawImage(MovingPlatformSprite, backgroundScrollX + this.left, backgroundScrollY + this.top);
}

MovingPlatform.prototype.Update = function(bugsby)
{
	if(this.direction == 1 && this.top > this.hoverMin)
	{
		this.top -= this.speed;
		if(this.top <= this.hoverMin)
		{
			this.direction = -1;
		}
	}
	else if(this.direction == -1 && this.top < this.hoverMax)
	{
		this.top += this.speed;
		if(this.top >= this.hoverMax)
		{
			this.direction = 1;
		}
	}
}




function SlidingPlatform(x1,x2,y1,slideLength)
{
	this.left = x1;
	this.right = x2;
	this.top = y1;
	this.type = "sliding";
	
	this.originalLeft = this.left;
	
	this.width = (this.right - this.left);
	
	this.activated = false;
	
	this.slideLength = slideLength;
	
	this.speed = 5;
	
	this.animationCounter = 0;
	
	this.finishCounter = 40;
	
	this.visible = true;
}


SlidingPlatform.prototype.PlatformDetect = function(bugsby)
{
	if(!this.visible) return false;
	
	if(bugsby.X < this.left - 10 || bugsby.X > this.right + 10)
	{
		return false;
	}
	
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.top && bugsby.Y + bugsby.bottomBound <= this.top)
	{
		return true;
	}
	
	return false;
}

SlidingPlatform.prototype.SetHeight = function(bugsby)
{
	bugsby.Y = this.top - bugsby.bottomBound;
}

SlidingPlatformSprite = new Image();
SlidingPlatformSprite.src = "SlidingPlatform.png";

SlidingPlatform.prototype.DebugDraw = function(context)
{
	this.Draw(context);
	
	context.strokeStyle = "#00FF00";
	context.lineWidth = 2;
	
	context.beginPath();
	context.moveTo(backgroundScrollX + this.left, backgroundScrollY + this.top);
	context.lineTo(backgroundScrollX + this.right, backgroundScrollY + this.top);
	context.stroke();
}

SlidingPlatform.prototype.Draw = function(context)
{
	context.strokeStyle = "#000000";
	context.lineWidth = 2;
	
	context.beginPath();
	context.moveTo(backgroundScrollX + this.originalLeft, backgroundScrollY + this.top + 20);
	context.lineTo(backgroundScrollX + this.originalLeft + this.slideLength + this.width, backgroundScrollY + this.top + 20);
	context.stroke();
	
	if(this.visible)
	{	
		if(this.left - this.originalLeft < this.slideLength - this.width || this.animationCounter % 2 == 0)
			context.drawImage(SlidingPlatformSprite, backgroundScrollX + this.left, backgroundScrollY + this.top);
	}
}

SlidingPlatform.prototype.Update = function(bugsby)
{
	if(this.activated && this.visible)
	{
		this.animationCounter++;
					
		if(this.left < this.originalLeft + this.slideLength)
		{			
			this.left += this.speed;
			this.right += this.speed;
			
			if(bugsby.platform == this)
			{
				bugsby.X += this.speed;
				
				backgroundScrollX -= this.speed;
			}
			
			for(b in Baddies)
			{
				baddie = Baddies[b];
				if(baddie.platform == this)
				{
					baddie.X += this.speed;
				}
			}
			
			for(i in Items)
			{
				item = Items[i];
				if(item.platform == this)
				{
					item.X += this.speed;
				}
			}
		}
		else
		{
			
			if(this.finishCounter > 0)
			{
				this.finishCounter--;
			}
			else if(this.finishCounter <= 0)
			{
				this.visible = false;
			
				if(bugsby.platform == this)
				{
					bugsby.platform = null;
					bugsby.falling = true;
				}
			
				for(b in Baddies)
				{
					baddie = Baddies[b];
					if(baddie.platform == this)
					{
						baddie.platform = null;
						baddie.falling = true;
					}
				}
			
				for(i in Items)
				{
					item = Items[i];
					if(item.platform == this)
					{
						item.platform = null;
						item.falling = true;
					}
				}
			}
		}
	}
}