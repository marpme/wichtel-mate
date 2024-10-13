export type Group = {
  id: number;
  name: string;
  userMap: Map<string, string>;
};

export const groups: Array<Group> = [
  {
    id: 1,
    name: "Mimis' Weihnacht",
    userMap: new Map<string, string>(
      Object.entries({
        o1WB7Qwah6: "Marvin",
        Ci9PdtQGn9: "Mariska",
        NVK5icGkMw: "Arne",
        kc9hNyzuZN: "Mimi",
        iN0ywpsiXH: "Sissi",
      }),
    ),
  },
  {
    id: 2,
    name: "Flodders' Weihnacht",
    userMap: new Map<string, string>(
      Object.entries({
        o1WB7Qwah6: "Marvin",
        Ci9PdtQGn9: "Mariska",
        Tj859tcBP9: "Jana",
        FGwMIncf8D: "Carsten",
        VWwByBEw1z: "Sandro",
        FeLoNlVJw3: "Debby",
      }),
    ),
  },
];

export const userMap = new Map<string, string>(
  groups.reduce<Iterable<readonly [string, string]>>(
    (all, group) => [...all, ...group.userMap],
    [],
  ),
);

export const UserKeys = groups.reduce((all, group) => {
  return [...all, ...Array.from<string>(group.userMap.keys())];
}, [] as string[]);

export const getBelongingGroup = (userId: string): Array<Group> => {
  return groups.filter((group) => group.userMap.has(userId));
};
