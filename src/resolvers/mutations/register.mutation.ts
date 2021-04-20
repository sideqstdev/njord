import { registerInput } from "../../types/inputs/register.input";
import contextInterface from "../../types/interfaces/context.interface";
import { user } from "../../types/object-types/user.type";
import { encrypt } from "../../services/auth.service";
import LoggingService from "../../services/logging.service";
import { dev } from "../../lib/globals";
import { createUser } from "../../lib/client/register/register.client";

export const registerMutation = async(input: registerInput, ctx: contextInterface): Promise<user> => {
    try{
        // hash password first before doing anything else
        const hashPassword: string = await encrypt(input.password);

        // TODO email verification here
        
        const createdUser = await createUser(input.email, input.gamerTag, hashPassword);
        LoggingService.info(`Account created for ${createdUser.email} with id: ${createdUser.id}`);
        let user: user = {
            id: createdUser.id,
            created: createdUser.created,
            updated: createdUser.updated,
            lastLogin: createdUser.lastLogin,
            version: createdUser.version,
            name: createdUser.name,
            gamerTag: createdUser.gamerTag,
            email: createdUser.email,
            suspended: createdUser.suspended,
            profile: createdUser.profile,
        }
        return user
    }
    catch(err){
        // LoggingService.error(err)
        if(err.toString().includes(`email`)){
            throw new Error(`An account already exists with the given email`)
        }
        if(err.toString().includes(`gamerTag`)){
            throw new Error(`An account already exists with the given gamerTag`)
        }
        else{
            throw new Error(`Internal server error ${dev ? `: ${err}` : null}`)
        }
    }
    
}