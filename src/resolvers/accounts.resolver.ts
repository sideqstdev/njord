import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { user } from "../types/types/user.type";
import { createAccountInput } from "../types/inputs/createaccount.input";
import contextInterface from "../types/interfaces/context.interface";
import { createAccountQuery } from "./mutations/createaccount.mutation";

@Resolver()
export class accountsResolver {
    @Mutation(() => user)
    async createAccount(@Arg(`input`) input: createAccountInput, @Ctx() ctx: contextInterface){
        return createAccountQuery(input, ctx)
    }
}