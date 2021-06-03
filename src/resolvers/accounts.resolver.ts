import { Resolver, Mutation, Arg, Ctx, Query, Authorized } from "type-graphql";
import { user } from "../types/object-types/user.type";
import { registerInput } from "../types/inputs/register.input";
import contextInterface from "../types/interfaces/context.interface";
import { registerMutation } from "./mutations/register.mutation";
import { loginInput } from "../types/inputs/login.input";
import { loginMutation } from "./mutations/login.mutation";
import { userInput } from "../types/inputs/user.input";
import { userQuery } from "./queries/user.query";
import { currUserQuery } from "./queries/curruser.query";
import { logoutMutation } from "./mutations/logout.mutation";
import { login_response } from "../types/responses/loginresponse.type";
import { refreshTokenMutation } from "./mutations/refreshtoken.mutation";
import { refresh_token_response } from "../types/responses/refreshtokenresponse.type";

@Resolver()
export class accountsResolver {
    @Mutation(() => user)
    async register(@Arg(`input`) input: registerInput, @Ctx() ctx: contextInterface){
        return registerMutation(input, ctx);
    }
    
    @Mutation(() => login_response)
    async login(@Arg(`input`) input: loginInput, @Ctx() ctx: contextInterface){
        return loginMutation(input, ctx);
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: contextInterface){
        return logoutMutation(ctx);
    }

    @Mutation(() => refresh_token_response)
    async refreshToken(@Ctx() ctx: contextInterface){
        return refreshTokenMutation(ctx);
    }

    @Authorized()
    @Query(() => user)
    async user(@Arg(`input`) input: userInput, @Ctx() ctx: contextInterface){
        return userQuery(input, ctx);
    }

    @Authorized()
    @Query(() => user)
    async currUser(@Ctx() ctx: contextInterface){
        return currUserQuery(ctx);
    }
}