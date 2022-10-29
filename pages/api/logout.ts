import { NextApiHandler } from "next";

const LoginHandler: NextApiHandler = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    "sessionToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );

  return res.end();
};

export default LoginHandler;
