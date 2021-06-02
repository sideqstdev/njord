import { Profile, User } from ".prisma/client"
import { client } from "../../client"
import { dev } from "../../globals"

export const getUserById = async(userId: string): Promise<User & {profile: Profile}> => {
    try{
        const user = await client.user.findUnique({
            where: {
                id: userId
            },
            include: {
                profile: true
            }
        })
        return user;
    }catch(err){
        throw new Error(`Error whilst finding user${dev ? `: ${err}` : null}`)
    }
}

export const getUserNoProfileById = async(userId: string): Promise<User> => {
    try{  
        const user = await client.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    }catch(err){
        throw new Error(`Error whilst finding user${dev ? `: ${err}` : null}`)
    }
}