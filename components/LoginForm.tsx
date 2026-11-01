import {
  Button,
  Card,
  Fieldset,
  Input,
  Spacer,
  Text,
  useToasts,
} from "@geist-ui/core";
import { useRef } from "react";
import { useRouter } from "next/router";
import { UserKeys } from "../lib/groups";

export const LoginForm = () => {
  const router = useRouter();

  const { setToast } = useToasts();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!UserKeys.includes(ref.current?.value ?? "")) {
          setToast({
            text: "Hmm, diese Wichtel-ID kennen wir (noch) nicht. Versuch es später noch einmal!",
            type: "error",
          });
        } else {
          router.push("/" + ref.current?.value);
        }
      }}
    >
      <Card.Content>
        <Text h5>Melde dich mit deiner Wichtel-ID an:</Text>
        <Input
          ref={ref}
          data-testid={"login-input-field"}
          crossOrigin={undefined}
          htmlType="text"
          id="wichtelid"
          name="wichtelid"
          label={"Deine Wichtel-ID"}
          placeholder={"z. B. DZ50UpXwIp"}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </Card.Content>
      <Fieldset.Footer>
        <Spacer inline />
        <Button
          scale={2 / 3}
          auto
          htmlType="submit"
          data-testid={"login-submit-button"}
          type={"error-light"}
          className={"btn-primary"}
          placeholder={""}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Anmelden
        </Button>
      </Fieldset.Footer>
    </form>
  );
};
