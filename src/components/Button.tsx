import Color from "color";

const styles = {
  button: {
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
} satisfies Record<string, React.CSSProperties>;

interface Props {
  color?: string;
  onClick: () => any;
  children: React.ReactNode;
}

const Button = ({ color = "#fff", onClick, children }: Props) => {
  const textColor = Color(color).mix(Color("#fff")).string();
  const backgroundColor = Color(color).alpha(0.2).string();

  return (
    <div
      style={{ ...styles.button, color: textColor, backgroundColor }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
