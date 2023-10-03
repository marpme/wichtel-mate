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
        pickedPerson: "Debby",
        pickedPersonId: "FeLoNlVJw3",
      },
      {
        person: "Mariska",
        personId: "Ci9PdtQGn9",
        pickedPerson: "Jana",
        pickedPersonId: "Tj859tcBP9",
      },
      {
        person: "Jana",
        personId: "Tj859tcBP9",
        pickedPerson: "Marvin",
        pickedPersonId: "o1WB7Qwah6",
      },
      {
        person: "Carsten",
        personId: "FGwMIncf8D",
        pickedPerson: "Mariska",
        pickedPersonId: "Ci9PdtQGn9",
      },
      {
        person: "Sandro",
        personId: "VWwByBEw1z",
        pickedPerson: "Carsten",
        pickedPersonId: "FGwMIncf8D",
      },
      {
        person: "Debby",
        personId: "FeLoNlVJw3",
        pickedPerson: "Sandro",
        pickedPersonId: "VWwByBEw1z",
      },
    ]);
  });
});
