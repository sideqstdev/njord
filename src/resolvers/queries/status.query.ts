import { Resolver, Query, Ctx } from "type-graphql";
import ContextInterface from "../../types/interfaces/context.interface";

export const statusQuery = async(ctx: ContextInterface):Promise<String> => {
    return `All systems operating normally`
}