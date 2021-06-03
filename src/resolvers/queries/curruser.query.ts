import { getUserNoProfileById } from "../../lib/client/user/user.client";
import { dev } from "../../lib/globals";
import contextInterface from "../../types/interfaces/context.interface";
import { user } from "../../types/object-types/user.type";

export const currUserQuery = async(ctx: contextInterface): Promise<user> => {
    try{
        const user = await getUserNoProfileById(ctx.user.id)
        return user;
    }catch(err){
        throw new Error(`Internal server error${dev ? `: ${err}` : null}`)
    }
}