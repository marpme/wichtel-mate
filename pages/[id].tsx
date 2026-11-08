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
import { getPickedPartner } from "../lib/group";
import { UserKeys } from "../lib/groups";
import { useEffect, useState } from "react";

const GiftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={"22"}
    height={"22"}
    fill="none"
    stroke="currentColor"
    strokeWidth={"1.7"}
    strokeLinecap={"round"}
    strokeLinejoin={"round"}
    aria-hidden
  >
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5C13 8 12 8 12 8s-1 0-4.5 0Z" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={"14"}
    height={"14"}
    fill="currentColor"
    aria-hidden
    style={{ display: "block" }}
  >
    <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
  </svg>
);

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

  // fallback: false guarantees params.id is a known UserKeys string; anything
  // else (defensive) falls through to the exported 404 page
  if (typeof userId !== "string") {
    return { notFound: true };
  }

  return { props: { userId } };
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
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [shaking, setShaking] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!userId) {
      return;
    }

    try {
      const saved = sessionStorage.getItem(`wichtel-revealed-${userId}`);
      if (saved) {
        setRevealed(JSON.parse(saved));
      }
    } catch {
      /* private mode / storage unavailable: stay unrevealed */
    }
  }, [userId]);

  const reveal = (groupId: number) => {
    setShaking((prev) => ({ ...prev, [groupId]: true }));
    setTimeout(() => {
      setShaking((prev) => ({ ...prev, [groupId]: false }));
      setRevealed((prev) => {
        const next = { ...prev, [groupId]: true };
        try {
          sessionStorage.setItem(
            `wichtel-revealed-${userId}`,
            JSON.stringify(next),
          );
        } catch {
          /* storage unavailable: reveal still works, just not persisted */
        }
        return next;
      });
    }, 650);
  };

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
          <Card width={"min(480px, calc(100vw - 32px))"}>
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
                    {revealed[group.id] ? (
                      <div className="reveal-wrap">
                        <span
                          className="reveal-sparkle"
                          style={{ ["--dx" as string]: "-58px", ["--dy" as string]: "-46px" }}
                        >
                          <SparkleIcon />
                        </span>
                        <span
                          className="reveal-sparkle"
                          style={{ ["--dx" as string]: "58px", ["--dy" as string]: "-40px" }}
                        >
                          <SparkleIcon />
                        </span>
                        <span
                          className="reveal-sparkle"
                          style={{ ["--dx" as string]: "-66px", ["--dy" as string]: "26px" }}
                        >
                          <SparkleIcon />
                        </span>
                        <span
                          className="reveal-sparkle"
                          style={{ ["--dx" as string]: "64px", ["--dy" as string]: "34px" }}
                        >
                          <SparkleIcon />
                        </span>
                        <Text h2 margin={0} className={"revealed-name"}>
                          {group.pickedPerson || "lädt ..."}
                        </Text>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={
                          shaking[group.id] ? "reveal-button shaking" : "reveal-button"
                        }
                        disabled={!group.pickedPerson || shaking[group.id]}
                        onClick={() => reveal(group.id)}
                      >
                        <GiftIcon />
                        <span>{"Aufdecken"}</span>
                      </button>
                    )}
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
