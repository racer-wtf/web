import { leaders } from "../../mocks/leaderboard";
import BarChart from "../BarChart";

const styles: { [key: string]: React.CSSProperties } = {
  main: {},
};

const Leaderboard = () => {
  return (
    <div style={styles.main}>
      <BarChart data={leaders} />
    </div>
  );
};

export default Leaderboard;
