import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { deletePostInput } from "../types/inputs/deletePost.input";
import { postInput } from "../types/inputs/post.input";
import contextInterface from "../types/interfaces/context.interface";
import { post } from "../types/object-types/post.type";
import { createPostMutation } from "./mutations/post/createpost.mutation";
import { deletePostMutation } from "./mutations/post/deletepost.mutation";

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

  @Authorized()
  @Mutation(() => Boolean)
  async deletePost(
    @Arg(`input`) input: deletePostInput,
    @Ctx() ctx: contextInterface
  ) {
    return deletePostMutation(input, ctx);
  }
}
