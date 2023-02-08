import { leaders } from "./../mocks/leaderboard";
import BarChart from "./BarChart";
import Stats from "./Stats";

const styles: { [key: string]: React.CSSProperties } = {
  main: { display: "flex", flexDirection: "column", gap: "1rem" },
};

const Leaderboard = () => {
  return (
    <div style={styles.main}>
      <p>
        Ethereum's hype market. Learn more about racing <a href="#">here</a>.
      </p>
      <Stats />
      <BarChart data={leaders} />
    </div>
  );
};

export default Leaderboard;
