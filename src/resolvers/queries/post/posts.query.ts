import { client } from "../../../lib/client";
import { paginationInput } from "../../../types/inputs/pagination.input";
import contextInterface from "../../../types/interfaces/context.interface";
import { post } from "../../../types/object-types/post.type";

export const postQuery = async (
  { take, skip }: paginationInput,
  ctx: contextInterface
): Promise<post[]> => {
  try {
    const getPosts = await client.post.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: { likedBy: true },
        },
        likedBy: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        created: `asc`,
      },
    });

    const posts: post[] = getPosts.map((post, index) => {
      const likedUsers = post.likedBy.map((user) => user.id);
      const singlePost: post = {
        ...post,
        likes: post._count.likedBy,
        likedByIds: likedUsers,
      };
      return singlePost;
    });

    return posts;
  } catch (err) {
    throw new Error(err);
  }
};
