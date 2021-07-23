import { AuthChecker } from "type-graphql";
import {
  decodeToken,
  decodeTokenExp,
  nearExpiration,
  regenerateAccessToken,
  regenerateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from "../../services/auth.service";
import LoggingService from "../../services/logging.service";
import contextInterface from "../../types/interfaces/context.interface";
import { dev } from "../globals";

export const authChecker: AuthChecker<Partial<contextInterface>> = async ({
  context,
}): Promise<boolean> => {
  if (!context) {
    // if no context provided falsy
    return false;
  }

  let { accessToken } = context;
  if (!accessToken) {
    LoggingService.error(`No access token provided`);
    return false;
  }

  if (!accessToken.startsWith(`Bearer `)) {
    LoggingService.error(`Token was sent without 'Bearer'`);
    return false;
  }

  const slicedAccessToken = accessToken.slice(7, accessToken.length);

  if (slicedAccessToken) {
    const isValid = await decodeToken(slicedAccessToken, `access`);
    context.user = isValid;
    if (isValid) {
      return true;
    }
  }
  return false;
};
