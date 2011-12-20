
function Lightbulb(x,y)
{
	this.X = x;
	this.Y = y;
	this.groundY = y;
	this.VX = 0;
	this.VY = 0;
	
	this.falling = true;
	
	this.platform = null;
	
	this.leftBound = -17;
	this.rightBound = 17;
	this.topBound = 0;
	this.bottomBound = 52;
	
	this.sprite = LightbulbSprite;
	
	this.grabbed = false;
}

LightbulbSprite = new Image();
LightbulbSprite.src = 'Images/Lightbulb.png';

Lightbulb.prototype.Draw = function(context)
{	
	if(!this.disabled)
	{
		context.drawImage(this.sprite, backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
	}
}

Lightbulb.prototype.Update = function(platforms,bugsby)
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
					//console.log("a hit here " + platform.left + " " + platform.right);
					this.falling = false;
					this.VY = 0;
					this.groundY = platform.top - this.bottomBound;
					this.platform = platform;
				}
			}
		}
	
		if(bugsby.HitDetect(this.X, this.Y))
		{
			this.grabbed = true;
			bugsby.ideaPower = true;
			bugsby.ideaTimer = 200;
			bugsby.tracksuitPower = false;
			bugsby.tracksuitTimer = 0;
			
			for(i = 0; i < 24; i++)
			{
				vx = 50 * Math.cos(i * Math.PI / 12);
				vy = 50 * Math.sin(i * Math.PI / 12);
				Stars.push(new Star(this.X,this.Y,vx,vy));
			}
		}
	}
}