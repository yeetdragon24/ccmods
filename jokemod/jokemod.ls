do !->    
    #dotjeiess is exponential
    exponential-jS = !->
        for i in Object.values Game.Objects
            eval "i.getPrice = #{i.get-price.to-string!.replace "Game.price-increase" "Game.priceIncrease * [1, 0.93, 0.95, 0.98][Game.hasGod?.('creation') || 0]"}"
            eval "i.getSumPrice = #{i.get-sum-price.to-string!.replace "Game.price-increase" "Game.priceIncrease * [1, 0.93, 0.95, 0.98][Game.hasGod?.('creation') ||  0]"}"
        eval "Game.modifyBuildingPrice = #{Game.modify-building-price.to-string!.replace "Game.has-god" "false" }"

    #juicy bakeberry, liver and uncapped QB are available in garden
    garden-combos = (M) !->
        M.plants.\juicyBakeberry =
            name: 'Juicy bakeberry'
            icon: 8
            cost: 90
            cost-m: 100000000000
            age-tick: 0.12
            age-tick-r: 0.24
            mature: 65
            mature-base: 65
            plantable: true
            children: []
            effs-str: """<div class="green">&bull; #{loc "Cp-s"} +2%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of Cp-s (max. %2% of bank)", [Game.say-time(90*60*Game.fps), 9]}</div>"""
            q: 'A favorite among cooks, this large berry has a crunchy brown exterior and a creamy red center. Excellent in pies or chicken stews.<br>It looks like this one has grown especially sweeter and juicier from growing in close proximity to other bakeberries.'
            on-harvest: (x,y,age) ->
                if age < @mature then return false
                moni = Math.min Game.cookies*0.09, Game.cookies-ps*60*90
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Bakeberry)<br>+#{Beautify moni} cookies!", Game.mouse-x, Game.mouse-y
                M.drop-upgrade 'Bakeberry cookies', 0.045
        M.plants.\uncappedQueenbeet =
            name: 'Uncapped queenbeet'
            icon: 17
            cost: 60*3
            cost-m: 10000000000
            age-tick: 1
            age-tick-r: 0.4
            mature: 80
            mature-base: 80
            plantable: true
            children: <[duketater queenbeetLump shriekbulb]>
            effs-str: """<div class="green">&bull; #{loc "golden cookie effect duration"} +0.3%</div><div class="red">&bull; #{loc "Cp-s"} -2%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of Cp-s (max. %2% of bank)", [Game.say-time(60*60*Game.fps), Infinity]}</div>"""
            q: 'A delicious taproot used to prepare high-grade white sugar. Entire countries once went to war over these.<br>It looks like this one has grown especially uncapped without any golden clovers to compete with.'
            on-harvest: (x,y,age) ->
                if age < @mature then return false
                moni = Game.cookies-ps*60*60
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Queenbeet)<br>+#{Beautify moni} cookies!", Game.mouse-x, Game.mouse-y
        M.plants.\gardenComboist =
            name: 'Garden Comboist'
            icon: M.plants.'shriekbulb'.icon
            cost: 60*60
            cost-m: 1000000000000000000000000
            age-tick: 0
            age-tick-r: 1
            mature: 99
            mature-base: 99
            immortal: true
            no-contam: true
            children: [\gardenComboistsLiver]
            plantable: true
            effs-str: """<div class="red">&bull; #{loc "Cp-s"} -5%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of Cp-s (max. %2% of bank)", [Game.say-time(2*24*60*60*Game.fps), 100]}</div>"""
            q: 'A once avid cookie clicker fan turned into a garden crop. Aren\'t the miniscule gains just so cute?'
            on-harvest: (x, y, age) ->
                if age < @mature then return false
                moni = Math.min Game.cookies,Game.cookies-ps*60*60*24*2;
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Garden Comboist)<br>+#{Beautify moni} cookies!", Game.mouse-x, Game.mouse-y

        M.plants.\gardenComboistsLiver =
            name: 'Garden Comboist\'s Liver'
            icon: M.plants.'doughshroom'.icon
            cost: 60*60*60*60
            cost-m: Math.sqrt 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            age-tick: 0
            age-tick-r: 1e6
            mature: 99
            mature-base: 99
            no-contam: true
            immortal: true
            children: <[uncappedQueenbeet zinkliousTidygrass]>
            plantable: true
            effs-str: """<div class="red">&bull; #{loc("Cp-s")} -10%</div><div class="green">&bull; #{loc "harvest when mature for +%1 of Cp-s (max. %2% of bank)", [Game.say-time(1e9*365*24*60*60*Game.fps), Infinity]}</div>"""
            q: 'The distilled essence of a Garden Comboist. What was once an unassuming player has now become the pinnacle of garden combos.'
            on-harvest: (x, y, age) ->
                if age < @mature then return false
                moni = Game.cookies-ps*60*60*24*365*1e9
                if moni is 0 then return false
                Game.Earn moni
                Game.Popup "(Garden Comboist's Liver)<br>+#{Beautify moni} cookies!", Game.mouse-x, Game.mouse-y
            on-kill: (x, y, age) ->
                adj = [M.get-tile(x+1, y), M.get-tile(x+1, y+1), M.get-tile(x, y+1), M.get-tile(x-1, y+1), M.get-tile(x-1, y), M.get-tile(x-1, y-1), M.get-tile(x, y-1), M.get-tile(x+1, y-1)]
                if adj.every((plant) -> plant and plant[0] is M.plants.'tidygrass'.id + 1 and plant[1] >= 40)
                    M.plot[y][x] = [M.plants.'zinkliousTidygrass'.id + 1 0]

        M.plants.\zinkliousTidygrass =
            name: 'Zinklious tidygrass'
            icon: 31
            cost: 90*5
            cost-m: 100000000000000 ^ 2
            age-tick: 0.125
            age-tick-r: 0
            mature: 40
            mature-base: 40
            no-contam: true
            children: []
            effs-str: """<div class="green">&bull; #{loc "surrounding tiles (%1x%1) develop no weeds or fungus", 5}</div>""",
            q: 'The molecules this grass emits are a natural weedkiller. Its stems grow following a predictable pattern, making it an interesting -if expensive- choice for a lawn grass.<br>It looks like this one has grown especially zinklious from growing in close proximity to a liver.'

        M.plants-by-id.splice M.plants-by-id.index-of(M.plants.\bakeberry) + 1 0 M.plants.\juicyBakeberry
        M.plants-by-id.splice M.plants-by-id.index-of(M.plants.\queenbeet) + 1 0 M.plants.\uncappedQueenbeet
        M.plants-by-id.splice M.plants-by-id.index-of(M.plants.\tidygrass) + 1 0 M.plants.\zinkliousTidygrass
        M.plants-by-id.push M.plants.\gardenComboist, M.plants.\gardenComboistsLiver

        M.plants.'bakeberry'.children.push \juicyBakeberry, \uncappedQueenbeet
        M.plants.'duketater'.children.push \gardenComboist
        M.plants.'queenbeetLump'.children.push \uncappedQueenbeet

        M.plants-n += 5

        for i of M.plants-by-id then M.plants-by-id[i].id = parse-int i

        eval "M.getMuts = #{M.get-muts.to-string!
            .replace "muts.push(['ichorpuff',0.002]);" "muts.push(['ichorpuff',0.002]); if (neighsM['duketater']>=8) muts.push(['gardenComboist',0.001]); if (neighsM['gardenComboist']>=8) muts.push(['gardenComboistsLiver',0.001]);"
            .replace "muts.push(['queenbeet',0.01]);" "muts.push(['queenbeet',0.01]); if (neighsM['bakeberry']>=8) muts.push(['juicyBakeberry', 0.001]); if (neighsM['queenbeetLump'] > 0 && neighsM['garden-comboistsLiver'] > 0) muts.push(['uncappedQueenbeet', 0.05]);"
        }"

        eval "M.computeEffs = #{M.compute-effs.to-string!.replace(
            "else if (name" "
            else if (name == 'juicyBakeberry') effs.cps += 0.01 * mult;
            else if (name == 'uncappedQueenbeet') { effs.goldenCookieEffDur += 0.003 * mult; effs.cps *= 1 - 0.02 * mult; }
            else if (name == 'gardenComboist') effs.cps *= 1 - 0.05 * mult;
            else if (name == 'gardenComboistsLiver') effs.cps *= 1 - 0.1 * mult;
            else if (name"
        )}"

        eval "M.computeBoostPlot = #{M.compute-boost-plot.to-string!.replace "name=='tidygrass'" "name=='tidygrass' || name=='zinkliousTidygrass'"}"

        eval "M.buildPanel = #{M.build-panel.to-string!.replace-all "M.plants" "M.plantsById"}"

        eval "M.save = #{M.save.to-string!.replace "M.plot[y][x][0]" "Math.min(M.plot[y][x][0], 34)"}"

        M.build-panel!

    #once you reach 4.343 tretrig your name is changed to "Neil" and cannot be changed back
    neil = !->
        Game.register-hook \check, !->
            if Game.cookies < 4.343e102 then return false;
            Remove-event [l(\bakeryName), \click, Game.bakery-name-prompt]
            Game.bakery-name-set \Neil
            document.style-sheets[1]
                ..delete-rule Object.entries(document.style-sheets[1].css-rules).find((rule) -> rule[1].selector-text is \#bakeryName:hover)[0]
                ..insert-rule '#bakeryName:hover { cursor: default }'

    #FTHOF will not cast and instead notify you that you cheated
    fthof-cheating = (M) !->
        M.spells.'hand of fate'.win = M.spells.'hand of fate'.lose = -> Game.Notify 'You cheated' 'FtHoF is cheating' [22 11]

    #all loans are removed
    loans-dont-exist = (M) !->
        l \bankLoan1 .parent-element.style.set-property \display \none
        for i in Object.values M.offices
            i.desc .= replace "&bull; #{loc("+1 loan slot")}<br>" ""

    #tower level no longer affects spell cost
    tower-lvl-spell-cost = (M) !->
        eval "M.computeMagicM = #{M.compute-magic-m.to-string!.replace "Math.max(M.parent.level,1)" "1"}"

    #godzamok is severely nerfed
    godz-nerfs = (M) !->
        for i in Object.values Game.Objects
            eval "i.sell = #{i.sell.to-string!.replace-all "sold*" "sold*0.1*"}"
        M.gods.\ruin
            ..desc1 .= replace \1 \0.1
            ..desc2 .= replace \0.5 \0.05
            ..desc3 .= replace \0.25 \0.025

    #permaslots 6 and 7 exist but only santa's dominion and birthday cookie can be placed in them
    permaslots6And7 = !->
        eval "Game.AssignPermanentSlot = #{Game.Assign-permanent-slot.to-string!.replace "me.unlocked &&" "me.unlocked && (slot < 5 || (me.name == 'Birthday cookie' || me.name == 'Santa\\'s dominion')) &&"}"
        eval "Game.PermanentSlotIcon = #{Game.Permanent-slot-icon.to-string!.replace "[slot,10]" "[Math.min(slot, 4), 10]"}"
        for i from 0 til 2
            new Game.Upgrade "Permanent upgrade slot #{['VI', 'VII'][i]}" loc("Placing an upgrade in this slot will make its effects <b>permanent</b> across all playthroughs."), (i + 6) * (100 ^ (i + 6)), [4, 10]
            Game.last.pool = \prestige
            Game.last.parents = [Game.Upgrades."Permanent upgrade slot #{['V', 'VI'][i]}"]
            [Game.last.pos-x, Game.last.pos-y] = [[694 -90] [840 -126]][i]
            Game.last.icon-function = ((i) -> -> Game.Permanent-slot-icon i) i + 5
            Game.last.activate-function = ((i) -> -> Game.Assign-permanent-slot i) i + 5
            Game.last.desc-func = ((i) -> (context) ->
                if Game.permanent-upgrades[i] is -1 then return @desc + (if context is \stats then '' else "<br><b>#{loc "Click to activate." }</b>")
                upgrade = Game.Upgrades-by-id[Game.permanent-upgrades[i]]
                """<div style="text-align:center;">#{loc \Current} #{tinyIcon upgrade.icon} <b>#{upgrade.dname}</b><div class="line"></div></div>#{@ddesc + (if context is \stats then '' else "<br><b>#{loc "Click to activate." }")}</b>"""
            ) i + 5
            Game.Prestige-upgrades.push Game.last
            Game.permanent-upgrades.push -1
        Localize-upgrades-and-achievs!

    #setting your name to "Rice" makes clicking a spell casts a random spell instead of the one you're trying to cast
    rice = (M) !->
        eval "M.castSpell = #{M.cast-spell.to-string!.replace "var obj", "if (!obj && Game.bakeryName.toLowerCase() == 'rice') spell = choose(Object.values(M.spells)); var obj"}"

    #the info tab is replaced with the "pins" tab and if you ascend at anything except 365 you get a notification to check it
    pins-info-tab = !->
        l \logButton .child-nodes[0].text-content = \Pins
        eval "Game.EarnEeavenlyChips = #{Game.Earn-heavenly-chips.to-string!.replace "Game.gainedPrestige" "if (prestigeDifference !== 365) Game.Notify('You didn\\'t ascend at 365', 'You should check the pins... NOW', [1, 7]); Game.gainedPrestige"}"

    #dragonflight is renamed to "woman"
    df-woman = !->
        eval "Game.buffTypesByName['dragonflight'].func = #{Game.buff-types-by-name.'dragonflight'.func.to-string!.replace "name:'Dragonflight'" "name:'Woman'"}"

    #click frenzy is renamed to "clicker frenzy"
    clicker-frenzy = !->
        eval "Game.buffTypesByName['click frenzy'].func = #{Game.buff-types-by-name.'click frenzy'.func.to-string!.replace "name:'Click frenzy'" "name:'Clicker frenzy'"}"

    #if you have exactly 27001 pops, all wrinklers are shiny
    shiny27001 = !->
        eval "Game.SpawnWrinkler = #{Game.Spawn-wrinkler.to-string!.replace "Math.random()<0.0001" "Math.random()<0.0001 || Game.wrinklersPopped == 27001"}"

    #grandmas can no longer be called "vera"
    no-more-vera = !->
        Game.grandma-names.splice Game.grandma-names.index-of(\Vera), 1

    #krumblor is called "dragon"
    krumblor-called-dragon = !->
        {[key, val.name .= replace \Krumblor \Dragon] for key, val of Game.dragon-levels}

    #fertilizer is called "limes"
    fertilizer-is-limes = (M) !->
        M.soils.'fertilizer'.name = \Limes
    
    #organs removed
    organs-removed = !->
        eval "Game.shimmerTypes['golden'].popFunc = #{Game.shimmer-types['golden'].pop-func.to-string!.replace "Organs added" "Organs removed"}"

    #"so long, cookies" achievement
    so-long-cookies = !->
        new Game.Achievement "So long, cookies." "The <b>timer<b> has started." [20 7]
            ..pool = \shadow
        eval "Game.Ascend = #{Game.Ascend.to-string!.replace "Game.OnAscend=0;" "Game.Earn(1e6 * !Game.HasAchiev('So long, cookies.'));Game.Win('So long, cookies.');Game.OnAscend=0;"}"
        Game.register-hook \reset (hard) ->
            if hard
                Game.Earn 1e6 * not Game.Has-achiev("So long, cookies.")
                Game.Win "So long, cookies."
        eval "Game.Win = #{Game.Win.to-string!.replace "if" "if (what == 'So long, cookies.') { Game.Notify('Shadow achievements are not allowed.', 'Your run has been invalidated.', [17, 5]); Object.values(Game.Achievements).filter(x => x.pool == 'shadow').forEach(x => x.won = 0); }; if"}"
        

    Game.register-mod 'Joke mod',
        init: !->
            exponential-jS!
            neil!
            permaslots6And7!
            pins-info-tab!
            df-woman!
            clicker-frenzy!
            shiny27001!
            no-more-vera!
            krumblor-called-dragon!
            organs-removed!
            so-long-cookies!
            Game.register-hook \check function grimoire-check
                M = Game.Objects.'Wizard tower'.minigame
                unless M then return
                fthof-cheating M
                tower-lvl-spell-cost M
                rice M
                Game.remove-hook \check grimoire-check
            Game.register-hook \check function garden-check
                M = Game.Objects.'Farm'.minigame
                unless M then return
                garden-combos M
                fertilizer-is-limes M
                Game.remove-hook \check garden-check
            Game.register-hook \check function market-check
                M = Game.Objects.'Bank'.minigame
                unless M then return
                loans-dont-exist M
                Game.remove-hook \check market-check
            Game.register-hook \check function pantheon-check
                M = Game.Objects.'Temple'.minigame
                unless M then return
                godz-nerfs M
                Game.remove-hook \check pantheon-check
            Game.run-mod-hook \check
            Localize-upgrades-and-achievs!