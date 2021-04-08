import { PrismaClient } from "@prisma/client";

interface contextInterface {
    prisma: PrismaClient;
    res: any // response
    req: any // request with auth header
}

export default contextInterface