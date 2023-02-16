import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Emoji } from "../../store";
import Bar from "./Bar";

const styles = {
  chart: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
} satisfies Record<string, React.CSSProperties>;

interface Props {
  data: Emoji[];
}

const BarChart = ({ data }: Props) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const sortedData = data.sort((a, b) => b.value - a.value);
  const [parent] = useAutoAnimate({ duration: 1000 });

  return (
    <div style={styles.chart} ref={parent}>
      {sortedData.map((node: Emoji, i) => (
        <Bar
          value={node.value}
          label={node.label}
          emoji={node.emoji}
          rank={i}
          total={data.length}
          max={maxValue}
          key={node.emoji}
        />
      ))}
    </div>
  );
};

export default BarChart;
