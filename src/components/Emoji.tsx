import { useEffect, useRef, useState } from "react";
import emojiDict from "emoji.json";

const styles = {
  emoji: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
  },
  emojiLoading: {
    animation: "spin 5s linear infinite",
  },
  input: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: 0,
  },
  error: {
    color: "red",
    position: "absolute",
    bottom: 20,
    fontSize: 10,
  },
} satisfies Record<string, React.CSSProperties>;

interface EmojiProps {
  emoji: string;
  setEmoji?: (value: string) => void;
  size: number;
  backgroundColor: string;
  onClick?: () => any;
  editable?: boolean;
  loading?: boolean;
}

const byteSize = (str: string) => new Blob([str]).size;

const Emoji = ({
  emoji,
  setEmoji,
  size,
  backgroundColor,
  onClick,
  editable = false,
  loading = false,
}: EmojiProps) => {
  const [error, setError] = useState(false);

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setEmoji) {
      if (byteSize(e.target.value) > 4) {
        setError(true);
        return;
      }

      if (
        emojiDict.find((emoji) => emoji.char === e.target.value) ||
        e.target.value === ""
      ) {
        setError(false);
        setEmoji(e.target.value);
      }
    }
  };

  // for some reason autoFocus doesn't work on modal mounts without a delay
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 10);
  }, [ref.current]);

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
      {editable ? (
        <input
          style={{
            ...styles.input,
            fontSize: size / 2,
            ...(error ? { border: "1px solid red" } : {}),
          }}
          value={emoji}
          onChange={handleEmojiChange}
          ref={ref}
        />
      ) : (
        <span
          style={{
            fontSize: size / 2,
            ...(loading ? styles.emojiLoading : {}),
          }}
        >
          {emoji}
        </span>
      )}

      {error && <span style={styles.error}>Invalid emoji</span>}
    </div>
  );
};

export default Emoji;
