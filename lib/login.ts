import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const allowedLogin: Record<string, string> = {
  o1WB7Qwah6: "Marvin",
  Ci9PdtQGn9: "Mariska",
  Tj859tcBP9: "Jana",
  FGwMIncf8D: "Carsten",
  VWwByBEw1z: "Sandro",
  FeLoNlVJw3: "Debby",
};

export const userIdToPeopleMap = new Map<string, string>(
  Object.entries(allowedLogin)
);

export const hasValidAuth = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): boolean => {
  const sessionToken = context.req.cookies["sessionToken"];
  if (!sessionToken) {
    return false;
  }

  return typeof allowedLogin[sessionToken] === "string";
};
