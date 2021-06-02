export interface authUserInterface {
    id: string;
    role: `admin` | `user`;
}

export interface authTokenInterface {
    id: string;
    gamerTag: string;
    iat: number;
    exp: number;
}