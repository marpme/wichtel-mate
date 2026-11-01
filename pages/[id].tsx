import {
  Card,
  Fieldset,
  Grid,
  Page,
  Spacer,
  Text,
} from "@geist-ui/core";
import "moment/locale/de";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { Header } from "../components/Header";
import { WichtelImage } from "../components/WichtelImage";
import { LogoutButton } from "../components/LogoutButton";
import { useXMASDiff } from "../hooks/useXMASDiff";
import { redirect } from "next/navigation";
import { getPickedPartner } from "../lib/group";
import { UserKeys } from "../lib/groups";
import { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: UserKeys.map((userId) => {
      return { params: { id: userId } };
    }),
    // "blocking" is rejected with output: "export"; unknown IDs get the 404 page
    fallback: false,
  };
};

export const getStaticProps = (async (context) => {
  const userId = context.params?.id;

  if (Array.isArray(userId)) {
    return redirect("/");
  }

  if (!userId) {
    return redirect("/");
  }

  return { props: { userId: userId } };
}) satisfies GetStaticProps<{
  userId: string;
}>;

const Dashboard = ({
  userId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { timeUntil } = useXMASDiff();
  const [groups, setGroups] = useState<
    Awaited<ReturnType<typeof getPickedPartner>>
  >([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchGroups = async () => {
      setGroups(await getPickedPartner(userId));
    };

    fetchGroups();
  }, [userId]);

  if (!userId) {
    return null;
  }

  return (
    <Page dotBackdrop width={"100vw"}>
      <Header />
      <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid xs={24} alignItems={"center"} justify={"center"}>
          <Card width={"375px"}>
            <div className="wichtel-head">
              <WichtelImage />
            </div>
            <Card.Content>
              <Text h3>
                Schön, dass du da bist, {groups.at(0)?.person}!
              </Text>
              <Text p>{timeUntil}</Text>
            </Card.Content>
            <Card.Content>
              <div style={{ textAlign: "center" }}>
                <Text small className="group-eyebrow">
                  {groups.length > 1
                    ? "Deine Wichtelpartner"
                    : "Dein Wichtelpartner"}
                </Text>
              </div>
            </Card.Content>
            {groups.map((group, index) => (
              <Card.Content key={group.id}>
                {index > 0 && <div style={{ height: "24px" }} />}
                <Grid.Container gap={1} justify={"center"}>
                  <Grid xs={24} justify={"center"}>
                    <Text small className="group-tag" p margin={0}>
                      {group.name}
                    </Text>
                  </Grid>
                  <Grid xs={24} justify={"center"}>
                    <Text h2 margin={0}>
                      {group.pickedPerson || "lädt ..."}
                    </Text>
                  </Grid>
                </Grid.Container>
              </Card.Content>
            ))}
            <Card.Content>
              <div style={{ textAlign: "center" }}>
                <Text small>Viel Freude beim Aussuchen und Schenken!</Text>
              </div>
            </Card.Content>
            <Fieldset.Footer>
              <Spacer />
              <LogoutButton />
            </Fieldset.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
};

export default Dashboard;
