import { Field, ObjectType } from "type-graphql";

@ObjectType(`refresh_token_response`)
export class refresh_token_response {
    @Field(() => Boolean)
    success: boolean;

    @Field(() => String)
    token: string;
}