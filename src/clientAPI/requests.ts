import Axios from 'axios'
import { ValorantClientAPI } from '../index';
import { Endpoints } from './endpoints';

export class ValorantRequest {
    #riotapiInstance: ValorantClientAPI;
    url: string;
    method: Method;
    defaultHeaders: RequestHeaders;
    customHeaders: Object;
    body: Object;
    
    #client_platform = {
        "platformType": "PC",
        "platformOS": "Windows",
        "platformOSVersion": "10.0.19043.1.256.64bit",
        "platformChipset": "Unknown"
    };
    #templateHeaders: TemplateHeaders;

    constructor(riotapiInstance: ValorantClientAPI) {
        this.#riotapiInstance = riotapiInstance
        this.#templateHeaders = {
            'Authorization': `Bearer ${this.#riotapiInstance.getAccessToken()}`,
            'X-Riot-Entitlements-JWT': this.#riotapiInstance.getEntitlementsToken(),
            'X-Riot-ClientVersion': this.#riotapiInstance.getClientVersion(),
            'X-Riot-ClientPlatform': Buffer.from(JSON.stringify(this.#client_platform)).toString('base64'),
        }
    }

    setUrl(url: string, domain_name?: Endpoints) {
        this.url = domain_name ? domain_name.endpoint + url : url;
        return this
    }

    setMethod(method: Method) {
        this.method = method
        return this
    }

    setDefaultHeaders(headers?: RequestHeaders) {
        this.defaultHeaders = headers
        return this
    }

    setCustomHeaders(headers?: Object) {
        this.customHeaders = headers
        return this
    }

    #makeHeaders() {
        let headers = {};
        for(let header in this.defaultHeaders)
            if(this.defaultHeaders[header])
                headers[header] = this.#templateHeaders[header];

        return {
            ...headers,
            ...this.customHeaders
        }
    }

    setBody(body?: Object) {
        this.body = body
        return this
    }

    send() {
        return Axios({
            url: this.url,
            method: this.method,
            headers: this.#makeHeaders(),
            data: this.body
        }).then(response => response.data, err => { throw err.response.data })
    }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestHeaders {
    'Authorization': boolean,
    'X-Riot-Entitlements-JWT': boolean,
    'X-Riot-ClientVersion': boolean,
    'X-Riot-ClientPlatform': boolean,
}

interface TemplateHeaders {
    'Authorization': string,
    'X-Riot-Entitlements-JWT': string,
    'X-Riot-ClientVersion': string,
    'X-Riot-ClientPlatform': string,
}