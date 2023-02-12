const styles = {
  emoji: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

export default Emoji;
