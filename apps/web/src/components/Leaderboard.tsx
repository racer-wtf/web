import { leaders } from "./../mocks/leaderboard";
import BarChart from "./BarChart";
import Stats from "./Stats";

const styles = {
  main: { display: "flex", flexDirection: "column", gap: "1rem" },
} satisfies Record<string, React.CSSProperties>;

const Leaderboard = () => {
  return (
    <div style={styles.main}>
      <Stats />
      <BarChart data={leaders} />
    </div>
  );
};

export default Leaderboard;
