
function Baddie(x,y,behavior,item)
{
	this.X = x;
	this.Y = y;
	this.groundY = y;
	this.VX = -2;
	this.VY = 0;
	
	this.lastX = x;
	this.lastY = y;
	
	this.platform = null;
	
	this.leftBound = -30;
	this.rightBound = 30;
	this.topBound = 0;
	this.bottomBound = 60;
	
	this.runningAnimation = 0;
	
	this.behavior = behavior;
	
	this.item = item;
	
	this.falling = true;
	
	this.dying = false;
	
	this.sprite = BaddieSprite;
	
	this.hoverMin = this.Y - 150;
	this.hoverMax = this.Y + 100;
}

BaddieSprite = new Array(7);
BaddieSprite[0] = new Image();
BaddieSprite[0].src = 'BaddieWalk1.png';
BaddieSprite[1] = new Image();
BaddieSprite[1].src = 'BaddieWalk2.png';
BaddieSprite[2] = new Image();
BaddieSprite[2].src = 'BaddieStomped.png';
BaddieSprite[3] = new Image();
BaddieSprite[3].src = 'BaddieWalk1Flipped.png';
BaddieSprite[4] = new Image();
BaddieSprite[4].src = 'BaddieWalk2Flipped.png';
BaddieSprite[5] = new Image();
BaddieSprite[5].src = 'BaddieHover.png';
BaddieSprite[6] = new Image();
BaddieSprite[6].src = 'BaddieHover2.png';

BaddieRunPower = 1.0;
BaddieFriction = 0.75;

BaddieRunningAnimationSequence = [0,1];

Baddie.prototype.Draw = function(context)
{
	if(debugMode)
	{
		context.strokeStyle = "#4400FF";
		context.lineWidth = 2;

		context.beginPath();
		context.moveTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + this.topBound);
		context.lineTo(backgroundScrollX + this.X + this.rightBound, backgroundScrollY + this.Y + this.topBound);
		context.lineTo(backgroundScrollX + this.X + this.rightBound, backgroundScrollY + this.Y + this.bottomBound);
		context.lineTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + this.bottomBound);
		context.lineTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + this.topBound);
		context.stroke();
		
		context.strokeStyle = "#FF00FF";
		context.beginPath();
		context.moveTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
		context.lineTo(backgroundScrollX + this.X + this.rightBound, backgroundScrollY + this.Y);
		context.stroke();
		
		context.strokeStyle = "#FF00FF";
		context.beginPath();
		context.moveTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + 10);
		context.lineTo(backgroundScrollX + this.X + this.rightBound, backgroundScrollY + this.Y + 10);
		context.stroke();
		
		context.strokeStyle = "#FF00FF";
		context.beginPath();
		context.moveTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + 25);
		context.lineTo(backgroundScrollX + this.X + this.rightBound, backgroundScrollY + this.Y + 25);
		context.stroke();
	}
		
	if(this.dying)
	{
		context.drawImage(this.sprite[2], backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
		
		return;
	}
	
	if(this.behavior == "hover")
	{
		if(!this.falling)
		{
			context.drawImage(this.sprite[5 + this.runningAnimation % 2], backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
		}
		else
		{
			frame = 6;
			if(this.runningAnimation % 2 == 0) frame = 0;
			context.drawImage(this.sprite[frame], backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);		
		}
	}
	else
	{
	
		flip = 0;
		if(this.VX > 0)
		{
			flip = 3;
		}

		if(!this.falling)
		{
			if(Math.abs(this.VX) < BaddieRunPower)
			{
				//Standing
				context.drawImage(this.sprite[0+flip], backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
			}
			else
			{
				//Running
				animationFrame = BaddieRunningAnimationSequence[Math.floor((this.runningAnimation % 16) / 8)];
				context.drawImage(this.sprite[animationFrame+flip], backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
			
			
			}
		}
		else
		{
			context.drawImage(this.sprite[0+flip], backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
		}
	}
}

Baddie.prototype.Update = function(platforms, bugsby)
{
	if(this.behavior == "hover")
	{
		this.HoverUpdate(platforms, bugsby);
		return;
	}
	
	this.lastX = this.X;
	this.lastY = this.Y;
	
	if(this.dying)
	{
		this.Y += this.VY;

		this.VY += Gravity;
		
		return;
	}
	
	if(this.behavior == "chase" && !this.falling && !bugsby.dying)
	{
		if(Math.abs(this.VX) < 1)
		{	
			if(this.X < bugsby.X)
			{
				this.VX += BaddieRunPower;
			}
			else if(this.X > bugsby.X)
			{
				this.VX -= BaddieRunPower;
			}
		}
		else
		{
			if(this.X < bugsby.X + 20 && this.VX > 0)
			{
				this.VX += BaddieRunPower;
			}
			else if(this.X > bugsby.X - 20 && this.VX < 0)
			{
				this.VX -= BaddieRunPower;
			}
		}
	}
	
	if(this.behavior == "patrol" && !this.falling)
	{		
		if(this.VX < 0 && this.X > this.platform.left + BaddieRunPower + 10)
		{
			this.VX -= BaddieRunPower;
		}
		else if(this.VX < 0 && this.X <= this.platform.left + BaddieRunPower + 10)
		{
			this.X = this.platform.left + 10;
			this.VX = 0.55;
		}
		else if(this.VX > 0 && this.X < this.platform.right - BaddieRunPower - 10)
		{
			this.VX += BaddieRunPower;
		}
		else if(this.VX > 0 && this.X >= this.platform.right - BaddieRunPower - 10)
		{
			this.X = this.platform.right - 10;
			this.VX = -0.55;
		}
	}
	
	if(this.StompDetect(bugsby) && !this.dying)
	{
		this.Y += -20;
		bugsby.VY = -10;
		this.dying = true;
		
		MakeItem(this.item, this.X, this.Y);
		
		for(i = 0; i < 3; i++)
		{
			Stars.push(new Star(this.X,this.Y,Math.floor(Math.random() * 20) - 10, -10 + -1 * Math.floor(Math.random() * 20)));
		}
	}
	else if(!bugsby.dying && (bugsby.HitDetect(this.X, this.Y) || bugsby.HitDetect(this.X, this.Y + this.bottomBound / 2)))
	{
		if(!bugsby.cartwheeling)
		{
			for(i = 0; i < 3; i++)
			{
				Stars.push(new Star(this.X,this.Y,Math.floor(Math.random() * 20) - 10, -10 + -1 * Math.floor(Math.random() * 20)));
			}
			
			if(!Cheat.Invincible)
			{
				bugsby.dying = true;
			}
			else
			{
				this.dying = true;
			}
		}
		else
		{
			this.Y += -20;
			this.dying = true;

			MakeItem(this.item, this.X, this.Y);

			for(i = 0; i < 2; i++)
			{
				Stars.push(new Star(this.X,this.Y,Math.floor(Math.random() * 20) - 10, -10 + -1 * Math.floor(Math.random() * 20)));
			}
		}
	}
	
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
	
	this.runningAnimation += 1;
	
	
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
	
	this.VX *= BaddieFriction;
	
	if(Math.abs(this.VX) < BugsbyRunPower / 2)
	{
		this.runningAnimation = 0;
	}
}

Baddie.prototype.HoverUpdate = function(platforms, bugsby)
{
	this.VX = 0;
	
	this.lastX = this.X;
	this.lastY = this.Y;
	
	if(this.dying)
	{
		this.Y += this.VY;

		this.VY += Gravity;
		
		return;
	}
	
	if(this.behavior == "hover" && !this.falling)
	{
		if(this.Y > this.hoverMin)
		{
			this.VY -= Gravity / 4;
			if(this.VY < -2 * Gravity) this.VY = -2 * Gravity;
		}
		else
		{
			this.VY = 0;
			this.falling = true;
		}
	}
	else if(this.behavior == "hover" && this.falling)
	{
		this.VY += Gravity / 4;
		if(this.VY > 2 * Gravity) this.VY = 2 * Gravity;
		
		if(this.Y > this.hoverMax)
		{
			this.VY = 0;
			this.falling = false;
		}
	}
	
	if(this.StompDetect(bugsby) && !this.dying)
	{
		bugsby.VY = -20 + this.VY;
		this.dying = true;
		
		MakeItem(this.item, this.X, this.Y);
		
		for(i = 0; i < 3; i++)
		{
			Stars.push(new Star(this.X,this.Y,Math.floor(Math.random() * 20) - 10, -10 + -1 * Math.floor(Math.random() * 20)));
		}
		
		//this.falling = true;
		//this.behavior = "chase";
	}
	else if(!bugsby.dying && (bugsby.HitDetect(this.X, this.Y) || bugsby.HitDetect(this.X, this.Y + this.bottomBound / 2)))
	{	
		if(!bugsby.cartwheeling)
		{	
			for(i = 0; i < 3; i++)
			{
				Stars.push(new Star(this.X,this.Y,Math.floor(Math.random() * 20) - 10, -10 + -1 * Math.floor(Math.random() * 20)));
			}
			
			if(!Cheat.Invincible)
			{
				bugsby.dying = true;
			}
			else
			{
				this.dying = true;
			}
		}
		else
		{
			this.dying = true;

			MakeItem(this.item, this.X, this.Y);

			for(i = 0; i < 2; i++)
			{
				Stars.push(new Star(this.X,this.Y,Math.floor(Math.random() * 20) - 10, -10 + -1 * Math.floor(Math.random() * 20)));
			}
		}
	}
	
	this.X += this.VX;
	this.Y += this.VY;
	
	this.runningAnimation += 1;
}

Baddie.prototype.StompDetect = function(bugsby)
{
	if(bugsby.X + bugsby.rightBound < this.X + this.leftBound || bugsby.X + bugsby.leftBound > this.X + this.rightBound)
	{
		return false;
	}
	
	//generous
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.Y + 25 && bugsby.Y + bugsby.bottomBound <= this.Y + 25)
	{
		return true;
	}
	
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.Y + 10 && bugsby.Y + bugsby.bottomBound <= this.Y + 10)
	{
		return true;
	}
	
	if(bugsby.Y + bugsby.VY + bugsby.bottomBound >= this.Y && bugsby.Y + bugsby.bottomBound <= this.Y)
	{
		return true;
	}
	
	return false;
}