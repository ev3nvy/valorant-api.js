import { Endpoints, Region, ValorantClientAPI } from "../valorant";
import { AgentContract } from "../../content/Agents";
import { ValorantRequest } from "../requests";

export class AuthorizedUserEndpoint {
    #clientapi_instance: ValorantClientAPI
    #region: Region
    #puuid: string

    constructor(clientapi_instance: ValorantClientAPI) {
        this.#clientapi_instance = clientapi_instance;
        this.#region = this.#clientapi_instance.getRegion();
        this.#puuid = this.#clientapi_instance.getPuuid();
    }

    /**
     * - Get players account xp
     */
    accountXp = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/account-xp/v1/players/${this.#puuid}`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Get progress of all contracts and all of the active missions
     */
    playerContracts = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/contracts/v1/contracts/${this.#puuid}`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Activate agent contract
     * @param contractId contracts id 
     */
    activateContract = (contractId: string | AgentContract) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/contracts/v1/contracts/${this.#puuid}/special/${contractId}`, Endpoints.PlayerData(this.#region))
        .setMethod('POST')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': true,
            'X-Riot-ClientPlatform': false
        })
        .send();
    
    /**
     * - Get players weapon loadout
     */
    loadout = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/personalization/v2/players/${this.#puuid}/playerloadout`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Used for changing the players loadout.
     * @param body use data from Authorized().loadout()
     * @todo typescript interface for typechecking and loadout builder for intellisense
     */
    changeLoadout = (body: Object) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/personalization/v2/players/${this.#puuid}/playerloadout`, Endpoints.PlayerData(this.#region))
        .setMethod('PUT')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .setBody(body)
        .send();
    
    /**
     * - Get players penalties (for example: dodge penalties)
     */
    penalties = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/restrictions/v2/penalties`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Get information about the current session.
     */
    getSession = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/session/v1/sessions/${this.#puuid}`, Endpoints.CoreGame(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
}