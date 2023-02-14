import { useBreakpoint } from "../hooks/useBreakpoint";

const styles = {
  stats: {
    display: "grid",
    gridTemplateAreas: "'blocks votes payout'",
    gridTemplateColumns: "2fr 1fr 1fr",
    gridTemplateRows: "1fr",
    gap: "1rem",
  },
  statsMobile: {
    gridTemplateAreas: "'blocks blocks' 'votes payout'",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
  },
  leftBorder: {
    borderLeft: "4px solid #fff",
    paddingLeft: 16,
  },
  blocks: {
    gridArea: "blocks",
  },
} satisfies Record<string, React.CSSProperties>;

const Stats = () => {
  const isMobile = useBreakpoint();

  return (
    <div style={{ ...styles.stats, ...(isMobile ? styles.statsMobile : {}) }}>
      <div style={{ ...styles.leftBorder, ...styles.blocks }}>
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
