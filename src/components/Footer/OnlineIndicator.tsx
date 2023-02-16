import { useSubscription } from "../../hooks/useSubscription";
import { useOnlineCount, useIsOnline } from "../../store";

import "./OnlineIndicator.css";

const styles = {
  indicator: { display: "flex", alignItems: "center" },
} satisfies Record<string, React.CSSProperties>;

const Footer = () => {
  useSubscription("online");
  const isOnline = useIsOnline((state) => state.isOnline);
  const onlineCount = useOnlineCount((state) => state.count);

  return (
    <div style={styles.indicator}>
      <span
        className="connection-status"
        style={{ backgroundColor: isOnline ? "green" : "gray" }}
      />
      {isOnline ? `${onlineCount} online` : "Offline"}
    </div>
  );
};

export default Footer;
