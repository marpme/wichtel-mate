import "../styles/globals.css";
import "inter-ui/inter.css";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

function MyApp({ Component, pageProps }: any) {
  const [snowFlakes, setSnowFlakes] = useState(false);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    setSnowFlakes(true);
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
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
    </SessionContextProvider>
  );
}

export default MyApp;
