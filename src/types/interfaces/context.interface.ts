import { PrismaClient } from "@prisma/client";
import { authUserInterface } from "./authuser.interface";

interface contextInterface {
    prisma: PrismaClient;
    res: any; // response
    req: any; // request with auth header
    accessToken?: string;
    refreshToken?: string;
    user?: authUserInterface;
}

export default contextInterface