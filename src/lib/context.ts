
import {Context} from 'apollo-server-core'
import { client } from "./client";
import contextInterface from "../types/interfaces/context.interface";

export const createContext: Context = ({req, res}): contextInterface => {
    return{
        ...req,
        ...res,
        prisma: client,
        accessToken: req.headers.authorization,
        user: {},
    }
} 