import Image from "next/image";

export const WichtelImage = () => (
  <Image
    src={"/wichtel.svg"}
    alt="Wichtel"
    width={460}
    height={230}
    draggable={false}
  />
);
