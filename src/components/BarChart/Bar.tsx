import color from "color";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useEmojiColor } from "../../hooks/useEmojiColor";
import { useHover } from "../../hooks/useHover";
import { useWindowSize } from "../../hooks/useWindowSize";
import Emoji from "../Emoji";
import VoteModal from "./VoteModal";

const barSize = 30;

const styles = {
  row: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "1rem",
    width: "100%",
    cursor: "pointer",
  },
  bar: {
    height: barSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    position: "relative",
    transition: "width 1s ease-in-out",
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
    userSelect: "none",
  },
  barTextOverflow: {
    position: "absolute",
    top: 6,
    right: -110,
    color: "#fff",
  },
} satisfies Record<string, React.CSSProperties>;

interface BarProps {
  emoji: string;
  value: number;
  rank: number;
  total: number;
  max: number;
}

const Bar = ({ emoji, value, rank, total, max }: BarProps) => {
  const windowSize = useWindowSize();
  const [modalOpen, setModalOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [barWidth, setBarWidth] = useState(0);
  const emojiColor = useEmojiColor(emoji);

  useLayoutEffect(() => {
    // console.log(barRef.current?.clientWidth);
    setBarWidth((barRef.current?.clientWidth || 0) * (value / max));
  }, [value, max, windowSize]);

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
    <>
      <VoteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        emoji={emoji}
        value={value}
        rank={rank}
        total={total}
        editable={false}
      />

      <div
        ref={hoverRef}
        style={{
          ...styles.row,
        }}
        onClick={() => setModalOpen(true)}
      >
        <Emoji
          emoji={emoji}
          size={barSize}
          backgroundColor={labelColor}
          onClick={() => setModalOpen(true)}
        />

        <div ref={barRef}>
          <span
            style={{
              ...styles.bar,
              backgroundColor: barColor,
              color: textColor,
              width: barWidth,
            }}
          >
            <p
              style={{
                ...styles.barText,
                ...(barWidth < 150 ? styles.barTextOverflow : {}),
              }}
            >
              {value} votes
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Bar;
