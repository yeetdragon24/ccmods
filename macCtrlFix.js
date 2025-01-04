eval('Game.Logic = ' + Game.Logic.toString().replaceAll('Game.keys[17]', 'Game.keys[18]'));
eval('Game.UpdateWrinklers = ' + Game.UpdateWrinklers.toString().replace('Game.keys[17]', 'Game.keys[18]'));
M = Game.Objects['Farm'].minigame;
let save = M.save();
eval('M.launch = ' + M.launch.toString().replaceAll('Game.keys[17]', 'Game.keys[18]'));
M.launch();
M.load(save);
M = 0;
