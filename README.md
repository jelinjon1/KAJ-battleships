# KAJ - Battleships

Repositář obsahuje single-page aplikaci, implementaci klasické deskové hry Battleships / Lodě.

- [KAJ - Battleships](#kaj---battleships)
  - [Funkčnost](#funkčnost)
  - [Vizuální prvky](#vizuální-prvky)
  - [Ovládání](#ovládání)


## Funkčnost

Aplikace umožňuje hrát hru proti jednoduchému scriptu s neměnným algoritmem hledání hráčových lodí. Hra se skládá z fáze pokládání lodí, kdy hráč pokládá lodě pouze na svůj Board. Lodě lze pokládat vertikálně a horizontálně, aktuální orientace se zobrazuje vedle ovládacích prvků, změnit jí lze pomocí pravého tlačítka myši, ale pouze nad hráčovým Boardem. Po položení poslední lodě se náhodně rozhodne kdo bude táhnout první a hra začíná. Dále může hráč interaktovat pouze s herní plochou nepřítele a okolními ovládacími prvky. Poté co dojde k potopení všech lodí jednoho z hráčů hra končí. Na konci hry, která končí vítezstvím hráče, se uloží uživatelské jméno z textového pole, provede se sanitizace proti možnému vložení html kódu a uloží se výsledek s jménem a celkovým časem hry.

 Většina událostí vyvolá log do jedné ze spodních stavových konzolí - pro průhlednost stavu aplikace.

Aplikace nabízí přehrávač audio předem nahraných audio souborů, dostupný je po hoveru přes prvek u levého okraje stránky. Přehrávač má připojené dva Buttons na průchod frontou nahraných audio souborů, Next a Previous. Fronta je zacyklená.

Pro vyjasnění pravidel a uznání tvůrců hudby existuje modální okno s návodem a dvěmi přepínatelnými tabs. Otevřít ho lze pomocí kliknutí na button s otazníkem. Poslední tab leaderboard nabízí náhled na záznamy her, kde hráč vyhrál v tabulce s jménem hráče a časem hry ve vteřinách.
Otevření zmíněného modálního okna pracuje s history api a nabízí možnost navigace

V případě ztráty připojení k internetu se vypne možnost zacházet s hudebním přehrávačem a místo sprite animace se k indikaci zasaženého pole využije oranžové pozadí.

## Vizuální prvky

Aplikace využívá SVG prvvek a animace k vykreslení okrasného radaru ponorky. Nad ním se v js vykonávají v náhodných intervalech úpravy přidání a odebrání bíleho puntíku.
Při vykonání útoku na pole na kterém se nacházela nepřátelská loď, pozadí buňky se změní na sprite, který je krokově posouván, a vzniká tudíž efekt animace.
CSS transformace jsou pužity pro přechod otevření Guide modálního okna.

## Ovládání

- Reset hry - r / button Reset
- Fullscreen - space
- Cancel fullscreen - esc
- Change ship orientation - right click (player's board)
- Place ship - left click (player's board)
- Place attack - left click (opponent's board)
- Open guide - button '?'
