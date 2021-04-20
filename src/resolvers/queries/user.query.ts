import { getUserWithProfile } from "../../lib/client/user/user.client";
import { dev } from "../../lib/globals";
import LoggingService from "../../services/logging.service";
import { userInput } from "../../types/inputs/user.input";
import contextInterface from "../../types/interfaces/context.interface";
import { user } from "../../types/object-types/user.type";

export const userQuery = async(input: userInput, ctx: contextInterface): Promise<user> => {
    try{
        if(input){
            const user = await getUserWithProfile(input.email, input.gamerTag, input.userId);
            return user;
        }else{
            LoggingService.error(`No user information provided`);
            throw new Error(`No user information provided`);
        }
    }
    catch(err){
        throw new Error(`Internal server error ${dev ? `: ${err}` : null}`);
    }
}