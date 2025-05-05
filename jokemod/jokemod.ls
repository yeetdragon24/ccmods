do !->    
    #dotjeiess is exponential
    exponentialJS = !->
        for i in Object.values Game.Objects
            eval "i.getPrice = #{i.getPrice.toString!.replace "Game.priceIncrease" "Game.priceIncrease * [1, 0.93, 0.95, 0.98][Game.hasGod?.('creation') || 0]"}"
            eval "i.getSumPrice = #{i.getSumPrice.toString!.replace "Game.priceIncrease" "Game.priceIncrease * [1, 0.93, 0.95, 0.98][Game.hasGod?.('creation') ||  0]"}"
        eval "Game.modifyBuildingPrice = #{Game.modifyBuildingPrice.toString!.replace "Game.hasGod" "false" }"

    #juicy bakeberry, liver and uncapped QB are available in garden
    gardenCombos = (M) !->
        M.plants.\juicyBakeberry =
            name: 'Juicy bakeberry'
            icon: 8
            cost: 90
            costM: 100000000000
            ageTick: 0.12
            ageTickR: 0.24
            mature: 65
            matureBase: 65
            plantable: true
            children: []
            effsStr: """<div class="green">&bull; #{loc "CpS"} +2%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of CpS (max. %2% of bank)", [Game.sayTime(90*60*Game.fps), 9]}</div>"""
            q: 'A favorite among cooks, this large berry has a crunchy brown exterior and a creamy red center. Excellent in pies or chicken stews.<br>It looks like this one has grown especially sweeter and juicier from growing in close proximity to other bakeberries.'
            onHarvest: (x,y,age) ->
                if age < @mature then return false
                moni = Math.min Game.cookies*0.09, Game.cookiesPs*60*90
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Bakeberry)<br>+#{Beautify moni} cookies!", Game.mouseX, Game.mouseY
                M.dropUpgrade 'Bakeberry cookies', 0.045
        M.plants.\uncappedQueenbeet =
            name: 'Uncapped queenbeet'
            icon: 17
            cost: 60*3
            costM: 10000000000
            ageTick: 1
            ageTickR: 0.4
            mature: 80
            matureBase: 80
            plantable: true
            children: <[duketater queenbeetLump shriekbulb]>
            effsStr: """<div class="green">&bull; #{loc "golden cookie effect duration"} +0.3%</div><div class="red">&bull; #{loc "CpS"} -2%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of CpS (max. %2% of bank)", [Game.sayTime(60*60*Game.fps), Infinity]}</div>"""
            q: 'A delicious taproot used to prepare high-grade white sugar. Entire countries once went to war over these.<br>It looks like this one has grown especially uncapped without any golden clovers to compete with.'
            onHarvest: (x,y,age) ->
                if age < @mature then return false
                moni = Game.cookiesPs*60*60
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Queenbeet)<br>+#{Beautify moni} cookies!", Game.mouseX, Game.mouseY
        M.plants.\gardenComboist =
            name: 'Garden Comboist'
            icon: M.plants.'shriekbulb'.icon
            cost: 60*60
            costM: 1000000000000000000000000
            ageTick: 0
            ageTickR: 1
            mature: 99
            matureBase: 99
            immortal: true
            noContam: true
            children: [\gardenComboistsLiver]
            plantable: true
            effsStr: """<div class="red">&bull; #{loc "CpS"} -5%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of CpS (max. %2% of bank)", [Game.sayTime(2*24*60*60*Game.fps), 100]}</div>"""
            q: 'A once avid cookie clicker fan turned into a garden crop. Aren\'t the miniscule gains just so cute?'
            onHarvest: (x, y, age) ->
                if age < @mature then return false
                moni = Math.min Game.cookies,Game.cookiesPs*60*60*24*2;
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Garden Comboist)<br>+#{Beautify moni} cookies!", Game.mouseX, Game.mouseY

        M.plants.\gardenComboistsLiver =
            name: 'Garden Comboist\'s Liver'
            icon: M.plants.'doughshroom'.icon
            cost: 60*60*60*60
            costM: Math.sqrt 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            ageTick: 0
            ageTickR: 1e6
            mature: 99
            matureBase: 99
            noContam: true
            immortal: true
            children: <[uncappedQueenbeet zinkliousTidygrass]>
            plantable: true
            effsStr: """<div class="red">&bull; #{loc("CpS")} -10%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of CpS (max. %2% of bank)", [Game.sayTime(1e9*365*24*60*60*Game.fps), Infinity]}</div>"""
            q: 'The distilled essence of a Garden Comboist. What was once an unassuming player has now become the pinnacle of garden combos.'
            onHarvest: (x, y, age) ->
                if age < @mature then return false
                moni = Game.cookiesPs*60*60*24*365*1e9
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Garden Comboist's Liver)<br>+#{Beautify moni} cookies!", Game.mouseX, Game.mouseY
            onKill: (x, y, age) ->
                adj = [M.getTile(x+1, y), M.getTile(x+1, y+1), M.getTile(x, y+1), M.getTile(x-1, y+1), M.getTile(x-1, y), M.getTile(x-1, y-1), M.getTile(x, y-1), M.getTile(x+1, y-1)]
                if adj.every((plant) -> plant and plant[0] is M.plants.'tidygrass'.id + 1 and plant[1] >= 40)
                    M.plot[y][x] = [M.plants.'zinkliousTidygrass'.id + 1 0]

        M.plants.\zinkliousTidygrass =
            name: 'Zinklious tidygrass'
            icon: 31
            cost: 90*5
            costM: 100000000000000 ^ 2
            ageTick: 0.125
            ageTickR: 0
            mature: 40
            matureBase: 40
            noContam: true
            children: []
            effsStr: """<div class="green">&bull; #{loc "surrounding tiles (%1x%1) develop no weeds or fungus", 5}</div>""",
            q: 'The molecules this grass emits are a natural weedkiller. Its stems grow following a predictable pattern, making it an interesting -if expensive- choice for a lawn grass.<br>It looks like this one has grown especially zinklious from growing in close proximity to a liver.'

        M.plantsById.splice M.plantsById.indexOf(M.plants.\bakeberry) + 1 0 M.plants.\juicyBakeberry
        M.plantsById.splice M.plantsById.indexOf(M.plants.\queenbeet) + 1 0 M.plants.\uncappedQueenbeet
        M.plantsById.splice M.plantsById.indexOf(M.plants.\tidygrass) + 1 0 M.plants.\zinkliousTidygrass
        M.plantsById.push M.plants.\gardenComboist, M.plants.\gardenComboistsLiver

        M.plants.'bakeberry'.children.push \juicyBakeberry, \uncappedQueenbeet
        M.plants.'duketater'.children.push \gardenComboist
        M.plants.'queenbeetLump'.children.push \uncappedQueenbeet

        M.plantsN += 5

        for i of M.plantsById then M.plantsById[i].id = parseInt i

        eval "M.getMuts = #{M.getMuts.toString!
            .replace "muts.push(['ichorpuff',0.002]);" "muts.push(['ichorpuff',0.002]); if (neighsM['duketater']>=8) muts.push(['gardenComboist',0.001]); if (neighsM['gardenComboist']>=8) muts.push(['gardenComboistsLiver',0.001]);"
            .replace "muts.push(['queenbeet',0.01]);" "muts.push(['queenbeet',0.01]); if (neighsM['bakeberry']>=8) muts.push(['juicyBakeberry', 0.001]); if (neighsM['queenbeetLump'] > 0 && neighsM['gardenComboistsLiver'] > 0) muts.push(['uncappedQueenbeet', 0.05]);"
        }"

        eval "M.computeEffs = #{M.computeEffs.toString!.replace(
            "else if (name" "
            else if (name == 'juicyBakeberry') effs.cps += 0.01 * mult;
            else if (name == 'uncappedQueenbeet') { effs.goldenCookieEffDur += 0.003 * mult; effs.cps *= 1 - 0.02 * mult; }
            else if (name == 'gardenComboist') effs.cps *= 1 - 0.05 * mult;
            else if (name == 'gardenComboistsLiver') effs.cps *= 1 - 0.1 * mult;
            else if (name"
        )}"

        eval "M.computeBoostPlot = #{M.computeBoostPlot.toString!.replace "name=='tidygrass'" "name=='tidygrass' || name=='zinkliousTidygrass'"}"

        eval "M.buildPanel = #{M.buildPanel.toString!.replaceAll "M.plants" "M.plantsById"}"

        eval "M.save = #{M.save.toString!.replace "M.plot[y][x][0]" "Math.min(M.plot[y][x][0], 34)"}"

        M.buildPanel!

    #once you reach 4.343 tretrig your name is changed to "Neil" and cannot be changed back
    neil = !->
        Game.registerHook \check, !->
            if Game.cookies < 4.343e102 then return false;
            RemoveEvent [l(\bakeryName), \click, Game.bakeryNamePrompt]
            Game.bakeryNameSet \Neil
            document.styleSheets[1]
                ..deleteRule Object.entries(document.styleSheets[1].cssRules).find((rule) -> rule[1].selectorText is \#bakeryName:hover)[0]
                ..insertRule '#bakeryName:hover { cursor: default }'

    #FTHOF will not cast and instead notify you that you cheated
    fthofCheating = (M) !->
        M.spells.'hand of fate'.win = M.spells.'hand of fate'.lose = -> Game.Notify 'You cheated' 'FtHoF is cheating' [22 11]

    #all loans are removed
    loansDontExist = (M) !->
        l \bankLoan1 .parentElement.style.setProperty \display \none
        for i in Object.values M.offices
            i.desc .= replace "&bull; #{loc("+1 loan slot")}<br>" ""

    #tower level no longer affects spell cost
    towerLvlSpellCost = (M) !->
        eval "M.computeMagicM = #{M.computeMagicM.toString!.replace "Math.max(M.parent.level,1)" "1"}"

    #godzamok is severely nerfed
    godzNerfs = (M) !->
        for i in Object.values Game.Objects
            eval "i.sell = #{i.sell.toString!.replaceAll "sold*" "sold*0.1*"}"
        M.gods.'ruin'
            ..desc1 .= replace "1" "0.1"
            ..desc2 .= replace "0.5" "0.05"
            ..desc3 .= replace "0.25" "0.025"

    #permaslots 6 and 7 exist but only santa's dominion and birthday cookie can be placed in them
    permaslots6And7 = !->
        eval "Game.AssignPermanentSlot = #{Game.AssignPermanentSlot.toString!.replace "me.unlocked &&" "me.unlocked && (slot < 5 || (me.name == 'Birthday cookie' || me.name == 'Santa\\'s dominion')) &&"}"
        eval "Game.PermanentSlotIcon = #{Game.PermanentSlotIcon.toString!.replace "[slot,10]" "[Math.min(slot, 4), 10]"}"
        for i from 0 til 2
            new Game.Upgrade "Permanent upgrade slot #{['VI', 'VII'][i]}" loc("Placing an upgrade in this slot will make its effects <b>permanent</b> across all playthroughs."), (i + 6) * (100 ^ (i + 6)), [4, 10]
            Game.last.pool = \prestige
            Game.last.parents = [Game.Upgrades."Permanent upgrade slot #{['V', 'VI'][i]}"]
            [Game.last.posX, Game.last.posY] = [[694 -90] [840 -126]][i]
            Game.last.iconFunction = ((i) -> -> Game.PermanentSlotIcon i) i + 5
            Game.last.activateFunction = ((i) -> -> Game.AssignPermanentSlot i) i + 5
            Game.last.descFunc = ((i) -> (context) ->
                if Game.permanentUpgrades[i] is -1 then return @desc + (if context is \stats then '' else "<br><b>#{loc "Click to activate." }</b>")
                upgrade = Game.UpgradesById[Game.permanentUpgrades[i]]
                """<div style="text-align:center;">#{loc \Current} #{tinyIcon upgrade.icon} <b>#{upgrade.dname}</b><div class="line"></div></div>#{@ddesc + (if context is \stats then '' else "<br><b>#{loc "Click to activate." }")}</b>"""
            ) i + 5
            Game.PrestigeUpgrades.push Game.last
            Game.permanentUpgrades.push -1
        LocalizeUpgradesAndAchievs!

    #setting your name to "Rice" makes clicking a spell casts a random spell instead of the one you're trying to cast
    rice = (M) !->
        eval "M.castSpell = #{M.castSpell.toString!.replace "var obj", "if (!obj && Game.bakeryName.toLowerCase() == 'rice') spell = choose(Object.values(M.spells)); var obj"}"

    #the info tab is replaced with the "pins" tab and if you ascend at anything except 365 you get a notification to check it
    pinsInfoTab = !->
        l \logButton .childNodes[0].textContent = \Pins
        eval "Game.EarnHeavenlyChips = #{Game.EarnHeavenlyChips.toString!.replace "Game.gainedPrestige" "if (prestigeDifference !== 365) Game.Notify('You didn\\'t ascend at 365', 'You should check the pins... NOW', [1, 7]); Game.gainedPrestige"}"

    #dragonflight is renamed to "woman"
    dfWoman = !->
        eval "Game.buffTypesByName['dragonflight'].func = #{Game.buffTypesByName.'dragonflight'.func.toString!.replace "name:'Dragonflight'" "name:'Woman'"}"

    #click frenzy is renamed to "clicker frenzy"
    clickerFrenzy = !->
        eval "Game.buffTypesByName['click frenzy'].func = #{Game.buffTypesByName.'click frenzy'.func.toString!.replace "name:'Click frenzy'" "name:'Clicker frenzy'"}"

    #if you have exactly 27001 pops, all wrinklers are shiny
    shiny27001 = !->
        eval "Game.SpawnWrinkler = #{Game.SpawnWrinkler.toString!.replace "Math.random()<0.0001" "Math.random()<0.0001 || Game.wrinklersPopped == 27001"}"

    #grandmas can no longer be called "vera"
    noMoreVera = !->
        Game.grandmaNames.splice Game.grandmaNames.indexOf(\Vera), 1

    #krumblor is called "dragon"
    krumblorCalledDragon = !->
        {[key, val.name .= replace "Krumblor" "Dragon"] for key, val of Game.dragonLevels}

    #fertilizer is called "limes"
    fertilizerIsLimes = (M) !->
        M.soils.'fertilizer'.name = \Limes
    
    #organs removed
    organsRemoved = !->
        eval "Game.shimmerTypes['golden'].popFunc = #{Game.shimmerTypes['golden'].popFunc.toString!.replace "Organs added" "Organs removed"}"

    Game.registerMod 'Joke mod',
        init: !->
            exponentialJS!
            neil!
            permaslots6And7!
            pinsInfoTab!
            dfWoman!
            clickerFrenzy!
            shiny27001!
            noMoreVera!
            krumblorCalledDragon!
            organsRemoved!
            Game.registerHook \check function grimoireCheck
                M = Game.Objects.'Wizard tower'.minigame
                unless M then return
                fthofCheating M
                towerLvlSpellCost M
                rice M
                Game.removeHook \check grimoireCheck
            Game.registerHook \check function gardenCheck
                M = Game.Objects.'Farm'.minigame
                unless M then return
                gardenCombos M
                fertilizerIsLimes M
                Game.removeHook \check gardenCheck
            Game.registerHook \check function marketCheck
                M = Game.Objects.'Bank'.minigame
                unless M then return
                loansDontExist M
                Game.removeHook \check marketCheck
            Game.registerHook \check function pantheonCheck
                M = Game.Objects.'Temple'.minigame
                unless M then return
                godzNerfs M
                Game.removeHook \check pantheonCheck
            Game.runModHook \check
