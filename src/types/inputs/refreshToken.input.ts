import { Field, InputType } from "type-graphql";

@InputType(`refresh_token_input`)
export class refreshTokenInput {
    @Field(() => String)
    refreshToken: string;
}