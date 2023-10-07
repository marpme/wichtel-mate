import { NextApiHandler } from "next";
import { userMap } from "../../../lib/groups";
import { setCookie } from "../../../lib/cookie";

const LoginHandler: NextApiHandler = async (req, res) => {
  const loginId = req.query.id;

  if (userMap.has(loginId as string)) {
    return setCookie(res, "sessionToken", loginId).redirect("/dashboard").end();
  }

  return res.status(401).end();
};

export default LoginHandler;
