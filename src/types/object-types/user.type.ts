import { Field, ObjectType, ID, Int } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { profile } from "./profile.type";
import { post } from "./post.type";

@ObjectType("user")
export class user {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => Date, { nullable: true })
  created?: Date;

  @Field(() => Date, { nullable: true })
  updated?: Date;

  @Field(() => Date, { nullable: true })
  lastLogin?: Date;

  @Field(() => Int, { nullable: true })
  version?: number;

  @Field({ nullable: true })
  @MinLength(3)
  name?: string;

  @Field({ nullable: true })
  verified: boolean;

  @Field()
  @MinLength(3)
  gamerTag: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => Boolean, { nullable: true })
  suspended?: boolean;

  @Field(() => profile, { nullable: true })
  profile?: profile | null;

  @Field(() => [post], { nullable: true })
  posts?: post[];
}
