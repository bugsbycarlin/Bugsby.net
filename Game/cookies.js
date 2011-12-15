
function Cookie(x,y)
{
	//console.log("makin' cookie");
	this.X = x;
	this.Y = y;
	this.groundY = y;
	this.VX = 0;
	this.VY = 0;
	
	this.falling = true;
	
	this.platform = null;
	
	this.leftBound = -20;
	this.rightBound = 20;
	this.topBound = 0;
	this.bottomBound = 40;
	
	this.sprite = CookieSprite;
	
	this.eaten = false;
	this.grabbed = false;
}

CookieSprite = new Image();
CookieSprite.src = 'Cookie.png';

Cookie.prototype.Draw = function(context)
{	
	if(!this.disabled)
	{
		context.drawImage(this.sprite, backgroundScrollX + this.X - 20, backgroundScrollY + this.Y);
	}
}

Cookie.prototype.Update = function(platforms,bugsby)
{
	if(this.eaten)
	{
		//this.X = 0.95 * this.X + 0.05 * (30 - backgroundScrollX);
		//this.Y = 0.95 * this.Y + 0.05 * (10 - backgroundScrollY);
		
		angle = Math.atan2((10 - backgroundScrollY) - this.Y, (30 - backgroundScrollX) - this.X);
		
		this.VX += 15 * Math.cos(angle);
		this.VY += 15 * Math.sin(angle);
		
		this.X += this.VX;
		this.Y += this.VY;
		
		xD = Math.abs(this.X - (30 - backgroundScrollX));
		yD = Math.abs(this.Y - (10 - backgroundScrollY));
		d = Math.sqrt(xD * xD + yD * yD);
		
		this.VX *= 0.6;
		this.VY *= 0.6;
		
		if(d < 20)
		{
			NumCookies++;
			this.grabbed = true;
		}
	}
	else if(!this.eaten)
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
			this.eaten = true;
			this.VX = 0;
			this.VY = 0;
			this.falling = false;
		}
	}
}