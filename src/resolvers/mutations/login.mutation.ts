import { loginInput } from "../../types/inputs/login.input";
import contextInterface from "../../types/interfaces/context.interface";
import { user } from "../../types/object-types/user.type";
import LoggingService from "../../services/logging.service";
import { decrypt, createRefreshToken, createAccessToken, sendRefreshToken, sendAccessToken } from "../../services/auth.service";
import { User } from "@prisma/client";
import { dev, refreshSecret } from "../../lib/globals";
import { findUser, updateLastLogin } from "../../lib/client/login/login.client";

export const loginMutation = async(input: loginInput, ctx: contextInterface): Promise<user> => {
    try{
        if(input){
            // throws an error if it can't find a user
            const user = await findUser(input.email);

            const validLogin = await decrypt(input.password, user.password);
            if(!validLogin){
                throw new Error(`Incorrect password`)
            }else{
                const userUpdated = await updateLastLogin(input.email);

                let userToReturn: user = {
                    id: userUpdated.id,
                    created: userUpdated.created,
                    updated: userUpdated.updated,
                    lastLogin: userUpdated.lastLogin,
                    version: userUpdated.version,
                    name: userUpdated.name,
                    gamerTag: userUpdated.gamerTag,
                    email: userUpdated.email,
                    suspended: userUpdated.suspended,
                    profile: userUpdated.profile,
                };

                // create and send jwt's
                const refreshToken: string = createRefreshToken(userToReturn);
                const accessToken: string = createAccessToken(userToReturn);

                sendRefreshToken(ctx.res, refreshToken);
                sendAccessToken(ctx.res, accessToken);

                return userToReturn;            
            }
        }else{
            LoggingService.error(`No login information provided`);
            throw new Error(`No account information provided`);
        }
    }catch(err){
        throw new Error(`Internal server error ${dev ? `: ${err}` : null}`)
    }
}