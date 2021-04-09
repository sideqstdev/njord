import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { user } from "../types/types/user.type";
import { registerInput } from "../types/inputs/register.input";
import contextInterface from "../types/interfaces/context.interface";
import { registerMutation } from "./mutations/register.mutation";
import { loginInput } from "../types/inputs/login.input";
import { loginMutation } from "./mutations/login.mutation";

@Resolver()
export class accountsResolver {
    @Mutation(() => user)
    async register(@Arg(`input`) input: registerInput, @Ctx() ctx: contextInterface){
        return registerMutation(input, ctx);
    }
    
    @Mutation(() => user)
    async login(@Arg(`input`) input: loginInput, @Ctx() ctx: contextInterface){
        return loginMutation(input, ctx);
    }
}