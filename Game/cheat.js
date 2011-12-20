// Look for keydown of 'c'
window.document.onkeydown = function(e)
{
    input = e ? e.keyCode : event.keyCode;
    
    if(input == 67 && !Cheat.On)
    {
        // Activate cheats!
        Cheat.create();
    }
}


// Create cheat object
var Cheat = {
    On: false
};


// Cheat activation
Cheat.create = function()
{
    // Set variables
    this.On = true;
    this.Invincible = false;

    // Create and display cheat menu
    var div = document.createElement('div');
    div.setAttribute('style', 'position:absolute;bottom:0;left:50%;width:400px;margin-left:-200px;');
    div.innerHTML = "<a href='javascript:Cheat.invincible()'>invincible</a> <a href='javascript:Cheat.addCookies()'>cookies</a> <a href='javascript:Cheat.lowGravity()'>low-gravity</a> <a href='javascript:Cheat.noClipping()'>no-clip</a> <a href='javascript:Cheat.fastBaddies()'>fast-baddies</a> <a href='javascript:Cheat.fastBugsby()'>fast-bugsby</a>";
    document.body.appendChild(div);

    Cheat.invincible = function()
    {
        if(this.Invincible == true)
            this.Invincible = false;
        if(this.Invincible == false)
            this.Invincible = true;
    }

    Cheat.addCookies = function()
    {
        NumCookies = NumCookies+100;
    }

    Cheat.lowGravity = function()
    {
        Gravity = 1;
    }

    Cheat.noClipping = function()
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