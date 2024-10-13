import {
  Card,
  Divider,
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
    fallback: "blocking",
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
            <div
              style={{
                padding: "10px",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <WichtelImage />
            </div>
            <Card.Content>
              <Text h3>
                Willkommen zurück, {groups.at(0)?.person} &mdash;
                <br /> nur noch {timeUntil} verbleiben!
              </Text>
            </Card.Content>
            {groups.map((group) => (
              <>
                <Divider w={"100%"} />
                <Card.Content>
                  <Grid.Container gap={2} justify={"center"}>
                    <Grid xs={24}>
                      <Text h6 style={{ color: "#ccc" }} p>
                        {group.name} &mdash; Wichtelpartner:
                      </Text>
                    </Grid>
                    <Grid xs={24} justify={"center"}>
                      <Text h2 margin={0}>
                        &bdquo;{group.pickedPerson || "lädt ..."}&rdquo;
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Card.Content>
              </>
            ))}
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
