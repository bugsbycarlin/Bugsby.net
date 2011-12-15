
function Star(x,y,VX,VY)
{
	this.X = x;
	this.Y = y;
	this.VX = VX;
	this.VY = VY;
	
	this.falling = true;
	
	this.color = Math.floor(Math.random() * 5);
}

StarSprites = new Array(5);
StarSprites[0] = new Image();
StarSprites[0].src = 'StarWhite.png';
StarSprites[1] = new Image();
StarSprites[1].src = 'StarRed.png';
StarSprites[2] = new Image();
StarSprites[2].src = 'StarBlue.png';
StarSprites[3] = new Image();
StarSprites[3].src = 'StarGreen.png';
StarSprites[4] = new Image();
StarSprites[4].src = 'StarYellow.png';

Star.prototype.Draw = function(context)
{	
	context.drawImage(StarSprites[this.color], backgroundScrollX + this.X - 15, backgroundScrollY + this.Y - 15);
}

Star.prototype.Update = function()
{	
	this.X += this.VX;
	this.Y += this.VY;
	
	if(this.falling)
	{
		this.VY += Gravity;
	}
}


function Teardrop(x,y,VX,VY)
{
	this.X = x;
	this.Y = y;
	this.VX = VX;
	this.VY = VY;
	
	this.originalY = this.Y;
	
	this.falling = true;
	this.visible = true;
}

TeardropSprite = new Image();
TeardropSprite.src = 'Teardrop.png';

Teardrop.prototype.Draw = function(context)
{	
	if(this.visible) context.drawImage(TeardropSprite, backgroundScrollX + this.X - 7, backgroundScrollY + this.Y - 7);
}

Teardrop.prototype.Update = function()
{	
	this.X += this.VX;
	this.Y += this.VY;
	
	if(this.falling)
	{
		this.VY += Gravity;
	}
	
	if(this.Y - this.originalY > 50) this.visible = false;
	
}


function Flag(x,y,VX,VY)
{
	this.X = x;
	this.Y = y;
	this.VX = VX;
	this.VY = VY;
	
	this.originalY = this.Y;
	
	this.falling = true;
}

FlagSprite = new Image();
FlagSprite.src = 'Flag.png';

Flag.prototype.Draw = function(context)
{	
	context.drawImage(FlagSprite, backgroundScrollX + this.X - 30, backgroundScrollY + this.Y - 21);
}

Flag.prototype.Update = function()
{	
	this.X += this.VX;
	this.Y += this.VY;
	
	if(this.falling)
	{
		this.VY += Gravity;
	}
}

function Cloud(x,y)
{
	this.X = x;
	this.Y = y;
	this.sprite = CloudSprite[Math.floor(Math.random() * 9)];
}

CloudSprite = new Array(9);
CloudSprite[0] = new Image();
CloudSprite[0].src = 'Cloud1.png';
CloudSprite[1] = new Image();
CloudSprite[1].src = 'Cloud2.png';
CloudSprite[2] = new Image();
CloudSprite[2].src = 'Cloud3.png';
CloudSprite[3] = new Image();
CloudSprite[3].src = 'Cloud4.png';
CloudSprite[4] = new Image();
CloudSprite[4].src = 'Cloud5.png';
CloudSprite[5] = new Image();
CloudSprite[5].src = 'Cloud6.png';
CloudSprite[6] = new Image();
CloudSprite[6].src = 'Cloud7.png';
CloudSprite[7] = new Image();
CloudSprite[7].src = 'Cloud8.png';
CloudSprite[8] = new Image();
CloudSprite[8].src = 'Cloud9.png';

Cloud.prototype.Draw = function(context)
{	
	context.drawImage(this.sprite, backgroundScrollX + this.X, backgroundScrollY + this.Y);
}








function Yoshi(x,y)
{
	this.X = x;
	this.Y = y;
	this.groundY = y;
	this.VX = 0;
	this.VY = 0;
	
	this.lastX = x;
	this.lastY = y;
	
	this.platform = null;
	
	this.leftBound = -45;
	this.rightBound = 45;
	this.topBound = 0;
	this.bottomBound = 110;
	
	this.runningAnimation = 0;
	
	this.falling = true;
	
	this.visible = true;
	
	this.sprite = YoshiSprite;
}

YoshiSprite = new Image();
YoshiSprite.src = 'Yoshi.png';

Yoshi.prototype.Draw = function(context)
{
	if(this.visible) context.drawImage(this.sprite, backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y);
}

Yoshi.prototype.Update = function(platforms, bugsby)
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
	
	this.runningAnimation += 1;
	
	if(this.falling)
	{
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
	
	//this.VX *= 0.75;
}



function Wave(x,y)
{
	this.X = x;
	this.Y = y;
	this.sway = 0;
	this.animationCounter = 0;
}

WaveSprite = new Image();
WaveSprite.src = 'Waves.png';

Wave.prototype.Draw = function(context)
{	
	this.animationCounter++;
	this.sway = 20 * Math.sin(this.animationCounter * Math.PI / 60)
	context.drawImage(WaveSprite, backgroundScrollX + this.X + this.sway, backgroundScrollY + this.Y);
}