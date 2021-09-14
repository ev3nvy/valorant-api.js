export class Regions {
    static AsiaPacific: Region = "ap"
    static Europe: Region = "eu"
    static Korea: Region = "kr"
    static NorthAmerica: Region = "na"
    static LatinAmerica: Region = "latam"
    static Brasil: Region = "br"
}

export type Region = "ap" | "eu" | "kr" | "na" | "latam" | "br";

export class Endpoints {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    static PlayerData = (region: Region) => (region === 'latam' || region === "br")
        ? new Endpoints(`https://pd.na.a.pvp.net`)
        : new Endpoints(`https://pd.${region}.a.pvp.net`);
    static CoreGame = (region: Region) => (region === 'latam' || region === "br")
        ? new Endpoints(`https://glz-${region}-1.na.a.pvp.net`)
        : new Endpoints(`https://glz-${region}-1.${region}.a.pvp.net`);
    static Shared = (region: Region) => 
        (region === 'latam' || region === "br")
        ? new Endpoints(`https://shared.na.a.pvp.net`)
        : new Endpoints(`https://shared.${region}.a.pvp.net`);
}