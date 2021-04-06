import { PrismaClient } from "@prisma/client";
import { client } from "./client";
import ContextInterface from "../types/interfaces/context.interface";

export const createContext = (req: any, res: any): ContextInterface => {
    return{
        ...req,
        ...res,
        client,
    }
} 