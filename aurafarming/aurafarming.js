var M = Game.Objects['Farm'].minigame;
var realGarden = M.save();
M.name = 's';

M.launch = function() {
    var M = this;

    M.init = function(div) {
        //populate div with html and initialize values

        /*
            plants age from 0 to 100
            at one point in its lifespan, the plant becomes mature
            plants have 4 life stages once planted: bud, sprout, bloom, mature
            a plant may age faster by having a higher .ageTick
            if a plant has .ageTickR, a random number between 0 and that amount is added to .ageTick
            a plant may mature faster by having a lower .mature
            a plant's effects depend on how mature it is
            a plant can only reproduce when mature
        */
        M.plants = {
            "Breath of Milk": {
                name: "Breath of Milk",
                icon: 18,
                ageTick: 0.6,
                ageTickR: 0.7,
                mature: 67 + 27,
                children: [],
                effsStr: `<div class="green">&bull; Kittens are <b>0.5%</b> more effective.</div>`,
                q: "Kittens are 0.5% more effective"
            },
            "Dragon Cursor": {
                name: "Dragon Cursor",
                icon: 0,
                ageTick: 10,
                ageTickR: 2,
                mature: 50,
                children: ['Radiant Appetite', 'Reaper of Fields', 'Dragonflight', 'Arcane Aura'],
                effsStr: `<div class="green">&bull; Clicking is <b>2.5%</b> more powerful.</div>`,
                q: "Clicking is 0.5% more effective"
            },
            "Elder Battalion": {
                name: "Elder Battalion",
                icon: 1,
                ageTick: 0.5,
                ageTickR: 0.5,
                mature: 30,
                children: ['Dragon Guts'],
                effsStr: `<div class="green">&bull; Grandmas gain <b>+0.1% CpS</b> for each non-grandma building.</div>`,
                q: "Grandmas gain +0.1% CpS for every non-grandma building"
            },
            "Reaper of Fields": {
                name: "Reaper of Fields",
                icon: 2,
                ageTick: 15,
                ageTickR: 5,
                mature: 75,
                children: ['Dragon Orbs'],
                effsStr: `<div class="green">&bull; Golden cookies may trigger a <b>Reaper of Fields</b>.</div>`,
                q: "Golden cookies may trigger a Reaper of Fields"
            },
            "Earth Shatterer": {
                name: "Earth Shatterer",
                icon: 3,
                ageTick: 15,
                ageTickR: 15,
                mature: 40,
                children: ['Dragon\'s Curve', 'Dragon\'s Fortune'],
                effsStr: `<div class="green">&bull; Buildings sell back for <b>1.25%</b> more than 25%.</div>`,
                q: "Buildings sell back for 1.25% more than 25%"
            },
            "Master of the Armory": {
                name: "Master of the Armory",
                fungus: true,
                icon: 4,
                ageTick: 5,
                ageTickR: 25,
                mature: 30,
                children: ['Fierce Hoarder', 'Earth Shatterer'],
                effsStr: `<div class="green">&bull; All upgrades are <b>0.2% cheaper</b>.</div>`,
                q: "All upgrades are 0.2% cheaper"
            },
            "Fierce Hoarder": {
                name: "Fierce Hoarder",
                fungus: true,
                icon: 15,
                ageTick: 5,
                ageTickR: 25,
                mature: 30,
                children: ['Master of the Armory', 'Mind Over Matter'],
                effsStr: `<div class="green">&bull; All buildings are <b>0.2% cheaper</b>.</div>`,
                q: "All buildings are 0.2% cheaper"
            },
            "Dragon God": {
                name: "Dragon God",
                fungus: true,
                icon: 16,
                ageTick: 2,
                ageTickR: 12,
                mature: 40,
                children: ['Arcane Aura', 'Elder Battalion', 'Mind Over Matter'],
                effsStr: `<div class="green">&bull; <b>+5%</b> prestige level effect on CpS.</div>`,
                q: "Prestige CpS bonus +5%"
            },
            "Arcane Aura": {
                name: "Arcane Aura",
                fungus: true,
                icon: 17,
                ageTick: 10,
                ageTickR: 5,
                mature: 15,
                children: ['Epoch Manipulator'],
                effsStr: `<div class="green">&bull; Golden cookies appear <b>5%</b> more often.</div>`,
                q: "Golden cookies appear 5% more often"
            },
            "Dragonflight": {
                name: "Dragonflight",
                icon: 5,
                ageTick: 15,
                ageTickR: 5,
                mature: 75,
                children: ['Dragon Orbs'],
                effsStr: `<div class="green">&bull; Golden cookies may trigger a <b>Dragonflight</b>.</div>`,
                q: "Golden cookies may trigger a Dragonflight"
            },
            "Ancestral Metamorphosis": {
                name: "Ancestral Metamorphosis",
                weed: true,
                icon: 6,
                ageTick: 10,
                ageTickR: 6,
                mature: 50,
                children: ['Dragon God'],
                effsStr: `<div class="green">&bull; Golden cookies give <b>10%</b> more cookies.</div>`,
                q: "Golden cookies give 10% more cookies",
                onKill: function(x, y, age) {
                    if (Math.random() < 0.0025 * age) { M.plot[y][x] = [M.plants['Dragon God'].id + 1, 0]; }
                }
            },
            "Unholy Dominion": {
                name: "Unholy Dominion",
                weed: true,
                icon: 7,
                ageTick: 20,
                ageTickR: 12,
                mature: 70,
                children: ['Dragon God', 'Fierce Hoarder'],
                effsStr: `<div class="green">&bull; Wrath cookies give <b>10%</b> more cookies.</div>`,
                q: "Wrath cookies give 10% more cookies",
                onKill: function(x, y, age) {
                    if (Math.random() < 0.0025 * age) M.plot[y][x] = [M.plants['Dragon God'].id + 1, 0];
                    if (Math.random() < 0.0025 * age) M.plot[y][x] = [M.plants['Fierce Hoarder'].id + 1, 0];
                }
            },
            "Epoch Manipulator": {
                name: "Epoch Manipulator",
                icon: 8,
                ageTick: 3,
                ageTickR: 0.5,
                mature: 80,
                children: ['Dragon Orbs'],
                effsStr: `<div class="green">&bull; Golden cookies stay <b>0.5%</b> longer.</div>`,
                q: "Golden cookie effects last 0.5% longer"
            },
            "Mind Over Matter": {
                name: "Mind Over Matter",
                icon: 13,
                ageTick: 7,
                ageTickR: 2,
                mature: 65,
                children: ['Dragon\'s Curve', 'Supreme Intellect'],
                effsStr: `<div class="green">&bull; Random drops are <b>2.5% more common</b>.</div>`,
                q: "+2.5% random drops",
                onHarvest: function(x, y, age) {
                    if (Math.random() < 0.01 * age) M.plot[y][x] = [M.plants['Supreme Intellect'].id + 1, 0];
                }
            },
            "Radiant Appetite": {
                name: "Radiant Appetite",
                icon: 14,
                ageTick: 3,
                ageTickR: 1,
                mature: 67,
                children: ['Reaper of Fields', 'Dragonflight', 'Epoch Manipulator'],
                effsStr: `<div class="green">&bull; All cookie production <b>+10%</b>.</div>`,
                q: "All cookie production +10%"
            },
            "Dragon's Fortune": {
                name: "Dragon's Fortune",
                icon: 19,
                ageTick: 0.5,
                ageTickR: 0.2,
                mature: 75,
                children: [],
                effsStr: `<div class="green">&bull; <b>+1.23% CpS</b> per golden cookie on-screen, multiplicative.</div>`,
                q: "+1.23% CpS per golden cookie on-screen"
            },
            "Dragon's Curve": {
                name: "Dragon's Curve",
                icon: 20,
                ageTick: 50,
                ageTickR: 20,
                mature: 60,
                children: [],
                effsStr: `<div class="green">&bull; <b>+0.5%</b> sugar lump growth.<br>&bull; Sugar lumps are <b>+10% as likely</b> to be unusual.</div>`,
                q: "Sugar lumps grow 0.5% faster, 10% weirder"
            },
            "Reality Bending": {
                name: "Reality Bending",
                icon: 32,
                ageTick: 0,
                ageTickR: 15,
                mature: 50,
                children: [],
                effsStr: `<div class="green">&bull; <b>One tenth</b> of every other dragon aura, <b>combined</b>.</div>`,
                q: "10% of every other aura, combined"
            },
            "Dragon Orbs": {
                name: "Dragon Orbs",
                icon: 33,
                ageTick: 3,
                ageTickR: 1,
                mature: 30,
                children: [],
                effsStr: `<div class="green">&bull; With no buffs and no golden cookies on screen, selling your most powerful building has <b>1% chance to summon a golden cookie</b>.</div>`,
                q: "Selling your best building may grant a wish"
            },
            "Supreme Intellect": {
                name: "Supreme Intellect",
                icon: 34,
                ageTick: 5,
                ageTickR: 10,
                mature: 35,
                children: [],
                effsStr: `<div class="green">&bull; Confers various powers to your minigames while active.<br>See the bottom of each minigame for more details.</div>`,
                q: "Confers various powers to your minigames"
            },
            "Dragon Guts": {
                name: "Dragon Guts",
                icon: 35,
                ageTick: 0.1,
                ageTickR: 0.5,
                mature: 45,
                children: [],
                effsStr: `<div class="green">&bull; You can attract <b>0.2 more wrinklers</b>.<br>&bull; Wrinklers digest <b>2% more cookies</b>.<br>&bull; Wrinklers explode into <b>2% more cookies</b>.</div>`,
                q: "Enhanced wrinklers"
            }
        };
        M.plantsById = []; var n = 0;
        for (var i in M.plants) {
            var it = M.plants[i];
            it.unlocked = 0;
            it.id = n;
            it.key = i;
            it.matureBase = it.mature;
            M.plantsById[n] = it;
            if (typeof it.plantable === 'undefined') { it.plantable = true; }
            it.q = loc(FindLocStringByPart(it.name + ' quote'));
            it.name = loc(it.name);
            n++;
        }
        M.plantsN = M.plantsById.length;
        M.plantsUnlockedN = 0;
        M.getUnlockedN = function() {
            M.plantsUnlockedN = 0;
            for (var i in M.plants) { if (M.plants[i].unlocked) M.plantsUnlockedN++; }
            if (M.plantsUnlockedN >= M.plantsN) {
                Game.Win('Keeper of the conservatory');
                l('gardenTool-3').classList.remove('locked');
            }
            else l('gardenTool-3').classList.add('locked');

            return M.plantsUnlockedN;
        }

        M.drops = ['Dragon scale', 'Dragon claw', 'Dragon fang', 'Dragon teddy bear'];
        M.dropUpgrade = function(upgrade, rate) {
            if (!Game.Has(upgrade) && Math.random() <= rate * Game.dropRateMult() * (Game.HasAchiev('Seedless to nay') ? 1.05 : 1)) {
                Game.Unlock(upgrade);
                Game.Notify('You found a drop!', upgrade, Game.Upgrades[upgrade].icon);
            }
        }

        M.computeMatures = function() {
            var mult = 1;
            if (Game.HasAchiev('Seedless to nay')) mult = 0.95;
            for (var i in M.plants) {
                M.plants[i].mature = M.plants[i].matureBase * mult;
            }
        }

        M.plantContam = {};
        for (var i in M.plants) {
            if (M.plants[i].contam) M.plantContam[M.plants[i].key] = M.plants[i].contam;
        }

        M.getMuts = function(neighs, neighsM) {
            //get possible mutations given a list of neighbors
            //note: neighs stands for neighbors, not horsey noises
            var muts = []; //['plant', chance], ie ['bakeberry', 0.001]

            if (neighsM['Dragon Cursor'] >= 2) muts.push(['Radiant Appetite', 0.05]);

            if (neighsM['Dragon Cursor'] >= 1 && neighsM['Radiant Appetite'] >= 1) muts.push(['Dragonflight', 0.025], ['Reaper of Fields', 0.025]);
            if ((neighsM['Reaper of Fields'] >= 1 || neighsM['Dragonflight'] >= 1) && neighsM['Epoch Manipulator'] >= 1) muts.push(['Dragon Orbs', 0.01]);
            if (neighsM['Dragon Cursor'] >= 1 && neighsM['Dragon God'] >= 1) muts.push(['Arcane Aura', 0.02]);
            if (neighsM['Arcane Aura'] >= 1 && neighsM['Radiant Appetite'] >= 1) muts.push(['Epoch Manipulator', 0.02]);

            if (neighsM['Dragon God'] >= 1 && neighsM['Radiant Appetite'] >= 1) muts.push(['Breath of Milk', 0.005], ['Elder Battalion', 0.01]);
            if (neighsM['Dragon God'] >= 1 && neighsM['Fierce Hoarder'] >= 1) muts.push(['Mind Over Matter']);
            if (neighsM['Fierce Hoarder'] >= 1) muts.push(['Master of the Armory', 0.15]);
            if (neighsM['Master of the Armory'] >= 1) muts.push(['Fierce Hoarder', 0.15]);
            if (neighsM['Fierce Hoarder'] >= 1 && neighsM['Master of the Armory'] >= 1) muts.push(['Earth Shatterer', 0.025]);

            if (neighsM['Elder Battalion'] >= 1 && neighsM['Supreme Intellect'] >= 1) muts, push(['Dragon Guts', 0.05]);
            if (neighsM['Mind Over Matter'] >= 1 && neighsM['Earth Shatterer'] >= 1) muts.push(['Dragon\'s Curve', 0.025]);

            let lAura = ['Reaper of Fields', 'Dragonflight', 'Master of the Armory', 'Ancestral Metamorphosis'];
            if (lAura.every(plant => neighs[plant])) muts.push(['Reality Bending', 0.08]);

            if (neighsM['Dragon Orbs'] >= 1 && neighsM['Dragon Guts'] >= 1 && neighsM['Earth Shatterer'] >= 1) muts.push(['Dragon\'s Fortune', 0.01]);

            return muts;
        }

        M.computeBoostPlot = function() {
            //some plants apply effects to surrounding tiles
            //this function computes those effects by creating a grid in which those effects stack
            for (var y = 0; y < 6; y++) {
                for (var x = 0; x < 6; x++) {
                    //age mult, power mult, weed mult
                    M.plotBoost[y][x] = [1, 1, 1];
                }
            }

            var effectOn = function(X, Y, s, mult) {
                for (var y = Math.max(0, Y - s); y < Math.min(6, Y + s + 1); y++) {
                    for (var x = Math.max(0, X - s); x < Math.min(6, X + s + 1); x++) {
                        if (X == x && Y == y) { }
                        else {
                            for (var i = 0; i < mult.length; i++) {
                                M.plotBoost[y][x][i] *= mult[i];
                            }
                        }
                    }
                }
            }
            for (var y = 0; y < 6; y++) {
                for (var x = 0; x < 6; x++) {
                    var tile = M.plot[y][x];
                    if (tile[0] > 0) {
                        var me = M.plantsById[tile[0] - 1];
                        var name = me.key;
                        var stage = 0;
                        if (tile[1] >= me.mature) stage = 4;
                        else if (tile[1] >= me.mature * 0.666) stage = 3;
                        else if (tile[1] >= me.mature * 0.333) stage = 2;
                        else stage = 1;

                        var soilMult = M.soilsById[M.soil].effMult;
                        var mult = soilMult;

                        if (stage == 1) mult *= 0.1;
                        else if (stage == 2) mult *= 0.25;
                        else if (stage == 3) mult *= 0.5;
                        else mult *= 1;

                        var ageMult = 1;
                        var powerMult = 1;
                        var weedMult = 1;
                        var range = 0;


                        //by god i hope these are right
                        if (ageMult >= 1) ageMult = (ageMult - 1) * mult + 1; else if (mult >= 1) ageMult = 1 / ((1 / ageMult) * mult); else ageMult = 1 - (1 - ageMult) * mult;
                        if (powerMult >= 1) powerMult = (powerMult - 1) * mult + 1; else if (mult >= 1) powerMult = 1 / ((1 / powerMult) * mult); else powerMult = 1 - (1 - powerMult) * mult;

                        if (name == 's') { /* something */ }

                        if (range > 0) effectOn(x, y, range, [ageMult, powerMult, weedMult]);
                    }
                }
            }
        }

        M.effs = {};
        
        M.balanceMults = {
            "Breath of Milk": 0.1,
            "Dragon Cursor": 0.5,
            "Elder Battalion": 0.1,
            "Reaper of Fields": 0.1,
            "Earth Shatterer": 0.05,
            "Master of the Armory": 0.1,
            "Fierce Hoarder": 0.1,
            "Dragon God": 1,
            "Arcane Aura": 1,
            "Dragonflight": 0.1,
            "Ancestral Metamorphosis": 1,
            "Unholy Dominion": 1,
            "Epoch Manipulator": 0.1,
            "Mind Over Matter": 0.1,
            "Radiant Appetite": 0.1,
            "Dragon's Fortune": 0.01,
            "Dragon's Curve": 0.1,
            "Reality Bending": 1,
            "Dragon Orbs": 0.1,
            "Supreme Intellect": 0.1,
            "Dragon Guts": 0.1
        };

        M.computeEffs = function() {
            M.toCompute = false;
            var effs = {
                milk: 1,
                click: 1,
                grandmaCps: 1,
                dragonHarvest: 0,
                cookiesBack: 0.25,
                upgradeCost: 1,
                buildingCost: 1,
                prestige: 1,
                goldenCookieFreq: 1,
                dragonflight: 0,
                goldenCookieGain: 1,
                wrathCookieGain: 1,
                goldenCookieEffDur: 1,
                itemDrops: 1,
                cps: 1,
                onscreenCps: 1,
                lumpGrowth: 1,
                lumpWeirdness: 1,
                orbsChance: 0,
                siEffects: 0,
                wrinklerEat: 1,
                wrinklerExplode: 1,
                extraWrinklers: 0
            };

            if (!M.freeze) {
                var soilMult = M.soilsById[M.soil].effMult;

                for (var y = 0; y < 6; y++) {
                    for (var x = 0; x < 6; x++) {
                        var tile = M.plot[y][x];
                        if (tile[0] > 0) {
                            var me = M.plantsById[tile[0] - 1];
                            var name = me.key;
                            var stage = 0;
                            if (tile[1] >= me.mature) stage = 4;
                            else if (tile[1] >= me.mature * 0.666) stage = 3;
                            else if (tile[1] >= me.mature * 0.333) stage = 2;
                            else stage = 1;

                            var mult = soilMult;

                            if (stage == 1) mult *= 0.1;
                            else if (stage == 2) mult *= 0.25;
                            else if (stage == 3) mult *= 0.5;
                            else mult *= 1;

                            mult *= M.plotBoost[y][x][1];

                            mult *= M.balanceMults[name];

                            if (name == 'Breath of Milk') effs.milk += 0.05 * mult;
                            else if (name == 'Dragon Cursor') effs.click += 0.05 * mult;
                            else if (name == 'Elder Battalion') effs.grandmaCps += 0.01 * mult;
                            else if (name == 'Reaper of Fields') { effs.dragonHarvest += 1 * mult; }
                            else if (name == 'Earth Shatterer') effs.cookiesBack += 0.25 * mult;
                            else if (name == 'Master of the Armory') effs.upgradeCost *= 1 - 0.02 * mult;
                            else if (name == 'Fierce Hoarder') { effs.buildingCost *= 1 - 0.02 * mult; }
                            else if (name == 'Dragon God') { effs.prestige += 0.05 * mult; }
                            else if (name == 'Arcane Aura') effs.goldenCookieFreq += 0.05 * mult;
                            else if (name == 'Dragonflight') effs.dragonflight += 1 * mult;
                            else if (name == 'Ancestral Metamorphosis') effs.goldenCookieGain += 0.1 * mult;
                            else if (name == 'Unholy Dominion') effs.wrathCookieGain += 0.1 * mult;
                            else if (name == 'Epoch Manipulator') effs.goldenCookieEffDur += 0.05 * mult;
                            else if (name == 'Mind Over Matter') effs.itemDrops += 0.25 * mult;
                            else if (name == 'Radiant Appetite') effs.cps += 1 * mult;
                            else if (name == 'Dragon\'s Fortune') { effs.onscreenCps += 1.23 * mult; }
                            else if (name == 'Dragon\'s Curve') { effs.lumpGrowth += 0.05 * mult; effs.lumpWeirdness += 1 * mult; }
                            else if (name == 'Dragon Orbs') { effs.orbsChance += 0.1 * mult; }
                            else if (name == 'Reality Bending') {
                                effs.milk += 0.05 * mult * M.balanceMults["Breath of Milk"] * 0.1;
                                effs.click += 0.05 * mult * M.balanceMults["Dragon Cursor"] * 0.1;
                                effs.grandmaCps += 0.01 * mult * M.balanceMults["Elder Battalion"] * 0.1;
                                effs.dragonHarvest += 1 * mult * M.balanceMults["Reaper of Fields"] * 0.1;
                                effs.cookiesBack += 0.25 * mult * M.balanceMults["Earth Shatterer"] * 0.1;
                                effs.upgradeCost *= 1 - 0.02 * mult * M.balanceMults["Master of the Armory"] * 0.1;
                                effs.buildingCost *= 1 - 0.02 * mult * M.balanceMults["Fierce Hoarder"] * 0.1;
                                effs.prestige += 0.05 * mult * M.balanceMults["Dragon God"] * 0.1;
                                effs.goldenCookieFreq += 0.05 * mult * M.balanceMults["Arcane Aura"] * 0.1;
                                effs.dragonflight += 1 * mult * M.balanceMults["Dragonflight"] * 0.1;
                                effs.goldenCookieGain += 0.1 * mult * M.balanceMults["Ancestral Metamorphosis"] * 0.1;
                                effs.wrathCookieGain += 0.1 * mult * M.balanceMults["Unholy Dominion"] * 0.1;
                                effs.goldenCookieEffDur += 0.05 * mult * M.balanceMults["Epoch Manipulator"] * 0.1;
                                effs.itemDrops += 0.25 * mult * M.balanceMults["Mind Over Matter"] * 0.1;
                                effs.cps += 1 * mult * M.balanceMults["Radiant Appetite"] * 0.1;
                                effs.onscreenCps += 1.23 * mult * M.balanceMults["Dragon's Fortune"] * 0.1;
                                effs.lumpGrowth += 0.05 * mult * M.balanceMults["Dragon's Curve"] * 0.1;
                                effs.lumpWeirdness += 1 * mult * M.balanceMults["Dragon's Curve"] * 0.1;
                                effs.orbsChance += 0.1 * mult * M.balanceMults["Dragon Orbs"] * 0.1;
                                effs.siEffects += 1 * mult * M.balanceMults["Supreme Intellect"] * 0.1;
                                effs.wrinklerEat += 0.2 * mult * M.balanceMults["Dragon Guts"] * 0.1;
                                effs.wrinklerExplode += 0.2 * mult * M.balanceMults["Dragon Guts"] * 0.1;
                            }
                            else if (name == 'Supreme Intellect') { effs.siEffects += 1 * mult; }
                            else if (name == 'Dragon Guts') { effs.wrinklerEat += 0.2 * mult; effs.wrinklerExplode += 0.2 * mult; effs.extraWrinklers += 2 * mult; }
                        }
                    }
                }
            }
            M.eff = effs;
        }

        M.soils = {
            'dirt': {
                name: loc("Dirt"),
                icon: 0,
                tick: 3,
                effMult: 1,
                weedMult: 1,
                req: 0,
                effsStr: '<div class="gray">&bull; ' + loc("tick every %1", '<b>' + Game.sayTime(3 * 60 * Game.fps) + '</b>') + '</div>',
                q: loc("Simple, regular old dirt that you'd find in nature."),
            },
            'fertilizer': {
                name: loc("Fertilizer"),
                icon: 1,
                tick: 1,
                effMult: 0.75,
                weedMult: 1.5,
                req: 50,
                effsStr: '<div class="gray">&bull; ' + loc("tick every %1", '<b>' + Game.sayTime(1 * 60 * Game.fps) + '</b>') + '</div><div class="red">&bull; ' + loc("passive plant effects") + ' <b>-25%</b></div><div class="red">&bull; ' + loc("weed growth") + ' <b>+50%</b></div>',
                q: loc("Soil with a healthy helping of fresh manure. Plants grow faster but are less efficient."),
            },
            'clay': {
                name: loc("Clay"),
                icon: 2,
                tick: 10,
                effMult: 1.25,
                weedMult: 1,
                req: 100,
                effsStr: '<div class="gray">&bull; ' + loc("tick every %1", '<b>' + Game.sayTime(10 * 60 * Game.fps) + '</b>') + '</div><div class="green">&bull; ' + loc("passive plant effects") + ' <b>+25%</b></div>',
                q: loc("Rich soil with very good water retention. Plants grow slower but are more efficient."),
            },
            'pebbles': {
                name: loc("Pebbles"),
                icon: 3,
                tick: 5,
                effMult: 0.25,
                weedMult: 0.1,
                req: 200,
                effsStr: '<div class="gray">&bull; ' + loc("tick every %1", '<b>' + Game.sayTime(5 * 60 * Game.fps) + '</b>') + '</div><div class="red">&bull; ' + loc("passive plant effects") + ' <b>-75%</b></div><div class="green">&bull; ' + loc("<b>%1% chance</b> of collecting seeds automatically when plants expire", 35) + '</div><div class="green">&bull; ' + loc("weed growth") + ' <b>-90%</b></div>',
                q: loc("Dry soil made of small rocks tightly packed together. Not very conducive to plant health, but whatever falls off your crops will be easy to retrieve.<br>Useful if you're one of those farmers who just want to find new seeds without having to tend their garden too much."),
            },
            'woodchips': {
                name: loc("Wood chips"),
                icon: 4,
                tick: 5,
                effMult: 0.25,
                weedMult: 0.25,
                req: 300,
                effsStr: '<div class="gray">&bull; ' + loc("tick every %1", '<b>' + Game.sayTime(5 * 60 * Game.fps) + '</b>') + '</div><div class="red">&bull; ' + loc("passive plant effects") + ' <b>-75%</b></div><div class="green">&bull; ' + loc("plants spread and mutate <b>%1 times more</b>", 2) + '</div><div class="green">&bull; ' + loc("weed growth") + ' <b>-75%</b></div>',
                q: loc("Soil made of bits and pieces of bark and sawdust. Helpful for young sprouts to develop, not so much for mature plants."),
            },
        };
        M.soilsById = []; var n = 0; for (var i in M.soils) { M.soils[i].id = n; M.soils[i].key = i; M.soilsById[n] = M.soils[i]; n++; }


        M.tools = {
            'info': {
                name: loc("Garden information"),
                icon: 3,
                desc: '-',
                descFunc: function() {
                    var str = '';
                    if (M.freeze) str = loc("Your garden is frozen, providing no effects.");
                    else {
                        var effs = {
                            milk: { n: 'milk effects' },
                            click: { n: 'cookies/click' },
                            grandmaCps: { n: 'grandma CpS per non-grandma building' },
                            dragonHarvest: { n: 'normal chance for Dragon Harvest', mult: true, default: 0 },
                            cookiesBack: { n: 'cookies back on sell', default: 0.25 },
                            upgradeCost: { n: 'upgrade costs', rev: true },
                            buildingCost: { n: 'building costs', rev: true },
                            prestige: { n: 'prestige level effect' },
                            goldenCookieFreq: { n: 'golden cookie frequency' },
                            dragonflight: { n: 'normal chance for Dragonflight', mult: true, default: 0 },
                            goldenCookieGain: { n: 'golden cookie gains', mult: true },
                            wrathCookieGain: { n: 'wrath cookie gains', mult: true },
                            goldenCookieEffDur: { n: 'golden cookie effect duration' },
                            itemDrops: { n: 'random drops' },
                            cps: { n: 'CpS' },
                            onscreenCps: { n: 'CpS per onscreen', mult: true },
                            lumpGrowth: { n: 'sugar lump growth' },
                            lumpWeirdness: { n: 'likelihood for sugar lumps to be unusual' },
                            orbsChance: { n: 'chance for selling your highest building to spawn a golden cookie', default: 0 },
                            siEffects: { n: 'Supreme Intellect effects', mult: true, default: 0 },
                            wrinklerEat: { n: 'wrinkler appetite' },
                            wrinklerExplode: { n: 'cookies from wrinklers' },
                            extraWrinklers: { n: ' extra wrinklers', num: true, default: 0 }
                        };
                        for (var i in effs) { effs[i].n = loc(effs[i].n); }

                        var effStr = '';
                        for (var i in M.eff) {
                            if (M.eff[i] != (effs[i]?.default ?? 1)) {
                                var amount = (M.eff[i] - (effs[i]?.default ?? 1)) * 100;
                                effStr += `<div style="font-size:10px;margin-left:44px;"><b>&bull; ${effs[i].n}</b> <span class="${((amount * (effs[i].rev ? -1 : 1)) > 0 ? 'green' : 'red')}">${effs[i].mult ? 'x' : (amount > 0 ? '+' : '-')}${Beautify(Math.abs(M.eff[i] - (effs[i].default ?? 1) + (effs[i].mult || effs[i].num ? 1 : 0)) * (effs[i].mult || effs[i].num ? 1 : 100), 2)}${effs[i].mult || effs[i].num ? '' : '%'}</span></div>`;
                            }
                        }
                        if (effStr == '') effStr = '<div style="font-size:10px;margin-left:64px;"><b>' + loc("None.") + '</b></div>';
                        str += '<div>' + loc("Combined effects of all your plants:") + '</div>' + effStr;
                    }
                    str += '<div class="line" style="margin-top: 4px;"></div>';
                    str += '<img src="' + Game.resPath + 'img/gardenTip.png" style="float:right;margin:0px 0px 8px 8px;"/><small style="line-height:100%;">' + (EN ? "&bull; You can cross-breed plants by planting them close to each other; new plants will grow in the empty tiles next to them.<br>&bull; Unlock new seeds by harvesting mature plants.<br>&bull; When you ascend, your garden plants are reset, but you keep all the seeds you\'ve unlocked.<br>&bull; Your garden has no effect and does not grow while the game is closed." : loc("-You can cross-breed plants by planting them close to each other; new plants will grow in the empty tiles next to them.<br>-Unlock new seeds by harvesting mature plants.<br>-When you ascend, your garden plants are reset, but you keep all the seeds you've unlocked.<br>-Your garden has no effect and does not grow while the game is closed.")) + '</small>';
                    return str;
                },
                func: function() { },
            },
            'harvestAll': {
                name: loc("Harvest all"),
                icon: 0,
                descFunc: function() { return loc("Instantly harvest all plants in your garden.") + '<div class="line"></div>' + ((EN && Game.keys[16] && Game.keys[17]) ? '<b>You are holding shift+ctrl.</b> Only mature, mortal plants will be harvested.' : loc("%1 to harvest only mature, mortal plants.", loc("Shift") + '+' + loc("Ctrl") + '+' + loc("Click"))); },
                func: function() {
                    PlaySound('snd/toneTick.mp3');
                    /*if (M.freeze){return false;}*/
                    if (Game.keys[16] && Game.keys[17]) M.harvestAll(0, 1, 1);//ctrl & shift, harvest only mature non-immortal plants
                    else M.harvestAll();
                },
            },
            'freeze': {
                name: loc("Freeze"),
                icon: 1,
                descFunc: function() {
                    return loc("Cryogenically preserve your garden.<br>Plants no longer grow, spread or die; they provide no benefits.<br>Soil cannot be changed.<div class=\"line\"></div>Using this will effectively pause your garden.");//<div class="line"></div><span class="red">'+((M.nextFreeze>Date.now())?'You will be able to freeze your garden again in '+Game.sayTime((M.nextFreeze-Date.now())/1000*30+30,-1)+'.':'After unfreezing your garden, you must wait 10 minutes to freeze it again.')+'</span>
                },
                func: function() {
                    //if (!M.freeze && M.nextFreeze>Date.now()) return false;
                    PlaySound('snd/toneTick.mp3');
                    M.freeze = (M.freeze ? 0 : 1);
                    if (M.freeze) {
                        M.computeEffs();
                        PlaySound('snd/freezeGarden.mp3');
                        this.classList.add('on');
                        l('gardenContent').classList.add('gardenFrozen');


                        for (var y = 0; y < 6; y++) {
                            for (var x = 0; x < 6; x++) {
                                var tile = M.plot[y][x];
                                if (tile[0] > 0) {
                                    var me = M.plantsById[tile[0] - 1];
                                    var age = tile[1];
                                    if (me.key == 'cheapcap' && Math.random() < 0.15) {
                                        M.plot[y][x] = [0, 0];
                                        if (me.onKill) me.onKill(x, y, age);
                                        M.toRebuild = true;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        //M.nextFreeze=Date.now()+(Game.Has('Turbo-charged soil')?1:(1000*60*10));
                        M.computeEffs();
                        this.classList.remove('on');
                        l('gardenContent').classList.remove('gardenFrozen');
                    }
                    Game.recalculateGains = 1;
                },
                isOn: function() { if (M.freeze) { l('gardenContent').classList.add('gardenFrozen'); } else { l('gardenContent').classList.remove('gardenFrozen'); } return M.freeze; },
            },
            'convert': {
                name: loc("Sacrifice garden"),
                icon: 2,
                desc: loc("A swarm of sugar hornets comes down on your garden, <span class=\"red\">destroying every plant as well as every seed you've unlocked</span> - leaving only a %1 seed.<br>In exchange, they will grant you <span class=\"green\">%2</span>.<br>This action is only available with a complete seed log.", [loc("Baker's wheat"), loc("%1 sugar lump", LBeautify(10))]),
                func: function() { PlaySound('snd/toneTick.mp3'); M.askConvert(); },
                isDisplayed: function() { if (M.plantsUnlockedN >= M.plantsN) return true; else return false; },
            },
        };
        M.toolsById = []; var n = 0; for (var i in M.tools) { M.tools[i].id = n; M.tools[i].key = i; M.toolsById[n] = M.tools[i]; n++; }


        M.plot = [];
        for (var y = 0; y < 6; y++) {
            M.plot[y] = [];
            for (var x = 0; x < 6; x++) {
                M.plot[y][x] = [0, 0];
            }
        }
        M.plotBoost = [];
        for (var y = 0; y < 6; y++) {
            M.plotBoost[y] = [];
            for (var x = 0; x < 6; x++) {
                //age mult, power mult, weed mult
                M.plotBoost[y][x] = [1, 1, 1];
            }
        }

        M.tileSize = 40;

        M.seedSelected = -1;

        M.soil = 0;
        M.nextSoil = 0;//timestamp for when soil will be ready to change again

        M.stepT = 1;//in seconds
        M.nextStep = 0;//timestamp for next step tick

        M.harvests = 0;
        M.harvestsTotal = 0;

        M.loopsMult = 1;

        M.toRebuild = false;
        M.toCompute = false;

        M.freeze = 0;
        M.nextFreeze = 0;//timestamp for when we can freeze again; unused, but still stored

        M.getCost = function(me) {
            if (Game.Has('Turbo-charged soil')) return 0;
            if (me.name == 'Breath of Milk') return Game.cookiesPs * 1000;
            return 100;
            return Math.max(me.costM, Game.cookiesPs * me.cost * 60) * (Game.HasAchiev('Seedless to nay') ? 0.95 : 1);
        }

        M.getPlantDesc = function(me) {
            var children = '';
            if (me.children.length > 0) {
                children += '<div class="shadowFilter" style="display:inline-block;">';
                for (var i in me.children) {
                    if (!M.plants[me.children[i]]) console.log('No plant named ' + me.children[i]);
                    else {
                        var it = M.plants[me.children[i]];
                        children += `<div class="gardenSeedTiny" style="${writeIcon([it.icon, 25])} background-image: url('${Game.resPath}img/icons.png')!important;"></div>`;
                    }
                }
                children += '</div>';
            }
            var dragonBoost = 1 / (1 + 0.05 * Game.auraMult('Supreme Intellect'));
            return '<div class="description">' +
                (!me.immortal ? ('<div style="margin:6px 0px;font-size:11px;"><b>' + loc("Average lifespan:") + '</b> ' + Game.sayTime(((100 / (me.ageTick + me.ageTickR / 2)) * dragonBoost * M.stepT) * 30, -1) + ' <small>(' + loc("%1 tick", LBeautify(Math.ceil((100 / ((me.ageTick + me.ageTickR / 2) / dragonBoost)) * (1)))) + ')</small></div>') : '') +
                '<div style="margin:6px 0px;font-size:11px;"><b>' + loc("Average maturation:") + '</b> ' + Game.sayTime(((100 / ((me.ageTick + me.ageTickR / 2))) * (me.mature / 100) * dragonBoost * M.stepT) * 30, -1) + ' <small>(' + loc("%1 tick", LBeautify(Math.ceil((100 / ((me.ageTick + me.ageTickR / 2) / dragonBoost)) * (me.mature / 100)))) + ')</small></div>' +
                (me.weed ? '<div style="margin:6px 0px;font-size:11px;"><b>' + (EN ? "Is a weed" : loc("Weed")) + '</b></div>' : '') +
                (me.fungus ? '<div style="margin:6px 0px;font-size:11px;"><b>' + (EN ? "Is a fungus" : loc("Fungus")) + '</b></div>' : '') +
                (me.detailsStr ? ('<div style="margin:6px 0px;font-size:11px;"><b>' + loc("Details:") + '</b> ' + me.detailsStr + '</div>') : '') +
                (children != '' ? ('<div style="margin:6px 0px;font-size:11px;"><b>' + loc("Possible mutations:") + '</b> ' + children + '</div>') : '') +
                '<div class="line"></div>' +
                '<div style="margin:6px 0px;"><b>' + loc("Effects:") + '</b> <span style="font-size:11px;">(' + loc("while plant is alive; scales with plant growth") + ')</span></div>' +
                '<div style="font-size:11px;font-weight:bold;">' + me.effsStr + '</div>' +
                (me.q ? ('<q>' + me.q + '</q>') : '') +
                '</div>';
        }
        M.canPlant = function(me) {
            if (me.name == 'Breath of Milk' && Game.cookies >= M.getCost(me)) return true;
            return Game.ObjectsById[me.id - 1].amount >= M.getCost(me);
        }

        M.cursor = 1;
        M.hideCursor = function() {
            M.cursor = 0;
        }
        M.showCursor = function() {
            M.cursor = 1;
        }

        M.soilTooltip = function(id) {
            return function() {
                var me = M.soilsById[id];
                var str = '<div style="padding:8px 4px;min-width:350px;" id="tooltipGardenSoil">' +
                    (M.parent.amount < me.req ? (
                        '<div style="text-align:center;">' + loc("Soil unlocked at %1 farms.", me.req) + '</div>'
                    ) : (`<div class="icon" style="background:url(${Game.resPath}img/gardenPlants.png?v=${Game.version});float:left;margin-left:-8px;margin-top:-8px;background-position:${-me.icon*48}px ${-34*48}px;"></div>` +
                        '<div><div class="name">' + me.name + '</div><div><small>' + ((M.soil == me.id) ? loc("Your field is currently using this soil.") : (M.nextSoil > Date.now()) ? loc("You will be able to change your soil again in %1.", Game.sayTime((M.nextSoil - Date.now()) / 1000 * 30 + 30, -1)) : loc("Click to use this type of soil for your whole field.")) + '</small></div></div>' +
                        '<div class="line"></div>' +
                        '<div class="description">' +
                        '<div style="margin:6px 0px;"><b>' + loc("Effects:") + '</b></div>' +
                        '<div style="font-size:11px;font-weight:bold;">' + me.effsStr + '</div>' +
                        (me.q ? ('<q>' + me.q + '</q>') : '') +
                        '</div>')) +
                    '</div>';
                return str;
            };
        }
        M.seedTooltip = function(id) {
            return function() {
                var me = M.plantsById[id];
                var str = `<div style="padding:8px 4px;min-width:400px;" id="tooltipGardenSeed">
            <div class="icon" style="background:url('${Game.resPath}img/icons.png');float:left;margin-left:-18px;margin-top:-4px;transform:scale(0.5);${writeIcon([me.icon, 25])}"></div>
            <div class="icon" style="background:url('${Game.resPath}img/icons.png');float:left;margin-left:-24px;margin-top:-28px;${writeIcon([me.icon, 25])}"></div>
            <div style="background:url(${Game.resPath}img/turnInto.png);width:20px;height:22px;position:absolute;left:28px;top:24px;z-index:1000;"></div>
            ${me.plantable ? `<div style="float:right;text-align:right;width:100px;"><small>${loc("Planting cost:")}</small><br>${me.name != 'Breath of Milk' ? tinyIcon([me.icon, 0]) : ''}<span class="price${me.name != 'Breath of Milk' ? ' garden' : ''}${M.canPlant(me) ? '' : ' disabled'}">${Beautify(Math.round(shortenNumber(M.getCost(me))))}</span><br><small>${/*loc("%1 of CpS,<br>minimum %2", [Game.sayTime(me.cost * 60 * 30, -1), loc("%1 cookie", LBeautify(me.costM))])*/''}</small></div>` : ''}
            <div style="width:300px;"><div class="name">${cap(loc("%1 seed", me.name))}</div><div><small>${me.plantable ? loc("Click to select this seed for planting.") : `<span class=\"red\">${loc("This seed cannot be planted.")}</span>`}<br>${loc("%1 to harvest all mature plants of this type.", loc("Shift") + '+' + loc("Ctrl") + '+' + loc("Click"))}</small></div></div>
            <div class="line"></div>
            ${M.getPlantDesc(me)}
            </div>`;
                return str;
            };
        }
        M.toolTooltip = function(id) {
            return function() {
                var me = M.toolsById[id];
                var icon = [me.icon, 35];
                var str = '<div style="padding:8px 4px;min-width:350px;" id="tooltipGardenTool">' +
                    '<div class="icon" style="background:url(' + Game.resPath + 'img/gardenPlants.png);float:left;margin-left:-8px;margin-top:-8px;background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;"></div>' +
                    '<div><div class="name">' + me.name + '</div></div>' +
                    '<div class="line"></div>' +
                    '<div class="description">' +
                    (me.descFunc ? me.descFunc() : me.desc) +
                    '</div>' +
                    '</div>';
                return str;
            };
        }
        M.tileTooltip = function(x, y) {
            return function() {
                if (Game.keys[16]) return '';
                var tile = M.plot[y][x];
                if (tile[0] == 0) {
                    var me = (M.seedSelected >= 0) ? M.plantsById[M.seedSelected] : 0;
                    var str = `
                        <div style="padding:8px 4px;min-width:350px;text-align:center;" id="tooltipGardenTile">
                            <div class="name">${loc("Empty tile")}</div>
                            <div class="line"></div>
                            <div class="description">
                                ${loc("This tile of soil is empty.<br>Pick a seed and plant something!")}
                                ${me ? `<div class=\"line\"></div>${loc("Click to plant %1 for %2.", [
                        `<b>${me.name}</b>`,
                        `${me.name != 'Breath of Milk' ? tinyIcon([me.icon, 0]) : ''}<span class=\"price${me.name != 'Breath of Milk' ? ' garden' : ''}${M.canPlant(me) ? '' : ' disabled'}\">${Beautify(Math.round(M.getCost(me)))}</span>`
                    ])}<br><small>(${loc("%1 to plant multiple.", loc("Shift-click"))})</small>${EN ? '<br><small>(Holding the shift key pressed will also hide tooltips.)</small>' : ''}` : ''}
                                ${M.plotBoost[y][x][0] != 1 ? `<br><small>${loc("Aging multiplier:")} ${Beautify(M.plotBoost[y][x][0] * 100)}%</small>` : ''}
                                ${M.plotBoost[y][x][1] != 1 ? `<br><small>${loc("Effect multiplier:")} ${Beautify(M.plotBoost[y][x][1] * 100)}%</small>` : ''}
                                ${M.plotBoost[y][x][2] != 1 ? `<br><small>${loc("Weeds/fungus repellent:")} ${Beautify(100 - M.plotBoost[y][x][2] * 100)}%</small>` : ''}
                            </div>
                        </div>
                    `;
                    return str;
                } else {
                    var me = M.plantsById[tile[0] - 1];
                    var stage = 0;
                    if (tile[1] >= me.mature) stage = 4;
                    else if (tile[1] >= me.mature * 0.666) stage = 3;
                    else if (tile[1] >= me.mature * 0.333) stage = 2;
                    else stage = 1;
                    var dragonBoost = 1 / (1 + 0.05 * Game.auraMult('Supreme Intellect'));
                    var icon = [me.icon, 25];
                    var str = `
                        <div style="padding:8px 4px;min-width:350px;">
						    <div class="icon" style="background:url('${Game.resPath}img/icons.png');float:left;margin-left:-8px;margin-top:-8px;background-position:${(-icon[0] * 48)}px ${(-icon[1] * 48)}px;"></div>
                            <div class="name">${me.name}</div><div><small>${loc("This plant is growing here.")}</small></div><div class="line"></div>
                            <div style="text-align:center;">
                                <div style="display:inline-block;position:relative;box-shadow:0px 0px 0px 1px #000,0px 0px 0px 1px rgba(255,255,255,0.5) inset,0px -2px 2px 0px rgba(255,255,255,0.5) inset;width:256px;height:6px;background:linear-gradient(to right,#fff 0%,#0f9 ${me.mature}%,#3c0 ${(me.mature + 0.1)}%,#960 100%)">
                                    <div class="gardenGrowthIndicator" style="left:${Math.floor((tile[1] / 100) * 256)}px;"></div>
                                    <div style="background:url('${Game.resPath}img/icons.png');${writeIcon(icon)};position:absolute;left:${0 - 24}px;top:-32px;transform:scale(${0.6 * 1 / 4});width:48px;height:48px;"></div>
                                    <div style="background:url('${Game.resPath}img/icons.png');${writeIcon(icon)};position:absolute;left:${(((me.mature * 0.333) / 100) * 256) - 24}px;top:-32px;transform:scale(${0.6 * 2 / 4});width:48px;height:48px;"></div>
                                    <div style="background:url('${Game.resPath}img/icons.png');${writeIcon(icon)};position:absolute;left:${(((me.mature * 0.666) / 100) * 256) - 24}px;top:-32px;transform:scale(${0.6 * 3 / 4});width:48px;height:48px;"></div>
                                    <div style="background:url('${Game.resPath}img/icons.png');${writeIcon(icon)};position:absolute;left:${(((me.mature) / 100) * 256) - 24}px;top:-32px;transform:scale(${0.6});width:48px;height:48px;"></div>
                                </div><br>
                                <b>${loc("Stage:")}</b> ${loc(["bud", "sprout", "bloom", "mature"][stage - 1])}<br>
                                <small>${stage == 1 ? `${loc("Plant effects:")} 10%` : stage == 2 ? `${loc("Plant effects:")} 25%` : stage == 3 ? `${loc("Plant effects:")} 50%` : `${loc("Plant effects:")} 100%; ${loc("may reproduce, will drop seed when harvested")}`
                        }</small>
                                <br><small>${stage < 4 ?
                            `${loc("Mature in about %1", Game.sayTime(((100 / (M.plotBoost[y][x][0] * (me.ageTick + me.ageTickR / 2))) * ((me.mature - tile[1]) / 100) * dragonBoost * M.stepT) * 30, -1))} (${loc("%1 tick", LBeautify(Math.ceil((100 / (M.plotBoost[y][x][0] * (me.ageTick + me.ageTickR / 2) / dragonBoost)) * ((me.mature - tile[1]) / 100))))})`
                            :
                            !me.immortal ?
                                `${loc("Decays in about %1", Game.sayTime(((100 / (M.plotBoost[y][x][0] * (me.ageTick + me.ageTickR / 2))) * ((100 - tile[1]) / 100) * dragonBoost * M.stepT) * 30, -1))} (${loc("%1 tick", LBeautify(Math.ceil((100 / (M.plotBoost[y][x][0] * (me.ageTick + me.ageTickR / 2) / dragonBoost)) * ((100 - tile[1]) / 100))))})`
                                :
                                loc("Does not decay")
                        }</small>
                                ${M.plotBoost[y][x][0] != 1 ? `<br><small>${loc("Aging multiplier:")} ${Beautify(M.plotBoost[y][x][0] * 100)}%</small>` : ''}
                                ${M.plotBoost[y][x][1] != 1 ? `<br><small>${loc("Effect multiplier:")} ${Beautify(M.plotBoost[y][x][1] * 100)}%</small>` : ''}
                                ${M.plotBoost[y][x][2] != 1 ? `<br><small>${loc("Weeds/fungus repellent:")} ${Beautify(100 - M.plotBoost[y][x][2] * 100)}%</small>` : ''}
                            </div>
                            <div class="line"></div>
                            <div style="text-align:center;">${stage == 4 ? loc("Click to harvest.") : loc("Click to unearth.")}</div>
                            <div class="line"></div>
                            ${M.getPlantDesc(me)}
                        </div>
                    `;
                    return str;
                }
            };
        }

        M.refillTooltip = function() {
            return '<div style="padding:8px;width:300px;font-size:11px;text-align:center;" id="tooltipRefill">' + loc("Click to refill your soil timer and trigger <b>1</b> plant growth tick with <b>x%1</b> spread and mutation rate for %2.", [3, '<span class="price lump">' + loc("%1 sugar lump", LBeautify(1)) + '</span>']) +
                (Game.canRefillLump() ? '<br><small>(' + loc("can be done once every %1", Game.sayTime(Game.getLumpRefillMax(), -1)) + ')</small>' : ('<br><small class="red">(' + loc("usable again in %1", Game.sayTime(Game.getLumpRefillRemaining() + Game.fps, -1)) + ')</small>')) +
                '</div>';
        };

        M.buildPanel = function() {
            if (!l('gardenSeeds')) return false;
            var str = '';
            for (var i in M.plants) {
                var me = M.plants[i];
                var icon = [0, me.icon];
                str += `<div id="gardenSeed-${me.id}" class="gardenSeed${M.seedSelected == me.id ? ' on' : ''} locked" ${Game.getDynamicTooltip(`Game.ObjectsById[${M.parent.id}].minigame.seedTooltip(${me.id})`, 'this')}">`;
                str += `<div id="gardenSeedContainer-${me.id}" style="transform: scale(0.75); margin-top:6px;"><div id="gardenSeedIcon-${me.id}" class="gardenSeedIcon shadowFilter" style="background-image:url('${Game.resPath}img/icons.png')!important;${writeIcon([me.icon, 25])}"></div></div>`;
                str += `</div>`;
            }
            l('gardenSeeds').innerHTML = str;

            for (var i in M.plants) {
                var me = M.plants[i];
                me.l = l('gardenSeed-' + me.id);
                AddEvent(me.l, 'click', function(me) {
                    return function() {
                        if (/* !M.freeze && */Game.keys[16] && Game.keys[17])//shift & ctrl
                        {
                            //harvest all mature of type
                            M.harvestAll(me, 1);
                            return false;
                        }
                        if (!me.plantable && !Game.sesame) return false;
                        if (M.seedSelected == me.id) { M.seedSelected = -1; }
                        else { M.seedSelected = me.id; PlaySound('snd/toneTick.mp3'); }
                        for (var i in M.plants) {
                            var it = M.plants[i];
                            if (it.id == M.seedSelected) { it.l.classList.add('on'); }
                            else { it.l.classList.remove('on'); }
                        }
                    }
                }(me));
                AddEvent(me.l, 'mouseover', M.hideCursor);
                AddEvent(me.l, 'mouseout', M.showCursor);
                if (me.unlocked) me.l.classList.remove('locked');
            }

            var str = '';
            for (var i in M.tools) {
                var me = M.tools[i];
                var icon = [me.icon, 35];
                str += '<div id="gardenTool-' + me.id + '" style="margin:8px;" class="gardenSeed' + ((me.isOn?.()) ? ' on' : '') + '' + ((!me.isDisplayed || me.isDisplayed()) ? '' : ' locked') + '" ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.toolTooltip(' + me.id + ')', 'this') + '>';
                str += '<div id="gardenToolIcon-' + me.id + '" class="gardenSeedIcon shadowFilter" style="background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;"></div>';
                str += '</div>';
            }
            l('gardenTools').innerHTML = str;

            for (var i in M.tools) {
                var me = M.tools[i];
                AddEvent(l('gardenTool-' + me.id), 'click', me.func);
                AddEvent(l('gardenTool-' + me.id), 'mouseover', M.hideCursor);
                AddEvent(l('gardenTool-' + me.id), 'mouseout', M.showCursor);
            }

            var str = '';
            for (var i in M.soils) {
                var me = M.soils[i];
                var icon = [me.icon, 34];
                str += '<div id="gardenSoil-' + me.id + '" class="gardenSeed gardenSoil disabled' + (M.soil == me.id ? ' on' : '') + '" ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.soilTooltip(' + me.id + ')', 'this') + '>';
                str += '<div id="gardenSoilIcon-' + me.id + '" class="gardenSeedIcon shadowFilter" style="background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;"></div>';
                str += '</div>';
            }
            l('gardenSoils').innerHTML = str;

            for (var i in M.soils) {
                var me = M.soils[i];
                AddEvent(l('gardenSoil-' + me.id), 'click', function(me) {
                    return function() {
                        if (M.freeze || M.soil == me.id || M.nextSoil > Date.now() || M.parent.amount < me.req) { return false; }
                        PlaySound('snd/toneTick.mp3');
                        M.nextSoil = Date.now() + (Game.Has('Turbo-charged soil') ? 1 : (1000 * 60 * 10));
                        M.toCompute = true; M.soil = me.id; M.computeStepT();
                        for (var i in M.soils) { var it = M.soils[i]; if (it.id == M.soil) { l('gardenSoil-' + it.id).classList.add('on'); } else { l('gardenSoil-' + it.id).classList.remove('on'); } }
                    }
                }(me));
                AddEvent(l('gardenSoil-' + me.id), 'mouseover', M.hideCursor);
                AddEvent(l('gardenSoil-' + me.id), 'mouseout', M.showCursor);
            }

            M.cursorL = l('gardenCursor');
        }
        M.buildPlot = function() {
            M.toRebuild = false;
            if (!l('gardenPlot')) return false;
            if (!l('gardenTile-0-0')) {
                var str = '';
                for (var y = 0; y < 6; y++) {
                    for (var x = 0; x < 6; x++) {
                        str += '<div id="gardenTile-' + x + '-' + y + '" class="gardenTile" style="left:' + (x * M.tileSize) + 'px;top:' + (y * M.tileSize) + 'px;display:none;" ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.tileTooltip(' + x + ',' + y + ')', 'this') + '>';
                        str += `<div id="gardenTileIconContainer-${x}-${y}" style="margin-top:16px"><div id="gardenTileIcon-${x}-${y}" class="gardenTileIcon" style="display:none;"></div></div>`;
                        str += '</div>';
                    }
                }
                l('gardenPlot').innerHTML = str;

                for (var y = 0; y < 6; y++) {
                    for (var x = 0; x < 6; x++) {
                        AddEvent(l('gardenTile-' + x + '-' + y), 'click', function(x, y) {
                            return function() {
                                M.clickTile(x, y);
                            }
                        }(x, y));
                    }
                }
            }
            var plants = 0;
            for (var y = 0; y < 6; y++) {
                for (var x = 0; x < 6; x++) {
                    var tile = M.plot[y][x];
                    var tileL = l('gardenTile-' + x + '-' + y);
                    var iconContainerL = l('gardenTileIconContainer-' + x + '-' + y);
                    var iconL = l('gardenTileIcon-' + x + '-' + y);
                    var me = 0;
                    if (tile[0] > 0) {
                        plants++;
                        me = M.plantsById[tile[0] - 1];
                        var stage = 0;
                        if (tile[1] >= me.mature) stage = 4;
                        else if (tile[1] >= me.mature * 0.666) stage = 3;
                        else if (tile[1] >= me.mature * 0.333) stage = 2;
                        else stage = 1;
                        iconContainerL.style.transform = `scale(${stage / 4})`;
                        iconContainerL.style.marginTop = `${16 / stage}px`;
                        var dying = ((tile[1] + Math.ceil(me.ageTick + me.ageTickR)) >= 100 ? 1 : 0);
                        var icon = [me.icon, 25];
                        iconL.style.opacity = (dying ? 0.5 : 1);
                        iconL.style.setProperty('background-image', `url('${Game.resPath}img/icons.png')`, 'important')
                        iconL.style.backgroundPosition = `${-icon[0] * 48}px ${-25 * 48}px`;
                        iconL.style.display = 'block';

                        //iconL.innerHTML=M.plotBoost[y][x];
                    }
                    else iconL.style.display = 'none';
                    if (M.isTileUnlocked(x, y)) tileL.style.display = 'block';
                    else tileL.style.display = 'none';
                }
            }
            if (plants >= 6 * 6) Game.Win('In the garden of Eden (baby)');
        }

        M.clickTile = function(x, y) {
            //if (M.freeze) return false;
            var outcome = M.useTool(M.seedSelected, x, y);
            M.toCompute = true;
            if (outcome && !Game.keys[16])//shift
            {
                M.seedSelected = -1;
                for (var i in M.plants) {
                    var it = M.plants[i];
                    if (it.id == M.seedSelected) { l('gardenSeed-' + it.id).classList.add('on'); }
                    else { l('gardenSeed-' + it.id).classList.remove('on'); }
                }
            }
            //PlaySound('snd/tick.mp3');
        }

        M.useTool = function(what, x, y) {
            var harvested = M.harvest(x, y, 1);
            if (harvested) {
                Game.SparkleAt(Game.mouseX, Game.mouseY);
                PlaySound('snd/harvest' + choose(['1', '2', '3']) + '.mp3', 1, 0.2);
            }
            else {
                if (what >= 0 && M.canPlant(M.plantsById[what])) {
                    M.plot[y][x] = [what + 1, 0];
                    M.toRebuild = true;
                    var me = M.plantsById[what];
                    if (M.getCost(me) > 0) {
                        if (me.name == 'Breath of Milk') Game.Spend(M.getCost(me));
                        else Game.ObjectsById[what - 1].sacrifice(M.getCost(me));
                    }
                    Game.SparkleAt(Game.mouseX, Game.mouseY);
                    PlaySound('snd/tillb' + choose(['1', '2', '3']) + '.mp3', 1, 0.2);
                    Game.recalculateGains = 1;
                    return true;
                }
            }
            M.parent.refresh();
            return false;
        }

        M.getTile = function(x, y) {
            if (x < 0 || x > 5 || y < 0 || y > 5 || !M.isTileUnlocked(x, y)) return [0, 0];
            return M.plot[y][x];
        }

        M.plotLimits = [
            [2, 2, 4, 4],
            [2, 2, 5, 4],
            [2, 2, 5, 5],
            [1, 2, 5, 5],
            [1, 1, 5, 5],
            [1, 1, 6, 5],
            [1, 1, 6, 6],
            [0, 1, 6, 6],
            [0, 0, 6, 6],
        ];
        M.isTileUnlocked = function(x, y) {
            var level = M.parent.level;
            level = Math.max(1, Math.min(M.plotLimits.length, level)) - 1;
            var limits = M.plotLimits[level];
            if (x >= limits[0] && x < limits[2] && y >= limits[1] && y < limits[3]) return true; else return false;
        }

        M.computeStepT = function() {
            if (Game.Has('Turbo-charged soil')) M.stepT = 10;
            else M.stepT = M.soilsById[M.soil].tick * 60;
        }

        M.convertTimes = 0;
        M.askConvert = function() {
            if (M.plantsUnlockedN < M.plantsN) return false;
            Game.Prompt('<h3>' + loc("Sacrifice garden") + '</h3><div class="block">' + loc("Do you REALLY want to sacrifice your garden to the sugar hornets?<br><small>You will be left with an empty plot and only the %1 seed unlocked.<br>In return, you will gain <b>%2 sugar lumps</b>.</small>", [loc("Baker's wheat"), 10]) + '</div>', [[loc("Yes"), 'Game.ClosePrompt();Game.ObjectsById[' + M.parent.id + '].minigame.convert();'], loc("No")]);
        }
        M.convert = function() {
            if (M.plantsUnlockedN < M.plantsN) return false;
            M.harvestAll();
            for (var i in M.plants) { M.lockSeed(M.plants[i]); }
            M.unlockSeed(M.plants['Dragon Cursor']);

            Game.gainLumps(10);
            Game.Notify(loc("Sacrifice!"), loc("You've sacrificed your garden to the sugar hornets, destroying your crops and your knowledge of seeds.<br>In the remains, you find <b>%1 sugar lumps</b>.", 10), [29, 14], 12);

            M.seedSelected = -1;
            Game.Win('Seedless to nay');
            M.convertTimes++;
            M.computeMatures();
            PlaySound('snd/spellFail.mp3', 0.75);
        }

        M.harvestAll = function(type, mature, mortal) {
            var harvested = 0;
            for (var i = 0; i < 2; i++)//we do it twice to take care of whatever spawns on kill
            {
                for (var y = 0; y < 6; y++) {
                    for (var x = 0; x < 6; x++) {
                        if (M.plot[y][x][0] >= 1) {
                            var doIt = true;
                            var tile = M.plot[y][x];
                            var me = M.plantsById[tile[0] - 1];
                            if (type && me != type) doIt = false;
                            if (mortal && me.immortal) doIt = false;
                            if (mature && tile[1] < me.mature) doIt = false;

                            if (doIt) harvested += M.harvest(x, y) ? 1 : 0;
                        }
                    }
                }
            }
            if (harvested > 0) setTimeout(function() { PlaySound('snd/harvest1.mp3', 1, 0.2); }, 50);
            if (harvested > 2) setTimeout(function() { PlaySound('snd/harvest2.mp3', 1, 0.2); }, 150);
            if (harvested > 6) setTimeout(function() { PlaySound('snd/harvest3.mp3', 1, 0.2); }, 250);
        }
        M.harvest = function(x, y, manual) {
            var tile = M.plot[y][x];
            if (tile[0] >= 1) {
                M.toCompute = true;
                var me = M.plantsById[tile[0] - 1];
                var age = tile[1];
                if (me.onHarvest) me.onHarvest(x, y, age);
                if (tile[1] >= me.mature) {
                    if (M.unlockSeed(me)) Game.Popup('(' + me.name + ')<br>' + loc("Unlocked %1 seed.", me.name), Game.mouseX, Game.mouseY);
                    M.harvests++;
                    M.harvestsTotal++;
                    if (M.harvestsTotal >= 100) Game.Win('Botany enthusiast');
                    if (M.harvestsTotal >= 1000) Game.Win('Green, aching thumb');
                    if (manual) M.dropUpgrade(choose(M.drops), 0.005);
                }
                Game.recalculateGains = 1;
                M.plot[y][x] = [0, 0];
                if (me.onKill) me.onKill(x, y, age);
                M.toRebuild = true;
                return true;
            }
            return false;
        }

        M.unlockSeed = function(me) {
            if (me.unlocked) return false;
            me.unlocked = 1;
            if (me.l) me.l.classList.remove('locked');
            M.getUnlockedN();
            return true;
        }
        M.lockSeed = function(me) {
            if (me.locked) return false;
            me.unlocked = 0;
            if (me.l) me.l.classList.add('locked');
            M.getUnlockedN();
            return true;
        }

        M.dragonBoostTooltip = function() {
            return '<div style="width:280px;padding:8px;text-align:center;" id="tooltipDragonBoost"><b>' + loc("Supreme Intellect") + '</b><div class="line"></div>' + loc("Garden plants age and mutate %1% faster.", 5 * Game.auraMult('Supreme Intellect')) + '</div>';
        }

        var str = '';
        str += '<style>' +
            '#gardenBG{background:url(' + Game.resPath + 'img/shadedBorders.png),url(' + Game.resPath + 'img/BGgarden.jpg);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;}' +
            '#gardenContent{position:relative;box-sizing:border-box;padding:4px 24px;height:' + (6 * M.tileSize + 16 + 48 + 48) + 'px;}' +
            '.gardenFrozen{box-shadow:0px 0px 16px rgba(255,255,255,1) inset,0px 0px 48px 24px rgba(200,255,225,0.5) inset;}' +
            '#gardenPanel{text-align:center;margin:0px;padding:0px;position:absolute;left:4px;top:4px;bottom:4px;right:65%;overflow-y:auto;overflow-x:hidden;box-shadow:8px 0px 8px rgba(0,0,0,0.5);}' +
            '#gardenSeeds{}' +
            '#gardenField{text-align:center;position:absolute;right:0px;top:0px;bottom:0px;overflow-x:auto;overflow:hidden;}' +//width:65%;
            '#gardenPlot{position:relative;margin:8px auto;}' +
            '.gardenTile{cursor:pointer;width:' + M.tileSize + 'px;height:' + M.tileSize + 'px;position:absolute;}' +
            //'.gardenTile:before{transform:translate(0,0);pointer-events:none;content:\'\';display:block;position:absolute;left:0px;top:0px;right:0px;bottom:0px;margin:6px;border-radius:12px;background:rgba(0,0,0,0.1);box-shadow:0px 0px 4px rgba(255,255,255,0.2),-4px 4px 4px 2px rgba(0,0,0,0.2) inset;}'+
            //'.gardenTile:hover:before{margin:2px;animation:wobble 0.5s;}'+
            '.gardenTile:before{transform:translate(0,0);opacity:0.65;transition:opacity 0.2s;pointer-events:none;content:\'\';display:block;position:absolute;left:0px;top:0px;right:0px;bottom:0px;margin:0px;background:url(' + Game.resPath + 'img/gardenPlots.png);}' +
            '.gardenTile:nth-child(4n+1):before{background-position:40px 0px;}' +
            '.gardenTile:nth-child(4n+2):before{background-position:80px 0px;}' +
            '.gardenTile:nth-child(4n+3):before{background-position:120px 0px;}' +
            '.gardenTile:hover:before{opacity:1;animation:wobble 0.5s;}' +
            '.noFancy .gardenTile:hover:before{opacity:1;animation:none;}' +
            '.gardenTileIcon{transform:translate(0,0);pointer-events:none;transform-origin:50% 40px;width:48px;height:48px;position:absolute;left:-' + ((48 - M.tileSize) / 2) + 'px;top:-' + ((48 - M.tileSize) / 2 + 8) + 'px;background:url(' + Game.resPath + 'img/gardenPlants.png?v=' + Game.version + ');}' +
            '.gardenTile:hover .gardenTileIcon{animation:pucker 0.3s;}' +
            '.noFancy .gardenTile:hover .gardenTileIcon{animation:none;}' +
            '#gardenDrag{pointer-events:none;position:absolute;left:0px;top:0px;right:0px;bottom:0px;overflow:hidden;z-index:1000000001;}' +
            '#gardenCursor{transition:transform 0.1s;display:none;pointer-events:none;width:48px;height:48px;position:absolute;background:url(' + Game.resPath + 'img/icons.png);}' +
            '.gardenSeed{cursor:pointer;display:inline-block;width:40px;height:40px;position:relative;}' +
            '.gardenSeed.locked{display:none;}' +
            '.gardenSeedIcon{pointer-events:none;transform:translate(0,0);display:inline-block;position:absolute;left:-4px;top:-4px;width:48px;height:48px;background:url(' + Game.resPath + 'img/gardenPlants.png?v=' + Game.version + ');}' +
            '.gardenSeed:hover .gardenSeedIcon{animation:bounce 0.8s;z-index:1000000001;}' +
            '.gardenSeed:active .gardenSeedIcon{animation:pucker 0.2s;}' +
            '.noFancy .gardenSeed:hover .gardenSeedIcon,.noFancy .gardenSeed:active .gardenSeedIcon{animation:none;}' +
            '.gardenPanelLabel{font-size:12px;width:100%;padding:2px;margin-top:4px;margin-bottom:-4px;}' + '.gardenSeedTiny{transform:scale(0.5,0.5);margin:-20px -16px;display:inline-block;width:48px;height:48px;background:url(' + Game.resPath + 'img/gardenPlants.png?v=' + Game.version + ');}' +
            '.gardenSeed.on:before{pointer-events:none;content:\'\';display:block;position:absolute;left:-10px;top:-10px;width:60px;height:60px;background:url(' + Game.resPath + 'img/selectTarget.png);animation:wobble 0.2s ease-out;z-index:10;}' +

            '.gardenGrowthIndicator{background:#000;box-shadow:0px 0px 0px 1px #fff,0px 0px 0px 2px #000,2px 2px 2px 2px rgba(0,0,0,0.5);position:absolute;top:0px;width:1px;height:6px;z-index:100;}' +
            '.noFancy .gardenGrowthIndicator{background:#fff;border:1px solid #000;margin-top:-1px;margin-left:-1px;}' +

            '#gardenSoils{}' +
            '.gardenSoil.disabled{filter:brightness(10%);}' +
            '.noFilters .gardenSoil.disabled{opacity:0.2;}' +

            '#gardenInfo{position:relative;display:inline-block;margin:8px auto 0px auto;padding:8px 16px;padding-left:32px;text-align:left;font-size:11px;color:rgba(255,255,255,0.75);text-shadow:-1px 1px 0px #000;background:rgba(0,0,0,0.75);border-radius:16px;}' +
            '.garden.price:before { display: none; }' +
            '.garden.price { padding-left: 0px; }' +

            '</style>';
        str += '<div id="gardenBG"></div>';
        str += '<div id="gardenContent">';
        str += '<div id="gardenDrag"><div id="gardenCursor" class="shadowFilter"></div></div>';

        str += '<div id="gardenPanel" class="framed">';
        str += '<div class="title gardenPanelLabel">' + loc("Tools") + '</div><div class="line"></div>';
        str += '<div id="gardenTools"></div>';
        str += '<div id="gardenSeedsUnlocked" class="title gardenPanelLabel">' + loc("Seeds") + '</div><div class="line"></div>';
        str += '<div id="gardenSeeds"></div>';
        str += '</div>';
        str += '<div id="gardenField">';
        str += '<div style="pointer-events:none;opacity:0.75;position:absolute;left:0px;right:0px;top:8px;" id="gardenPlotSize"></div>';
        str += '<div id="gardenPlot" class="shadowFilter" style="width:' + (6 * M.tileSize) + 'px;height:' + (6 * M.tileSize) + 'px;"></div>';
        str += '<div style="margin-top:0px;" id="gardenSoils"></div>';
        str += '<div id="gardenInfo">';
        str += '<div ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.refillTooltip', 'this') + ' id="gardenLumpRefill" class="usesIcon shadowFilter lumpRefill" style="display:none;left:-8px;top:-6px;background-position:' + (-29 * 48) + 'px ' + (-14 * 48) + 'px;"></div>';
        str += '<div id="gardenNextTick">' + loc("Initializing...") + '</div>';
        str += '<div id="gardenStats"></div>';
        str += '</div>';
        str += '</div>';

        str += '</div>';
        div.innerHTML = str;
        M.buildPlot();
        M.buildPanel();

        M.lumpRefill = l('gardenLumpRefill');
        AddEvent(M.lumpRefill, 'click', function() {
            Game.refillLump(1, function() {
                M.loopsMult = 3;
                M.nextSoil = Date.now();
                //M.nextFreeze=Date.now();
                M.nextStep = Date.now();
                PlaySound('snd/pop' + Math.floor(Math.random() * 3 + 1) + '.mp3', 0.75);
            });
        });
        AddEvent(l('gardenSeedsUnlocked'), 'click', function() {
            if (Game.sesame) {
                if (Game.keys[16] && Game.keys[17])//ctrl & shift, fill garden with random plants
                {
                    for (var y = 0; y < 6; y++) {
                        for (var x = 0; x < 6; x++) {
                            M.plot[y][x] = [choose(M.plantsById).id + 1, Math.floor(Math.random() * 100)];
                        }
                    }
                    M.toRebuild = true;
                    M.toCompute = true;
                }
                else//unlock/lock all seeds
                {
                    var locked = 0;
                    for (var i in M.plants) {
                        if (!M.plants[i].unlocked) locked++;
                    }
                    if (locked > 0) { for (var i in M.plants) { M.unlockSeed(M.plants[i]); } }
                    else { for (var i in M.plants) { M.lockSeed(M.plants[i]); } }
                    M.unlockSeed(M.plants['Dragon Cursor']);
                }
            }
        });

        M.reset();

        //M.parent.switchMinigame(1);
    }



    //external
    Game.auraMult = function(what) {
        if (M.freeze) return 0;
        let me = M.plants[what];
        var soilMult = M.soilsById[M.soil].effMult;
        var n = 0;
        for (var y = 0; y < 6; y++) {
            for (var x = 0; x < 6; x++) {
                var tile = M.plot[y][x];
                if (tile[0] == me.id + 1 || M.plantsById[tile[0] - 1]?.name == 'Reality Bending') {
                    var stage = 0;
                    if (tile[1] >= me.mature) stage = 4;
                    else if (tile[1] >= me.mature * 0.666) stage = 3;
                    else if (tile[1] >= me.mature * 0.333) stage = 2;
                    else stage = 1;
                    var mult = soilMult;
                    if (stage == 1) mult *= 0.1;
                    else if (stage == 2) mult *= 0.25;
                    else if (stage == 3) mult *= 0.5;
                    else mult *= 1;
                    mult *= M.plotBoost[y][x][1];
                    if (M.plantsById[tile[0] - 1].name == 'Reality Bending') mult *= 0.1;
                    n += M.balanceMults[what] * mult;
                }
            }
        }
        // if (Game.dragonAuras[Game.dragonAura].name == what || Game.dragonAuras[Game.dragonAura2].name == what) n += 1;
        // if ((Game.dragonAuras[Game.dragonAura].name == 'Reality Bending' || Game.dragonAuras[Game.dragonAura2].name == 'Reality Bending') && Game.dragonLevel >= Game.dragonAurasBN[what].id + 4) n += 0.1;
        return n;
    }
    Game.hasAura = function(what) {
        let me = M.plants[what];
        for (var y = 0; y < 6; y++) {
            for (var x = 0; x < 6; x++) {
                var tile = M.plot[y][x];
                if (tile[0] == me.id + 1 || M.plantsById[tile[0] - 1]?.name == 'Reality Bending') {
                    return true;
                }
            }
        }
        return false;
    }
    Game.registerHook('check', function pantheon() {
        if (!Game.Objects['Temple'].minigameLoaded) return false;
        let M = Game.Objects['Temple'].minigame;
        eval(`Game.hasGod = ` + Game.hasGod.toString().replace(`return Math.max(1,i);`, `return Math.max(i + 1 - Math.floor(Game.auraMult('Supreme Intellect')));`))
        eval(`M.slotTooltip = ` + M.slotTooltip.toString().replace(`slot=Math.max(0,slot-1);`, `slot=Math.max(0,slot-Math.floor(Game.auraMult('Supreme Intellect')));`))
        Game.removeHook('check', pantheon);
    });
    let wrinklers = Game.SaveWrinklers();
    for (let i = 0; i < 10; i++) Game.wrinklers.push({});
    Game.ResetWrinklers()
    Game.LoadWrinklers(...Object.values(wrinklers));
    Game.wrinklerLimit = 24;
    eval(`Game.UpdateSpecial = ` + Game.UpdateSpecial.toString().replace(`if (Game.Has('A crumbly egg')) Game.specialTabs.push('dragon');`, ``))


    M.onResize = function() {
        var width = l('gardenContent').offsetWidth;
        var panelW = Math.min(Math.max(width * 0.40, 320), width - 6 * M.tileSize) - 8;
        var fieldW = Math.max(Math.min(width * 0.60, width - panelW), 6 * M.tileSize) - 8;
        l('gardenField').style.width = fieldW + 'px';
        l('gardenPanel').style.width = panelW + 'px';
    }
    M.onLevel = function(level) {
        M.buildPlot();
    }
    M.onRuinTheFun = function() {
        for (var i in M.plants) { M.unlockSeed(M.plants[i]); }
    }
    M.save = function() {
        return realGarden;
    }
    M.load = function(str) {
        //interpret str; called after .init
        //note: not actually called in the Game's load; see "minigameSave" in main.js
        if (!str) return false;
        var i = 0;
        var spl = str.split(' ');
        var spl2 = spl[i++].split(':');
        var i2 = 0;
        M.nextStep = parseFloat(spl2[i2++] || M.nextStep);
        M.soil = parseInt(spl2[i2++] || M.soil);
        M.nextSoil = parseFloat(spl2[i2++] || M.nextSoil);
        M.freeze = parseInt(spl2[i2++] || M.freeze) ? 1 : 0;
        M.harvests = parseInt(spl2[i2++] || 0);
        M.harvestsTotal = parseInt(spl2[i2++] || 0);
        var on = parseInt(spl2[i2++] || 0); if (on && Game.ascensionMode != 1) M.parent.switchMinigame(1);
        M.convertTimes = parseFloat(spl2[i2++] || M.convertTimes);
        M.nextFreeze = parseFloat(spl2[i2++] || M.nextFreeze);
        var seeds = spl[i++] || '';
        if (seeds) {
            var n = 0;
            for (var ii in M.plants) {
                if (seeds.charAt(n) == '1') M.plants[ii].unlocked = 1; else M.plants[ii].unlocked = 0;
                n++;
            }
        }
        M.plants['Dragon Cursor'].unlocked = 1;

        var plot = spl[i++] || 0;
        if (plot) {
            plot = plot.split(':');
            var n = 0;
            for (var y = 0; y < 6; y++) {
                for (var x = 0; x < 6; x++) {
                    M.plot[y][x] = [parseInt(plot[n]), parseInt(plot[n + 1])];
                    n += 2;
                }
            }
        }

        M.getUnlockedN();
        M.computeStepT();

        M.buildPlot();
        M.buildPanel();

        M.computeBoostPlot();
        M.computeEffs();
        M.toCompute = true;
    }
    M.reset = function(hard) {
        M.soil = 0;
        if (M.seedSelected > -1) M.plantsById[M.seedSelected].l.classList.remove('on');
        M.seedSelected = -1;

        M.nextStep = Date.now();
        M.nextSoil = Date.now();
        M.nextFreeze = Date.now();
        for (var y = 0; y < 6; y++) {
            for (var x = 0; x < 6; x++) {
                M.plot[y][x] = [0, 0];
            }
        }

        M.harvests = 0;
        if (hard) {
            M.convertTimes = 0;
            M.harvestsTotal = 0;
            for (var i in M.plants) {
                M.plants[i].unlocked = 0;
            }
        }

        M.plants['Dragon Cursor'].unlocked = 1;

        Game.recalculateGains = 1;

        M.loopsMult = 1;

        M.getUnlockedN();
        M.computeStepT();

        M.computeMatures();

        M.buildPlot();
        M.buildPanel();
        M.toCompute = true;

        setTimeout(function(M) { return function() { M.onResize(); } }(M), 10);
    }
    M.logic = function() {
        //run each frame
        var now = Date.now();

        if (!M.freeze) {
            M.nextStep = Math.min(M.nextStep, now + (M.stepT) * 1000);
            if (now >= M.nextStep) {
                M.computeStepT();
                M.nextStep = now + M.stepT * 1000;

                M.computeBoostPlot();
                M.computeMatures();

                var weedMult = M.soilsById[M.soil].weedMult;

                var dragonBoost = 1 + 0.05 * Game.auraMult('Supreme Intellect');

                var loops = 1;
                if (M.soilsById[M.soil].key == 'woodchips') loops *= 2;
                loops = randomFloor(loops * dragonBoost);
                loops *= M.loopsMult;
                M.loopsMult = 1;

                for (var y = 0; y < 6; y++) {
                    for (var x = 0; x < 6; x++) {
                        if (M.isTileUnlocked(x, y)) {
                            var tile = M.plot[y][x];
                            var me = M.plantsById[tile[0] - 1];
                            if (tile[0] > 0) {
                                //age
                                tile[1] += randomFloor((me.ageTick + me.ageTickR * Math.random()) * M.plotBoost[y][x][0] * dragonBoost);
                                tile[1] = Math.max(tile[1], 0);
                                if (me.immortal) tile[1] = Math.min(me.mature + 1, tile[1]);
                                else if (tile[1] >= 100) {
                                    //die of old age
                                    M.plot[y][x] = [0, 0];
                                    if (me.onDie) me.onDie(x, y);
                                    if (M.soilsById[M.soil].key == 'pebbles' && Math.random() < 0.35) {
                                        if (M.unlockSeed(me)) Game.Popup(loc("Unlocked %1 seed.", me.name), Game.mouseX, Game.mouseY);
                                    }
                                }
                                else if (!me.noContam) {
                                    //other plant contamination
                                    //only occurs in cardinal directions
                                    //immortal plants and plants with noContam are immune

                                    var list = [];
                                    for (var i in M.plantContam) {
                                        if (Math.random() < M.plantContam[i] && (!M.plants[i].weed || Math.random() < weedMult)) list.push(i);
                                    }
                                    var contam = choose(list);

                                    if (contam && me.key != contam) {
                                        if ((!M.plants[contam].weed && !M.plants[contam].fungus) || Math.random() < M.plotBoost[y][x][2]) {
                                            var any = 0;
                                            var neighs = {};//all surrounding plants
                                            var neighsM = {};//all surrounding mature plants
                                            for (var i in M.plants) { neighs[i] = 0; }
                                            for (var i in M.plants) { neighsM[i] = 0; }
                                            var neigh = M.getTile(x, y - 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                            var neigh = M.getTile(x, y + 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                            var neigh = M.getTile(x - 1, y); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                            var neigh = M.getTile(x + 1, y); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }

                                            if (neighsM[contam] >= 1) M.plot[y][x] = [M.plants[contam].id + 1, 0];
                                        }
                                    }
                                }
                            }
                            else {
                                //plant spreading and mutation
                                //happens on all 8 tiles around this one
                                for (var loop = 0; loop < loops; loop++) {
                                    var any = 0;
                                    var neighs = {};//all surrounding plants
                                    var neighsM = {};//all surrounding mature plants
                                    for (var i in M.plants) { neighs[i] = 0; }
                                    for (var i in M.plants) { neighsM[i] = 0; }
                                    var neigh = M.getTile(x, y - 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    var neigh = M.getTile(x, y + 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    var neigh = M.getTile(x - 1, y); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    var neigh = M.getTile(x + 1, y); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    var neigh = M.getTile(x - 1, y - 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    var neigh = M.getTile(x - 1, y + 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    var neigh = M.getTile(x + 1, y - 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    var neigh = M.getTile(x + 1, y + 1); if (neigh[0] > 0) { var age = neigh[1]; neigh = M.plantsById[neigh[0] - 1]; any++; neighs[neigh.key]++; if (age >= neigh.mature) { neighsM[neigh.key]++; } }
                                    if (any > 0) {
                                        var muts = M.getMuts(neighs, neighsM);

                                        var list = [];
                                        for (var ii = 0; ii < muts.length; ii++) {
                                            if (Math.random() < muts[ii][1] && (!M.plants[muts[ii][0]].weed || Math.random() < weedMult) && ((!M.plants[muts[ii][0]].weed && !M.plants[muts[ii][0]].fungus) || Math.random() < M.plotBoost[y][x][2])) list.push(muts[ii][0]);
                                        }
                                        if (list.length > 0) M.plot[y][x] = [M.plants[choose(list)].id + 1, 0];
                                    }
                                    else if (loop == 0) {
                                        //weeds in empty tiles (no other plants must be nearby)
                                        var chance = 0.002 * weedMult * M.plotBoost[y][x][2];
                                        if (Math.random() < chance) M.plot[y][x] = [M.plants[choose(Object.keys(M.plants).filter(plant => M.plants[plant].weed))].id + 1, 0];
                                    }
                                }
                            }
                        }
                    }
                }
                M.toRebuild = true;
                M.toCompute = true;
            }
        }
        if (M.toRebuild) M.buildPlot();
        if (M.toCompute) M.computeEffs();

        if (Game.keys[27])//esc
        {
            if (M.seedSelected > -1) M.plantsById[M.seedSelected].l.classList.remove('on');
            M.seedSelected = -1;
        }
    }
    M.draw = function() {
        //run each draw frame

        if (M.cursorL) {
            if (!M.cursor || M.seedSelected < 0) {
                M.cursorL.style.display = 'none';
            }
            else {
                var box = l('gardenDrag').getBounds();
                var x = Game.mouseX - box.left - 24;
                var y = Game.mouseY - box.top - 32 + TopBarOffset;
                var seed = M.plantsById[M.seedSelected];
                var icon = [seed.icon, 25];
                M.cursorL.style.transform = 'translate(' + (x) + 'px,' + (y) + 'px) scale(0.5)';
                M.cursorL.style.backgroundPosition = (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px';
                M.cursorL.style.display = 'block';
            }
        }
        if (Game.drawT % 10 == 0) {
            M.lumpRefill.style.display = 'block';
            if (M.freeze) l('gardenNextTick').innerHTML = loc("Garden is frozen. Unfreeze to resume.");
            else l('gardenNextTick').innerHTML = loc("Next tick in %1.", Game.sayTime((M.nextStep - Date.now()) / 1000 * 30 + 30, -1));
            l('gardenStats').innerHTML = loc("Mature plants harvested: %1 (total: %2)", [Beautify(M.harvests), Beautify(M.harvestsTotal)]);
            if (M.parent.level < M.plotLimits.length) l('gardenPlotSize').innerHTML = '<small>' + loc("Plot size: %1<br>(Upgrades with farm level)", Math.max(1, Math.min(M.plotLimits.length, M.parent.level)) + '/' + M.plotLimits.length) + '</small>';
            else l('gardenPlotSize').innerHTML = '';
            l('gardenSeedsUnlocked').innerHTML = loc("Seeds") + '<small> (' + M.plantsUnlockedN + '/' + M.plantsN + ')</small>';
            for (var i in M.soils) {
                var me = M.soils[i];
                if (M.parent.amount < me.req) l('gardenSoil-' + me.id).classList.add('disabled');
                else l('gardenSoil-' + me.id).classList.remove('disabled');
            }
        }
    }
    M.init(l('rowSpecial' + M.parent.id));
}
M.launch();

Game.registerMod('Aura Farming', {
    init: function() { },
    save: (function(M) { return function() {
        //output cannot use ",", ";" or "|"
		var str=''+
		parseFloat(M.nextStep)+':'+
		parseInt(M.soil)+':'+
		parseFloat(M.nextSoil)+':'+
		parseInt(M.freeze)+':'+
		parseInt(M.harvests)+':'+
		parseInt(M.harvestsTotal)+':'+
		parseInt(M.parent.onMinigame?'1':'0')+':'+
		parseFloat(M.convertTimes)+':'+
		parseFloat(M.nextFreeze)+':'+
		' ';
		for (var i in M.plants) str+=''+(M.plants[i].unlocked?'1':'0');
		str+=' ';
		for (var y=0;y<6;y++) {
			for (var x=0;x<6;x++) str+=parseInt(M.plot[y][x][0])+':'+parseInt(M.plot[y][x][1])+':';
		}
		return str;
    } })(M),
    load: M.load,
    realGarden: M.save()
});

Game.Notify("L aura", "lil bro is not gaining plus aura with ts", [24, 18]);

M = 0;