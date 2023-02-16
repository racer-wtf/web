import { useEffect } from "react";
import { leaders } from "./../mocks/leaderboard";
import BarChart from "./BarChart";
import Stats from "./Stats";
import { useSubscriptions } from "../store";

const styles = {
  main: { display: "flex", flexDirection: "column", gap: "1rem" },
} satisfies Record<string, React.CSSProperties>;

const Leaderboard = () => {
  const subscriptions = useSubscriptions();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div style={styles.main}>
      <Stats />
      <BarChart data={leaders} />
    </div>
  );
};

export default Leaderboard;
