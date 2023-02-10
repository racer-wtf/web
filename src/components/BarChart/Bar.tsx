import color from "color";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useEmojiColor } from "../../hooks/useEmojiColor";
import { useHover } from "../../hooks/useHover";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    width: "100%",
  },
  emoji: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    right: -110,
    color: "#fff",
  },
  modalContent: {
    display: "grid",
    gridTemplateColumns: "max-content auto",
    alignItems: "start",
    gap: "1rem",
  },
  modalContentDescription: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
} satisfies Record<string, React.CSSProperties>;

interface EmojiProps {
  emoji: string;
  size: number;
  backgroundColor: string;
  onClick?: () => any;
}

const Emoji = ({ emoji, size, backgroundColor, onClick }: EmojiProps) => {
  return (
    <div
      style={{
        ...styles.emoji,
        backgroundColor,
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: size / 2 }}>{emoji}</span>
    </div>
  );
};

interface BarProps {
  emoji: string;
  label: string;
  value: number;
  rank: number;
  total: number;
  width: string;
}

const Bar = ({ emoji, label, value, rank, total, width }: BarProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [voteAmount, setVoteAmount] = useState(0);
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const emojiColor = useEmojiColor(emoji);

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
      <Modal
        open={modalOpen}
        width="medium"
        title="Place Vote"
        onClose={() => setModalOpen(false)}
        color={emojiColor}
      >
        <div style={styles.modalContent}>
          <Emoji emoji={emoji} size={100} backgroundColor={labelColor} />
          <div style={styles.modalContentDescription}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>{label}</h2>
              <p style={{ marginLeft: 2 }}>{value} votes</p>
              <p style={{ marginLeft: 2, marginTop: "auto" }}>
                #{rank + 1} / {total}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  alignItems: "center",
                  minWidth: 220,
                }}
              >
                <p>{(voteAmount * 0.01 || 0).toFixed(2)} ETH</p>
                <Input
                  value={voteAmount.toString()}
                  setValue={(value: string) => setVoteAmount(parseInt(value))}
                  type="number"
                  min="0"
                />
              </div>
              <Button color={emojiColor} onClick={() => setModalOpen(false)}>
                Vote
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Emoji
        emoji={emoji}
        size={30}
        backgroundColor={labelColor}
        onClick={() => setModalOpen(true)}
      />

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