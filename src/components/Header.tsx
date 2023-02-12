import { ConnectButton } from "@rainbow-me/rainbowkit";

import logo from "../assets/racer-white.svg";
import { useBreakpoint } from "../hooks/useBreakpoint";

const styles = {
  header: {
    width: "100%",
    maxWidth: 800,
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    paddingTop: "1rem",
  },
  headerMobile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
} satisfies Record<string, React.CSSProperties>;

const Header = () => {
  const isMobile = useBreakpoint(500);

  return (
    <div
      style={{
        ...styles.header,
        ...(isMobile ? styles.headerMobile : {}),
      }}
    >
      <a href="/">
        <img src={logo} className="Racer logo" alt="logo" width={200} />
      </a>
      <ConnectButton showBalance />
    </div>
  );
};

export default Header;
