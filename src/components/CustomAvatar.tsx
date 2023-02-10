import { type AvatarComponent } from "@rainbow-me/rainbowkit";
import { addressToColor } from "../utils/colors";

import { Helmet } from "../icons/Helmet";

export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      <Helmet color={addressToColor(address)} />
    </div>
  );
};
