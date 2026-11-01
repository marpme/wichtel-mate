import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Card,
  Divider,
  Grid,
  Page,
  Text,
  useToasts,
} from "@geist-ui/core";
import { useEffect, useState } from "react";

import { WichtelImage } from "../components/WichtelImage";
import { groups } from "../lib/groups";

export default function Links() {
  const { setToast } = useToasts();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setToast({ text: "Link kopiert!", type: "success" });
    } catch {
      setToast({
        text: "Kopieren fehlgeschlagen - bitte Link manuell kopieren.",
        type: "error",
      });
    }
  };

  return (
    <Page dotBackdrop margin={0} padding={0} width={"100vw"}>
      <Head>
        <title>Wichtel-o-Mat - Persönliche Links</title>
        <meta name="description" content="Persönliche Links für alle Wichtel" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>W</text></svg>"
        />
      </Head>

      <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid xs={22} alignItems={"center"} justify={"center"}>
          <Card width={"480px"}>
            <div style={{ padding: "10px" }}>
              <WichtelImage />
            </div>
            <Card.Content>
              <Text h3>Persönliche Links</Text>
              <Text small p>
                Jeder Wichtel hat einen festen, statischen Link auf seine
                persönliche Seite. Teile einer Person ihren Link - sie gelangt
                damit direkt auf ihre Seite, ohne die Wichtel-ID eingeben zu
                müssen.
              </Text>
            </Card.Content>
            {groups.map((group) => (
              <div key={group.id}>
                <Divider w={"100%"} margin={0} padding={0} />
                <Card.Content>
                  <Text h5>{group.name}</Text>
                  {Array.from(group.userMap.entries()).map(
                    ([userId, name]) => {
                      const path = `/${userId}`;
                      const url = origin ? `${origin}${path}` : path;

                      return (
                        <Grid.Container
                          key={userId}
                          gap={1}
                          alignItems={"center"}
                          justify={"space-between"}
                        >
                          <Grid xs={6}>
                            <Text p margin={0}>
                              {name}
                            </Text>
                          </Grid>
                          <Grid xs={13}>
                            <Link href={path}>
                              <Text
                                small
                                margin={0}
                                style={{ wordBreak: "break-all" }}
                              >
                                {url}
                              </Text>
                            </Link>
                          </Grid>
                          <Grid xs={5}>
                            <Button
                              auto
                              scale={2 / 3}
                              type={"success"}
                              placeholder={""}
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                              onClick={() => copyLink(url)}
                            >
                              Kopieren
                            </Button>
                          </Grid>
                        </Grid.Container>
                      );
                    },
                  )}
                </Card.Content>
              </div>
            ))}
            <Divider w={"100%"} margin={0} padding={0} />
            <Card.Content>
              <Link href={"/"}>
                <Text
                  small
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  Zurück zum Login
                </Text>
              </Link>
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
}
