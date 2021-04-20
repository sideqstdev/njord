import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType("user_input")
export class userInput {
    @Field(() => String, {nullable: true})
    @IsEmail()
    email?: string;

    @Field(() => String, {nullable: true})
    @MinLength(3)
    gamerTag?: string;

    @Field(() => String, {nullable: true})
    userId: string;
}