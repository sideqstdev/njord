import { Field, InputType } from "type-graphql";

@InputType(`post_delete_input`)
export class deletePostInput {
  @Field(() => String)
  id: string;
}
