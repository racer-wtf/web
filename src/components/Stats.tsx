import { useMemo } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { Metadata } from "../store";
import humanizeDuration from "humanize-duration";
import { formatEther } from "ethers/lib/utils.js";

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

interface Props {
  metadata: Metadata;
}

const Stats = ({ metadata }: Props) => {
  const isMobile = useBreakpoint();
  const humanReadableBlocksRemaining = useMemo(
    () =>
      humanizeDuration(metadata.blocks_remaining * 12 * 1000, { largest: 2 }),
    [metadata.blocks_remaining]
  );
  const humanReadablePayout = useMemo(
    () => formatEther(metadata.payout),
    [metadata.payout]
  );

  return (
    <div style={{ ...styles.stats, ...(isMobile ? styles.statsMobile : {}) }}>
      <div style={{ ...styles.leftBorder, ...styles.blocks }}>
        <h2>Blocks Remaining</h2>
        <p>
          {metadata.blocks_remaining} (~{humanReadableBlocksRemaining})
        </p>
      </div>
      <div style={styles.leftBorder}>
        <h2>Votes</h2>
        <p>{metadata.votes} total</p>
      </div>
      <div style={styles.leftBorder}>
        <h2>Payout</h2>
        <p>{humanReadablePayout} gETH</p>
      </div>
    </div>
  );
};

export default Stats;
