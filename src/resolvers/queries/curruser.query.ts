import { dev } from "../../lib/globals";
import contextInterface from "../../types/interfaces/context.interface";

export const currUserQuery = async(ctx: contextInterface): Promise<user> => {
    try{
        console.log(ctx.req.headers)
    }catch(err){
        throw new Error(`Internal server error${dev ? `: ${err}` : null}`)
    }
}