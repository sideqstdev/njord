export interface authUserInterface {
    id: string;
    gamerTag: string;
}

export interface authTokenInterface {
    id: string;
    gamerTag: string;
    iat: number;
    exp: number;
}