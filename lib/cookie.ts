import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiResponse } from "next";

/**
 * This sets `cookie` using the `res` object
 */
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {
    path: "/",
    secure: true,
    sameSite: true,
    maxAge: 3600,
  },
): NextApiResponse => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if (typeof options.maxAge !== "number") {
    // eslint-disable-next-line no-self-assign
    options.maxAge = options.maxAge;
  }

  if (options.expires instanceof Date) {
    // eslint-disable-next-line no-self-assign
    options.expires = options.expires;
    options.maxAge = undefined;
  }

  return res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};
