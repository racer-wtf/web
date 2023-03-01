import { ConnectButton } from "@rainbow-me/rainbowkit";

import logo from "../../assets/racer-white.svg";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import RewardsIndicator from "./RewardsIndicator";

const styles = {
  header: {
    width: "100%",
    maxWidth: 800,
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    padding: "1rem 0",
  },
  headerMobile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userPanel: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
} satisfies Record<string, React.CSSProperties>;

const Header = () => {
  const isMobile = useBreakpoint(550);

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
      <div style={styles.userPanel}>
        {/* <RewardsIndicator /> */}
        <ConnectButton showBalance />
      </div>
    </div>
  );
};

export default Header;
