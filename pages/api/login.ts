import { NextApiHandler } from "next";
import { setCookie } from "../../lib/cookie";
import { allowedLogin } from "../../lib/login";

const LoginHandler: NextApiHandler = async (req, res) => {
  const loginId = req.body.login;

  if (typeof allowedLogin[loginId] === "string") {
    return setCookie(res, "sessionToken", loginId).status(204).end();
  }

  return res.status(401).end();
};

export default LoginHandler;
