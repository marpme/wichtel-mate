import { Button } from "@geist-ui/core";
import { useRouter } from "next/router";

export const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      auto
      scale={2 / 3}
      type="error"
      placeholder={""}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      onClick={async () => {
        await router.push("/");
      }}
    >
      Logout
    </Button>
  );
};
