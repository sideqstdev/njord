import { registerInput } from "../../types/inputs/register.input";
import contextInterface from "../../types/interfaces/context.interface";
import { user } from "../../types/types/user.type";
import { encrypt } from "../../services/auth.service";
import { client } from "../../lib/client";
import { User } from "@prisma/client";
import LoggingService from "../../services/logging.service";
import { randomBio } from "../../lib/defaultbios";
import { dev } from "../../lib/globals";

export const registerMutation = async(input: registerInput, ctx: contextInterface): Promise<user> => {
    try{
        if(input){
            // hash password first before doing anything else
            const hashPassword: string = await encrypt(input.password);
            
            const userCreated: User = await ctx.prisma.user.create({
                data: {
                    gamerTag: input.gamerTag,
                    email: input.email,
                    password: hashPassword,
                    profile: {
                        create: {
                            bio: randomBio()
                        }
                    }
                }
            })
            const expandedUser = await ctx.prisma.user.findUnique({
                where: {
                    id: userCreated.id
                },
                include: {
                    profile: true
                }
            })
            LoggingService.info(`Account created for ${expandedUser.email}`)
            let user: user = {
                id: expandedUser.id,
                created: expandedUser.created,
                updated: expandedUser.updated,
                lastLogin: expandedUser.lastLogin,
                version: expandedUser.version,
                name: expandedUser.name,
                gamerTag: expandedUser.gamerTag,
                email: expandedUser.email,
                suspended: expandedUser.suspended,
                profile: expandedUser.profile,
            }
    
            // TODO email verification here

            return user
            
        }
        else{
            LoggingService.error(`No account information provided`)
            throw new Error(`No account information provided`)
        }
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