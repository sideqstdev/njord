import { Post } from ".prisma/client";
import { client } from "../../../lib/client";
import { deletePostInput } from "../../../types/inputs/deletePost.input";
import contextInterface from "../../../types/interfaces/context.interface";

export const deletePostMutation = async (
  input: deletePostInput,
  ctx: contextInterface
): Promise<boolean> => {
  try {
    const user = await client.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      include: {
        posts: true,
      },
    });

    for (let x = 0; x < user.posts.length; x++) {
      if (user.posts[x].userId === ctx.user.id) {
        const deletedPost = await client.post.delete({
          include: {
            user: true,
          },
          where: {
            id: input.id,
          },
        });
        if (deletedPost) {
          return true;
        }
        return false;
      }
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};
