# valorant-api.js

valorant-api.js is currently a simple wrapper for pvp.net endpoints used by the Valorant client.

## Installation

Use npm to install valorant-api.js

```bash
npm i @ev3nvy/valorant-api.js
```

## Usage 

First, import library into your project.
```node
const Valorant = require('@ev3nvy/valorant-api.js');
```

You can also use destructuring import:
```node
const { ValorantClientAPI, Regions } = require('@ev3nvy/valorant-api.js');
```

Afterwards, you need to create a new ValorantClientAPI instance and authorize:

```node
let api = new ValorantClientAPI();
let eu = Regions.Europe;

api.authorize(eu, 'username', 'password').then(async () => {
  // DO THINGS HERE
}).catch(err => console.error(err));
```

> Alternatively, region can be a string.

Supported regions:
|Regions.|string|
|---|---|
|AsiaPacific|`ap`|
|Brasil|`br`|
|Europe|`eu`|
|Korea|`kr`|
|LatinAmerica|`latam`|
|NorthAmerica|`na`|

You can now begin making api calls inside that end block.
By destructuring `ValorantClientAPI()` instance `.Endpoints`, you can then make calls to that group of endpoints.

```node
const { Authorized } = api.Endpoints;
let xp = await Authorized().accountXp();
console.log(xp);
```

Things like Gamemodes and Agents are defined in Content, so that you don't have to deal with that yourself.
```node
const { ValorantClientAPI, Regions, Content } = require('@ev3nvy/valorant-api.js');
// ...
api.authorize(eu, 'username', 'password').then(async () => {
  const { Authorized, Public } = api.Endpoints;
  const { Gamemodes } = Content;
  
  let matchHistory = await Public().getMatchHistory(eu, api.getPuuid(), 0, 20, Gamemodes.Competitive);
  
  console.log(matchHistory);
}).catch(err => console.error(err));
```

> It is recommended to wrap those calls in a try...catch statement.
```node
const { Authorized, Public } = api.Endpoints;
const { Gamemodes } = Content;
try {
  let xp = await Authorized().accountXp();
  let matchHistory = await Public().getMatchHistory(eu, api.getPuuid(), 0, 20, Gamemodes.Competitive);
  
  console.log({xp, matchHistory});
} catch (err) {
  console.error(err);
}
```

Endpoints are grouped by whom they can be used and who they target.
|Endpoint name|Description|
|---|---|
|Global|Data that is not user specific, such as server configs and game content data.|
|Public|Data that accepts puuids from others not just the authorized user, but is user/match specific.|
|Authorized|Data that only accepts puuids of the authorized user.|

Other endpoints (`Party`, `Pregame`, `Ingame`, `Store`), have the same restrictions as `Authorized`.

## Example
```node
const { ValorantClientAPI, Regions, Content } = require('@ev3nvy/valorant-api.js');

let api = new ValorantClientAPI();
let eu = Regions.Europe;

api.authorize(eu, 'username', 'password').then(async () => {
  const { Authorized, Public } = api.Endpoints;
  const { Gamemodes } = Content;
  
  try {
    // fetch account xp
    let xp = await Authorized().accountXp();
    // fetch match history
    let matchHistory = await Public().getMatchHistory(eu, api.getPuuid(), 0, 20, Gamemodes.Competitive);
    
    console.log({xp, matchHistory});
  } catch (err) {
    console.error(err);
  }
}).catch(err => console.error(err));
```

## ValorantClientAPI features
Global:
- [X] getRegionConfig(region)
- [X] getItemUpgrades(region)
- [X] getLeaderbord(region, seasonId, startIndex?, size?, playerName?)
- [X] getGameContent(region)
- [X] getCustomGameConfigs(region)
- [X] fetchQueueData(region)

Private:
- [X] getPlayerMmr(region, puuid)
- [X] getPlayerMmrHistory(region, puuid, startIndex?, endIndex?) 
- [X] getMatchHistory(region, puuid, startIndex?, endIndex?, gamemode?)
- [X] getMatchDetails(region, matchId)

Authorized:
- [X] accountXp()
- [X] playerContracts()
- [X] activateContract(contractId)
- [X] loadout()
- [ ] changeLoadout(body) - does work, but there is a loadout builder planned
- [X] penalties()
- [X] getSession()

Party:
- [X] getPlayer()
- [X] getParty(partyId)
- [X] getChatToken(partyId)
- [X] getVoiceToken(partyId)
- [X] makeDefault(partyId, gamemode)
- [X] joinParty(partyId)
- [X] leaveParty(partyId)
- [X] inviteToPartyByName(partyId, playerName, tagName)
- [X] requestToJoin(partyId, puuid)
- [X] declineRequest(partyId, requestId)
- [X] setReady(partyId, ready)
- [X] changeQueue(partyId, gamemode)
- [X] roomAccessibility(partyId, status)
- [X] setPreferredGamePods(partyId, gamePods)
- [X] joinQueue(partyId)
- [X] leaveQueue(partyId)
- [X] makePartyIntoCustomGame(partyId)
- [X] setCustomGameSettings(partyId, settings)
- [X] startCustomGame(partyId)
- [X] refreshCompetitiveTier(partyId)
- [X] refreshPlayerIdentity(partyId)
- [X] refreshPings(partyId)
- [X] removePlayer(puuid)
- [X] leaveFromParty(partyId)

Pregame:
- [X] getPlayer()
- [X] getMatch(matchId)
- [X] matchLoadouts(matchId)
- [X] getChatToken(matchId)
- [X] getVoiceToken(matchId)
- [X] selectCharacter(matchId, characterId)
- [X] lockCharacter(matchId, characterId)
- [X] quitMatch(matchId)

Ingame:
- [X] getPlayer()
- [X] getMatch(matchId)
- [X] matchLoadouts(matchId)
- [X] getAllChatToken(matchId)
- [X] getTeamChatToken(matchId)
- [X] getVoiceToken(matchId)
- [X] quitMatch(matchId)

Store:
- [X] balance()
- [X] getStore()
- [X] itemEntitlements(itemTypeId)
- [X] offers() 
- [ ] order(orderId) - should be working just hasn't been tested

## TODO
- Implement a loadout builder
- Docs
- RiotClient endpoints
- Maybe also valorant-api.com wrapper
- Refactor code so that party/pregame/ingame ids are automatically fetched and inserted

## Legal

Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered trademarks of Riot Games, Inc.

This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by Riot Games, Inc or any of its affiliates or subsidiaries.

I, the project owner and creator, am not responsible for any legalities that may arise in the use of this project. Use at your own risk.