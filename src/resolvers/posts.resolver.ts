import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { postInput } from "../types/inputs/post.input";
import contextInterface from "../types/interfaces/context.interface";
import { post } from "../types/object-types/post.type";
import { createPostMutation } from "./mutations/createpost.mutation";

@Resolver()
export class postsResolver {
  @Authorized()
  @Mutation(() => post)
  async createPost(
    @Arg(`input`) input: postInput,
    @Ctx() ctx: contextInterface
  ) {
    return createPostMutation(input, ctx);
  }
}
