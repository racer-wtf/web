import Bar from "./Bar";

const styles = {
  chart: { display: "flex", flexDirection: "column", gap: "1rem" },
} satisfies Record<string, React.CSSProperties>;

type Node = {
  emoji: string;
  label: string;
  value: number;
};

interface Props {
  data: Node[];
}

const BarChart = ({ data }: Props) => {
  const maxValue = data[0] ? data[0].value : 0;

  return (
    <div style={styles.chart}>
      {data.map((node: Node, i) => (
        <Bar
          value={node.value}
          label={node.label}
          emoji={node.emoji}
          rank={i}
          total={data.length}
          width={(node.value / maxValue) * 100 + "%"}
          key={node.label}
        />
      ))}
    </div>
  );
};

export default BarChart;
