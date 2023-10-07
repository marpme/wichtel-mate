import { useQuery } from "@tanstack/react-query";

type ResponseGroup = Array<{
  name: string;
  id: string;
  pickedPerson: string;
  person: string;
}>;
const fetchUserGroups = async (): Promise<ResponseGroup> => {
  const response = await fetch("/api/group", {
    credentials: "same-origin",
  });

  return (await response.json()) as ResponseGroup;
};

export const useGroups = () =>
  useQuery({
    queryKey: ["group"],
    queryFn: fetchUserGroups,
  });
