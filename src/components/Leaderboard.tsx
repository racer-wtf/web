import BarChart from "./BarChart";
import Stats from "./Stats";
import { useSubscription } from "../hooks/useSubscription";
import { useLeaderboard } from "../store";

const styles = {
  main: { display: "flex", flexDirection: "column", gap: "1rem" },
} satisfies Record<string, React.CSSProperties>;

const Leaderboard = () => {
  useSubscription("leaderboard");
  const metadata = useLeaderboard((state) => state.metadata);
  const emojis = useLeaderboard((state) => state.emojis);

  if (!metadata || !emojis) {
    return null;
  }

  return (
    <div style={styles.main}>
      <Stats metadata={metadata} />
      <BarChart emojis={emojis} />
    </div>
  );
};

export default Leaderboard;
