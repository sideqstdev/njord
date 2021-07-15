import { loginInput } from "../../types/inputs/login.input";
import contextInterface from "../../types/interfaces/context.interface";
import { user } from "../../types/object-types/user.type";
import LoggingService from "../../services/logging.service";
import {
  decrypt,
  createRefreshToken,
  createAccessToken,
  sendRefreshToken,
  sendAccessToken,
} from "../../services/auth.service";
import { User } from "@prisma/client";
import { dev, refreshSecret } from "../../lib/globals";
import { findUser, updateLastLogin } from "../../lib/client/login/login.client";
import { login_response } from "../../types/responses/loginresponse.type";
import { client } from "../../lib/client";

export const loginMutation = async (
  input: loginInput,
  ctx: contextInterface
): Promise<login_response> => {
  try {
    // throws an error if it can't find a user
    const user = await client.user.findUnique({
      where: {
        email: input.email,
      },
      include: {
        profile: true,
      },
    });

    // validate password
    const validPassword = await decrypt(input.password, user.password);
    if (!validPassword) {
      throw new Error(`Incorrect password`);
    } else {
      const userUpdated = await updateLastLogin(input.email);

      // create and send jwt's
      const refreshToken: string = createRefreshToken(userUpdated.id);
      const accessToken: string = createAccessToken(userUpdated.id);

      let response: login_response = {
        refreshToken: refreshToken,
        token: accessToken,
        success: true,
        user: userUpdated,
      };

      return response;
    }
  } catch (err) {
    throw new Error(`Internal server error ${dev ? `: ${err}` : null}`);
  }
};
