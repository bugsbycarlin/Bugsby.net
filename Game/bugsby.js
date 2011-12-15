
function Bugsby(x,y)
{
	this.X = x;
	this.Y = y;
	this.groundY = y;
	this.VX = 0;
	this.VY = 0;
	
	this.lastX = x;
	this.lastY = y;
	
	this.dying = false;
	
	this.falling = true;
	
	this.platform = null;
	
	this.leftBound = -30;
	this.rightBound = 30;
	this.topBound = 0;
	this.bottomBound = 116;
	
	this.runningAnimation = 0;
	this.flickeringAnimation = 0;
	
	this.sprite = BugsbySprite;
	
	this.ideaPower = false;
	this.ideaTimer = 0;
	
	this.tracksuitPower = false;
	this.tracksuitTimer = 0;
	
	this.cartwheeling = false;
	this.cartwheelTimer = 0;
	this.cartwheelAngle = 0;
	this.cartwheelDirection = 0;
	
	this.invincibilityTimer = 0;
	
	this.rotation = 0;
}

BugsbySpriteLeft = 11;
BugsbySpriteTop = 11;
BugsbySpriteRight = 71;
BugsbySpriteBottom = 127;

BugsbySprite = new Array(17);
BugsbySprite[0] = new Image();
BugsbySprite[0].src = 'Stand.png';
BugsbySprite[1] = new Image();
BugsbySprite[1].src = 'RunLeft1.png';
BugsbySprite[2] = new Image();
BugsbySprite[2].src = 'RunLeft2.png';
BugsbySprite[3] = new Image();
BugsbySprite[3].src = 'RunRight1.png';
BugsbySprite[4] = new Image();
BugsbySprite[4].src = 'RunRight2.png';
BugsbySprite[5] = new Image();
BugsbySprite[5].src = 'Jumping.png';
BugsbySprite[6] = new Image();
BugsbySprite[6].src = 'Falling.png';
BugsbySprite[7] = new Image();
BugsbySprite[7].src = 'Floating.png';
BugsbySprite[8] = new Image();
BugsbySprite[8].src = 'StandFlip.png';
BugsbySprite[9] = new Image();
BugsbySprite[9].src = 'RunLeft1Flip.png';
BugsbySprite[10] = new Image();
BugsbySprite[10].src = 'RunLeft2Flip.png';
BugsbySprite[11] = new Image();
BugsbySprite[11].src = 'RunRight1Flip.png';
BugsbySprite[12] = new Image();
BugsbySprite[12].src = 'RunRight2Flip.png';
BugsbySprite[13] = new Image();
BugsbySprite[13].src = 'JumpingFlip.png';
BugsbySprite[14] = new Image();
BugsbySprite[14].src = 'FallingFlip.png';
BugsbySprite[15] = new Image();
BugsbySprite[15].src = 'FloatingFlip.png';
BugsbySprite[16] = new Image();
BugsbySprite[16].src = 'Dying.png';

BugsbyTracksuitSprite = new Array(17);
BugsbyTracksuitSprite[0] = new Image();
BugsbyTracksuitSprite[0].src = 'StandTracksuit.png';
BugsbyTracksuitSprite[1] = new Image();
BugsbyTracksuitSprite[1].src = 'RunLeft1Tracksuit.png';
BugsbyTracksuitSprite[2] = new Image();
BugsbyTracksuitSprite[2].src = 'RunLeft2Tracksuit.png';
BugsbyTracksuitSprite[3] = new Image();
BugsbyTracksuitSprite[3].src = 'RunRight1Tracksuit.png';
BugsbyTracksuitSprite[4] = new Image();
BugsbyTracksuitSprite[4].src = 'RunRight2Tracksuit.png';
BugsbyTracksuitSprite[5] = new Image();
BugsbyTracksuitSprite[5].src = 'JumpingTracksuit.png';
BugsbyTracksuitSprite[6] = new Image();
BugsbyTracksuitSprite[6].src = 'FallingTracksuit.png';
BugsbyTracksuitSprite[7] = new Image();
BugsbyTracksuitSprite[7].src = 'Floating.png';
BugsbyTracksuitSprite[8] = new Image();
BugsbyTracksuitSprite[8].src = 'StandTracksuitFlip.png';
BugsbyTracksuitSprite[9] = new Image();
BugsbyTracksuitSprite[9].src = 'RunLeft1TracksuitFlip.png';
BugsbyTracksuitSprite[10] = new Image();
BugsbyTracksuitSprite[10].src = 'RunLeft2TracksuitFlip.png';
BugsbyTracksuitSprite[11] = new Image();
BugsbyTracksuitSprite[11].src = 'RunRight1TracksuitFlip.png';
BugsbyTracksuitSprite[12] = new Image();
BugsbyTracksuitSprite[12].src = 'RunRight2TracksuitFlip.png';
BugsbyTracksuitSprite[13] = new Image();
BugsbyTracksuitSprite[13].src = 'JumpingTracksuitFlip.png';
BugsbyTracksuitSprite[14] = new Image();
BugsbyTracksuitSprite[14].src = 'FallingTracksuitFlip.png';
BugsbyTracksuitSprite[15] = new Image();
BugsbyTracksuitSprite[15].src = 'FloatingFlip.png';
BugsbyTracksuitSprite[16] = new Image();
BugsbyTracksuitSprite[16].src = 'Cartwheeling.png';

SpritesPerSide = 8;

BugsbyJumpPower = 35;
Gravity = 3;

BugsbyRunPower = 3.0;
Friction = 0.75;

BugsbyRunningAnimationLength = 3;

RunningAnimationSequence = [0,1,2,2,1,0,3,4,4,3];

Bugsby.prototype.Draw = function(context)
{	
	if(!this.tracksuitPower || (this.tracksuitTimer <= 40 && this.flickeringAnimation % 2 == 0)) this.sprite = BugsbySprite;
	else this.sprite = BugsbyTracksuitSprite;
	
	if(debugMode)
	{
		context.strokeStyle = "#FF0000";
		context.lineWidth = 2;

		context.beginPath();
		context.moveTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + this.topBound);
		context.lineTo(backgroundScrollX + this.X + this.rightBound, backgroundScrollY + this.Y + this.topBound);
		context.lineTo(backgroundScrollX + this.X + this.rightBound, backgroundScrollY + this.Y + this.bottomBound);
		context.lineTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + this.bottomBound);
		context.lineTo(backgroundScrollX + this.X + this.leftBound, backgroundScrollY + this.Y + this.topBound);
		context.stroke();
	}
		
	if(this.invincibilityTimer > 0)
	{
		this.dying = false;
		if(this.invincibilityTimer % 2 == 0) return;
	}
	
	if(this.dying)
	{
		if(this.VX >= 0) this.rotation--
		else this.rotation++
		
		context.translate(backgroundScrollX + this.X, backgroundScrollY + this.Y + this.bottomBound / 2);
		context.rotate(Math.PI * this.rotation / 10);
		
		context.drawImage(this.sprite[16],  -BugsbySpriteLeft + this.leftBound, -this.bottomBound / 2 - BugsbySpriteTop);
	
		context.rotate(-Math.PI * this.rotation / 10);
		context.translate(-1 * (backgroundScrollX + this.X), -1 * (backgroundScrollY + this.Y + this.bottomBound / 2));
		return;
	}
	
	flip = 0;
	if(this.VX < 0)
	{
		flip = SpritesPerSide;
	}
	
	if(!this.ideaPower)
	{
		if(!this.falling)
		{
			if(this.tracksuitPower && this.cartwheeling)
			{
				//cartwheeling
				context.translate(backgroundScrollX + this.X, backgroundScrollY + this.Y + this.bottomBound / 2);
				context.rotate(Math.PI * this.cartwheelAngle / 15);

				context.drawImage(this.sprite[16],  -BugsbySpriteLeft + this.leftBound, -this.bottomBound / 2 - BugsbySpriteTop);

				context.rotate(-Math.PI * this.cartwheelAngle / 15);
				context.translate(-1 * (backgroundScrollX + this.X), -1 * (backgroundScrollY + this.Y + this.bottomBound / 2));
				
			}
			else
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
		else
		{
			if(this.tracksuitPower && this.cartwheeling)
			{
				//cartwheeling
				context.translate(backgroundScrollX + this.X, backgroundScrollY + this.Y + this.bottomBound / 2);
				context.rotate(Math.PI * this.cartwheelAngle / 15);

				context.drawImage(this.sprite[16],  -BugsbySpriteLeft + this.leftBound, -this.bottomBound / 2 - BugsbySpriteTop);

				context.rotate(-Math.PI * this.cartwheelAngle / 15);
				context.translate(-1 * (backgroundScrollX + this.X), -1 * (backgroundScrollY + this.Y + this.bottomBound / 2));
				
			}
			else
			{
				if(this.VY <= Gravity)
				{
					//Jumping
					context.drawImage(this.sprite[5+flip], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop)
				}
				else
				{
					//Falling
					context.drawImage(this.sprite[6+flip], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop);
				}
			}
		}
	}
	else
	{	
		floatDelta = -3 + 6 * Math.sin((this.runningAnimation % 80) * Math.PI / 20);
			
		if(this.ideaTimer > 40 || this.flickeringAnimation % 2 == 0)
		{
			context.drawImage(LightbulbSprite, backgroundScrollX + this.X - 17, backgroundScrollY + this.Y - 73 + floatDelta);
		}
		
		if(this.VY <= 8)
		{
			//hovering	
			context.drawImage(this.sprite[7+flip], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop - 7 + floatDelta);
		}
		else
		{
			//Falling
			context.drawImage(this.sprite[6+flip], backgroundScrollX + this.X - BugsbySpriteLeft + this.leftBound, backgroundScrollY + this.Y - BugsbySpriteTop);
		}			
	}
}

Bugsby.prototype.Update = function(platforms)
{
	this.lastX = this.X;
	this.lastY = this.Y;
	
	if(this.invincibilityTimer > 0)
	{
		this.invincibilityTimer -= 1;
		this.dying = false;
	}
	
	if(this.dying && this.ideaPower)
	{
		this.dying = false;
		this.ideaPower = false;
		this.ideaTimer = 0;
		this.invincibilityTimer = 40;
	}
	
	if(this.dying && this.tracksuitPower)
	{
		this.dying = false;
		this.tracksuitPower = false;
		this.tracksuitTimer = 0;
		this.invincibilityTimer = 40;
	}
	
	if(this.dying)
	{
		if(this.VX > 0) this.X += -10;
		else if(this.VX < 0) this.X += 10;
		this.Y += this.VY;

		this.VY += Gravity;
		
		return;
	}
	
	if(this.ideaPower && spaceKeyDown)
	{
		//console.log("jetting");
		if(this.VY > -BugsbyJumpPower / 4) this.VY = -BugsbyJumpPower / 4;
		this.falling = true;
		this.VY += -0.35 * Gravity;
	}
	
	if(this.X >= 15800)
	{
		rightKeyDown = true;
		leftKeyDown = false;
	}
	
	if(leftKeyDown && this.Y <= 600 && !this.cartwheeling)
	{
		this.VX += -BugsbyRunPower;
		if(this.tracksuitPower)
		{
			this.VX += -BugsbyRunPower / 2;
		}
	}

	if(rightKeyDown && this.Y <= 600 && !this.cartwheeling)
	{
		this.VX += BugsbyRunPower;
		if(this.tracksuitPower)
		{
			this.VX += BugsbyRunPower / 2;
		}
	}


	
	if(leftKeyDown || rightKeyDown)
	{
		Friction = 0.75;
	}
	else
	{
		Friction = 0.50;
	}
	
	if(this.ideaPower)
	{
		this.ideaTimer -= 1;
		if(this.ideaTimer <= 0)
		{
			this.ideaTimer = 0;
			this.ideaPower = false;
		}
	}
	
	if(this.tracksuitPower)
	{
		if(this.tracksuitTimer % 20 == 0 || this.tracksuitTimer % 17 == 0)
		{
			Stars.push(new Teardrop(this.X,this.Y + 15,Math.floor(Math.random() * 14) - 7, -8 + -1 * Math.floor(Math.random() * 8)));
		}
		
		this.tracksuitTimer -= 1;
		if(this.tracksuitTimer <= 0)
		{
			this.tracksuitTimer = 0;
			this.tracksuitPower = false;
			this.cartwheeling = false;
		}
		
		if(this.cartwheeling)
		{
			this.cartwheelTimer -= 1;
			if(this.cartwheelDirection == 1)
				this.cartwheelAngle += BugsbyRunPower;
			else if(this.cartwheelDirection == -1)
				this.cartwheelAngle -= BugsbyRunPower;
			if(this.cartwheelTimer <= 0)
			{
				this.cartwheelTimer = 0;
				this.cartwheelAngle = 0;
				this.cartwheelDirection = 0;
				this.cartwheeling = false;
			}
		}
	}
	else
	{
		this.cartwheelTimer = 0;
		this.cartwheelAngle = 0;
		this.cartwheeling = false;
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
	
	for(w in Walls)
	{
		wall = Walls[w];
		if(wall.WallDetect(this))
		{
			//console.log("hit the wall");
			//making bugsby very slow allows him to keep his direction
			if(this.VX > 0)
			{
				this.VX = 0.01;
				this.X += -0.01;
			} 
			else if(this.VX < 0)
			{
				this.VX = -0.01;
				this.X += 0.01;
			}
			
			if(this.X + this.rightBound > wall.left && this.X + this.leftBound < wall.left)
			{
				//console.log("in here in here");
				if(Math.abs(this.X + this.rightBound - wall.left) < Math.abs(this.X + this.leftBound - wall.left))
				{
					this.X = wall.left - this.rightBound;
				}
				else
				{
					this.X = wall.left - this.leftBound;
				}
			}
		}
	}
	
	if(!this.cartwheeling)
	{
		this.X += this.VX;
	}
	else
	{
		if(this.cartwheelDirection == 1)
			this.X += 10 * BugsbyRunPower;
		else
			this.X -= 10 * BugsbyRunPower;
	}
	this.Y += this.VY;
	
	this.runningAnimation += 1;
	this.flickeringAnimation += 1;
	
	if(this.falling)
	{
		//console.log("falling");
		if(!this.ideaPower)
		{
			this.VY += Gravity;
		}
		else 
		{
			this.VY += Gravity * 0.3;
			if(this.VY > 10) this.VY = 10;
		}
		
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
	
	//friction
	if(!this.cartwheeling) this.VX *= Friction;
	
	//terminal velocity
	if(this.VY > 50 && this.Y < 600) this.VY = 50;
	
	if(!this.ideaPower && Math.abs(this.VX) < BugsbyRunPower / 2)
	{
		this.runningAnimation = 0;
	}
}

Bugsby.prototype.HitDetect = function(x,y)
{
	if((x < this.X + this.rightBound) 
	&& (x > this.X + this.leftBound)
 	&& (y < this.Y + this.bottomBound)
	&& (y > this.Y + this.topBound))
	{
		return true;
	}
	
	return false;
}