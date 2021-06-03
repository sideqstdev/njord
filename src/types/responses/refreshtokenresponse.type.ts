import { Field, ObjectType } from "type-graphql";

@ObjectType(`refresh_token_response`)
export class refresh_token_response {
    @Field(() => Boolean)
    ok: boolean;

    @Field(() => String)
    token: string;
}