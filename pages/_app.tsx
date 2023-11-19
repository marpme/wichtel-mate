import "../styles/globals.css";
import "inter-ui/inter.css";
import { CssBaseline, GeistProvider } from "@geist-ui/core";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [snowFlakes, setSnowFlakes] = useState(false);

  useEffect(() => {
    setSnowFlakes(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default MyApp;
