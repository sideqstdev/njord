import { InputType, Field } from "type-graphql";
import { MinLength, IsEmail } from "class-validator";

@InputType("register_input")
export class registerInput {
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
