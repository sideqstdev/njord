import { Resolver, Query, Ctx } from "type-graphql";
import contextInterface from "../types/interfaces/context.interface";
import { statusQuery } from "./queries/status.query";

@Resolver()
export class statusResolver {
    @Query(() => String)
    async status(@Ctx() ctx: contextInterface):Promise<String>{
        return statusQuery(ctx)
    }
}