import { Profile, User } from ".prisma/client"
import { client } from "../../client"
import { dev } from "../../globals"

export const getUserWithProfile = async(email?: string, gamerTag?: string, userId?: string): Promise<User & {profile: Profile}> => {
    try{
        if(email){
            const user = await client.user.findUnique({
                where: {
                    email: email,
                },
                include: {
                    profile: true
                }
            })
            return user;
        }
        else if(gamerTag){
            const user = await client.user.findUnique({
                where: {
                    gamerTag: gamerTag,
                },
                include: {
                    profile: true
                }
            })
            return user;
        }
        else{
            if(userId){
                const user = await client.user.findUnique({
                    where: {
                        id: userId
                    },
                    include: {
                        profile: true
                    }
                })
                return user;
            }else{
                throw new Error(`A userId wasn't provided`)
            }
        }
    }catch(err){
        throw new Error(`Error whilst finding user${dev ? `: ${err}` : null}`)
    }
}

export const getUserWithoutProfile = async(email?: string, gamerTag?: string, userId?: string): Promise<User> => {
    try{
        if(email){
            const user = await client.user.findUnique({
                where: {
                    email: email
                }
            })
            return user;
        }
        else if(gamerTag){
            const user = await client.user.findUnique({
                where: {
                    gamerTag: gamerTag
                }
            })
            return user;
        }else{
            if(userId){
                const user = await client.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                return user
            }else{
                throw new Error(`A userId wasn't provided`)
            }
        }
    }catch(err){
        throw new Error(`Error whilst finding user${dev ? `: ${err}` : null}`)
    }
}