import OnlineIndicator from "./OnlineIndicator";

const styles = {
  footer: {
    width: 800,
    height: 46,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    position: "fixed",
    bottom: 0,
  },
} satisfies Record<string, React.CSSProperties>;

const Footer = () => {
  return (
    <div style={styles.footer}>
      <OnlineIndicator />
      <a href="https://etherscan.io/" target="_blank">
        Etherscan
      </a>
    </div>
  );
};

export default Footer;
