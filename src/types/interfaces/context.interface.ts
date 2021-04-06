import { PrismaClient } from "@prisma/client";

interface ContextInterface {
    prisma: PrismaClient;
    res: any // response
    req: any // request with auth header
}

export default ContextInterface