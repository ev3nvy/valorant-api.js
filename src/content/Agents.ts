export enum AgentContracts {
    Astra = '1d40b4b9-4d86-50b7-9f79-3d939e09c661',
    Breach = 'bfb8160e-eee0-46b1-a069-16f93adc7328',
    Brimstone = 'ace2bb52-de25-45b5-8e11-3dd2088f914d',
    Cypher = '2195e89f-20ad-4e37-b46c-cf46a6715dfd',
    Jett = 'c9d1c451-12fc-4601-a97c-8258765fb90d',
    KAYO = '9454d42a-471f-27b9-325c-319a355c34ee',
    Killjoy = '9443cbd4-da4d-4395-8152-26a5b269f339',
    Omen = 'eb35d061-4eed-4d22-81a3-1491ec892429',
    Phoenix = '62b5521c-93f6-4178-aadd-043ed25ed21a',
    Raze = '60f9f1f0-2bb7-47f9-85b7-b873a5a1123b',
    Reyna = '4c9b0fcf-57cd-4e84-ae5a-ce89e396242f',
    Sage = 'e13d0f6f-5727-43bc-af9e-56c10cdb7176',
    Skye = 'e7e7c5e1-4e76-22f8-f423-078b33758464',
    Sova = '3051fb18-9240-4bf3-a9f5-eb9ae954cd9d',
    Viper = 'f94fc320-a71f-47e3-b062-6798d14f17d6',
    Yoru = '358b6e88-4cbe-0cfb-c313-c290eba0c8bc'
}

export type AgentContract = Record<AgentContracts, string>;

export enum Agents {
    Astra = '41fb69c1-4189-7b37-f117-bcaf1e96f1bf',
    Breach = '5f8d3a7f-467b-97f3-062c-13acf203c006',
    Brimstone = '9f0d8ba9-4140-b941-57d3-a7ad57c6b417',
    Cypher = '117ed9e3-49f3-6512-3ccf-0cada7e3823b',
    Jett = 'add6443a-41bd-e414-f6ad-e58d267f4e95',
    KAYO = '601dbbe7-43ce-be57-2a40-4abd24953621',
    Killjoy = '1e58de9c-4950-5125-93e9-a0aee9f98746',
    Omen = '8e253930-4c05-31dd-1b6c-968525494517',
    Phoenix = 'eb93336a-449b-9c1b-0a54-a891f7921d69',
    Raze = 'f94c3b30-42be-e959-889c-5aa313dba261',
    Reyna = 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc',
    Sage = '569fdd95-4d10-43ab-ca70-79becc718b46',
    Skye = '6f2a04ca-43e0-be17-7f36-b3908627744d',
    Sova = '320b2a48-4d9b-a075-30f1-1f93a9b638fa',
    Viper = '707eab51-4836-f488-046a-cda6bf494859',
    Yoru = '7f94d92c-4234-0a36-9646-3a87eb8b5c89'
}

export type Agent = Record<Agents, string>;