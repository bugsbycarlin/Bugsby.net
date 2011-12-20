function SecondEndingInit()
{
	Platforms = new Array();
	
	Platforms.push(new Platform(-300, 500, 498));

	mainBugsby = new Bugsby(-100, 498 - 116);
	
	backgroundScrollX = 0;
	backgroundScrollY = 0;
	
	Phase = 0;
	PhaseTimer = 0;
	
	CreditScroll = 580;
	
	Wave1 = new Wave(450,510);
	Wave2 = new Wave(420,510);
	Wave2.animationCounter = 45;
}

SecondEndingPhaseLengths = [200,50];

function SecondEndingUpdate()
{
	PhaseTimer++;
	if(PhaseTimer >= SecondEndingPhaseLengths[Phase] && Phase < SecondEndingPhaseLengths.length - 1)
	{
		PhaseTimer = 0;
		Phase++;
	}
	
	mainBugsby.SecondEndingUpdate(Platforms);
	
	if(Phase == 1)
	{
		if(CreditScroll > -1000)
		{
			CreditScroll += -2;
		}
	}
	
	if(Wiping)
	{
		//if(WipeInnerRadius < 1500) WipeInnerRadius += 40;
		WipeInnerRadius += 40;
		
		if(WipeInnerRadius >= 1500) Wiping = false;
	}
	
	Draw();
}



Bugsby.prototype.SecondEndingUpdate = function(platforms)
{
	this.lastX = this.X;
	this.lastY = this.Y;
	
	if(Phase == 0)
	{
		if(this.X < 320)
		{
			this.VX += BugsbyRunPower;
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
				this.runningAnimation = 0;
				if(this.platform.type == "sliding") this.platform.activated = true;
			}
		}
	}
	
	this.VX *= Friction;
	
	if(Math.abs(this.VX) < BugsbyRunPower / 2)
	{
		this.runningAnimation = 0;
	}
}

RiverBackground = new Image();
RiverBackground.src = 'Images/River.png';

RiverForeground = new Image();
RiverForeground.src = 'Images/RiverForeground.png';

function SecondEndingDraw()
{
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	lineWidth = 3;
	
	context.clearRect(0,0,canvas.width,canvas.height);

	context.drawImage(RiverBackground, 0, 0);
	
	Wave1.Draw(context);
	Wave2.Draw(context);
	
	context.drawImage(RiverForeground, 0, 0);
	
	mainBugsby.SecondEndingDraw(context);
		
	if(Phase == 1)
	{
		context.drawImage(Credits, 0, CreditScroll);
	}
		
	if(Wiping)
	{
		DrawTorus(context, 400, 290, WipeInnerRadius,WipeOuterRadius);
	}
}


Bugsby.prototype.SecondEndingDraw = function(context)
{	
	if(Phase == 0 || Phase == 1)
	{
		if(Math.abs(this.VX) < BugsbyRunPower)
		{
			//Standing
			context.drawImage(this.sprite[0+flip], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop);
		}
		else
		{
			//Running
			animationFrame = RunningAnimationSequence[Math.floor((this.runningAnimation % 20) / 2)];
			context.drawImage(this.sprite[animationFrame+flip], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - 3 + 6 * Math.sin((this.runningAnimation % 20) * Math.PI / 5) - BugsbySpriteTop);
		}
	}
}