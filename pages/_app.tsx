import "../styles/globals.css";
import "inter-ui/inter.css";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: any) {
  const [snowFlakes, setSnowFlakes] = useState(false);

  useEffect(() => {
    setSnowFlakes(true);
  }, []);

  return (
    <GeistProvider themeType={"dark"}>
      {snowFlakes ? (
        <Snowfall
          // Changes the snowflake color
          color="white"
          // Controls the number of snowflakes that are created (default 150)
          snowflakeCount={200}
        />
      ) : null}
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
