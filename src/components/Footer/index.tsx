import { useBreakpoint } from "../../hooks/useBreakpoint";
import OnlineIndicator from "./OnlineIndicator";

const styles = {
  footer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 46,
    backgroundColor: "#000",
    position: "fixed",
    bottom: 0,
  },
  footerMobile: {
    paddingRight: 20,
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 800,
    width: "100%",
  },
} satisfies Record<string, React.CSSProperties>;

const Footer = () => {
  const isMobile = useBreakpoint();

  return (
    <div style={{ ...styles.footer, ...(isMobile ? styles.footerMobile : {}) }}>
      <div style={styles.footerContent}>
        <OnlineIndicator />
        <a href="https://etherscan.io/" target="_blank">
          Etherscan
        </a>
      </div>
    </div>
  );
};

export default Footer;
