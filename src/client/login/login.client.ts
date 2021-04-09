import { User } from "@prisma/client";
import { client } from "../../lib/client";
import { dev } from "../../lib/globals";

export const findUser = async(email: string): Promise<any> => {
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
        throw new Error(`Error whilst finding user: ${dev ? err : null}`)
    }
}

export const updateLastLogin = async(email: string): Promise<any> => {
    try{
        const user = await client.user.update({
            where: {
                email: email
            },
            data: {
                lastLogin: new Date()
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