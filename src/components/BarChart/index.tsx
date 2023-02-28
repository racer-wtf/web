import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Emoji as EmojiType } from "../../store";
import Bar from "./Bar";
import VoteModal from "./VoteModal";

const styles = {
  chart: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  addButton: {
    cursor: "pointer",
    fontSize: 18,
    fontFamily: "'Silkscreen', monospace",
    padding: "0.5rem",
  },
} satisfies Record<string, React.CSSProperties>;

interface Props {
  emojis: EmojiType[];
  active?: boolean;
}

const BarChart = ({ emojis, active = true }: Props) => {
  const maxValue = Math.max(...emojis.map((d) => d.value));
  const sortedData = emojis.sort((a, b) => b.value - a.value);
  const [parent] = useAutoAnimate({ duration: 1000 });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={styles.chart} ref={parent}>
      {sortedData.map((node: EmojiType, i) => (
        <Bar
          value={node.value}
          emoji={node.emoji}
          rank={i}
          total={emojis.length}
          max={maxValue}
          key={node.emoji}
          active={active}
        />
      ))}

      {modalOpen && <VoteModal setModalOpen={setModalOpen} editable={true} />}

      {active && (
        <div style={styles.addButton} onClick={() => setModalOpen(true)}>
          + New Vote
        </div>
      )}
    </div>
  );
};

export default BarChart;
