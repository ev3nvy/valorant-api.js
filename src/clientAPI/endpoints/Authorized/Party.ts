import { Endpoints, Region, ValorantClientAPI } from "../../valorant";
import { Gamemode } from "../../../content/Gamemodes";
import { ValorantRequest } from "../../requests";

export class Party {
    #clientapi_instance: ValorantClientAPI
    #region: Region
    #puuid: string
    // TODO - start fetching party id with the library - prerequisite: error handling
    // #currentParty = () => this.getPlayer().then(data => data.CurrentPartyID)

    constructor(clientapi_instance: ValorantClientAPI) {
        this.#clientapi_instance = clientapi_instance;
        this.#region = this.#clientapi_instance.getRegion();
        this.#puuid = this.#clientapi_instance.getPuuid();
    }

    /**
     * - Party ID, invites and party requests.
     */
    getPlayer = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/players/${this.#puuid}`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Party info.
     * @param partyId party id (get it from Party().getPlayer())
     */
    getParty = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Chat token.
     * @param partyId party id
     */
    getChatToken = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/muctoken`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Voice chat token.
     * @param partyId party id
     */
    getVoiceToken = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/voicetoken`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Change the queue type (disabled gamemodes and custom game also work with this endpoint).
     * @param partyId party id
     * @param gamemode gamemode
     */
    makeDefault = (partyId: string, gamemode: string | Gamemode) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/makedefault?queueID=${gamemode}`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Join a party using party id.
     * @param partyId party id
     */
    joinParty = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/players/${this.#puuid}/joinparty/${partyId}`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Leave from a party using party id.
     * @param partyId party id
     */
    leaveParty = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/players/${this.#puuid}/leaveparty/${partyId}`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Invite user to a party using their display name and tagline.
     * @param partyId party id
     * @param playerName display name
     * @param tagName tagline
     */
    inviteToPartyByName = (partyId: string, playerName: string, tagName: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/invites/name/${playerName}/tag/${tagName}`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Request to join a party.
     * @param partyId party id
     * @param puuid puuid of target user
     */
    requestToJoin = (partyId: string, puuid: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/request`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .setBody({
            "Subjects": [puuid]
        })
        .send();
    
    /**
     * - Decline a join request.
     * @param partyId party id
     * @param requestId request id
     */
    declineRequest = (partyId: string, requestId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/request/${requestId}/decline`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .setBody({})
        .send();

    /**
     * - Change readiness status.
     * @param partyId party id
     * @param ready either true or false
     */
    setReady = (partyId: string, ready: boolean) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/members/${this.#puuid}/setReady`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .setBody({ready})
        .send();
    
    /**
     * - Change the queue type (disabled gamemodes and custom game do not work).
     * @param partyId party id
     * @param gamemode gamemode
     */
    changeQueue = (partyId: string, gamemode: string | Gamemode) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/queue`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .setBody({queueID: gamemode})
        .send();
    
    /**
     * - Changes the accessibility of a party room.
     * @param partyId party id
     * @param status room status
     */
    roomAccessibility = (partyId: string, status: "OPEN" | "CLOSED") => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/accessibility`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .setBody({accessibility: status})
        .send();
    
    /**
     * - Set preferred game servers.
     * @param partyId party id
     * @param gamePods gamepods (get them from Global().getCustomGameConfigs())
     */
    setPreferredGamePods = (partyId: string, gamePods: string[]) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/preferredgamepods`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .setBody({GamePodIDS: gamePods})
        .send();
    
    /**
     * - Start the matchmaking queue.
     * @param partyId party id
     */
    joinQueue = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/matchmaking/join`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Leave the matchmaking queue.
     * @param partyId party id
     */
    leaveQueue = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/matchmaking/leave`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Change queue type to custom game.
     * @param partyId party id
     */
    makePartyIntoCustomGame = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/makecustomgame`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Set custom game settings.
     * @param partyId party id
     * @param settings object of game settings
     */
    setCustomGameSettings = (partyId: string, settings: CustomGameSettings) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/customgamesettings`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .setBody(settings)
        .send();
    
    /**
     * - Start the custom game.
     * @param partyId party id
     */
    startCustomGame = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/startcustomgame`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Refresh the competitive tier of a user.
     * @param partyId party id
     */
    refreshCompetitiveTier = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/members/${this.#puuid}/refreshCompetitiveTier`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Refresh the players identity.
     * @param partyId party id
     */
    refreshPlayerIdentity = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/members/${this.#puuid}/refreshPlayerIdentity`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Refresh ping of a user.
     * @param partyId party id
     */
    refreshPings = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/members`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': false,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Removes a player from the current party.
     */
    removePlayer = (puuid: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/players/${puuid}`, Endpoints.CoreGame(this.#region))
        .setMethod('DELETE')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Leave from the current party.
     * @param partyId party id
     */
    leaveFromParty = (partyId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/${partyId}/members/${this.#puuid}`, Endpoints.CoreGame(this.#region))
        .setMethod('DELETE')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
}

export interface CustomGameSettings {
    Map: string,
	Mode: string,
	UseBots: boolean,
	GamePod: string,
	GameRules: {
		AllowGameModifiers: string,
		PlayOutAllRounds: string,
		SkipMatchHistory: string,
		TournamentMode: string,
		IsOvertimeWinByTwo: string
	}
}