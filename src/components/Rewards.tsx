import { rewards } from "./../mocks/rewards";

const styles = {
  leaderboard: { display: "flex", flexDirection: "column", gap: "1rem" },
} satisfies Record<string, React.CSSProperties>;

const Leaderboard = () => {
  return (
    <div style={styles.leaderboard}>
      <h2>Your rewards</h2>
    </div>
  );
};

export default Leaderboard;
