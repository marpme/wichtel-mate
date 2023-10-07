import Image from "next/image";

export const WichtelImage = () => (
  <Image
    src={"/wichtel.svg"}
    alt="Wichtel"
    width={400}
    height={200}
    draggable={false}
  />
);
