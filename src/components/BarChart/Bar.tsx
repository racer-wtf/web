import color from "color";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useEmojiColor } from "../../hooks/useEmojiColor";
import { useHover } from "../../hooks/useHover";
import Button from "../Button";
import Emoji from "../Emoji";
import Input from "../Input";
import Modal from "../Modal";

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
  modalContent: {
    display: "grid",
    gridTemplateAreas: "'emoji description button'",
    gridTemplateColumns: "max-content 3fr 1fr",
    gridTemplateRows: "1fr",
    alignItems: "start",
    gap: "1rem",
    fontFamily: "SFMono, ui-monospace, monospace",
  },
  modalContentMobile: {
    gridTemplateAreas: "'emoji description' 'button button'",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "1fr 1fr",
  },
  modalContentDescription: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
} satisfies Record<string, React.CSSProperties>;

interface BarProps {
  emoji: string;
  label: string;
  value: number;
  rank: number;
  total: number;
  max: number;
}

const Bar = ({ emoji, label, value, rank, total, max }: BarProps) => {
  const isMobile = useBreakpoint(580);
  const [modalOpen, setModalOpen] = useState(false);
  const [voteAmount, setVoteAmount] = useState(1);
  const barRef = useRef<HTMLDivElement>(null);
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [barWidth, setBarWidth] = useState(0);
  const emojiColor = useEmojiColor(emoji);

  useLayoutEffect(() => {
    setBarWidth((barRef.current?.offsetWidth || 0) * (value / max));
  }, [value, max]);

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
      <Modal
        open={modalOpen}
        width="medium"
        title="Place Vote"
        onClose={() => setModalOpen(false)}
        color={emojiColor}
      >
        <div
          style={{
            ...styles.modalContent,
            ...(isMobile ? styles.modalContentMobile : {}),
          }}
        >
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
          </div>
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
              gridArea: "button",
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
                min="1"
                max="100000"
              />
            </div>
            <Button color={emojiColor} onClick={() => setModalOpen(false)}>
              Vote
            </Button>
          </div>
        </div>
      </Modal>

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
