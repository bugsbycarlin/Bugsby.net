function SecondEndingInit()
{
	backgroundScrollX = 0;
	backgroundScrollY = 0;
	
	Separation = 0;
	AnimationCounter = 0;
	
	Phase = 0;
	PhaseTimer = 0;
	
	CreditScroll = 580;
	
	Fade = 1;
}

SecondEndingPhaseLengths = [50,50];

function SecondEndingUpdate()
{
	PhaseTimer++;
	if(PhaseTimer >= SecondEndingPhaseLengths[Phase] && Phase < SecondEndingPhaseLengths.length - 1)
	{
		PhaseTimer = 0;
		Phase++;
	}
	
	if(Phase == 1)
	{
		if(CreditScroll > -1150)
		{
			CreditScroll += -1.25;
		}
	}
	
	if(Fade > 0)
	{
		Fade -= 0.01;
	}
	
	if(Separation < 80) Separation += 0.1;
	
	Draw();
}

SundaeMountainBackground = new Image();
SundaeMountainBackground.src = 'Images/SundaeMountainBackground.png';

SundaeMountainForeground = new Image();
SundaeMountainForeground.src = 'Images/SundaeMountainForeground.png';

function SecondEndingDraw()
{
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	lineWidth = 3;
	
	context.clearRect(0,0,canvas.width,canvas.height);

	context.fillStyle = "#000441";
	
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,canvas.height);
	context.lineTo(canvas.width,canvas.height);
	context.lineTo(canvas.width,0);
	context.fill();
	
	context.drawImage(SundaeMountainBackground, 0, -Separation);
	
	context.drawImage(SundaeMountainForeground, 0, Separation);
		
	if(Phase == 1)
	{
		context.drawImage(Credits, 0, CreditScroll);
	}
	
	if(Fade > 0)
	{
		context.fillStyle = "rgba(0, 0, 0," + Fade.toString() + ")";
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(800,0);
		context.lineTo(800,580);
		context.lineTo(0,580);
		context.lineTo(0,0);	
		context.fill();
	}
}