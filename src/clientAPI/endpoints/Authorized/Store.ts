import { Endpoints, Region, ValorantClientAPI } from "../../..";
import { ValorantRequest } from "../../requests";

export class Store {
    #clientapi_instance: ValorantClientAPI
    #region: Region
    #puuid: string

    constructor(clientapi_instance: ValorantClientAPI) {
        this.#clientapi_instance = clientapi_instance;
        this.#region = this.#clientapi_instance.getRegion();
        this.#puuid = this.#clientapi_instance.getPuuid();
    }

    /**
     * - Amount of Valorant points, Radiante points and Free agent currency
     */
    balance = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/store/v1/wallet/${this.#puuid}`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - All currently available items in the store.
     */
    getStore = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/store/v2/storefront/${this.#puuid}`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
        
    /**
     * - All items, owned by the player.
     * @param itemTypeId item type id (use Global().getGameContent())
     */
    itemEntitlements = (itemTypeId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/store/v1/entitlements/${this.#puuid}/${itemTypeId}`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Prices for all of the store items.
     */
    offers = () => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/store/v1/offers`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();

    /**
     * - Order info
     * @param orderId order id
     * @todo Actually test this, but I have to buy something again :Sadge:
     */
    order = (orderId: string) => new ValorantRequest(this.#clientapi_instance)
        .setUrl(`/store/v1/order/${orderId}`, Endpoints.PlayerData(this.#region))
        .setMethod('GET')
        .setDefaultHeaders({
            'Authorization': true,
            'X-Riot-Entitlements-JWT': true,
            'X-Riot-ClientVersion': false,
            'X-Riot-ClientPlatform': false
        })
        .send();
}