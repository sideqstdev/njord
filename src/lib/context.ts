import { PrismaClient } from "@prisma/client";
import { client } from "./client";
import contextInterface from "../types/interfaces/context.interface";

export const createContext = (req: any, res: any): contextInterface => {
    return{
        ...req,
        ...res,
        prisma: client
    }
} 