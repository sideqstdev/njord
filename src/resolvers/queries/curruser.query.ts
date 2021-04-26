import { getUserWithProfile } from "../../lib/client/user/user.client";
import { dev } from "../../lib/globals";
import { decodeAccessToken } from "../../services/auth.service";
import contextInterface from "../../types/interfaces/context.interface";
import { user } from "../../types/object-types/user.type";

export const currUserQuery = async(ctx: contextInterface): Promise<user> => {
    try{
        const decodedToken = await decodeAccessToken(ctx.accessToken, "access");
        const user = await getUserWithProfile(null, decodedToken.gamerTag, decodedToken.id)
        return user;
    }catch(err){
        throw new Error(`Internal server error${dev ? `: ${err}` : null}`)
    }
}