import { Field, ID, ObjectType } from "type-graphql";
import { post } from "./post.type";
import { user } from "./user.type";

@ObjectType(`comment`)
export class comment {
  @Field(() => ID)
  id: string;

  @Field(() => Date, { nullable: true })
  create?: Date;

  @Field(() => Date, { nullable: true })
  updated?: Date;

  @Field(() => String)
  content: string;

  @Field(() => post, { nullable: true })
  post?: post;

  @Field(() => user, { nullable: true })
  user?: user;

  @Field(() => Number, { nullable: true })
  likes?: number;
}
