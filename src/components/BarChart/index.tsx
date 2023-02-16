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
  },
} satisfies Record<string, React.CSSProperties>;

interface Props {
  data: EmojiType[];
}

const BarChart = ({ data }: Props) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const sortedData = data.sort((a, b) => b.value - a.value);
  const [parent] = useAutoAnimate({ duration: 1000 });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={styles.chart} ref={parent}>
      {sortedData.map((node: EmojiType, i) => (
        <Bar
          value={node.value}
          emoji={node.emoji}
          rank={i}
          total={data.length}
          max={maxValue}
          key={node.emoji}
        />
      ))}

      <VoteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editable={true}
      />

      <div style={styles.addButton} onClick={() => setModalOpen(true)}>
        + Add
      </div>
    </div>
  );
};

export default BarChart;
