import { Resolver, Query, Ctx } from "type-graphql";
import ContextInterface from "../../types/interfaces/context.interface";

@Resolver()
export class StatusResolver {
    @Query(() => String)
    async status(@Ctx() ctx: ContextInterface):Promise<String>{
        return `All systems operating normally`
    }
}