import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const userMap = new Map<string, string>(
  Object.entries({
    o1WB7Qwah6: "Marvin",
    Ci9PdtQGn9: "Mariska",
    Tj859tcBP9: "Jana",
    FGwMIncf8D: "Carsten",
    VWwByBEw1z: "Sandro",
    FeLoNlVJw3: "Debby",

    NVK5icGkMw: "Arne",
    kc9hNyzuZN: "Mimi",
    iN0ywpsiXH: "Sissi",
  })
);

export const hasValidAuth = (context: GetServerSidePropsContext): boolean => {
  const sessionToken = context.req.cookies["sessionToken"];
  if (!sessionToken) {
    return false;
  }

  return userMap.has(sessionToken);
};
