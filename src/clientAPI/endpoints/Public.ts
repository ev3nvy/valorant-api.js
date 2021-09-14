import { ValorantClientAPI } from '../../index';
import { Endpoints, Region } from "../endpoints"
import { ValorantRequest } from "../requests"
import { Gamemode } from "../../content/gamemodes";

export class PublicEndpoint {
    #clientapi_instance: ValorantClientAPI

    constructor(clientapi_instance: ValorantClientAPI) {
        this.#clientapi_instance = clientapi_instance;
    }

    /**
     * - Get players MMR.
     */
    getPlayerMmr = (region: Region, puuid: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/mmr/v1/players/${puuid}`, Endpoints.PlayerData(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': true
        })
        .send();

    /**
     * - Get players MMR history
     */
    getPlayerMmrHistory = (region: Region, puuid: string, startIndex = 0, endIndex = 10) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${startIndex}&endIndex=${endIndex}`, Endpoints.PlayerData(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': true
        })
        .send();
        
    /**
     * - Players match history.
     */
    getMatchHistory = (region: Region, puuid: string, startIndex = 0, endIndex = 10, gamemode: string | Gamemode = undefined) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/match-history/v1/history/${puuid}?startIndex=${startIndex}&endIndex=${endIndex}${gamemode ? `&queue=${gamemode}` : ''}`, Endpoints.PlayerData(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Match details
     */
    getMatchDetails = (region: Region, matchId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/match-details/v1/matches/${matchId}`, Endpoints.PlayerData(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
}