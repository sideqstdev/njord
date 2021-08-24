import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { deletePostInput } from "../types/inputs/deletePost.input";
import { paginationInput } from "../types/inputs/pagination.input";
import { postInput } from "../types/inputs/post.input";
import contextInterface from "../types/interfaces/context.interface";
import { post } from "../types/object-types/post.type";
import { createPostMutation } from "./mutations/post/createpost.mutation";
import { deletePostMutation } from "./mutations/post/deletepost.mutation";
import { postQuery } from "./queries/post/posts.query";

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
  async deletePost(@Arg(`id`) id: string, @Ctx() ctx: contextInterface) {
    return deletePostMutation(id, ctx);
  }

  @Authorized()
  @Query(() => [post])
  async posts(
    @Arg(`page`) page: paginationInput,
    @Ctx() ctx: contextInterface
  ): Promise<post[]> {
    return postQuery(page, ctx);
  }
}
