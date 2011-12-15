
function Cube(x,y,color,item)
{
	this.X = x;
	this.Y = y;
	this.groundY = y;
	this.VX = 0;
	this.VY = 0;
	this.bumped = false;
	
	if(color == "random")
		this.primaryColor = Math.floor(Math.random() * 6);
	else
		this.primaryColor = reverseColorIndex[color];
		
	this.colors = new Array(9);
	var i = 0;
	for(i = 0; i < 9; i++)
	{
		if(Math.floor(Math.random() * 2) == 0)
		{
			this.colors[i] = this.primaryColor;
		}
		else
		{
			this.colors[i] = Math.floor(Math.random() * 6);
		}
	}
	this.colors[4] = this.primaryColor;
	
	this.rotation = 0;
	
	this.solved = false;
	
	this.aggravate = false;
	
	this.item = item;
}

masterColors = new Array(6);
masterColors[0] = "Crimson";
masterColors[1] = "Gold";
masterColors[2] = "RoyalBlue";
masterColors[3] = "ForestGreen";
masterColors[4] = "DarkOrange";
masterColors[5] = "GhostWhite";

reverseColorIndex = new Array();
reverseColorIndex["Crimson"] = 0;
reverseColorIndex["Gold"] = 1;
reverseColorIndex["RoyalBlue"] = 2;
reverseColorIndex["ForestGreen"] = 3;
reverseColorIndex["DarkOrange"] = 4;
reverseColorIndex["GhostWhite"] = 5;

Cube.prototype.Draw = function(context)
{	
	var i = 0;
	
	//rotation = Math.PI / 4;
	context.translate(backgroundScrollX + this.X, backgroundScrollY + this.Y);
	context.rotate(this.rotation);
	
	for(i = 0; i < 9; i++)
	{
		context.fillStyle = masterColors[this.colors[i]];
		context.beginPath();
		context.moveTo(0 - 18 + 12 * (i % 3), 0 - 18 + 12 * Math.floor(i / 3));
		context.lineTo(0 - 18 + 12 * (i % 3) + 12, 0 - 18 + 12 * Math.floor(i / 3));
		context.lineTo(0 - 18 + 12 * (i % 3) + 12, 0 - 18 + 12 * Math.floor(i / 3) + 12);
		context.lineTo(0 - 18 + 12 * (i % 3), 0 - 18 + 12 * Math.floor(i / 3) + 12);
		context.lineTo(0 - 18 + 12 * (i % 3), 0 - 18 + 12 * Math.floor(i / 3));	
		context.fill();
	}
	
	context.strokeStyle = "#000000";
	context.lineWidth = 2;
	
	for(i = 0; i < 4; i++)
	{
		context.beginPath();
		context.moveTo(0 - 18, 0 - 18 + 12 * i);
		context.lineTo(0 + 18, 0 - 18 + 12 * i);
		context.stroke();
		
		context.beginPath();
		context.moveTo(0 - 18 + 12 * i, 0 - 18);
		context.lineTo(0 - 18 + 12 * i, 0 + 18);
		context.stroke();
	}
	context.rotate(-1 * this.rotation);
	context.translate(-1 * (backgroundScrollX + this.X), -1 * (backgroundScrollY + this.Y));
	
	if(debugMode)
	{
		context.strokeStyle = "#FFFFFF";
		if(this.aggravate)
		{
			context.strokeStyle = '#FF0000';
		}
		context.lineWidth = 2;

		context.beginPath();
		context.moveTo(backgroundScrollX + this.X - 18, backgroundScrollY + this.Y - 18);
		context.lineTo(backgroundScrollX + this.X + 18, backgroundScrollY + this.Y - 18);
		context.lineTo(backgroundScrollX + this.X + 18, backgroundScrollY + this.Y + 18);
		context.lineTo(backgroundScrollX + this.X - 18, backgroundScrollY + this.Y + 18);
		context.lineTo(backgroundScrollX + this.X - 18, backgroundScrollY + this.Y - 18);
		context.stroke();
	}
}

Cube.prototype.Update = function(bugsby)
{
	this.X += this.VX;
	this.Y += this.VY;
	
	if(!this.solved) this.rotation = this.Y - this.groundY;
	
	if(this.bumped)
	{
		if(this.Y >= this.groundY - 1)
		{
			this.Y = this.groundY;
			this.rotation = 0;
			this.VY = 0;
			this.Solve();
		}
		else
		{
			this.VY += Gravity;
		}
	}
	
	this.aggravate = false;
	
	
	if(bugsby.HitDetect(this.X, this.Y + 18))
	{
		if(this.VY == 0	&& bugsby.Y > this.Y - 18 && bugsby.VY <= 0)
		{	
			if(!this.bumped)
			{
				MakeItem(this.item, this.X, this.Y);
			}
			
			this.bumped = true;
			this.VY = -8;
			bugsby.falling = true;
			
			for(i in Items)
			{
				item = Items[i];
				if(!item.falling && item.Y + item.bottomBound == this.Y - 18 && item.X + item.rightBound > this.X - 18 && item.X + item.leftBound < this.X + 18)
				{
					item.VY = -20;
					item.falling = true;
					item.VX += bugsby.VX;
				}
			}
			
			for(b in Baddies)
			{
				baddie = Baddies[b];
				if(baddie.Y + baddie.bottomBound == this.Y - 18 && baddie.X + baddie.rightBound > this.X - 18 && baddie.X + baddie.leftBound < this.X + 18)
				{
					baddie.VY += -20;
					baddie.dying = true;

					MakeItem(baddie.item, baddie.X, baddie.Y);

					for(i = 0; i < 3; i++)
					{
						Stars.push(new Star(baddie.X,baddie.Y,Math.floor(Math.random() * 20) - 10, -10 + -1 * Math.floor(Math.random() * 20)));
					}
				}
			}
		}
		
		if(bugsby.Y > this.Y - 18 && bugsby.VY <= 0)
		{
			if(bugsby.VY < 0)
			{
				bugsby.VY = 0;
			}
			bugsby.Y = this.Y + 17.99;
		}
	}
	//possible side collision
	else if((this.Y - 18 < bugsby.Y + bugsby.bottomBound && this.Y - 18 > bugsby.Y)
		|| (this.Y + 18 < bugsby.Y + bugsby.bottomBound && this.Y + 18 > bugsby.Y + 5))
	{
		//left side
		if(bugsby.X + bugsby.rightBound > this.X - 18 && bugsby.X + bugsby.rightBound < this.X + 18)
		{
			this.aggravate = true;
			if(bugsby.VX > 0) bugsby.X += -bugsby.VX;
			if(bugsby.X + bugsby.rightBound > this.X - 18) bugsby.X += -4;
		}
		
		//right side
		if(bugsby.X + bugsby.leftBound < this.X + 18 && bugsby.X + bugsby.leftBound > this.X - 18)
		{
			this.aggravate = true;
			if(bugsby.VX < 0) bugsby.X += -bugsby.VX;
			if(bugsby.X + bugsby.leftBound < this.X + 18) bugsby.X += 4;
		}
	}
	
	/*if(bugsby.HitDetect(this.X - 18, this.Y + 18) 
	|| bugsby.HitDetect(this.X + 18, this.Y + 18)
	|| bugsby.HitDetect(this.X - 18, this.Y - 18)
	|| bugsby.HitDetect(this.X + 18, this.Y - 18)
	)
	{
		if(this.VY == 0)
		{	
			if(bugsby.X < this.X) 
			{
				bugsby.X = this.X + bugsby.leftBound - 18;
			}
			else if(bugsby.X > this.X)
			{
				bugsby.X = this.X + bugsby.rightBound + 18; 
			}
		}
	}*/
}

Cube.prototype.Solve = function()
{
	var i = 0;
	for(i = 0; i < 9; i++)
	{
		this.colors[i] = this.primaryColor;
	}
	
	this.solved = true;	
}