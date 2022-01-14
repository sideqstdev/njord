import { Field, ID, ObjectType } from "type-graphql";
import { comment } from "./comment.type";
import { user } from "./user.type";

@ObjectType(`post`)
export class post {
  @Field(() => ID)
  id: string;

  @Field(() => Date, { nullable: true })
  create?: Date;

  @Field(() => Date, { nullable: true })
  updated?: Date;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Boolean, { nullable: true })
  nsfw?: boolean;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [comment], { nullable: true })
  comments?: comment[];

  @Field(() => user, { nullable: true })
  user?: user;

  @Field(() => Number, { nullable: true })
  likes: number;

  @Field(() => [String], { nullable: true })
  likedByIds?: string[];
}
