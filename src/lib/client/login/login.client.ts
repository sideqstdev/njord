import { Profile, User } from ".prisma/client";
import { client } from "../../client";
import { dev } from "../../globals";

export const findUser = async(email: string): Promise<User & {profile: Profile}> => {
    try{
        const user = await client.user.findUnique({
            where: {
                email: email
            },
            include: {
                profile: true
            }
        });
        if(!user){
            throw new Error(`No account exist with this email address`);
        }else{
            return user;
        }
    }catch(err){
        throw err
    }
}

export const updateLastLogin = async(email: string): Promise<User & {profile: Profile}> => {
    try{
        const user = await client.user.update({
            where: {
                email: email
            },
            data: {
                lastLogin: new Date()
            },
            include: {
                profile: true,
            }
        })
        if(!user){
            throw new Error(`No account exists to update with this email address`);
        }else{
            return user
        }
    }catch(err){
        throw new Error(`Error whilst updating lastLogin: ${dev ? err : null}`)
    }
}