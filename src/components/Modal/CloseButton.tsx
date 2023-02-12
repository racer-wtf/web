import Color from "color";
import { Close } from "../../icons/Close";

const styles = {
  closeButton: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "50%",
  },
} satisfies Record<string, React.CSSProperties>;

interface Props {
  color?: string;
  onClick: () => any;
}

const CloseButton = ({ color = "#fff", onClick }: Props) => {
  const xColor = Color(color).mix(Color("#fff")).string();
  const backgroundColor = Color(xColor).alpha(0.2).string();

  return (
    <div
      style={{ ...styles.closeButton, color: xColor, backgroundColor }}
      onClick={onClick}
    >
      <Close />
    </div>
  );
};

export default CloseButton;
