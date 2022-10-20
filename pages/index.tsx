import Head from "next/head";
import Image from "next/image";
import {
  Button,
  Card,
  Divider,
  Fieldset,
  Grid,
  Input,
  Page,
  Spacer,
  Text,
  useToasts,
} from "@geist-ui/core";
import { useEffect, useRef, useState } from "react";

import moment from "moment";
import "moment/locale/de";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const currentDate = new Date();

export default function Home() {
  const router = useRouter();
  const [timeUntil, setTimeUntil] = useState<string | undefined>();
  const { isLoading, session, supabaseClient } = useSessionContext();
  const { setToast } = useToasts();
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  useEffect(() => {
    moment.locale("de");
    setTimeUntil(
      moment(new Date(currentDate.getFullYear(), 12, 25)).fromNow(true)
    );
  }, []);

  return (
    <Page dotBackdrop>
      <Head>
        <title>Wichtel-o-Mat ✨</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎅</text></svg>"
        />
      </Head>

      <Grid.Container alignItems={"center"} justify={"center"} height={"100vh"}>
        <Grid xs={24} alignItems={"center"} justify={"center"}>
          <Card padding={0} w={"40%"}>
            <div style={{ padding: "10px" }}>
              <Image
                src={"/wichtel.svg"}
                width={"400px"}
                height={"200px"}
                draggable={false}
              />
            </div>
            <Card.Content>
              <Text h3>
                Bald ist es wieder soweit! &mdash;
                <br /> Nur noch {timeUntil} verbleiben!
              </Text>
              <Text small>
                Liebe Helfer:innen auch dieses Jahr begrüßen wir euch wieder
                Herzlich zum jährlichen Wichtelevent.
              </Text>
              <Text small p>
                Auch dieses Jahr zählt es wieder andere Menschen glücklich zu
                machen und sich dabei selber über eine kleine Überraschung
                freuen zu können. Daher seid ihr herzlichst eingeladen dieses
                Jahr teilzunehmen!
              </Text>
            </Card.Content>
            <Divider w={"100%"} margin={0} padding={0} />
            <form
              onSubmit={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                const response = await supabaseClient.auth.signInWithOtp({
                  email: ref.current!.value,
                });

                if (response.error) {
                  setToast({
                    text: "Hey du! Du bist noch kein helfender Wichtel, schau später nochmal vorbei!",
                    type: "error",
                  });
                } else {
                  setToast({
                    text: "Dein geheimer Wichtel-Code wurde automatisch an deine E-Mail versandt. Schau mal nach!",
                    type: "success",
                  });
                }
              }}
            >
              <Card.Content>
                <Text h5>Login:</Text>
                <Input
                  ref={ref as any}
                  htmlType="text"
                  id="wichtelid"
                  name="wichtelid"
                  label={"Wichtel ID"}
                  placeholder={"anna.lena@gmail.com"}
                />
              </Card.Content>
              <Fieldset.Footer>
                <Spacer inline />
                <Button scale={2 / 3} auto htmlType="submit" type={"success"}>
                  Submit
                </Button>
              </Fieldset.Footer>
            </form>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
}
