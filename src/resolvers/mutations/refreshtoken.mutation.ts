import { client } from "../../lib/client";
import { getUserById } from "../../lib/client/user/user.client";
import { dev } from "../../lib/globals";
import {
  createAccessToken,
  createRefreshToken,
  decodeToken,
  sendAccessToken,
  sendRefreshToken,
} from "../../services/auth.service";
import contextInterface from "../../types/interfaces/context.interface";
import { refresh_token_response } from "../../types/responses/refreshtokenresponse.type";

export const refreshTokenMutation = async (
  refreshToken: string,
  ctx: contextInterface
): Promise<refresh_token_response> => {
  try {
    if (!ctx.refreshToken) {
      return {
        success: false,
        token: ``,
      };
    }

    let payload: any = null;
    try {
      payload = await decodeToken(ctx.refreshToken, `refresh`);
    } catch {
      return {
        success: false,
        token: ``,
      };
    }

    // refresh token is valid an we can send back an access token
    const user = await client.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      return {
        success: false,
        token: ``,
      };
    }

    // token creation and sending
    const accessToken: string = createAccessToken(user.id);

    return {
      success: true,
      token: accessToken,
    };
  } catch (err) {
    throw new Error(`Internal server error ${dev ? `: ${err}` : null}`);
  }
};
