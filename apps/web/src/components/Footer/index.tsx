import OnlineIndicator from "./OnlineIndicator";

const styles: { [key: string]: React.CSSProperties } = {
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
};

const Footer = () => {
  return (
    <div style={styles.footer}>
      <OnlineIndicator />
      <a href="https://etherscan.io/" target="_blank">Etherscan</a>
    </div>
  );
};

export default Footer;
