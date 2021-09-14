import { Endpoints, Region, ValorantClientAPI } from "../../..";
import { ValorantRequest } from "../../requests";
import { Agents } from "../../../content/Agents";

export class Pregame {
    #clientapi_instance: ValorantClientAPI
    #region: Region
    #puuid: string
    #defaultHeaders = {
        'Authorization': true,
        'X-Riot-Entitlements-JWT': true,
        'X-Riot-ClientVersion': false,
        'X-Riot-ClientPlatform': false
    }

    constructor(clientapi_instance: ValorantClientAPI) {
        this.#clientapi_instance = clientapi_instance;
        this.#region = this.#clientapi_instance.getRegion();
        this.#puuid = this.#clientapi_instance.getPuuid();
    }

    /**
     * - Match id of a game currently in agent select, amongst other things.
     */
    getPlayer = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/players/${this.#puuid}`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - Match info of a game currently in agent select.
     * @param matchId match id (get it from Pregame().getPlayer())
     */
    getMatch = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/matches/${matchId}`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();
    
    /**
     * - Player loadout of a game currently in agent select.
     * @param matchId match id
     */
    matchLoadouts = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/matches/${matchId}/loadouts`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - Chat token.
     * @param matchId match id
     */
    getChatToken = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/matches/${matchId}/chattoken`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - Voice chat token.
     * @param matchId match id
     */
    getVoiceToken = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/matches/${matchId}/voicetoken`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * DON'T USE THIS FOR INSTALOCKING
     * - Select a character while in agent select.
     * @param matchId match id
     * @param characterId agent id
     */
    selectCharacter = (matchId: string, characterId: string | Agents) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/matches/${matchId}/select/${characterId}`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * DON'T USE THIS FOR INSTALOCKING
     * - Lock in a character while in agent select.
     * @param matchId match id
     * @param characterId agent id
     */
    lockCharacter = (matchId: string, characterId: string | Agents) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/matches/${matchId}/lock/${characterId}`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - Leave from agent select.
     * @param matchId match id
     */
    quitMatch = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/pregame/v1/matches/${matchId}/quit`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();
}