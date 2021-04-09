import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { user } from "../types/types/user.type";
import { registerInput } from "../types/inputs/createaccount.input";
import contextInterface from "../types/interfaces/context.interface";
import { registerMutation } from "./mutations/register.mutation";

@Resolver()
export class accountsResolver {
    @Mutation(() => user)
    async createAccount(@Arg(`input`) input: registerInput, @Ctx() ctx: contextInterface){
        return registerMutation(input, ctx)
    }
}