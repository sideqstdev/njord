import { client } from "../../client"
import { randomBio } from "../../defaultbios"
import { dev } from "../../globals"
import { User, Profile } from "@prisma/client"

export const createUser = async(email: string, gamertag: string, password: string): Promise<User & {profile: Profile}> => {
    try{
        const user = await client.user.create({
            data: {
                gamerTag: gamertag,
                email: email,
                password: password,
                profile: {
                    create: {
                        bio: randomBio()
                    }
                }
            },
            include: {
                profile: true
            }
        })
        return user;
    }catch(err){
        throw new Error(`Error whilst creating new user: ${dev ? err : null}`);
    }
}