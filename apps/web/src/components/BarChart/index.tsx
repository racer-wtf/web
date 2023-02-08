import Bar from "./Bar";

const styles: { [key: string]: React.CSSProperties } = {
  chart: { display: "flex", flexDirection: "column", gap: "1rem" },
};

type Node = {
  label: string;
  value: number;
};

interface Props {
  data: Node[];
}

const Chart = ({ data }: Props) => {
  const maxValue = data[0] ? data[0].value : 0;
  console.log("maxValue", maxValue);

  return (
    <div style={styles.chart}>
      {data.map((node: Node) => (
        <Bar
          value={node.value}
          label={node.label}
          width={node.value / maxValue * 100 + "%"}
          key={node.label}
        />
      ))}
    </div>
  );
};

export default Chart;
