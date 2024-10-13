import { getBelongingGroup } from "./groups";
import { peoplePicker, PickResult } from "./peoplePicker";

export type BelongingGroup = {
  name: string;
  id: number;
  userMap: undefined;
};

export const getPickedPartner: (
  userId: string,
) => Promise<(BelongingGroup & Partial<PickResult>)[]> = async (
  userId: string,
) => {
  const belongingGroups = getBelongingGroup(userId);

  if (!belongingGroups) {
    return [];
  }

  return belongingGroups.map((group) => {
    const pickResult = peoplePicker(group.userMap).find(
      (pick) => pick.personId === userId,
    );

    return {
      ...group,
      ...pickResult,
      userMap: undefined,
    };
  });
};
