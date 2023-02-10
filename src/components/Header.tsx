import { ConnectButton } from "@rainbow-me/rainbowkit";

import logo from "../assets/racer-white.svg";

const styles = {
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    paddingTop: "1rem",
  },
} satisfies Record<string, React.CSSProperties>;

const Header = () => {
  return (
    <div style={styles.header}>
      <a href="/">
        <img src={logo} className="Racer logo" alt="logo" width={200} />
      </a>
      <ConnectButton />
    </div>
  );
};

export default Header;
