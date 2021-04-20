import { genSalt, hash, compare } from "bcryptjs"

import * as jwt from 'jsonwebtoken'
import { sign, verify } from "jsonwebtoken";
import { accessSecret, dev, refreshSecret } from "../lib/globals";
import { tokenTypes } from "../types/tokentypes.type";
import { authUserInterface } from "../types/interfaces/authuser.interface";
import { promisify } from "util";
import { Response } from 'express-serve-static-core'
import { user } from "../types/object-types/user.type";

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

export const createAccessToken = (user: user): string => {
    try{
        const token = sign(
            {
                id: user.id,
                gamerTag: user.gamerTag,
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
                gamerTag: userShard.gamerTag,
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

export const createRefreshToken = (user: user): string => {
    try{
        const refreshToken = sign(
            {
                id: user.id,
                gamerTag: user.gamerTag
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

export const decodeAccessToken = async(token: string, type?: tokenTypes): Promise<authUserInterface> => {
    const secret = type === `refresh` ? refreshSecret : accessSecret;

    try{
        return await verifyAsync(token, secret);
    }catch(err){
        throw new Error(`Error whilst decoding token: ${dev ? err : null}`)
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
        res.cookie(`sqstrc`, token, {
            httpOnly: true,
            domain: String(process.env.URL),
            secure: true,
            sameSite: `none`
        })
    }
}