import { MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType(`post_input`)
export class postInput {
  @Field(() => String)
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  imageUrl: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  nsfw: boolean;
}
