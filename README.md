# KAJ - Battleships

Repositář obsahuje single-page aplikaci, implementaci klasické deskové hry Battleships / Lodě.

- [KAJ - Battleships](#kaj---battleships)
  - [Funkčnost](#funkčnost)
  - [Vizuální prvky](#vizuální-prvky)
  - [Ovládání](#ovládání)


## Funkčnost

Aplikace umožňuje hrát hru proti jednoduchému scriptu s neměnným algoritmem hledání hráčových lodí. Hra se skládá z fáze pokládání lodí, kdy hráč pokládá lodě pouze na svůj Board. Lodě lze pokládat vertikálně a horizontálně, aktuální orientace se zobrazuje vedle ovládacích prvků, změnit jí lze pomocí pravého tlačítka myši, ale pouze nad hráčovým Boardem. Po položení poslední lodě se náhodně rozhodne kdo bude táhnout první a hra začíná. Dále může hráč interaktovat pouze s herní plochou nepřítele a okolními ovládacími prvky. Poté co dojde k potopení všech lodí jednoho z hráčů hra končí. Většina událostí vyvolá log do jedné ze spodních stavových konzolí - pro průhlednost stavu aplikace.

Aplikace nabízí přehrávač audio předem nahraných audio souborů, dostupný je po hoveru přes prvek u levého okraje stránky. Přehrávač má připojené dva Buttons na průchod frontou nahraných audio souborů, Next a Previous. Fronta je zacyklená.

Pro vyjasnění pravidel a uznání tvůrců hudby existuje modální okno s návodem a dvěmi přepínatelnými tabs. Otevřít ho lze pomocí kliknutí na button s otazníkem.

## Vizuální prvky

Aplikace využívá SVG prvvek a animace k vykreslení okrasného radaru ponorky. Nad ním se v js vykonávají v náhodných intervalech úpravy přidání a odebrání bíleho puntíku.
Při vykonání útoku na pole na kterém se nacházela nepřátelská loď, pozadí buňky se změní na sprite, který je krokově posouván, a vzniká tudíž efekt animace.
CSS transformace jsou pužity pro přechod otevření Guide modálního okna.

## Ovládání

- Reset hry - r / button Reset
- Fullscreen - space
- Cancel fullscreen - esc
- Change ship orientation () - right click
- Place ship - left click (player's board)
- Place attack - left click (opponent's board)
- Open guide - button '?'
