function initialize(isReset)
{
	var canvas = document.getElementById('canvas');
	
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	canvas.style.visibility = 'visible';
	var loadingdiv = document.getElementById('loadingdiv');
	loadingdiv.style.visibility = 'hidden';	
	
	leftkey = new Image();
	leftkey.src = 'LeftKey.png';
	rightkey = new Image();
	rightkey.src = 'RightKey.png';
	spacekey = new Image();
	spacekey.src = 'SpaceKey.png';
	
	cartwheelAttackInfo = new Image();
	cartwheelAttackInfo.src = 'CartwheelAttackInfo.png';

	//660
	//2700
	//4680
	//2200
	//5699,-700
	//7440
	//15400
	if(!Halfway) mainBugsby = new Bugsby(660, 50);
	else mainBugsby = new Bugsby(7700, 250);

	backgroundScrollX = -mainBugsby.X + 390;
	backgroundScrollY = 0;
	
	backgroundScrollVX = 0;
	
	debugMode = false;
	
	Stars = new Array();
	
	Items = new Array();
	
	NumCookies = 0;
	
	SecondEnding = false;
	
	LinkLocation = "http://www.bugsby.net/links.html";
	Linked = false;
	
	Mode = 0;
	//Ending = 1;
	
	window.onkeydown = KeyDown;
	window.onkeyup = KeyUp;
	window.onkeypress = KeyPress;
	
	if(!isReset)
	{
		setInterval(Update,40);
	}
	
	BuildLevel();
}

Halfway = false;
Wholeway = false;

backgroundScrollX = 0;
backgroundScrollY = 0;

background = new Image();
//background.src = 'FullBackground.png';
background.src = 'HugeLevel.png';

Title = new Image();
Title.src = 'Title.png';

Flagpole1 = new Image();
Flagpole1.src = 'Flagpole1.png';

Flagpole2 = new Image();
Flagpole2.src = 'Flagpole2.png';

UpperPlatform = new Image();
UpperPlatform.src = 'UpperPlatform.png';

WIDTH = 800;
HEIGHT = 580;

function Update()
{
	if(Mode != 0)
	{
		//ha!
		if(SecondEnding)
		{
			FirstEndingUpdate();
		}
		else
		{
			SecondEndingUpdate();
		}
		return;
	}
	
	//var canvas = document.getElementById('canvas');
	
	if(!Wiping)
	{
		
		if(mainBugsby.Y + backgroundScrollY >  HEIGHT * 0.40 && backgroundScrollY > 0)
		{
			backgroundScrollY -= mainBugsby.VY;
			
			if(mainBugsby.Y + backgroundScrollY >  HEIGHT * 0.45)
			{
				backgroundScrollY -= 2;
			}
		}
		
		if(mainBugsby.Y + backgroundScrollY < HEIGHT * 0.25)
		{
			backgroundScrollY -= mainBugsby.VY;
			
			if(mainBugsby.Y + backgroundScrollY < HEIGHT * 0.20)
			{
				backgroundScrollY += 2;
			}
		}
		
		for(p in Platforms)
		{
			platform = Platforms[p];
			if(platform.type == "moving" || platform.type == "sliding")
				platform.Update(mainBugsby);
		}
		
		mainBugsby.Update(Platforms,Walls);
		
		if(mainBugsby.X <= -200)
		{
			mainBugsby.X = -200;
		}
		
		if(mainBugsby.X >= 16350)
		{
			Wiping = true;
			WipeCenterX = 16250;
			WipeCenterY = mainBugsby.Y;
			mainBugsby.X = 16350;
		}
		
		if(mainBugsby.Y >= 2000)
		{
			initialize(true);
		}
		
		if(!mainBugsby.cartwheeling)
		{
			if(mainBugsby.X + backgroundScrollX >  WIDTH * 0.60 && mainBugsby.VX > 0)
			{
				if(mainBugsby.X < 15976)
				{
					backgroundScrollX -= mainBugsby.VX + BugsbyRunPower;
				}
			}
		
			if(mainBugsby.X + backgroundScrollX < WIDTH * 0.40 && mainBugsby.VX < 0)
			{
				if(backgroundScrollX <= -60)
				{
					backgroundScrollX -= mainBugsby.VX - BugsbyRunPower;
				}
			}
		}
		else
		{
			if(mainBugsby.X + backgroundScrollX >  WIDTH * 0.60 && mainBugsby.cartwheelDirection == 1)
				backgroundScrollX -= 10 * BugsbyRunPower;
			else if(mainBugsby.X + backgroundScrollX < WIDTH * 0.40 && mainBugsby.cartwheelDirection == -1)
				backgroundScrollX += 10 * BugsbyRunPower;
		}
		
		if(backgroundScrollY < 0)
		{
			backgroundScrollY = 0;
		}
		
		NewItems = new Array();
		for(c in Items)
		{
			item = Items[c];
			if(Math.abs(item.X - mainBugsby.X) < 1000)
			{
				item.Update(Platforms, mainBugsby);
				if(Math.abs(item.VX) > 5) item.VX *= .9;
			}
			if(!item.grabbed)
			{
				NewItems.push(item);
			}
		}
		Items = NewItems;
		
		cubeBumped = false;
		for(c in Cubes)
		{
			cube = Cubes[c];
			if(Math.abs(cube.X - mainBugsby.X) < 1000)
				cube.Update(mainBugsby);
		}
		
		for(b in Baddies)
		{
			baddie = Baddies[b];
			if(Math.abs(baddie.X - mainBugsby.X) < 1000)
				baddie.Update(Platforms, mainBugsby);
		}
		
		NewStars = new Array();
		for(s in Stars)
		{
			star = Stars[s];
			star.Update();
			if(star.Y < 800)
			{
				NewStars.push(star);
			}
		}
		Stars = NewStars;
	}
	
	if(Wiping)
	{
		WipeInnerRadius -= 40;
		if(WipeInnerRadius < -10)
		{
			WipeInnerRadius = 0;
			Mode = 1;
			//ha!
			if(SecondEnding)
			{
				/*if(WipeInnerRadius < -10 && !Linked)
				{
					Linked = true;
					if(LinkLocation != null)
					{
						document.location.href = LinkLocation
					}
				}*/
				FirstEndingInit();
			}
			else
			{
				SecondEndingInit();
			}
			return;
		}
	}
	
	Draw();
}

function Draw()
{
	if(Mode != 0)
	{
		//ha!
		if(SecondEnding)
		{
			FirstEndingDraw();
		}
		else
		{
			SecondEndingDraw();
		}
		return;
	}
	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	lineWidth = 3;
	
	context.clearRect(0,0,canvas.width,canvas.height);
	
	if(!debugMode) context.fillStyle = "#DBFDFF";
	else context.fillStyle = "#DBFDFF";
	
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,canvas.height);
	context.lineTo(canvas.width,canvas.height);
	context.lineTo(canvas.width,0);
	context.fill();
	
	for(c in Clouds)
	{
		cloud = Clouds[c];
		cloud.Draw(context);
	}
	
	context.drawImage(Title, backgroundScrollX + 467, backgroundScrollY + 41);
	
	//I shortened the background by 140 pixels to save space and drawing
	context.drawImage(background, backgroundScrollX, backgroundScrollY + 140);

	if(Math.abs(mainBugsby.VX) < 1)
	{
		context.drawImage(leftkey, backgroundScrollX + 580, backgroundScrollY + 240);
		context.drawImage(rightkey, backgroundScrollX + 620, backgroundScrollY + 240);
		context.drawImage(spacekey, backgroundScrollX + 660, backgroundScrollY + 240);
	}
	
	//I shortened the background by 140 pixels to save space and drawing
	context.drawImage(UpperPlatform, backgroundScrollX + 12100, backgroundScrollY + -550);
	
	if(mainBugsby.X > 7800 && mainBugsby.X < 8400 && mainBugsby.Y > -50 && !mainBugsby.dying && !Halfway)
	{
		Halfway = true;
		Stars.push(new Flag(7853,304,Math.floor(Math.random() * 20), -10 + -1 * Math.floor(Math.random() * 20)));
	}
	
	if(!Halfway)
	{
		context.drawImage(Flagpole1, backgroundScrollX + 7800, backgroundScrollY + 262);
	}
	else
	{
		context.drawImage(Flagpole2, backgroundScrollX + 7800, backgroundScrollY + 262);
	}
	
	if(mainBugsby.X > 15800 && !Wholeway)
	{
		Wholeway = true;
		Stars.push(new Flag(15853,204,Math.floor(Math.random() * 20), -10 + -1 * Math.floor(Math.random() * 20)));
	}
	
	if(!Wholeway)
	{
		context.drawImage(Flagpole1, backgroundScrollX + 15800, backgroundScrollY + 162);
	}
	else
	{
		context.drawImage(Flagpole2, backgroundScrollX + 15800, backgroundScrollY + 162);
	}
	
	
	for(c in Items)
	{
		item = Items[c];
		if(Math.abs(item.X - mainBugsby.X) < 1000)
			item.Draw(context);
	}
	
	for(c in Cubes)
	{
		cube = Cubes[c];
		if(Math.abs(cube.X - mainBugsby.X) < 1000)
			cube.Draw(context);
	}
	
	for(b in Baddies)
	{
		baddie = Baddies[b];
		if(Math.abs(baddie.X - mainBugsby.X) < 1000)
			baddie.Draw(context);
	}
	
	for(p in Platforms)
	{
		platform = Platforms[p];
		if(platform.type == "moving" || platform.type == "sliding")
			platform.Draw(context);
	}
	
	mainBugsby.Draw(context);
	
	for(s in Stars)
	{
		star = Stars[s];
		star.Draw(context);
	}
	
	if(debugMode)
	{
		for(p in Platforms)
		{
			platform = Platforms[p];
			platform.DebugDraw(context);
		}
		
		for(w in Walls)
		{
			wall = Walls[w];
			wall.DebugDraw(context);
		}
	}

	//context.drawImage(houseOverlay, backgroundScrollX + 6141, backgroundScrollY + 324);
	
	context.drawImage(CookieSprite, 10, 10);
	
	if(mainBugsby.tracksuitPower)
	{
		context.drawImage(cartwheelAttackInfo, 150, 10);
	}
	
	PrintNumber(context, 40, 20, NumCookies);
	
	if(debugMode && mainBugsby.X >= 0) PrintNumber(context, 700, 20, Math.floor(mainBugsby.X));
	if(debugMode && mainBugsby.Y >= 0) PrintNumber(context, 700, 40, Math.floor(mainBugsby.Y));
	

	if(Wiping)
	{
		DrawTorus(context, WipeCenterX + backgroundScrollX, WipeCenterY + backgroundScrollY, WipeInnerRadius,WipeOuterRadius);
	}
}

Numbers = new Array(10);
var i;
for(i = 0; i < 10; i++)
{
	Numbers[i] = new Image();
	Numbers[i].src = i.toString() + '.png';
}

function PrintNumber(context, x, y, number)
{
	numString = number.toString();
	var i;
	for(i = 0; i < numString.length; i++)
	{
		context.drawImage(Numbers[numString.charAt(i)], x + 22 * i, y);
	}
}

WipeOuterRadius = 1500;
WipeInnerRadius = 1500;
WipeCenterX = 0;
WipeCenterY = 0;
Wiping = false;

function DrawWipe()
{
	DrawTorus()
}

TorusGranularity = 36;

function DrawTorus(context, centerX, centerY, innerRadius, outerRadius)
{
	//draw a torus
	context.fillStyle = "#000000";
	
	var i = 0;
	for(i = 0; i < TorusGranularity; i++)
	{
		context.beginPath();
		context.moveTo(centerX + innerRadius * Math.cos(2 * i * Math.PI / TorusGranularity),
						centerY + innerRadius * Math.sin(2 * i * Math.PI / TorusGranularity));
		context.lineTo(centerX + outerRadius * Math.cos(2 * i * Math.PI / TorusGranularity),
						centerY + outerRadius * Math.sin(2 * i * Math.PI / TorusGranularity));
		context.lineTo(centerX + outerRadius * Math.cos(2 * (i + 1.1) * Math.PI / TorusGranularity),
						centerY + outerRadius * Math.sin(2 * (i + 1.1) * Math.PI / TorusGranularity));
		context.lineTo(centerX + innerRadius * Math.cos(2 * (i + 1.1) * Math.PI / TorusGranularity),
						centerY + innerRadius * Math.sin(2 * (i + 1.1) * Math.PI / TorusGranularity));
		context.lineTo(centerX + innerRadius * Math.cos(2 * i * Math.PI / TorusGranularity),
						centerY + innerRadius * Math.sin(2 * i * Math.PI / TorusGranularity));
		context.fill();
	}
}

leftKeyDown = false;
rightKeyDown = false;
spaceKeyDown = false;

function KeyDown(ev)
{	
	//console.log(ev.keyCode);
	if(ev.keyCode == 37)
	{
		ev.preventDefault();
		leftKeyDown = true;
	}
	
	if(ev.keyCode == 39)
	{
		ev.preventDefault();
		rightKeyDown = true;
	}
	
	if(ev.keyCode == 32 && mainBugsby.VY == 0 && !mainBugsby.falling && !mainBugsby.ideaPower)
	{
		//console.log(mainBugsby.X);
		mainBugsby.falling = true;
		mainBugsby.platform = null;
		mainBugsby.VY -= BugsbyJumpPower;
		if(mainBugsby.tracksuitPower)
		{
			mainBugsby.VY -= BugsbyJumpPower / 4;
		}
		if(mainBugsby.cartwheeling)
		{
			this.cartwheelTimer = 0;
			this.cartwheelAngle = 0;
			this.cartwheelDirection = 0;
			this.cartwheeling = false;
		}
	}
	
	if(ev.keyCode == 88
		&& mainBugsby.tracksuitPower)
	{
		if(leftKeyDown && (!mainBugsby.cartwheeling || mainBugsby.cartwheelTimer < 3 || mainBugsby.cartwheelDirection == 1))
		{
			mainBugsby.cartwheeling = true;
			mainBugsby.cartwheelTimer = 15;
			mainBugsby.cartwheelAngle = 0;
			mainBugsby.cartwheelDirection = -1;
			mainBugsby.VX = 0;
		}
		else if(rightKeyDown && (!mainBugsby.cartwheeling || mainBugsby.cartwheelTimer < 3 || mainBugsby.cartwheelDirection == -1))
		{
			mainBugsby.cartwheeling = true;
			mainBugsby.cartwheelTimer = 15;
			mainBugsby.cartwheelAngle = 0;
			mainBugsby.cartwheelDirection = 1;
			mainBugsby.VX = 0;
		}
	}
	
	if(ev.keyCode == 32 && mainBugsby.ideaPower)
	{
		spaceKeyDown = true;
	}
}

function KeyUp(ev)
{	
	if(ev.keyCode == 37)
	{
		ev.preventDefault();
		leftKeyDown = false;
	}
	
	if(ev.keyCode == 39)
	{
		ev.preventDefault();
		rightKeyDown = false;
	}
	
	if(ev.keyCode == 32)
	{
		spaceKeyDown = false;
		if(mainBugsby.ideaPower && !mainBugsby.falling) mainBugsby.falling = true;
	}
}

function KeyPress(ev)
{
	if(ev.keyCode == 37)
	{
		ev.preventDefault();
	}
	
	if(ev.keyCode == 39)
	{
		ev.preventDefault();
	}
}
