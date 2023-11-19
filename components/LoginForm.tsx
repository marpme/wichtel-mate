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

export const LoginForm = () => {
  const router = useRouter();

  const { setToast } = useToasts();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: ref.current?.value,
          }),
        });

        if (response.status !== 204) {
          setToast({
            text: "Hey du! Du bist noch kein helfender Wichtel, schau später nochmal vorbei!",
            type: "error",
          });
        } else {
          router.push("/dashboard");
        }
      }}
    >
      <Card.Content>
        <Text h5>Login:</Text>
        <Input
          ref={ref}
          crossOrigin={undefined}
          htmlType="text"
          id="wichtelid"
          name="wichtelid"
          label={"Wichtel ID"}
          placeholder={"DZ50UpXwIp"}
        />
      </Card.Content>
      <Fieldset.Footer>
        <Spacer inline />
        <Button scale={2 / 3} auto htmlType="submit" type={"success"}>
          Submit
        </Button>
      </Fieldset.Footer>
    </form>
  );
};
