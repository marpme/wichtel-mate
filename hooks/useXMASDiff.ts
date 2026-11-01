import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/locale/de";

export const useXMASDiff = () => {
  const [timeUntil, setTimeUntil] = useState<string | undefined>();

  useEffect(() => {
    moment.locale("de");

    const today = moment().startOf("day");
    let xmas = moment(new Date(today.year(), 11, 24));

    if (xmas.isBefore(today)) {
      xmas = moment(new Date(today.year() + 1, 11, 24));
    }

    const days = xmas.diff(today, "days");

    if (days === 0) {
      setTimeUntil("Heute ist Heiligabend!");
    } else if (days === 1) {
      setTimeUntil("Nur noch 1 Tag bis Heiligabend!");
    } else {
      setTimeUntil(`Nur noch ${days} Tage bis Heiligabend!`);
    }
  }, []);

  return { timeUntil };
};
