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
import { GetServerSideProps } from "next";
import { hasValidAuth } from "../lib/login";
import { useGroups } from "../hooks/useGroups";
import { Header } from "../components/Header";
import { WichtelImage } from "../components/WichtelImage";
import { LogoutButton } from "../components/LogoutButton";
import { useXMASDiff } from "../hooks/useXMASDiff";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!hasValidAuth(context)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

const Dashboard = () => {
  const { timeUntil } = useXMASDiff();
  const { data, isSuccess } = useGroups();

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
                Willkommen zurück, {data?.[0].person} &mdash;
                <br /> nur noch {timeUntil} verbleiben!
              </Text>
            </Card.Content>
            {isSuccess
              ? data.map((group) => (
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
                ))
              : null}
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
