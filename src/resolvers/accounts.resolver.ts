import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { user } from "../types/object-types/user.type";
import { registerInput } from "../types/inputs/register.input";
import contextInterface from "../types/interfaces/context.interface";
import { registerMutation } from "./mutations/register.mutation";
import { loginInput } from "../types/inputs/login.input";
import { loginMutation } from "./mutations/login.mutation";
import { userInput } from "../types/inputs/user.input";
import { userQuery } from "./queries/user.query";

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

    @Query(() => user)
    async user(@Arg(`input`) input: userInput, @Ctx() ctx: contextInterface){
        return userQuery(input, ctx);
    }
}