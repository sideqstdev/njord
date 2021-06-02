import { Profile, User } from ".prisma/client"
import { client } from "../../client"
import { dev } from "../../globals"

export const getUserById = async(userId: string): Promise<User & {profile: Profile}> => {
    try{
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
    }catch(err){
        throw new Error(`Error whilst finding user${dev ? `: ${err}` : null}`)
    }
}

export const getUserNoProfileById = async(userId: string): Promise<User> => {
    try{  
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
    }catch(err){
        throw new Error(`Error whilst finding user${dev ? `: ${err}` : null}`)
    }
}