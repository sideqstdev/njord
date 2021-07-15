import { Field, ObjectType, ID, Int } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { profile } from "./profile.type";

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
}
