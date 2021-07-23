import { client } from "../../lib/client";
import { dev } from "../../lib/globals";
import { createAccessToken, decodeToken } from "../../services/auth.service";
import contextInterface from "../../types/interfaces/context.interface";
import { refresh_token_response } from "../../types/responses/refreshtokenresponse.type";

export const refreshTokenQuery = async (
  ctx: contextInterface
): Promise<refresh_token_response> => {
  try {
    if (!ctx.refreshToken) {
      throw new Error(`No refresh token provided`);
    }

    let payload: any;
    try {
      payload = await decodeToken(ctx.refreshToken, `refresh`);
    } catch (err) {
      throw new Error(`Error occurred whilst decoding token: ${err}`);
    }

    const user = await client.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new Error(`Invalid token`);
    }

    const accessToken: string = createAccessToken(user.id);
    return {
      success: true,
      token: accessToken,
    };
  } catch (err) {
    throw new Error(err);
  }
};
