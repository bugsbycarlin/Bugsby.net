
function Wall(left,top,bottom)
{
	this.left = left;
	this.top = top;
	this.bottom = bottom;
}


Wall.prototype.WallDetect = function(bugsby)
{
	if(bugsby.Y + bugsby.bottomBound <= this.top || bugsby.Y >= this.bottom)
	{
		return false;
	}
	
	if(bugsby.VX > 0 && bugsby.X + bugsby.rightBound < this.left && bugsby.X + bugsby.rightBound + bugsby.VX > this.left)
	{
		return true;
	}
	
	if(bugsby.VX < 0 && bugsby.X + bugsby.leftBound > this.left && bugsby.X + bugsby.leftBound + bugsby.VX < this.left)
	{
		return true;
	}
	
	if(bugsby.X + bugsby.leftBound < this.left && bugsby.X + bugsby.rightBound > this.left)
	{
		return true;
	}
	
	return false;
}



Wall.prototype.DebugDraw = function(context)
{
	context.strokeStyle = "#00FF00";
	context.lineWidth = 2;
	
	context.beginPath();
	context.moveTo(backgroundScrollX + this.left, backgroundScrollY + this.top);
	context.lineTo(backgroundScrollX + this.left, backgroundScrollY + this.bottom);
	context.stroke();
}
