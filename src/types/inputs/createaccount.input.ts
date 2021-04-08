import { InputType, Field } from "type-graphql";
import { MinLength, IsEmail } from "class-validator";

@InputType("createAccount_input")
export class createAccountInput {
    @Field(() => String)
    @MinLength(3)
    gamerTag: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(8)
    password: string;
}
