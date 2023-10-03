import { vi, describe, expect, it } from "vitest";
import { peoplePicker } from "./peoplePicker";

describe("people picker", () => {
  it("2022", () => {
    const date = new Date(2022, 1, 1);
    vi.setSystemTime(date);

    expect(peoplePicker()).toStrictEqual([
      {
        person: "Marvin",
        personId: "o1WB7Qwah6",
        pickedPerson: "Carsten",
        pickedPersonId: "FGwMIncf8D",
      },
      {
        person: "Mariska",
        personId: "Ci9PdtQGn9",
        pickedPerson: "Marvin",
        pickedPersonId: "o1WB7Qwah6",
      },
      {
        person: "Jana",
        personId: "Tj859tcBP9",
        pickedPerson: "Debby",
        pickedPersonId: "FeLoNlVJw3",
      },
      {
        person: "Carsten",
        personId: "FGwMIncf8D",
        pickedPerson: "Sandro",
        pickedPersonId: "VWwByBEw1z",
      },
      {
        person: "Sandro",
        personId: "VWwByBEw1z",
        pickedPerson: "Jana",
        pickedPersonId: "Tj859tcBP9",
      },
      {
        person: "Debby",
        personId: "FeLoNlVJw3",
        pickedPerson: "Mariska",
        pickedPersonId: "Ci9PdtQGn9",
      },
    ]);
  });
});
