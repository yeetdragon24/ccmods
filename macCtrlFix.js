eval('Game.Logic = ' + Game.Logic.toString().replaceAll('Game.keys[17]', 'Game.keys[18]'));
eval('Game.UpdateWrinklers = ' + Game.UpdateWrinklers.toString().replace('Game.keys[17]', 'Game.keys[18]'));
Game.registerHook('check', function updateGarden() {
    M = Game.Objects['Farm'].minigame;
    if (!M) return false;
    let save = M.save();
    eval('M.launch = ' + M.launch.toString().replaceAll('Game.keys[17]', 'Game.keys[18]'));
    M.launch();
    M.load(save);
    Game.removeHook('check', updateGarden);
});
function inRect(x,y,rect)
{
    //find out if the point x,y is in the rotated rectangle rect{w,h,r,o} (width,height,rotation in radians,y-origin) (needs to be normalized)
    //I found this somewhere online I guess
    var dx = x+Math.sin(-rect.r)*(-(rect.h/2-rect.o)),dy=y+Math.cos(-rect.r)*(-(rect.h/2-rect.o));
    var h1 = Math.sqrt(dx*dx + dy*dy);
    var currA = Math.atan2(dy,dx);
    var newA = currA - rect.r;
    var x2 = Math.cos(newA) * h1;
    var y2 = Math.sin(newA) * h1;
    if (x2 > -0.5 * rect.w && x2 < 0.5 * rect.w && y2 > -0.5 * rect.h && y2 < 0.5 * rect.h) return true;
    return false;
}
