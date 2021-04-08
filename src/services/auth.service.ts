import { genSalt, hash, compare } from "bcryptjs"

export const encrypt = async(value: string) : Promise<string> => {
    const salt: string = await genSalt(10);

    // hash value
    const hashed: string = await hash(value, salt);
    return hashed;
}

export const decrypt = async(value: string, hash: string) : Promise<boolean> => {
    const success: boolean = await compare(value, hash);
    return success
}