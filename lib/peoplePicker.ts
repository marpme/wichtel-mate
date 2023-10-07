import Rand from "rand-seed";
import { userMap } from "./login";

export type PickResult = {
  personId: string;
  person: string;
  pickedPerson: string;
  pickedPersonId: string;
};

export const peoplePicker = (): PickResult[] => {
  const currentYear = new Date().getFullYear();
  const rand = new Rand(currentYear.toString(10));

  let distributed = false;
  let index = -1;
  let result: PickResult[] = [];

  while (!distributed) {
    const selections = [];
    let hasSelf = false;
    index++;
    result = [];

    for (let [personId, person] of userMap.entries()) {
      const pickIndex = Math.round(rand.next() * 100000 + index) % userMap.size;
      const pickedPerson = Array.from(userMap.values())[pickIndex];
      const pickedPersonId = Array.from(userMap.keys())[pickIndex];

      if (personId === pickedPersonId) {
        hasSelf ||= true;
      }

      selections.push(pickedPersonId);

      result.push({
        personId,
        person,
        pickedPersonId,
        pickedPerson,
      });
    }

    if (new Set(selections).size === selections.length && !hasSelf) {
      distributed = true;
      break;
    }
  }

  return result;
};
