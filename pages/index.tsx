import Head from "next/head";
import { Card, Divider, Grid, Page, Text } from "@geist-ui/core";
import "moment/locale/de";
import { useXMASDiff } from "../hooks/useXMASDiff";
import { LoginForm } from "../components/LoginForm";
import { WichtelImage } from "../components/WichtelImage";

export default function Home() {
  const { timeUntil } = useXMASDiff();

  return (
    <Page dotBackdrop margin={0} padding={0} width={"100vw"}>
      <Head>
        <title>Wichtel-o-Mat ✨</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎅</text></svg>"
        />
      </Head>

      <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid xs={22} alignItems={"center"} justify={"center"}>
          <Card width={"375px"}>
            <div style={{ padding: "10px" }}>
              <WichtelImage />
            </div>
            <Card.Content>
              <Text h3>
                Bald ist es wieder soweit! &mdash;
                <br /> Nur noch {timeUntil} verbleiben!
              </Text>
              <Text small>
                Liebe Helfer: innen auch dieses Jahr begrüßen wir euch wieder
                recht Herzlich zum jährlichen Wichtelevent.
              </Text>
              <Text small p>
                Auch dieses Jahr zählt es wieder andere Menschen glücklich zu
                machen und sich dabei selbst über eine kleine Überraschung
                freuen zu können. Daher seid ihr herzlichst eingeladen dieses
                Jahr teilzunehmen!
              </Text>
            </Card.Content>
            <Divider w={"100%"} margin={0} padding={0} />
            <LoginForm />
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
}
