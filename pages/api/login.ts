import { NextApiHandler } from "next";
import { setCookie } from "../../lib/cookie";
import { userIdToPeopleMap } from "../../lib/login";

const LoginHandler: NextApiHandler = async (req, res) => {
  const loginId = req.body.login;

  if (userIdToPeopleMap.has(loginId)) {
    return setCookie(res, "sessionToken", loginId).status(204).end();
  }

  return res.status(401).end();
};

export default LoginHandler;
