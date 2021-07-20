import { ObjectType, ID, Field, Int } from "type-graphql";
import { userStatus } from "../userstatus.type";
import { user } from "./user.type";

@ObjectType(`profile`)
export class profile {
  @Field(() => ID)
  id: string;

  @Field()
  bio?: string;

  @Field(() => String, { nullable: true })
  status?: userStatus;

  @Field(() => [String])
  tags?: string[];

  @Field(() => String, { nullable: true })
  lolName?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field(() => user, { nullable: true })
  user?: user; // ensure user is optional so you don't have infinite nesting

  @Field(() => Int)
  level?: number;

  @Field(() => Int)
  points?: number;

  @Field(() => Int)
  wins?: number;

  @Field(() => Int)
  entered?: number;

  @Field(() => Int)
  hosted?: number;
}
