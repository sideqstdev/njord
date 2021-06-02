import { Field, ID, ObjectType } from "type-graphql";
import { user } from "../object-types/user.type";

@ObjectType("login_response")
export class login_response {
    @Field(() => String, {nullable: false})
    token: string;

    @Field(() => Boolean, {nullable: false})
    success: boolean;

    @Field(() => user, {nullable: true})
    user: user;
}