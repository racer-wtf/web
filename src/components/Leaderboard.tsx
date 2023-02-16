import BarChart from "./BarChart";
import Stats from "./Stats";
import { useSubscription } from "../hooks/useSubscription";
import { useLeaderboard } from "../store";

const styles = {
  main: { display: "flex", flexDirection: "column", gap: "1rem" },
} satisfies Record<string, React.CSSProperties>;

const Leaderboard = () => {
  useSubscription("leaderboard");
  const data = useLeaderboard((state) => state.emojis);

  return (
    <div style={styles.main}>
      <Stats />
      <BarChart data={data} />
    </div>
  );
};

export default Leaderboard;
