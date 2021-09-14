'use strict';

import axios from 'axios';
import { URL, URLSearchParams } from 'url';
import { Region } from './endpoints';
import { AuthorizedUserEndpoint } from './endpoints/Authorized';
import { Ingame } from './endpoints/Authorized/Ingame';
import { Party } from './endpoints/Authorized/Party';
import { Pregame } from './endpoints/Authorized/Pregame';
import { Store } from './endpoints/Authorized/Store';
import { GlobalEndpoint } from './endpoints/Global';
import { PublicEndpoint } from './endpoints/Public';

export * from './endpoints';
export class ValorantClientAPI {
    #puuid: string;
    #region: Region;
    #expires_in: number;
    #access_token: string;
    #entitlements_token: string;
    #client_version: string;

    constructor() {
        this.#puuid = null;
        this.#region = null;
        this.#expires_in = null;
        this.#access_token = null;
        this.#entitlements_token = null;
        this.#client_version = null;
    }

    /**
     * - Authorize with Riot API using Riot Account username and password
     * @param username Riot Account username
     * @param password Riot Account password
     * @returns A promise and Access Token expiration in seconds as a parameter
     */
    async authorize(region: Region, username: string, password: string, client_version: string = 'release-03.05-shipping-6-603133') {
        this.#client_version = client_version;
        this.#region = region;

        let sessionIdCookie = await this.#getSessionIdCookie();
        await this.#requestAccessToken(sessionIdCookie, username, password);
        await this.#fetchPuuid(this.#access_token);

        return this.#requestEntitlementsToken(this.#access_token);
    }

    /**
     * - Sends a post request to auth.riotgames.com that establishes a session
     * @returns asid (Session Id) cookie which is required for authentication
     */
    async #getSessionIdCookie() {
        let response = await axios.post('https://auth.riotgames.com/api/v1/authorization', {
            'client_id': 'play-valorant-web-prod',
            'nonce': '1',
            'redirect_uri': 'https://playvalorant.com/opt_in',
            'response_type': 'token id_token',
        })
        // "asid" cookie is the one that we need to include when requesting an access token
        let cookie: string = response.headers['set-cookie'].find((cookie: string) => /^asid/.test(cookie))

        return cookie;
    }

    /**
     * - Request Access Token using Riot Account username and password
     * @param cookie Session Id cookie
     * @param username Riot Account username
     * @param password Riot Account password
     */
    async #requestAccessToken(cookie: string, username: string, password: string) {
        let response = await axios.put('https://auth.riotgames.com/api/v1/authorization', {
            'type': 'auth',
            'username': username,
            'password': password,
        }, {
            headers: { 'Cookie': cookie }
        })

        var url = new URL(response.data.response.parameters.uri);
        var parameters = new URLSearchParams(url.hash.substr(1));
        this.#expires_in = parseInt(parameters.get('expires_in'));
        this.#access_token = parameters.get('access_token');
    }
    
    /**
     * - Fetch puuid using the Access Token
     * @param access_token Access Token
     */
     async #fetchPuuid(access_token: string) {
        let response = await axios.get('https://auth.riotgames.com/userinfo', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })

        this.#puuid = response.data.sub;
    }

    /**
     * - Request Entitlement Token using the Access Token
     * @param access_token Access Token
     * @returns A promise and Access Token expiration in seconds as a parameter
     */
    async #requestEntitlementsToken(access_token: string) {
        let response = await axios.post('https://entitlements.auth.riotgames.com/api/token/v1', new Object(), {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })

        this.#entitlements_token = response.data.entitlements_token;
        return this.#expires_in
    }

    /**
     * - Get puuid of an authorized user.
     * @returns puuid
     */
    getPuuid = () => this.#puuid;

    /**
     * - Set puuid of an authorized user.
     * @param puuid puuid
     */
    setPuuid = (puuid: string) => { 
        this.#puuid = puuid;
        return this;
    };

    /**
     * - Get region of an authorized user.
     * @returns region
     */
    getRegion = () => this.#region;

     /**
      * - Set region of an authorized user.
      * @param region puuid
      */
    setRegion = (region: Region) => { 
        this.#region = region;
        return this;
    };
    
    /**
     * - Get current Access Token.
     * @returns Access Token
     */
    getAccessToken = () => this.#access_token;
    
    /**
     * - Set a new Access Token.
     * @param access_token Access Token
     */
    setAccessToken = (access_token: string) => {
        this.#access_token = access_token
        return this;
    };
    
    /**
     * - Get current Entitlements Token.
     * @returns Entitlements Token
     */
    getEntitlementsToken = () => this.#entitlements_token;
    
    /**
     * - Set a new Entitlements Token.
     * @param entitlements_token Entitlements Token
     */
    setEntitlementsToken = (entitlements_token: string) => {
        this.#entitlements_token = entitlements_token 
        return this;
    };
    
    /**
     * - Get current client version.
     * @returns Client version
     */
    getClientVersion = () => this.#client_version;
    
     /**
      * - Set a new client version.
      * @param client_version Client version
      */
    setClientVersion = (client_version: string) => {
        this.#client_version = client_version;
        return this;
    };

    Endpoints = {
        /**
         * - Data that is not user specific, such as server configs and game content data.
         */
        Global: () => new GlobalEndpoint(this),

        /**
         * - Data that can be fetched on anyone, not just the authorized user, but is user/match specific.
         */
        Public: () => new PublicEndpoint(this),
        
        /**
         * - Data that can only be gathered on the authorized user; using puuid-s of anyone but the authorized user
         * resolves in a 400 or a 403 error, depending on the endpoint.
         */
        Authorized: () => new AuthorizedUserEndpoint(this),

        /**
         * - Same rules as on Authrorized endpoint, but party specific.
         */
        Party: () => new Party(this),

        /**
         * - Same rules as on Authrorized endpoint, but pregame (agent select) specific.
         */
        Pregame: () => new Pregame(this),

        /**
         * - Same rules as on Authrorized endpoint, but ingame specific.
         */
        Ingame: () => new Ingame(this),
        
        /**
         * - Same rules as on Authrorized endpoint, but store specific.
         */
        Store: () => new Store(this)
    }
}