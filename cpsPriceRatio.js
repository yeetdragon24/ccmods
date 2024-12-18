Game.getSumPrice = function(building) {
	return building.getSumPrice.call({
		amount: 0,
		basePrice: building.basePrice,
		fortune: building.fortune,
		free: building.free
	}, building.amount);
}
Game.getCpsPriceRatio = function(building) {
	return (building.storedTotalCps * Game.globalCpsMult) / Game.getSumPrice(building);
}

Game.registerHook('cps', function(cps) {
	for (let i in Game.Objects) {
		let me = Game.Objects[i];
		me.totalCpsPriceRatio = Game.getCpsPriceRatio(me);
		me.nextCpsPriceRatio = (me.storedCps * Game.globalCpsMult) / me.getPrice();
	}
	return cps;
})

for (let i in Game.Objects) {
	let me = Game.Objects[i];
	eval(`me.tooltip = ` + me.tooltip.toString().replace(
		`LBeautify(me.totalCookies)))+'</div>')`,
		`LBeautify(me.totalCookies)))+'</div>')+(me.amount > 0 && me.totalCpsPriceRatio !== undefined ? '<div class="descriptionBlock">your ' + me.plural + ' are producing <b>' + (me.totalCpsPriceRatio < 100 ? (me.totalCpsPriceRatio < 10 ? Beautify(me.totalCpsPriceRatio, 2) : Beautify(me.totalCpsPriceRatio, 1)) : Beautify(me.totalCpsPriceRatio)) + '</b> ' + (Math.round(me.totalCpsPriceRatio * 10) == 10 ? 'cookie' : 'cookies')+' per cookie spent on them</div><div class="descriptionBlock">your next ' + me.single + ' will produce <b>' + (me.nextCpsPriceRatio < 100 ? (me.nextCpsPriceRatio < 10 ? Beautify(me.nextCpsPriceRatio, 2) : Beautify(me.nextCpsPriceRatio, 1)) : Beautify(me.nextCpsPriceRatio)) + '</b> ' + (Math.round(me.nextCpsPriceRatio * 10) == 10 ? 'cookie' : 'cookies') + ' per cookie spent on it</div>' : '')`
	));
}
