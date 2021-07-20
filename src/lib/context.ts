import { Context } from "apollo-server-core";
import { client } from "./client";
import contextInterface from "../types/interfaces/context.interface";
import { parseCookies } from "./util/cookies.util";

export const createContext: Context = ({ req, res }): contextInterface => {
  let cookies: any = parseCookies(req.headers.cookie);
  return {
    ...req,
    ...res,
    prisma: client,
    accessToken: req.headers.authorization,
    refreshToken: cookies.sqstrf,
    user: {},
  };
};
