import { useEffect, useState } from "react";
import moment from "moment/moment";

const currentDate = new Date();

export const useXMASDiff = () => {
  const [timeUntil, setTimeUntil] = useState<string | undefined>();

  useEffect(() => {
    moment.locale("de");
    setTimeUntil(
      moment(new Date(currentDate.getFullYear(), 11, 24)).fromNow(true)
    );
  }, []);

  return { timeUntil };
};
