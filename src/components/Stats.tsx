const styles = {
  stats: { display: "grid", gridTemplateColumns: "3fr 2fr 2fr", gap: "1rem" },
  leftBorder: {
    borderLeft: "4px solid #fff",
    paddingLeft: 16,
  },
} satisfies Record<string, React.CSSProperties>;

const Stats = () => {
  return (
    <div style={styles.stats}>
      <div style={styles.leftBorder}>
        <h2>Blocks Remaining</h2>
        <p>10 (~3 minutes)</p>
      </div>
      <div style={styles.leftBorder}>
        <h2>Votes</h2>
        <p>234 total</p>
      </div>
      <div style={styles.leftBorder}>
        <h2>Payout</h2>
        <p>12.4 ETH</p>
      </div>
    </div>
  );
};

export default Stats;
