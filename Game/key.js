
function Key(x,y)
{
	this.X = x;
	this.Y = y;
	this.groundY = y;
	this.VX = 0;
	this.VY = 0;
	
	this.falling = true;
	
	this.platform = null;
	
	this.leftBound = -55;
	this.rightBound = 55;
	this.topBound = 0;
	this.bottomBound = 50;
	
	this.sprite = KeySprite;
	
	this.grabbed = false;
}

KeySprite = new Image();
KeySprite.src = 'Key.png';

Key.prototype.Draw = function(context)
{	
	context.drawImage(this.sprite, backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
}

Key.prototype.Update = function(platforms,bugsby)
{
	if(!this.grabbed)
	{
		this.lastX = this.X;
		this.lastY = this.Y;
	
		if(!this.falling)
		{
			this.VY = 0;
		
			if(this.platform != null)
			{
				this.platform.SetHeight(this);
			
				if(!this.platform.PlatformDetect(this))
				{
					this.falling = true;
					this.platform = null;
				}
			}
		}
	
		this.X += this.VX;
		this.Y += this.VY;
	
	
		if(this.falling)
		{
			//console.log("falling");
			this.VY += Gravity;
		
			for(p in platforms)
			{
				platform = platforms[p];
				if(platform.PlatformDetect(this))
				{
					this.falling = false;
					this.VY = 0;
					this.groundY = platform.top - this.bottomBound;
					this.platform = platform;
				}
			}
		}
	
		if(bugsby.HitDetect(this.X, this.Y))
		{
			SecondEnding = true;
			Wiping = true;
			WipeCenterX = this.X;
			WipeCenterY = this.Y;
		}
	}
}