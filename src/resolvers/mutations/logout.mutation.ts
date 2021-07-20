import { dev } from "../../lib/globals";
import { hasTokens, resetTokens } from "../../services/auth.service";
import contextInterface from "../../types/interfaces/context.interface";

export const logoutMutation = async (
  ctx: contextInterface
): Promise<boolean> => {
  try {
    if (!hasTokens(ctx.req)) {
      return false;
    }
    resetTokens(ctx.res);
  } catch (err) {
    throw new Error(err);
  }
  // if no error is thrown will return true
  return true;
};
