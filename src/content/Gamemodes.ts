export enum Gamemodes {
    Unrated = 'unrated',
    Competitive = 'competitive',
    Deathmatch = 'deathmatch',
    SpikeRush = 'spikerush',
    Replication = 'onefa',
    Escalation = 'ggteam',
    NewMap = 'newmap',
    SnowballFight = 'snowball'
}

export type Gamemode = Record<Gamemodes, string>;