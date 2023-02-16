import { useEffect } from "react";
import { useOnlineCount, useSubscriptions } from "../../store";
import { shallow } from "zustand/shallow";

import "./OnlineIndicator.css";

const styles = {
  indicator: { display: "flex", alignItems: "center" },
} satisfies Record<string, React.CSSProperties>;

const Footer = () => {
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
      <span className="online-indicator" />
      {onlineCount} online
    </div>
  );
};

export default Footer;
