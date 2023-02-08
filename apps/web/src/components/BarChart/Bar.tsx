import color from "color";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useEmojiColor } from "../../hooks/useEmojiColor";
import { useHover } from "../../hooks/useHover";

const styles: { [key: string]: React.CSSProperties } = {
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    width: "100%",
  },
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    cursor: "pointer",
  },
  bar: {
    flex: "grow",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    cursor: "default",
    position: "relative",
  },
  barText: {
    paddingRight: "1rem",
    paddingLeft: "1rem",
    fontSize: 14,
    marginTop: -2,
    fontFamily: "'Silkscreen', monospace",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  barTextOverflow: {
    position: "absolute",
    top: 6,
    right: -100,
    color: "#fff",
  },
};

interface Props {
  label: string;
  value: number;
  width: string;
}

const Bar = ({ label, value, width }: Props) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const emojiColor = useEmojiColor(label);

  useLayoutEffect(() => {
    setBarWidth(barRef.current?.offsetWidth || 0);
  }, []);

  const barColor = useMemo(() => {
    return isHovered
      ? color(emojiColor).saturate(0.5).string()
      : color(emojiColor).saturate(0.5).darken(0.1).string();
  }, [isHovered, emojiColor]);

  const labelColor = useMemo(() => {
    return isHovered
      ? color(barColor).alpha(0.6).string()
      : color(barColor).alpha(0.5).string();
  }, [barColor]);

  const textColor = useMemo(() => {
    return color(barColor).isLight() ? "#000" : "#fff";
  }, [barColor]);

  return (
    <div style={{ ...styles.row }} ref={hoverRef}>
      <div
        style={{
          ...styles.label,
          backgroundColor: labelColor,
        }}
        onClick={() => console.log("TODO - open modal or place bet")}
      >
        {label}
      </div>
      <span
        ref={barRef}
        style={{
          ...styles.bar,
          backgroundColor: barColor,
          color: textColor,
          width,
        }}
      >
        <p
          style={{
            ...styles.barText,
            ...(barWidth < 100 ? styles.barTextOverflow : {}),
          }}
        >
          {value} votes
        </p>
      </span>
    </div>
  );
};

export default Bar;
