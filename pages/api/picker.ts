import { NextApiHandler } from "next";
import { peoplePicker } from "../../lib/peoplePicker";

const picker: NextApiHandler = async (req, res) => {
  const result = peoplePicker().find((pick) => {
    return pick.personId === req.cookies.sessionToken;
  });

  if (!result) {
    return res.status(400).send({});
  }

  return res.status(200).send(result);
};

export default picker;
