import Rand from "rand-seed";

const userIdToPeopleMap = new Map<string, string>();

userIdToPeopleMap.set("2571785e-b9d0-4a45-9cf6-e978d98ce490", "Marvin");
userIdToPeopleMap.set("2571785e-b9d0-4a45-9cf6-e978d98ce491", "Debby");
userIdToPeopleMap.set("2571785e-b9d0-4a45-9cf6-e978d98ce492", "Sandro");
userIdToPeopleMap.set("2571785e-b9d0-4a45-9cf6-e978d98ce493", "Carsten");
userIdToPeopleMap.set("2571785e-b9d0-4a45-9cf6-e978d98ce494", "Jana");
userIdToPeopleMap.set("84722b4e-366a-411f-b19f-1936f437a347", "Mariska");

const currentYear = new Date().getFullYear();

export type PickResult = {
  personId: string;
  person: string;
  pickedPerson: string;
  pickedPersonId: string;
};
export const peoplePicker = (): PickResult[] => {
  const rand = new Rand(currentYear.toString(10));

  let distributed = false;
  let index = -1;
  let result: PickResult[] = [];

  while (!distributed) {
    const selections = [];
    let hasSelf = false;
    index++;
    result = [];

    for (let [personId, person] of userIdToPeopleMap.entries()) {
      const pickIndex =
        Math.round(rand.next() * 100000 + index) % userIdToPeopleMap.size;
      const pickedPerson = Array.from(userIdToPeopleMap.values())[pickIndex];
      const pickedPersonId = Array.from(userIdToPeopleMap.keys())[pickIndex];

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
