import { Endpoints, Region, ValorantClientAPI } from "../../../";
import { ValorantRequest } from "../../requests";

export class Ingame {
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
     * - Match id of an ongoing match amongst other things.
     */
    getPlayer = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/core-game/v1/players/${this.#puuid}`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - Match info of an ongoing match.
     * @param matchId match id (get it from Ingame().getPlayer())
     */
    getMatch = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/core-game/v1/matches/${matchId}`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();
    
    /**
     * - Player loadout of an ongoing match.
     * @param matchId match id
     */
    matchLoadouts = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/core-game/v1/matches/${matchId}/loadouts`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - All chat token.
     * @param matchId match id
     */
    getAllChatToken = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/core-game/v1/matches/${matchId}/allchatmuctoken`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();
        
    /**
     * - Team chat token.
     * @param matchId match id
     */
    getTeamChatToken = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/core-game/v1/matches/${matchId}/teamchatmuctoken`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - Voice chat token.
     * @param matchId match id
     */
    getVoiceToken = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/core-game/v1/matches/${matchId}/teamvoicetoken`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();

    /**
     * - Leave an ongoing match.
     * @param matchId match id
     */
    quitMatch = (matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/core-game/v1/players/${this.#puuid}/disassociate/${matchId}`, Endpoints.CoreGame(this.#region))
        .setMethod('POST')
        .setDefaultHeaders(this.#defaultHeaders)
        .send();
}