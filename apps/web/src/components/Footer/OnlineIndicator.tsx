import "./OnlineIndicator.css";

const styles: { [key: string]: React.CSSProperties } = {
  indicator: { display: "flex", alignItems: "center" },
};

const Footer = () => {
  return (
    <div style={styles.indicator}>
      <span className="online-indicator" />
      104 online
    </div>
  );
};

export default Footer;
