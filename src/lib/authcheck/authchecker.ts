import { AuthChecker } from "type-graphql";
import { decodeToken, decodeTokenExp, nearExpiration, regenerateAccessToken, regenerateRefreshToken, sendAccessToken, sendRefreshToken } from "../../services/auth.service";
import LoggingService from "../../services/logging.service";
import contextInterface from "../../types/interfaces/context.interface";
import { dev } from "../globals";
import { parseCookies } from "../util/cookies.util";

export const authChecker: AuthChecker<Partial<contextInterface>> = async({context}): Promise<boolean> => {
    if(!context){ // if no context provided falsy
        return false;
    }

    // tokens come from cookies
    let cookies: any = parseCookies(context.req.headers.cookie);
    let refreshToken = cookies.sqstrf;
    let accessToken = cookies.sqstac;

    // if no refresh token then falsy
    if(!refreshToken){
        LoggingService.error(`Refresh Token wasn't provided`);
        return false;
    }
    const validRefreshToken = await decodeToken(refreshToken, `refresh`);
    if(!validRefreshToken){
        return false;
    }

    // if no access token then falsy
    if(!accessToken){
        LoggingService.error(`Access Token wasn't provided`);
        return false;
    }
    
    const validAccessToken = await decodeToken(accessToken, `access`);
    if(!validAccessToken){
        LoggingService.error(`Invalid Access Token`);
        return false;
    }

    // set context & regenerate tokens
    context.accessToken = accessToken;
    context.refreshToken = refreshToken;
    context.user = validAccessToken;

    // rehydrate tokens if about to expire
    const accessTokenExp = decodeTokenExp(accessToken, "access");
    const refreshTokenExp = decodeTokenExp(refreshToken, "refresh");
    if(nearExpiration(await accessTokenExp, "access")){
        LoggingService.info(`Access token nearing exp, rehydrated`);
        const newAccessToken: string = regenerateAccessToken(validRefreshToken);
        sendAccessToken(context.res, newAccessToken);
    }
    if(nearExpiration(await refreshTokenExp, "refresh")){
        LoggingService.info(`Refresh token nearing exp, rehydrated`);
        const newRefreshToken: string = regenerateRefreshToken(validRefreshToken);
        sendRefreshToken(context.res, newRefreshToken);
    }
    
    return true;
}