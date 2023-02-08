const styles: { [key: string]: React.CSSProperties } = {
  title: { fontFamily: "'Silkscreen', monospace" },
  stats: { display: "grid", gridTemplateColumns: "3fr 2fr 2fr", gap: "1rem" },
  leftBorder: {
    borderLeft: "4px solid #fff",
    paddingLeft: 16,
    paddingBottom: 6,
  },
};

const Stats = () => {
  return (
    <div style={styles.stats}>
      <div style={styles.leftBorder}>
        <h2 style={styles.title}>Blocks Remaining</h2>
        <p>10 (~3 minutes)</p>
      </div>
      <div style={styles.leftBorder}>
        <h2 style={styles.title}>Bets</h2>
        <p>234 total</p>
      </div>
      <div style={styles.leftBorder}>
        <h2 style={styles.title}>Payout</h2>
        <p>12.4 ETH</p>
      </div>
    </div>
  );
};

export default Stats;
