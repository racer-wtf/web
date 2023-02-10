import "./OnlineIndicator.css";

const styles = {
  indicator: { display: "flex", alignItems: "center" },
} satisfies Record<string, React.CSSProperties>;

const Footer = () => {
  return (
    <div style={styles.indicator}>
      <span className="online-indicator" />
      104 online
    </div>
  );
};

export default Footer;
