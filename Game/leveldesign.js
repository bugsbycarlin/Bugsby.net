
function BuildLevel()
{
	//array inits
	Platforms = new Array();
	Walls = new Array();
	Cubes = new Array();
	Baddies = new Array();
	Clouds = new Array();
	
	BuildFirstSection();
	
	BuildSecondSection();
	
	BuildThirdSection();
	
	BuildFourthSection();
	
	BuildFifthSection();
	
	BuildSixthSection();
	
	BuildFirstSkySection();
	
	BuildSecondSkySection();
	
	BuildThirdSkySection();
	
	//PopulateClouds(1000,17000,200);
	
	PopulateClouds(2500,14000,-680);
}

function PopulateClouds(start,end,height)
{
	x = start + Math.floor(Math.random() * 400);
	while(x < end)
	{
		Clouds.push(new Cloud(x,height - 150 + Math.floor(Math.random() * 300)));
		x += 600 + Math.floor(Math.random() * 400);
	}
}

function AddCube(x,y,color,item,solved)
{
	cube = new Cube(x, y, color,item);
	if(solved == true) cube.Solve();
	Cubes.push(cube);
	Platforms.push(new Platform(x - 18, x + 18, y - 18));
}

function AddCubePlatform(x,y,length,color)
{
	for(i = 0; i < length; i++)
	{				
		cube = new Cube(x + 38 * i,y,color);
		cube.Solve();		
		Cubes.push(cube);
	}
	Platforms.push(new Platform(x - 18, x + (length - 1) * 38 + 18, y - 18));
}

//
//level design for first screen
//
function BuildFirstSection()
{	
	//floor
	Platforms.push(new Platform(-300, 1930, 498));
	
	//slanted platform
	Platforms.push(new SlantedPlatform(81, 498, 365, 215));
	Baddies.push(new Baddie(104, 300, "patrol"));
	
	//blocks above the slanted platform
	//AddCube(242,130,"Crimson")
	AddCube(242, 130, "Crimson")
	AddCube(202, -70, "Gold", "cookie")
	AddCube(242, -270, "Crimson")
	AddCube(202, -470, "Gold")
	AddCube(242, -670, "Crimson", "cookie")
	
	// platform to the right of the title
	Platforms.push(new Platform(922, 1305, 340));
	Baddies.push(new Baddie(980, 200, "chase", "cookie"));
	Baddies.push(new Baddie(1848, 400, "chase", "cookie"));
	Baddies.push(new Baddie(1220, 200, "patrol"));
	
	//hovering baddie to the right of that
	Baddies.push(new Baddie(1464, 200, "hover"));
	
	//series of eight blocks above that platform
	var i = 0;
	for(i = 0; i < 8; i++)
	{
		x = 980 + 38 * i;
		y = 140;
		
		item = "";
		if(i < 4) color = "RoyalBlue";
		else color = "GhostWhite";
		if(i == 7) item = "tracksuit";
		if(i == 3 || i == 5) item = "cookie";
		
		Cubes.push(new Cube(x,y,color,item));
	}
	Platforms.push(new Platform(980 - 18, 1284 - 18, 140 - 18));
	Baddies.push(new Baddie(1000, 62, "patrol"));
}

function BuildSecondSection()
{
	//floor
	Platforms.push(new Platform(2173, 4800, 498));
	
	//stairs
	Walls.push(new Wall(2373, 340, 498));
	Platforms.push(new Platform(2373, 2573, 340));
	Walls.push(new Wall(2573, 182, 340));
	Platforms.push(new Platform(2573, 2973, 182));
	Walls.push(new Wall(2973, 182, 340));
	Platforms.push(new Platform(2973, 3173, 340));
	Walls.push(new Wall(3173, 340, 498));
	
	Baddies.push(new Baddie(2465, 220, "patrol"));
	Baddies.push(new Baddie(2800, 60, "patrol","cookie"));
	Baddies.push(new Baddie(3050, 220, "patrol","cookie"));
	
	//blocks above the stairs platform
	AddCube(2793,-10,"DarkOrange","cookie");
	AddCube(2753,-210,"DarkOrange","cookie");
	AddCube(2793,-410,"DarkOrange","cookie");
	
	//slanted platform to the right of the stairs
	Platforms.push(new SlantedPlatform(3473, 498, 3757, 215));
	
	//block above the slanted platform
	AddCube(3754, 0,"ForestGreen","cookie");
	
	Baddies.push(new Baddie(4050, 200, "hover"));
	
	//blocks on the way to the next main section
	Baddies.push(new Baddie(4900, 250, "hover"));
	AddCube(5000, 400,"Crimson");
	AddCube(5038, 400,"DarkOrange");
	AddCube(5074, 400,"GhostWhite");
	Baddies.push(new Baddie(5174, 250, "hover"));
}

function BuildFirstSkySection()
{	
	//walkable series of blocks (should be made into individual unbumpable platforms)
	AddCubePlatform(2833,-610,5,"Crimson");
	
	AddCubePlatform(3250,-610,5,"RoyalBlue");
	Cubes.push(new Cube(3250 + 2 * 38, -800, "GhostWhite"));
	Platforms.push(new Platform(3250 + 2 * 38 - 18, 3250 + 2 * 38 + 18, -800 - 18));
	
	AddCubePlatform(3667,-610,5,"Crimson");
	Cubes.push(new Cube(3667 + 2 * 38, -800, "GhostWhite","cookie"));
	Platforms.push(new Platform(3667 + 2 * 38 - 18, 3667 + 2 * 38 + 18, -800 - 18));
	
	//hovering baddies to bridge the gap between platforms
	Baddies.push(new Baddie(4030, -680, "hover"));
	Baddies.push(new Baddie(4130, -730, "hover"));
	Baddies.push(new Baddie(4230, -680, "hover"));
	Baddies.push(new Baddie(4330, -730, "hover"));
	Baddies.push(new Baddie(4430, -680, "hover"));
	
	//pair of platforms on the other side; first
	AddCubePlatform(4500,-610,5,"RoyalBlue");
	Baddies.push(new Baddie(4571, -880, "patrol","cookie"));
	
	//second
	AddCubePlatform(4917,-610,5,"Crimson");
	
	//five difficult stepping blocks
	//Cubes.push(new Cube(5117, -550, "GhostWhite"));
	AddCube(5300,-550,"GhostWhite",null,true);
	Baddies.push(new Baddie(5400, -600, "hover"));
	AddCube(5500,-550,"GhostWhite",null,true);
	AddCube(5700,-550,"GhostWhite",null,true);
	AddCube(5900,-550,"GhostWhite",null,true);
	Baddies.push(new Baddie(5900, -700, "patrol"));
	
	//next platform after that
	AddCubePlatform(6100,-610,5,"RoyalBlue");
}

function BuildSecondSkySection()
{	
	//this is the long train
	Platforms.push(new SlidingPlatform(6400, 6700, -550, 3500));
	
	//these are the obstacles in the way
	Baddies.push(new Baddie(7000, -700, "hover"));
	AddCube(7200, -740,"RoyalBlue","cookie",false);
	Baddies.push(new Baddie(7500, -700, "hover"));
	
	Baddies.push(new Baddie(7900, -730, "hover"));
	Baddies.push(new Baddie(8000, -680, "hover"));
	Baddies.push(new Baddie(8100, -730, "hover"));
	
	AddCubePlatform(8500,-610,5,"DarkOrange");
	AddCube(8500 + 2 * 38,-800,"RoyalBlue","lightbulb",false);
	Baddies.push(new Baddie(8550, -700, "patrol"));
	
	AddCubePlatform(9000,-610,5,"DarkOrange");
	Baddies.push(new Baddie(9050, -700, "patrol"));
	Baddies.push(new Baddie(9100, -700, "patrol"));
	
	Baddies.push(new Baddie(9500, -700, "hover"));
	AddCube(9700, -740,"GhostWhite","cookie",false);
	Baddies.push(new Baddie(10000, -700, "hover"));
}

function BuildThirdSkySection()
{
	Platforms.push(new MovingPlatform(10300, 10600, -550));
	Platforms.push(new MovingPlatform(10750, 11050, -550));
	Platforms.push(new MovingPlatform(11200, 11500, -550));
	Platforms.push(new MovingPlatform(11650, 11950, -550));
	
	Baddies.push(new Baddie(10450, -800, "patrol","cookie"));
	Baddies.push(new Baddie(10900, -800, "patrol"));
	Baddies.push(new Baddie(11350, -800, "patrol","cookie"));
	Baddies.push(new Baddie(11800, -800, "patrol"));
	
	Baddies.push(new Baddie(11575, -600, "hover","cookie"));
	
	//final platform, where the key will be
	Platforms.push(new Platform(12100, 13000, -550));
	MakeItem("key", 12800, -610)
}


function BuildThirdSection()
{
	//floor
	Platforms.push(new Platform(5274, 6550, 498));

	//tall wall
	Walls.push(new Wall(5674, 150, 498));
	Platforms.push(new Platform(5674, 5774, 150));
	Walls.push(new Wall(5774, 150, 498));
	AddCube(5724, -40, "RoyalBlue","lightbulb",false);

	//assist platform
	Platforms.push(new Platform(5474, 5674, 300));
	
	//Baddies.push(new Baddie(5324, 200, "hover"));
	Baddies.push(new Baddie(5624, 50, "patrol"));

	//slanted platform to the right of the stairs
	Platforms.push(new SlantedPlatform(5824, 498, 6108, 215));
	
	
	var i;
	for(i = 0; i < 7; i++)
	{
		if(i % 2 == 0)
		{
			AddCube(6650 + 38 * i, 450 - 38 * i,"Gold",null,true);	
		}
	}
	AddCube(6650 + 9 * 38, 450 - 3 * 38, "ForestGreen",null,true);
	Baddies.push(new Baddie(6650 + 38 * 4, 200, "patrol","cookie"));
}

function BuildFourthSection()
{
	//floor
	Platforms.push(new Platform(7174, 8700, 498));

	Platforms.push(new Platform(7556, 7963, 242));	
	Platforms.push(new Platform(7848, 8237, 433));
	
	AddCube(8600, 308, "Crimson","lightbulb");
}

function BuildFifthSection()
{
	//series of moving platforms
	Platforms.push(new MovingPlatform(8850, 9150, 400));
	Platforms.push(new MovingPlatform(9300, 9600, 400));
	Platforms.push(new MovingPlatform(9750, 10050, 400));
	Platforms.push(new MovingPlatform(10200, 10500, 400));

	Baddies.push(new Baddie(9400, 100, "patrol","cookie"));
	Baddies.push(new Baddie(10300, 100, "patrol","cookie"));
	
	//first floor
	Platforms.push(new Platform(10650, 10850, 398));
	Walls.push(new Wall(10850,398,498));
	
	//cube with tracksuit
	AddCube(10750, 200, "Crimson","tracksuit",false);
	
	//second floor
	Platforms.push(new Platform(10850, 12300, 498));
	
	//crapton of robots
	var i;
	for(i = 0; i < 12; i++)
	{
		Baddies.push(new Baddie(10900 + 100 * i, 400, "patrol", "cookie"));
	}
	
	//third floor
	Walls.push(new Wall(12300,398,498));
	Platforms.push(new Platform(12300, 12500, 398));
	
}

function BuildSixthSection()
{
	//cubes to cross the gap
	AddCube(12700, 400, "Crimson",null,true);
	AddCube(12900, 400, "Crimson",null,true);
	
	//main platform
	Platforms.push(new Platform(13100, 13800, 498));
	
	//higher platform
	Platforms.push(new Platform(13250, 13650, 340));
	
	//baddies
	Baddies.push(new Baddie(13250, 200, "patrol", "cookie"));
	Baddies.push(new Baddie(13250, 300, "patrol", "cookie"));
	Baddies.push(new Baddie(13350, 300, "patrol", "cookie"));
	Baddies.push(new Baddie(13450, 300, "patrol", "cookie"));
	
	//item
	AddCube(13400, 140, "ForestGreen", "lightbulb", false)
	AddCube(13500, 140, "ForestGreen", "tracksuit", false)
	
	//tricky platforms
	Platforms.push(new Platform(13900, 13950, 250));
	Platforms.push(new Platform(14000, 14050, 250));
	Platforms.push(new Platform(14100, 14150, 250));
	
	//cruelty
	AddCubePlatform(14400, 300, 5, "Crimson");
	AddCube(14700, 200, "RoyalBlue", "10cookie", false);
	AddCube(14700, 420, "RoyalBlue", null, true);
	AddCubePlatform(14900, 300, 5, "Crimson");
	
	//the end
	Platforms.push(new Platform(15300, 16800, 398));
}

function MakeItem(itemString, x, y)
{
	if(itemString == null)
	{
		return;
	}
	item = null;
	
	if(itemString == "10cookie")
	{
		var i;
		for(i = 0; i < 10; i++)
		{
			item = new Cookie(x,y);
	
			item.VX = i - 5;
			item.VY = -30;
			item.falling = true;

			Items.push(item);
		}
	}
	else
	{
		//to do: consolidate the items
		if(itemString == "cookie")
		{
			item = new Cookie(x,y);	
		}
		else if(itemString == "lightbulb")
		{
			item = new Lightbulb(x,y);
		}
		else if(itemString == "tracksuit")
		{
			item = new Tracksuit(x,y);
		}
		else if(itemString == "key")
		{
			item = new Key(x,y);
		}
	
		if(item != null)
		{
			if(mainBugsby.VX > 2)
			{
				item.VX = 3;
			}
			else if(mainBugsby.VX < -2)
			{
				item.VX = -3;
			}
			else
			{
				item.VX = 0;
			}
		
			item.VY = -30;
			item.falling = true;
		
			Items.push(item);
		}
	}
}
