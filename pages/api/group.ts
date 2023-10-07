import { NextApiHandler } from "next";
import { getBelongingGroup } from "../../lib/groups";
import { getUserId, hasValidReqAuth } from "../../lib/login";
import { peoplePicker } from "../../lib/peoplePicker";

const picker: NextApiHandler = async (req, res) => {
  if (!hasValidReqAuth(req)) {
    return res.status(401).send({});
  }

  const belongingGroups = getBelongingGroup(getUserId(req));

  if (!belongingGroups) {
    return res.status(400).send({});
  }

  const groups = belongingGroups.map((group) => {
    const pickResult = peoplePicker(group.userMap).find(
      (pick) => pick.personId === getUserId(req)
    );

    return {
      ...group,
      ...pickResult,
      userMap: undefined,
    };
  });

  return res.status(200).send(groups);
};

export default picker;
