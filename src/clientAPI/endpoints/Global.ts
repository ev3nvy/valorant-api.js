import { ValorantClientAPI } from '../../index';
import { Endpoints, Region } from "../endpoints"
import { ValorantRequest } from "../requests"

export class GlobalEndpoint {
    #clientapi_instance: ValorantClientAPI

    constructor(clientapi_instance: ValorantClientAPI) {
        this.#clientapi_instance = clientapi_instance;
    }

    /**
     * - Various info about the servers in the provided region
     */
     getRegionConfig = (region: Region) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/v1/config/${region}`, Endpoints.Shared(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': false,
            'X-Riot-Entitlements-JWT': false,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Ingame items and their upgrades
     */
    getItemUpgrades = (region: Region) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/contract-definitions/v3/item-upgrades`, Endpoints.PlayerData(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Competitive leaderboard seperated by region and by act
     */
    getLeaderbord = (region: Region, seasonId: string, startIndex = 0, size = 510, playerName?: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}${playerName ? `&query=${playerName}` : ''}`, Endpoints.PlayerData(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Names and ids of Characters, Maps, Chromas, Skins, Weapon Attachments, Equips,
     * Themes, GameModes, Sprays, Charms (buddies), Player Cards, Titles, Store items,
     * Seasons, Competitive Seasons, Events
     */
    getGameContent = (region: Region) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/content-service/v2/content`, Endpoints.Shared(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': false,
            'X-Riot-Entitlements-JWT': false,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': true
        })
        .send();

    /**
     * - Get custom game config
     */
    getCustomGameConfigs = (region: Region) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/parties/v1/parties/customgameconfigs`, Endpoints.CoreGame(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': false,
            'X-Riot-Entitlements-JWT': false,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - 
     */
    fetchQueueData = (region: Region) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/matchmaking/v1/queues/configs`, Endpoints.CoreGame(region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': false,
            'X-Riot-Entitlements-JWT': false,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
}