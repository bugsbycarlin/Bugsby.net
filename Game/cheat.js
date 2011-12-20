window.document.onkeydown = function(e)
{
    input = e ? e.keyCode : event.keyCode;
    
    if(input == 67 && Cheat.On == false)
    {
        Cheat.create();
        alert('Cheat codes activated.');
    }
}


var Cheat = {
    On: false
};


Cheat.create = function()
{
    this.On = true;
    this.Invincible = true;

    Cheat.invincible = function()
    {
        if(this.Invincible == true)
            this.Invincible = false;
        if(this.Invincible == false)
            this.Invincible = true;
    }

    Cheat.cookie = function()
    {
        NumCookies = NumCookies+100;
    }

    Cheat.lowGravity = function()
    {
        Gravity = 1;
    }

    Cheat.noClip = function()
    {
        Wall.prototype.WallDetect = function(bugsby)
        {
            return false;
        }
    }

    Cheat.fastBaddies = function()
    {
        BaddieRunPower = 5.0;
    }

    Cheat.fastBugsby = function()
    {
        BugsbyRunPower = 6.0;
    }
}