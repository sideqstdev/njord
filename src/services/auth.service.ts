import { genSalt, hash, compare } from "bcryptjs"

import * as jwt from 'jsonwebtoken'
import { sign, verify } from "jsonwebtoken";
import { accessSecret, dev, refreshSecret } from "../lib/globals";
import { tokenTypes } from "../types/tokentypes.type";
import { authTokenInterface, authUserInterface } from "../types/interfaces/authuser.interface";
import { promisify } from "util";
import { Response, Request } from 'express-serve-static-core'
import { user } from "../types/object-types/user.type";
import { parseCookies } from "../lib/util/cookies.util";

const verifyAsync = promisify(jwt.verify).bind(jwt);

export const encrypt = async(value: string) : Promise<string> => {
    const salt: string = await genSalt(10);

    // hash value
    const hashed: string = await hash(value, salt);
    return hashed;
}

export const decrypt = async(value: string, hash: string) : Promise<boolean> => {
    const success: boolean = await compare(value, hash);
    return success
}

export const createAccessToken = (id: string): string => {
    try{
        const token = sign(
            {
                id: id,
                role: `user`,
            },
            accessSecret,
            {
                expiresIn: `15m`
            }
        );
        return token;
    }catch(err){
        throw new Error(`Error whilst creating token: ${dev ? err : null}`)
    }
}

export const regenerateAccessToken = (userShard: authUserInterface) => {
    try{
        const token = sign(
            {
                id: userShard.id,
                role: userShard.role,
            },
            accessSecret,
            {
                expiresIn: `15m`
            }
        );
        return token;
    }catch(err){
        throw new Error(`Error whilst regenerating a token: ${dev ? err : null}`);
    }
}

export const regenerateRefreshToken = (userShard: authUserInterface) => {
    try{
        const refreshToken = sign(
            {
                id: userShard.id,
                role: userShard.role,
            },
            refreshSecret,
            {
                expiresIn: `14d`
            }
        );
        return refreshToken;
    }catch(err){
        throw new Error(`Error whilst regenerating a refresh token: ${dev ? err : null}`);
    }
}

export const createRefreshToken = (id: string): string => {
    try{
        const refreshToken = sign(
            {
                id: id,
                role: `user`,
            },
            refreshSecret,
            {
                expiresIn: `14d`
            }
        );
        return refreshToken;
    }catch(err){
        throw new Error(`Error whilst creating refresh token: ${dev ? err : null}`)
    }
}

export const decodeToken = async(token: string, type?: tokenTypes): Promise<authUserInterface> => {
    const secret = type === `refresh` ? refreshSecret : accessSecret;

    try{
        return await verifyAsync(token, secret);
    }catch(err){
        throw new Error(`Error whilst decoding token: ${dev ? err : null}`)
    }
}

export const decodeTokenExp = async(token: string, type?: tokenTypes): Promise<Date> => {
    const secret = type === `refresh` ? refreshSecret : accessSecret;
    try{
        const decodedPayload: authTokenInterface = await verifyAsync(token, secret)
        const expDate = new Date(decodedPayload.exp * 1000);
        return expDate;
    }catch(err){
        throw new Error(`Error whilst decoding token ex: ${dev ? err : null}`)
    }
}

export const nearExpiration = (expiration: Date, type?: tokenTypes): boolean => {
    const currDate = Date.now()
    switch(type){
        case `access`:
            // less than 2 minutes left
            if(currDate - expiration.getTime() <= 2000){
                return true;
            }
            return false;
        case `refresh`:
            // less than a day
            if(currDate - expiration.getTime() <= 86400000){
                return true
            }
            return false;
        default:
            return false
    }
    
}

export const sendAccessToken = (res: Response, token: string): void => {
    if(dev){
        res.cookie(`sqstac`, token, {
            httpOnly: true,
            domain: `localhost`
        })
    }else{
        res.cookie(`sqstac`, token, {
            httpOnly: true,
            domain: String(process.env.URL),
            secure: true,
            sameSite: `none`
        })
    }
}

export const sendRefreshToken = (res: Response, token: string): void => {
    if(dev){
        res.cookie(`sqstrf`, token, {
            httpOnly: true,
            domain: `localhost`
        })
    }else{
        res.cookie(`sqstrf`, token, {
            httpOnly: true,
            domain: String(process.env.URL),
            secure: true,
            sameSite: `none`
        })
    }
}

export const resetTokens = (res: Response): void => {
    if(dev){
        //reset access token
        res.cookie(`sqstac`, ``, {
            httpOnly: true,
            domain: `localhost`,
        })
        //reset refresh token
        res.cookie(`sqstrf`, ``, {
            httpOnly: true,
            domain: `localhost`,
        })
    }else{
        res.cookie(`sqstac`, ``, {
            httpOnly: true,
            sameSite: `none`,
            secure: true,
            domain: String(process.env.URL),
        })
        res.cookie(`sqstrf`, ``, {
            httpOnly: true,
            sameSite: `none`,
            secure: true,
            domain: String(process.env.URL),
        })
    }
}

export const hasTokens = (req: Request): boolean => {
    const cookies: any = parseCookies(req.headers.cookie);
    let refreshToken = cookies.sqstrf;
    return (refreshToken ? true : false);
}