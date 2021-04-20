import { AuthChecker } from "type-graphql";
import { decodeAccessToken, regenerateAccessToken, sendAccessToken } from "../../services/auth.service";
import LoggingService from "../../services/logging.service";
import contextInterface from "../../types/interfaces/context.interface";
import { dev } from "../globals";
import { parseCookies } from "../util/cookies.util";

export const authChecker: AuthChecker<Partial<contextInterface>> = async({context}): Promise<boolean> => {
    if(!context){ // if no context provided falsy
        return false
    }

    let token: string = context.req.headers.authorization;

    // refresh token
    let cookies: any = parseCookies(context.req.headers.cookie);
    let refreshToken = cookies.sqstrf;
    if(!refreshToken){
        return false
    }
    else{
        const validRefreshToken = await decodeAccessToken(refreshToken, `refresh`);
        // if the user has a valid refresh token they will automatically refresh their access token on requests to the server
        if(validRefreshToken){
            context.refreshToken = refreshToken;
            const newAccessToken: string = regenerateAccessToken(validRefreshToken);
            sendAccessToken(context.res, newAccessToken)
        }
        // do nothing if invalid
    }

    if(!token){ // token wasn't provided
        return false
    }

    // no bearer
    else if(!token.startsWith(`Bearer `)){
        return false
    }

    else{
        token = token.slice(7, token.length);

        if(token){
            try{
                const validToken = await decodeAccessToken(token, `access`);
                context.user = validToken;
                context.accessToken = token;
                return true;
            }catch(err){
                LoggingService.error(`${dev ? err : `Authentication Error`}`)
                return false;
            }
            
        }

        

    }
}