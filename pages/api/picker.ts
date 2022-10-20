import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { peoplePicker, PickResult } from "../../lib/peoplePicker";

export type PickerResult = PickResult & { wishes: any[] };
const picker = withApiAuth<any, any, PickerResult | undefined>(
  async (req, res, supabaseServerClient) => {
    const { data } = await supabaseServerClient.auth.getUser();

    const result = peoplePicker().find((pick) => {
      return pick.personId === data.user?.id;
    });

    if (result) {
      const { data } = await supabaseServerClient
        .from("wishes")
        .select("wish, link")
        .eq("userid", result.pickedPersonId);

      return res.status(200).send({ ...result, wishes: data || [] });
    }

    return res.status(200).send(undefined);
  }
);

export default picker;
