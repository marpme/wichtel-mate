import "../styles/globals.css";
import "inter-ui/inter.css";
import { CssBaseline, GeistProvider } from "@geist-ui/core";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";

import { AppProps } from "next/app";
import { hearthTheme } from "../lib/theme";
import { LightGarland } from "../components/LightGarland";
import { StarField } from "../components/StarField";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [snowFlakes, setSnowFlakes] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSnowFlakes(true);
    }
  }, []);

  return (
      <GeistProvider themes={[hearthTheme]} themeType={"hearth"}>
        {snowFlakes ? (
          <Snowfall
            // Controls the number of snowflakes that are created (default 150)
            color="white"
            snowflakeCount={60}
          />
        ) : null}
        <CssBaseline />
        <StarField />
        <LightGarland />
        <Component {...pageProps} />
      </GeistProvider>
  );
};

export default MyApp;
