import { useEffect } from "react";
import { useOnlineCount, useSubscriptions, useIsOnline } from "../../store";
import { shallow } from "zustand/shallow";

import "./OnlineIndicator.css";

const styles = {
  indicator: { display: "flex", alignItems: "center" },
} satisfies Record<string, React.CSSProperties>;

const Footer = () => {
  const isOnline = useIsOnline((state) => state.isOnline);
  const onlineCount = useOnlineCount((state) => state.count);
  const { addSubscription, removeSubscription } = useSubscriptions(
    (state) => ({
      addSubscription: state.addSubscription,
      removeSubscription: state.removeSubscription,
    }),
    shallow
  );

  useEffect(() => {
    addSubscription("online");
    return () => removeSubscription("online");
  }, []);

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
