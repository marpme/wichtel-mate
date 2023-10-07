import { GetServerSidePropsContext } from "next";
import { userMap } from "./groups";
import type { IncomingMessage } from "http";

export const hasValidAuth = (context: GetServerSidePropsContext): boolean => {
  const sessionToken = context.req.cookies["sessionToken"];
  if (!sessionToken) {
    return false;
  }

  return userMap.has(sessionToken);
};

export const hasValidReqAuth = (
  req: IncomingMessage & { cookies: Partial<{ [p: string]: string }> }
): boolean => {
  const sessionToken = req.cookies["sessionToken"];
  if (!sessionToken) {
    return false;
  }

  return userMap.has(sessionToken);
};

export const getUserId = (
  req: IncomingMessage & { cookies: Partial<{ [p: string]: string }> }
): string => {
  const sessionToken = req.cookies["sessionToken"];
  if (!hasValidReqAuth(req) || !sessionToken) {
    throw new Error("Invalid user");
  }

  return sessionToken;
};
