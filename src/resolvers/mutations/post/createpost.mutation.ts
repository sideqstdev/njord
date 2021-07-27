import { client } from "../../../lib/client";
import { postInput } from "../../../types/inputs/post.input";
import contextInterface from "../../../types/interfaces/context.interface";
import { post } from "../../../types/object-types/post.type";

export const createPostMutation = async (
  input: postInput,
  ctx: contextInterface
): Promise<post> => {
  try {
    const createdPost = await client.post.create({
      data: {
        title: input.title,
        content: input.content,
        imageUrl: input.imageUrl,
        nsfw: input.nsfw,
        user: {
          connect: { id: ctx.user.id },
        },
      },
      include: {
        likedBy: true,
        user: true,
      },
    });
    let post: post = {
      ...createdPost,
      likes: createdPost.likedBy.length,
    };

    return post;
  } catch (err) {
    throw new Error(err);
  }
};
