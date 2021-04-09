import { InputType, Field } from "type-graphql";
import { MinLength, IsEmail } from "class-validator";

@InputType("login_input")
export class loginInput {
    @Field(() => String)
    @IsEmail()
    email: string;

    @Field()
    @MinLength(8)
    password: string;
}