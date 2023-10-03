import { vi, describe, expect, it } from "vitest";
import { peoplePicker } from "./peoplePicker";
import { createHash } from "crypto";

const futureYears = new Array<number>(100)
  .fill(2022)
  .map<Array<number>>((year, index) => [year + index]);

console.log(futureYears);
describe("people picker", () => {
  it("2022", () => {
    vi.setSystemTime(new Date(2022, 1, 1));

    expect(peoplePicker()).toStrictEqual([
      expect.objectContaining({
        person: "Marvin",
        pickedPerson: "Debby",
      }),
      expect.objectContaining({
        person: "Mariska",
        pickedPerson: "Jana",
      }),
      expect.objectContaining({
        person: "Jana",
        pickedPerson: "Marvin",
      }),
      expect.objectContaining({
        person: "Carsten",
        pickedPerson: "Mariska",
      }),
      expect.objectContaining({
        person: "Sandro",
        pickedPerson: "Carsten",
      }),
      expect.objectContaining({
        person: "Debby",
        pickedPerson: "Sandro",
      }),
    ]);
  });

  it.each(futureYears)("people picked for %i year following", (year) => {
    vi.setSystemTime(new Date(year, 1, 1));

    const selectedPeople = peoplePicker();
    expect(selectedPeople).toHaveLength(6);

    const hashedPeopleSelected = createHash("sha256")
      .update(JSON.stringify(selectedPeople))
      .digest()
      .toString("base64");

    expect(hashedPeopleSelected).toMatchSnapshot();
  });
});
