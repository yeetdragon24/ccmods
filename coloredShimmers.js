Object.keys(Game.shimmerTypes).forEach(shimmerType =>
	eval(`Game.shimmerTypes[shimmerType].updateFunc = ` + Game.shimmerTypes[shimmerType].updateFunc.toString()
		.replace(`{`, `{if (!me.spawnLead) me.l.style.setProperty('filter', 'invert(58%) sepia(69%) saturate(3969%) hue-rotate(87deg) brightness(123%) contrast(122%)');`)
	)
);
