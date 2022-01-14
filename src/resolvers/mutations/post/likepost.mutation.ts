import { client } from "../../../lib/client";
import contextInterface from "../../../types/interfaces/context.interface";

export const likePostMutation = async (
  id: string,
  ctx: contextInterface
): Promise<boolean> => {
  try {
    const getPost = await client.post.findUnique({
      where: {
        id: id,
      },
      include: {
        likedBy: true,
      },
    });

    const hasLiked = Boolean(
      getPost.likedBy.find((user) => user.id === ctx.user.id)
    );
    console.log(hasLiked);
    // If user has already liked post unlike it if this is hit
    if (hasLiked) {
      const dislikedPost = await client.post.update({
        where: {
          id: id,
        },
        data: {
          likedBy: {
            disconnect: { id: ctx.user.id },
          },
        },
      });
      if (dislikedPost) return false;
    } else {
      const likedPost = await client.post.update({
        where: {
          id: id,
        },
        data: {
          likedBy: {
            connect: { id: ctx.user.id },
          },
        },
      });
      if (likedPost) return true;
    }
  } catch (err) {
    throw new Error(err);
  }
};
