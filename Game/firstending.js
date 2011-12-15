function FirstEndingInit()
{
	Platforms = new Array();
	
	Platforms.push(new Platform(-300, 1100, 498));

	mainBugsby = new Bugsby(-100, 498 - 116);
	
	mainYoshi = new Yoshi(530,498 - 110);
	
	backgroundScrollX = 0;
	backgroundScrollY = 0;
	
	yoshiPop = 0;
	
	Phase = 0;
	PhaseTimer = 0;
	
	EatenYoshi = false;
	
	CreditScroll = 580;
	
	SecondWiping = false;
}

FirstEndingPhaseLengths = [80,30,40,10,60,50];


function FirstEndingUpdate()
{
	PhaseTimer++;
	if(PhaseTimer >= FirstEndingPhaseLengths[Phase] && Phase < FirstEndingPhaseLengths.length - 1)
	{
		PhaseTimer = 0;
		Phase++;
		if(Phase == 5)
		{
			SecondWiping = true;
			WipeInnerRadius = 1500;
		}
	}
	
	mainBugsby.FirstEndingUpdate(Platforms);
	
	yoshiPop++;
	
	if(yoshiPop % 20 == 0)
	{
		mainYoshi.VY = -5;
		mainYoshi.falling = true;
	}
	
	if(Phase == 5)
	{
		if(CreditScroll > -1150)
		{
			CreditScroll += -2;
		}
	}
	
	mainYoshi.Update(Platforms,mainBugsby);
	
	if(Wiping)
	{
		//if(WipeInnerRadius < 1500) WipeInnerRadius += 40;
		WipeInnerRadius += 40;
		
		if(WipeInnerRadius >= 1500) Wiping = false;
	}
	
	if(SecondWiping)
	{
		WipeInnerRadius -= 40;
		if(WipeInnerRadius < -20)
		{
			if(!Linked)
			{
				Linked = true;
				if(LinkLocation != null)
				{
					document.location.href = LinkLocation
				}
			}
		}
	}
	
	Draw();
}


Bugsby.prototype.FirstEndingUpdate = function(platforms)
{
	this.lastX = this.X;
	this.lastY = this.Y;
	
	if(Phase == 0)
	{
		if(this.X < 100)
		{
			this.VX += BugsbyRunPower;
		}
	}
	else if(Phase == 1)
	{
		if(this.X < 320)
		{
			this.VX += BugsbyRunPower;
		}
	}
	else if(Phase == 2 && EatenYoshi == false)
	{
		this.flickeringAnimation += 1;
			
		if(this.flickeringAnimation % 1 == 0)
		{
			TongueAnimationFrame++;
			if(TongueAnimationSequence[TongueAnimationFrame] == 3)
			{
				mainYoshi.VX = -35;
			}
			if(PhaseTimer > 23)
			{
				//TongueAnimationFrame = 0;
				EatenYoshi = true;
			}
			
			if(mainYoshi.X <= this.X + 60) mainYoshi.visible = false;
		}
	}
	else if(Phase == 4)
	{
		if(this.X < 1200)
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

ForestBackground = new Image();
ForestBackground.src = "Forest.png";

BugsbyEating = new Image();
BugsbyEating.src = 'Eating.png';

BugsbyFat = new Image();
BugsbyFat.src = 'Fat.png';

Tongue = new Array(4);
Tongue[0] = new Image();
Tongue[0].src = 'Tongue1.png';
Tongue[1] = new Image();
Tongue[1].src = 'Tongue2.png';
Tongue[2] = new Image();
Tongue[2].src = 'Tongue3.png';
Tongue[3] = new Image();
Tongue[3].src = 'Tongue4.png';

TongueAnimationSequence = [-1,-1,-1,-1,-1,-1,-1,0,1,2,3,2,1,0,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2];
TongueAnimationFrame = 0;

ChompSprite = new Image();
ChompSprite.src = 'Chomp.png';

Credits = new Image();
Credits.src = 'Credits.png';

function FirstEndingDraw()
{
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	lineWidth = 3;
	
	context.clearRect(0,0,canvas.width,canvas.height);

	context.drawImage(ForestBackground, 0, 0);
	
	mainYoshi.Draw(context);
	
	if(Phase == 2 && PhaseTimer > 13 && PhaseTimer < 33)
	{
		context.drawImage(ChompSprite, 380, 400);
	}
	
	//mainBugsby.Draw(context);
	mainBugsby.FirstEndingDraw(context);
		
	/*if(Phase == 5)
	{
		context.drawImage(Credits, 0, CreditScroll);
	}*/
		
	if(Wiping)
	{
		DrawTorus(context, 400, 290, WipeInnerRadius,WipeOuterRadius);
	}
	
	if(SecondWiping)
	{
		DrawTorus(context, 400, 290, WipeInnerRadius,WipeOuterRadius);
	}
}

Bugsby.prototype.FirstEndingDraw = function(context)
{	
	if(Phase == 0 || Phase == 1 || Phase == 3 || Phase == 4)
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
	else if(Phase == 2)
	{
		if(EatenYoshi)
		{
			context.drawImage(this.sprite[0], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop);
		}
		else
		{
			if(TongueAnimationSequence[TongueAnimationFrame] >= 0)
			{
				context.drawImage(BugsbyEating, backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop);
				context.drawImage(Tongue[TongueAnimationSequence[TongueAnimationFrame]], backgroundScrollX + this.X + 3 - BugsbySpriteLeft, backgroundScrollY + this.Y - BugsbySpriteTop + 58);
			}
			else if(TongueAnimationSequence[TongueAnimationFrame] == -1)
			{
				context.drawImage(this.sprite[0], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop);
			}
			else if(TongueAnimationSequence[TongueAnimationFrame] == -2)
			{
				context.drawImage(BugsbyFat, backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop);
			}
		}
	}
}