import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/locale/de";

export const useXMASDiff = () => {
  const [timeUntil, setTimeUntil] = useState<string | undefined>();
  const [days, setDays] = useState<number | undefined>();

  useEffect(() => {
    moment.locale("de");

    const today = moment().startOf("day");
    let xmas = moment(new Date(today.year(), 11, 24));

    if (xmas.isBefore(today)) {
      xmas = moment(new Date(today.year() + 1, 11, 24));
    }

    const remaining = xmas.diff(today, "days");

    if (remaining === 0) {
      setTimeUntil("Heute ist Heiligabend!");
    } else if (remaining === 1) {
      setTimeUntil("Nur noch 1 Tag bis Heiligabend!");
    } else {
      setTimeUntil(`Nur noch ${remaining} Tage bis Heiligabend!`);
    }

    setDays(remaining);
  }, []);

  return { timeUntil, days };
};
