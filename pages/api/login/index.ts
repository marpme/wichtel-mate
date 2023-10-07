import { NextApiHandler } from "next";
import { setCookie } from "../../../lib/cookie";
import { userMap } from "../../../lib/groups";

const LoginHandler: NextApiHandler = async (req, res) => {
  const loginId = req.body.login;

  if (userMap.has(loginId)) {
    return setCookie(res, "sessionToken", loginId).status(204).end();
  }

  return res.status(401).end();
};

export default LoginHandler;
